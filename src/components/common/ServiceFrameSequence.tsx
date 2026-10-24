import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceFrameSequenceProps {
  /** Ordered frame URLs — frame[0] is the sequence's resting/start state,
   * frame[N-1] its finished state. 8 frames is the tuned sweet spot here:
   * few enough to preload instantly, enough that the scrub still reads as
   * continuous motion rather than a slideshow. Pass an empty array to fall
   * back to `fallbackImage` (a single static cover photo, no canvas/scrub)
   * — used for services whose frame sequence hasn't been generated yet. */
  frames: string[];
  /** Single static photo shown (via a plain cover <img>, no canvas) when
   * `frames` is empty, so a service missing its generated sequence still
   * gets the same pinned/overlay treatment as the others instead of a
   * visibly broken or blank section. */
  fallbackImage?: string;
  /** Pin duration in viewport-heights the section is scrubbed across —
   * bigger = slower/more deliberate reveal per scroll pixel. */
  pinHeight?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Canvas + preloaded JPEG frame-sequence, scrubbed by a GSAP ScrollTrigger
 * (not the custom rAF-lerp loop Hero.tsx uses — that one owns its own
 * timing deliberately, for a single always-visible full-bleed hero; this
 * component is the standard, simpler GSAP-native pattern for N independent
 * per-section sequences down a long page, where a ScrollTrigger per
 * section — pinning it, mapping scroll progress 1:1 to frame index via
 * `onUpdate` — is both less code and exactly matches what "canvas +
 * preloaded frames + ScrollTrigger scrub" means as a named technique).
 *
 * Frame loading is gated behind an IntersectionObserver with a generous
 * bottom rootMargin (one full viewport ahead) rather than starting on
 * mount: with 6 of these on one page (≈2MB/8-frame set), loading all of
 * them up front would mean ~13MB fetched the instant the Services page
 * opens, almost all of it for sections the visitor hasn't scrolled
 * anywhere near yet. The margin is deliberately generous (not "when it
 * enters the viewport") so the preload finishes and the ScrollTrigger pin
 * is armed *before* the section's pin point is actually reached — gating
 * only on literal visibility would risk the user scrolling into a still-
 * loading section.
 *
 * Preloads all frames via plain `new Image()` (no ImageBitmap pre-scale
 * step like Hero.tsx's — these sequences are short, section-sized canvases,
 * not a full-bleed 4K hero redrawing 60-144x/sec, so the extra bitmap-cache
 * complexity there isn't earning its cost here). Draws cover-fit,
 * center-cropped, with a 1-frame crossfade so adjacent frames blend instead
 * of popping.
 */
export const ServiceFrameSequence: React.FC<ServiceFrameSequenceProps> = ({
  frames,
  fallbackImage,
  pinHeight = 2.2,
  className = '',
  children
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasFrames = frames.length > 0;

  // Eagerly give the canvas real pixel dimensions the instant it mounts —
  // before any image has loaded, before the lazy-load gate below even
  // fires. A plain <canvas> defaults to 300x150 until something sets
  // width/height; under fast scrolling that default could still be showing
  // (stretched via CSS to fill the section) at the moment the user reaches
  // it, which reads as a blank gray gap. Sizing immediately means there's
  // never a frame where the canvas is wrong-sized, only ever "not yet
  // drawn to" (which boot()'s own resize()+draw() below fixes once ready).
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }
  }, [hasFrames]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // A generous lookahead (300% of viewport height) rather than the more
    // typical "one viewport ahead": under fast/flick scrolling,
    // IntersectionObserver callbacks can be throttled/batched by the
    // browser and fire later than the scroll position that triggered
    // them — a tighter margin left a real window where the user could
    // scroll-fling straight into a section whose 8 images (~2MB) hadn't
    // started loading yet, landing on the still-unsized/undrawn canvas.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 300% 0px', threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!shouldLoad || !section || !canvas || frames.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let alive = true;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let currentP = 0;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    function resize() {
      if (!canvas || !section) return;
      const rect = section.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      draw(currentP);
    }

    function drawFrame(img: HTMLImageElement, alpha: number) {
      if (!ctx || !canvas || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function draw(p: number) {
      if (!ctx || !canvas) return;
      const idx = clamp(p, 0, 1) * (frames.length - 1);
      const i = Math.floor(idx);
      const frac = idx - i;
      const j = Math.min(i + 1, frames.length - 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      drawFrame(images[i], 1);
      if (j !== i && frac > 0.001) drawFrame(images[j], frac);
      ctx.globalAlpha = 1;
    }

    let st: ScrollTrigger | null = null;

    function boot() {
      if (!alive) return;
      setLoaded(true);
      resize();

      if (reduce) {
        // No scrub for reduced-motion visitors — just show the finished
        // frame as a static image, matching Hero.tsx's reduced-motion
        // treatment of "settle at the target state, no animation."
        currentP = 1;
        draw(1);
        return;
      }

      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${pinHeight * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          currentP = self.progress;
          draw(currentP);
        }
      });
    }

    // A per-frame timeout, not just onload/onerror: a 404'd or hung request
    // can leave an <img> neither loaded nor errored indefinitely on some
    // browsers/networks, which would otherwise leave `loadedCount` short
    // forever and boot() never firing — permanently stuck on the loading
    // spinner for that whole section.
    frames.forEach((src, i) => {
      const img = new Image();
      images[i] = img;
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        loadedCount++;
        if (loadedCount === frames.length && alive) boot();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
      window.setTimeout(settle, 8000);
    });

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
        st?.refresh();
      }, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      alive = false;
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      st?.kill();
    };
  }, [frames, pinHeight, shouldLoad]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full h-[100svh] overflow-hidden bg-[#0a0f1a] ${className}`}
    >
      {hasFrames ? (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a]">
              <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-white/70 animate-spin" />
            </div>
          )}
        </>
      ) : (
        // No generated sequence for this section yet — a plain static
        // cover photo stands in, same full-bleed treatment, no canvas/
        // ScrollTrigger pin/scrub since there's only one image to show.
        fallbackImage && (
          <img
            src={fallbackImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )
      )}
      {children}
    </div>
  );
};
