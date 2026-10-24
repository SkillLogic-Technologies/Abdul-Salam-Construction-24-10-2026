import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll-linked parallax — the "Alex Bender"-style depth cue the
 * site was missing: elements move at a slightly different rate than the
 * page scroll itself (rather than only fading/rising in once and then
 * sitting static), giving a layered depth feel as the visitor scrolls.
 * Deliberately restrained per explicit feedback ("bahut jada wala nahi") —
 * `strength` defaults to a small px range, not the dramatic full-bleed
 * background-parallax some portfolio sites use.
 *
 * Uses GSAP ScrollTrigger's `scrub: true` (continuously tied to scroll
 * position, not a one-shot reveal) rather than the batched `once: true`
 * reveal in useScrollReveal.ts — this is a fundamentally different
 * animation type (ongoing, position-driven) so it's a separate hook rather
 * than an option on that one. Only `transform` (translateY) is animated —
 * compositor-only, same GPU-cheap guarantee as the rest of this codebase's
 * scroll-driven animations, and `scrub: true` ties directly to
 * ScrollTrigger's own scroll-position tracking (already kept in lockstep
 * with Lenis via `lenis.on('scroll', ScrollTrigger.update)` in
 * SmoothScroll.tsx) rather than adding a second scroll listener.
 *
 * Deliberately used sparingly — only 3 call sites site-wide (HomePage's
 * newsletter band image, ProjectDetailPage's hero image, IndividualServicePage's
 * hero image), each the only parallaxed element on its page, so at most ONE
 * parallax ScrollTrigger is ever active in a given viewport at a time. Do not
 * add more without checking this stays true — several scrubbed transforms
 * live-updating in the same viewport is what actually chokes the compositor,
 * not any one of them alone.
 *
 * `will-change: transform` is applied only for the ScrollTrigger's own active
 * window (from just before it enters view to just after it leaves, via
 * onEnter/onLeave/onEnterBack/onLeaveBack) rather than left on permanently —
 * a layer promoted for the element's entire lifetime is a standing compositor
 * cost paid even while the element sits unchanging off-screen or mid-scroll
 * after its scrub range has already finished.
 *
 * Usage: `const ref = useParallax<HTMLDivElement>({ strength: 40 });`
 * attach `ref` to the element that should shift (often an <img> or a
 * decorative wrapper around one) — moves it up to `strength` px in each
 * direction as its container crosses the viewport.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: { strength?: number; disabled?: boolean } = {}
) {
  const ref = useRef<T | null>(null);
  const strength = options.strength ?? 32;

  useEffect(() => {
    const el = ref.current;
    if (!el || options.disabled) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const setWillChange = () => {
      el.style.willChange = 'transform';
    };
    const clearWillChange = () => {
      el.style.willChange = 'auto';
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -strength },
        {
          y: strength,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onEnter: setWillChange,
            onEnterBack: setWillChange,
            onLeave: clearWillChange,
            onLeaveBack: clearWillChange
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
      clearWillChange();
    };
  }, [strength, options.disabled]);

  return ref;
}
