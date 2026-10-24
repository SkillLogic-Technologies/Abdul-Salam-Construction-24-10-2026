import { useEffect, useRef } from "react";
import "./Hero.css";

/**
 * Abdul-Salam Construction — scroll-driven construction image-sequence hero.
 * Frames live in /public/frames/f01.png ... f09.png, f010.png ... f015.png
 * (15 frames, order: empty plot -> finished house).
 */

const FRAME_FILENAMES = [
  "f01.png",
  "f02.png",
  "f03.png",
  "f04.png",
  "f05.png",
  "f06.png",
  "f07.png",
  "f08.png",
  "f09.png",
  "f010.png",
  "f011.png",
  "f012.png",
  "f013.png",
  "f014.png",
  "f015.png"
];
const FRAME_COUNT = FRAME_FILENAMES.length;
const FRAMES: string[] = FRAME_FILENAMES.map(
  (name) => `${import.meta.env.BASE_URL}frames/${name}`
);

const HOLD = 0.8; // build finishes at 80% of the stage; last 20% holds the finished house

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const stage = stageRef.current!;
    const hero = heroRef.current!;
    const card = cardRef.current!;
    const hint = hintRef.current!;
    const reveal = revealRef.current!;
    const scrubfill = scrubRef.current!;
    const loader = loaderRef.current!;

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // tiny offscreen canvas -> cheap blurred backdrop that fills the letterbox
    const bg = document.createElement("canvas");
    const bgx = bg.getContext("2d")!;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const map = (v: number, a: number, b: number, c: number, d: number) =>
      c + (d - c) * clamp((v - a) / (b - a), 0, 1);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Two image representations are kept per frame:
    //   `images[]`  — the raw HTMLImageElement, used only as the decode
    //                 source for createImageBitmap() below (and as the
    //                 reduced-motion fallback path, which draws far less
    //                 often so the extra scale cost there doesn't matter).
    //   `bitmaps[]` — an ImageBitmap pre-scaled to the canvas's OWN pixel
    //                 dimensions, created once per frame per resize via
    //                 createImageBitmap({ resizeWidth, resizeHeight }).
    //                 createImageBitmap decodes off the main thread (it
    //                 returns a promise resolved by the browser's image
    //                 decoder, not synchronous main-thread work like the
    //                 <img> path), and — critically — resizing it to the
    //                 destination size ONCE up front means every one of the
    //                 ~60-144 drawImage calls per second this hero does
    //                 becomes a cheap ~1:1 blit instead of asking the 2D
    //                 canvas rasterizer to bilinear-scale a full 1672x941
    //                 source up to a up-to-3840x2160 destination on every
    //                 single frame — that per-frame rescale (doubled during
    //                 every crossfade, since two frames draw at once) was
    //                 the dominant paint cost, and it was identical whether
    //                 native or Lenis scroll was driving the position,
    //                 which is exactly why switching scroll engines didn't
    //                 change the stutter.
    const images: HTMLImageElement[] = [];
    let bitmaps: (ImageBitmap | null)[] = [];
    let loaded = 0;
    let ready = false;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let targetP = 0;
    let smoothP = 0;
    let rafId = 0;
    let alive = true;
    // Bumped on every resize; a pending decodeBitmaps() run checks this
    // before installing its result so a stale, superseded decode (from a
    // resize that happened mid-flight) never overwrites the current one.
    let bitmapGeneration = 0;
    // Set true by resize()/decodeBitmaps() (source pixels actually changed)
    // and read+cleared once by loop() below. Lets loop() skip drawAt()
    // entirely once smoothP has settled and nothing forces a fresh paint —
    // previously drawAt() (a full canvas clear + up to 4 drawImage calls)
    // ran unconditionally on every rAF tick for as long as the hero was
    // mounted, including while fully idle (scroll stopped, or the user
    // scrolling through a section far below the hero while this component
    // simply hadn't unmounted) — a 100%, forever-running paint cost
    // completely independent of scroll activity, which is why it produced
    // identical stutter under both native and Lenis scroll.
    let forceRedraw = false;

    async function decodeBitmaps(targetGeneration: number) {
      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const supportsBitmap = typeof createImageBitmap === "function";
      const next: (ImageBitmap | null)[] = new Array(FRAME_COUNT).fill(null);

      await Promise.all(
        images.map(async (img, i) => {
          if (!img.complete || img.naturalWidth === 0) return;
          if (!supportsBitmap) return; // falls back to drawing `images[i]` directly
          try {
            // cover-fit dimensions (matches the old coverTo/containMain math)
            // computed once here instead of recomputed via drawImage scaling
            // on every paint.
            const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
            const w = Math.round(img.naturalWidth * s);
            const h = Math.round(img.naturalHeight * s);
            next[i] = await createImageBitmap(img, {
              resizeWidth: w,
              resizeHeight: h,
              resizeQuality: "high"
            });
          } catch {
            next[i] = null; // falls back to drawing `images[i]` directly for this frame
          }
        })
      );

      if (targetGeneration !== bitmapGeneration || !alive) {
        // Superseded by a later resize, or the component unmounted while
        // decoding — discard this batch instead of installing stale bitmaps.
        next.forEach((b) => b?.close());
        return;
      }

      bitmaps.forEach((b) => b?.close());
      bitmaps = next;
      forceRedraw = true;
    }

    function resize() {
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      bg.width = 120;
      bg.height = Math.max(1, Math.round((120 * canvas.height) / canvas.width));
      measure();
      bitmapGeneration++;
      void decodeBitmaps(bitmapGeneration);
      forceRedraw = true;
      drawAt(smoothP);
    }

    // Draws into the tiny 120px-wide offscreen blurred-backdrop canvas — the
    // DESTINATION is only ~120px wide regardless of source resolution, so
    // canvas rescale cost (which scales with destination pixel count, not
    // source) is already trivial here. No bitmap pre-scaling needed for
    // this pass; only the full-resolution `containMain` draw below was the
    // actual expensive one.
    function coverTo(
      c: CanvasRenderingContext2D,
      img: HTMLImageElement,
      W: number,
      H: number,
      alpha: number
    ) {
      if (!img || !img.complete) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const s = Math.max(W / iw, H / ih);
      const w = iw * s;
      const h = ih * s;
      c.globalAlpha = alpha;
      c.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    }

    // Draws a frame already pre-scaled to canvas size (the ImageBitmap path)
    // as a near-1:1 blit, or falls back to scaling the raw <img> on the fly
    // (only hit if createImageBitmap isn't supported, or a bitmap for this
    // frame failed to decode).
    function containMain(i: number, alpha: number) {
      const bmp = bitmaps[i];
      const img = images[i];
      if (bmp) {
        // Pre-scaled to cover the canvas already — center it (it may be a
        // few px larger than the canvas on one axis from the cover-fit
        // rounding, same as the old math).
        ctx.globalAlpha = alpha;
        ctx.drawImage(bmp, (canvas.width - bmp.width) / 2, (canvas.height - bmp.height) / 2);
        return;
      }
      if (!img || !img.complete) return;
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

    function drawAt(p: number) {
      const idx = p * (FRAME_COUNT - 1);
      const i = Math.floor(idx);
      const frac = idx - i;
      const j = Math.min(i + 1, FRAME_COUNT - 1);

      // 1) blurred backdrop (draw frames cover into the tiny canvas, then blit upscaled)
      bgx.globalAlpha = 1;
      bgx.clearRect(0, 0, bg.width, bg.height);
      coverTo(bgx, images[i], bg.width, bg.height, 1);
      if (j !== i && frac > 0.001) coverTo(bgx, images[j], bg.width, bg.height, frac);

      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(8,10,14,.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2) sharp full image on top (cover, no letterbox) with crossfade
      containMain(i, 1);
      if (j !== i && frac > 0.001) containMain(j, frac);
      ctx.globalAlpha = 1;
    }

    // Per-element "still animating" flags, so applyUI can skip writing a
    // style once an element has fully settled at its end value — each of
    // hero/card/hint/reveal only actually changes across a fraction of the
    // hero's scroll range (e.g. `hero` finishes fading out by p=0.62 and
    // then sits at opacity:0 for the remaining ~38% of the scroll), but
    // without this guard the same inline style gets rewritten every single
    // rAF tick for the entire time the hero is in view regardless of
    // whether the computed value actually changed — a wasted style
    // recalculation on every frame. The flag also drives will-change: it's
    // set only for the window each element is actually animating (matching
    // Hero.css, which deliberately has NO static will-change on these) and
    // cleared the instant it settles, rather than held for the element's
    // whole mounted lifetime — a layer promoted permanently for something
    // that's static 60-95% of the time it's on screen is a standing
    // compositor cost paid for nothing.
    // Initialized `true` (not `false`) so the very first applyUI() call is
    // treated as a fresh entry into each element's active range and sets
    // will-change before that first paint, rather than skipping it because
    // there was no prior "settled" state to transition from.
    let heroSettled = true;
    let cardSettled = true;
    let hintSettled = true;
    let revealSettled = true;

    function applyUI(p: number) {
      // All per-frame writes below touch only `opacity`/`transform` — both
      // compositor-only properties the browser can animate without
      // triggering layout or paint. `translate3d(...)` (rather than
      // `translate`/`translateY`) is used deliberately so each element gets
      // promoted to, and stays on, its own GPU layer while it's actually
      // animating instead of being re-rasterized with its parent each frame.
      const heroDone = p >= 0.62 || p <= 0.34;
      if (!heroDone || !heroSettled) {
        if (heroSettled) hero.style.willChange = 'opacity, transform';
        hero.style.opacity = String(map(p, 0.34, 0.62, 1, 0));
        hero.style.transform = `translate3d(0, calc(-50% - ${map(p, 0.34, 0.62, 0, 46)}px), 0)`;
        if (heroDone) hero.style.willChange = 'auto';
        heroSettled = heroDone;
      }

      const cardDone = p >= 0.54 || p <= 0.28;
      if (!cardDone || !cardSettled) {
        if (cardSettled) card.style.willChange = 'opacity';
        card.style.opacity = String(map(p, 0.28, 0.54, 1, 0));
        if (cardDone) card.style.willChange = 'auto';
        cardSettled = cardDone;
      }

      const hintDone = p >= 0.2;
      if (!hintDone || !hintSettled) {
        if (hintSettled) hint.style.willChange = 'opacity';
        hint.style.opacity = String(map(p, 0, 0.2, 1, 0));
        if (hintDone) hint.style.willChange = 'auto';
        hintSettled = hintDone;
      }

      const revealDone = p >= 0.99 || p <= 0.86;
      if (!revealDone || !revealSettled) {
        if (revealSettled) reveal.style.willChange = 'opacity, transform';
        const rv = map(p, 0.86, 0.99, 0, 1);
        reveal.style.opacity = String(rv);
        reveal.style.transform = `translate3d(-50%, ${20 - rv * 20}px, 0)`;
        if (revealDone) reveal.style.willChange = 'auto';
        revealSettled = revealDone;
      }

      // scaleX, not `width` — animating `width` is layout-triggering
      // (forces reflow + repaint every frame during scroll); transform is
      // compositor-only. transformOrigin is set once in JSX/CSS so this
      // stays a pure GPU scale from the left edge. Always written (unlike
      // the above) since the scrub bar tracks `p` linearly across the
      // entire scroll range with no settled plateau.
      scrubfill.style.transform = `scaleX(${p})`;
    }

    // Cache layout-dependent numbers (stage top offset + total scrollable
    // range) instead of calling getBoundingClientRect() from the scroll
    // handler. getBoundingClientRect() forces a synchronous layout
    // recalculation (forced reflow) — calling it on every native scroll
    // event on a 320vh sticky-stage section is what was causing the
    // scroll-jank: layout thrashing on the hottest possible path, every
    // frame, for the entire height of the hero. The scroll handler now only
    // reads `scrollY` (no layout cost) and the cached numbers are recomputed
    // solely on resize/load, where a reflow is expected and cheap (once,
    // not per-frame).
    let stageTop = 0;
    let stageTotal = 1;

    function measure() {
      // Only place in the whole scroll path allowed to touch layout.
      stageTop = stage.offsetTop;
      stageTotal = Math.max(1, stage.offsetHeight - innerHeight);
    }

    function onScroll() {
      const rp = clamp((scrollY - stageTop) / stageTotal, 0, 1);
      targetP = clamp(rp / HOLD, 0, 1); // completes at HOLD, then last frame holds

      if (reduce) {
        smoothP = targetP;
        if (ready) {
          drawAt(smoothP);
          applyUI(smoothP);
        }
      }
    }

    // 0.075 is the tuned "buttery" feel, calibrated by eye at a normal 60Hz
    // refresh rate — that number is a per-call fraction, not a per-second
    // rate, so applying it once per requestAnimationFrame call as before
    // silently coupled the hero's scroll-catchup speed to the display's
    // refresh rate: on a 120Hz+ monitor loop() fires twice as often, so the
    // same fractional step compounds twice as fast in wall-clock time,
    // making the image-sequence noticeably snappier/tighter there than on
    // 60Hz — a real, if subtle, hidden-frame-rate-assumption bug (distinct
    // from Lenis/GSAP, which already scale by real elapsed time via
    // gsap.ticker and were never part of this). LERP_RATE_PER_60FPS_FRAME
    // is the same 0.075 feel, now converted to an actual per-second decay
    // constant and reapplied scaled by each frame's real elapsed time (dt),
    // so the hero converges at the identical wall-clock speed regardless of
    // whether the display is running rAF at 60Hz, 120Hz, or 144Hz.
    const LERP_RATE_PER_60FPS_FRAME = 0.075;
    let lastFrameTime = 0;

    function loop(now: number) {
      if (!alive) return;
      if (ready && !reduce) {
        // Guard the very first call (lastFrameTime still 0) and any long
        // gap (e.g. the tab was backgrounded) so dt can't blow up into a
        // huge one-off jump — clamp to a 4-frame-at-60Hz window.
        const dt = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.064) : 1 / 60;
        lastFrameTime = now;
        const rate = 1 - Math.pow(1 - LERP_RATE_PER_60FPS_FRAME, dt * 60);
        const prevSmoothP = smoothP;
        smoothP += (targetP - smoothP) * rate;
        if (Math.abs(targetP - smoothP) < 0.0002) smoothP = targetP;

        // Skip the canvas repaint entirely once smoothP has stopped moving
        // and nothing else forces a fresh frame (a resize/bitmap-decode
        // just completed). This is the fix for the actual, always-on paint
        // cost: drawAt() is a full canvas clear plus up to 4 drawImage
        // calls, and it used to run on every rAF tick unconditionally —
        // including while fully settled (scroll stopped) or while the user
        // is scrolling through a section far below the hero, since this
        // component never unmounts. applyUI() still runs whenever smoothP
        // is genuinely moving (its writes are opacity/transform only, far
        // cheaper than a canvas repaint, so no need to gate it as
        // aggressively) but is likewise skipped once nothing changed.
        const changed = smoothP !== prevSmoothP || forceRedraw;
        if (changed) {
          drawAt(smoothP);
          applyUI(smoothP);
          forceRedraw = false;
        }
      }
      rafId = requestAnimationFrame(loop);
    }

    function boot() {
      ready = true;
      loader.classList.add("hide");
      resize();
      onScroll();
      applyUI(smoothP);
      drawAt(smoothP);

      (([".eyebrow", "h1", ".sub", ".cta"] as const)).forEach((sel, i) => {
        const el = hero.querySelector<HTMLElement>(sel);
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition =
          "opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)";
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 220 + i * 140);
      });

      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 1s ease .1s, transform 1s ease .1s";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 900);

      rafId = requestAnimationFrame(loop);
    }

    FRAMES.forEach((src, i) => {
      const im = new Image();
      images[i] = im;
      im.onload = im.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT && alive) boot();
      };
      im.src = src;
    });

    // Debounced: resize() writes canvas.width/height (layout-triggering)
    // then immediately reads stage.offsetTop/offsetHeight back inside
    // measure() — a read-after-write in the same call, which forces a
    // synchronous reflow. That's fine for a single resize, but "resize"
    // events can fire in rapid bursts (dragging a window edge, toggling
    // devtools, a mobile orientation change with its own visualViewport
    // churn) — without debouncing, each burst tick would force another
    // synchronous layout read immediately after the previous tick's write,
    // i.e. the same read/write-interleaved reflow pattern the scroll path
    // was already fixed to avoid, just on the resize path instead. 120ms
    // comfortably absorbs a drag/orientation-change burst while still
    // feeling instant for a single deliberate resize.
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
      }, 120);
    };

    addEventListener("resize", onResize);
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      removeEventListener("resize", onResize);
      removeEventListener("scroll", onScroll);
      // Each ImageBitmap holds its own decoded pixel buffer until closed —
      // release them explicitly on unmount rather than waiting on GC, and
      // bump the generation so any decodeBitmaps() still in flight discards
      // its result instead of installing bitmaps for an unmounted instance.
      bitmapGeneration++;
      bitmaps.forEach((b) => b?.close());
      bitmaps = [];
    };
  }, []);

  return (
    <div className="veloura">
      <div className="stage" ref={stageRef}>
        <div className="viewport">
          <canvas id="seq" ref={canvasRef} />
          <div className="veil" />

          <div className="loader" ref={loaderRef}>
            <div className="ring" />
            <p>LOADING EXPERIENCE</p>
          </div>

          <div className="hero" ref={heroRef}>
            <div className="eyebrow">ABDUL-SALAM CONSTRUCTION PRESENTS</div>
            <h1>
              Abdul-Salam <em>Construction</em>
            </h1>
            <p className="sub">
              Turnkey residential construction in Bhadohi — from foundation to key handover.
            </p>
            <button className="cta">
              Get Your Free Quote
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path
                  d="M1 6h17M13 1l5 5-5 5"
                  stroke="#f6f3ee"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="scroll-hint" ref={hintRef} style={{ display: "none" }}>
            <span className="dot" /> SCROLL TO BUILD
          </div>

          <div className="card" ref={cardRef} style={{ display: "none" }}>
            <p>
              A refined residential landmark with sculpted architecture, luminous
              interiors, panoramic views and a quiet sense of luxury.
            </p>
            <div className="explore">
              EXPLORE THE VISION
              <span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 11L11 3M11 3H5M11 3v6"
                    stroke="#f6f3ee"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="reveal" ref={revealRef}>
            <div className="k">NOW COMPLETE</div>
            <h2>
              Welcome to <em>Abdul-Salam Construction</em>
            </h2>
          </div>

          <div className="scrub">
            <i ref={scrubRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
