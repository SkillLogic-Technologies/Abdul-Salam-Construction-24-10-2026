import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// A/B TOGGLE — flip this one constant to switch the entire site between
// Lenis-driven inertial smooth scroll and plain native browser scroll, to
// compare feel (e.g. testing whether a remaining micro-stutter is a Lenis
// artifact vs. native-scroll's own GPU-accelerated compositor path on
// high-refresh displays / strong hardware).
//
//   true  -> current behavior: Lenis owns scroll, feeds ScrollTrigger.
//   false -> Lenis is never instantiated. The browser's native scroll drives
//            everything: ScrollTrigger reads native window scroll directly
//            (its default behavior — it was never actually reading Lenis's
//            internal position; scrollerProxy() is what would be needed to
//            do that, and this codebase never calls it), Hero.tsx's own
//            scroll listener already reads native `scrollY` unconditionally
//            (it has no Lenis dependency either way), and gsap.ticker keeps
//            driving GSAP's own tweens/animations exactly as before — only
//            the thing that owned *scroll smoothing* is removed.
//
// No other file needs to change for this toggle — everything downstream
// (ScrollTrigger triggers, useParallax, useScrollReveal, Hero.tsx) already
// works off whichever scroll position is actually moving, native or Lenis.
const USE_LENIS_SMOOTH_SCROLL = false;

/**
 * Site-wide inertial smooth scroll, driving GSAP's ScrollTrigger through the
 * standard Lenis + GSAP integration pattern instead of fighting it:
 *
 *   - Lenis owns the single rAF loop (added to `gsap.ticker` so both engines
 *     share one frame callback instead of racing two independent rAF loops).
 *   - `lenis.on('scroll', ScrollTrigger.update)` forces ScrollTrigger to
 *     re-check its triggers on every Lenis tick, so pinned/scrubbed
 *     animations stay responsive during the smoothed scroll. Note this does
 *     NOT make ScrollTrigger read Lenis's internal position as its source of
 *     truth — ScrollTrigger always reads native `window` scroll for its own
 *     start/end math (that would require `ScrollTrigger.scrollerProxy()`,
 *     which this codebase never calls); Lenis just also happens to move the
 *     real native scroll position as it animates, so there's only ever one
 *     underlying scroll value either way.
 *   - `gsap.ticker.lagSmoothing(0)` disables GSAP's own lag-smoothing since
 *     Lenis already handles the easing — letting both smooth the same delta
 *     compounds into stutter instead of removing it.
 *
 * `lerp` (velocity-following, re-evaluated every frame) is used rather than
 * `duration`/`easing` (a fixed-length animation replayed from scratch on
 * every wheel tick) — duration-based easing feels heavy under continuous
 * scroll input because it keeps restarting a full animation curve; lerp
 * tracks the target continuously, which is what produces the snappy,
 * fluid feel real trackpad/wheel scrolling has on sites like apple.com.
 *
 * Performance note (why sections don't jank on scroll): every
 * scroll-triggered reveal in this codebase uses ONE ScrollTrigger per
 * section (batched/staggered internally by GSAP timelines), animating only
 * `transform`/`opacity` — never `filter: blur()` on multiple elements at
 * once, never layout-triggering properties. That keeps each scrolled-into
 * section to a single trigger recalculation instead of 10+ independent
 * `whileInView` observers firing simultaneously and competing with Hero's
 * canvas redraw loop for the same 16ms frame budget. This holds true
 * whether Lenis or native scroll is driving things (see toggle above).
 *
 * Fully disabled when the visitor prefers reduced motion — native scroll
 * takes over transparently since Lenis is simply never instantiated, and
 * ScrollTrigger animations still run (just without the smoothing layer).
 * Same code path as USE_LENIS_SMOOTH_SCROLL = false, just driven by a
 * different condition.
 */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !USE_LENIS_SMOOTH_SCROLL) {
      // Native scroll path: Lenis is never constructed. ScrollTrigger keeps
      // working exactly as it always has — it reads native window scroll by
      // default and was never wired to require Lenis's position specifically
      // (see the note above). gsap.ticker.lagSmoothing(0) is still set here
      // so GSAP's own tweens (reveals, parallax scrub, hover animations)
      // don't get an artificial catch-up jump after a long main-thread
      // stall, matching the Lenis path's behavior exactly.
      gsap.ticker.lagSmoothing(0);
      (window as any).__lenis = null;
      return;
    }

    const lenis = new Lenis({
      // lerp only — no duration/easing here. Lenis's two smoothing modes
      // (lerp: velocity-following, re-evaluated every frame vs.
      // duration+easing: a fixed-length curve replayed from scratch on every
      // wheel tick) are mutually exclusive; passing both makes Lenis
      // prioritize duration/easing internally, silently discarding lerp,
      // which is the "heavier"/less continuous feel under fast repeated
      // input. 0.1 is the tuned middle of the 0.08-0.12 buttery range —
      // enough smoothing to kill wheel-tick stepping, not so much that the
      // page feels like it's dragging behind the input.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Touch devices get native scroll rather than Lenis's synthetic touch
      // handling — touchscreens already have their own OS-level inertial
      // scroll physics tuned per-device, and layering Lenis's desktop-tuned
      // lerp on top of that fights the platform's own momentum curve instead
      // of complementing it. syncTouch defaults to false, but this is stated
      // explicitly since it was the one option most likely to get "helpfully"
      // re-enabled by a future edit.
      syncTouch: false
    });

    // Force ScrollTrigger to re-check its triggers on every Lenis tick, so
    // pinned/scrubbed triggers stay responsive during the smoothed scroll
    // rather than only updating on the native scroll events the browser
    // itself throttles/coalesces. This is a refresh-cadence nudge, not a
    // position source — see the docblock note above.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's own ticker (single shared rAF loop) instead of
    // a second independent requestAnimationFrame loop competing for frames.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor-link / scrollIntoView callers that want the smooth
    // engine to drive programmatic jumps (e.g. header nav, back-to-top), and
    // for Hero.tsx's own end-of-stage scroll pause (stop()/start()).
    (window as any).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return null;
};
