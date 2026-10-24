import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll-reveal hook — ONE ScrollTrigger per container, animating a
 * batch of child elements together (staggered) instead of one independent
 * trigger per element. This is the deliberate replacement for the previous
 * Framer Motion `whileInView` pattern, where every card/step in a section
 * ran its own animation loop and all fired at once when the section entered
 * view, competing with Hero's canvas redraw and the Lenis rAF loop for the
 * same frame budget.
 *
 * "Quick snap" treatment (v3 — replaced two rejected ideas: a clip-path
 * mask-wipe that read as gimmicky/childish, then a blur-to-sharp fade that
 * read as too slow/heavy). This version is deliberately minimal: a short
 * fade + small rise, fast duration, no filter/mask — the fastest-feeling,
 * least fussy option, closer to how Linear/Stripe-style sites reveal
 * content (content just crisply appears, barely any wait). Only
 * `opacity`/`transform` are animated — both compositor-only, no paint or
 * layout cost, cheaper even than the blur version.
 *
 * Usage: attach `ref` to the section container, give each element that
 * should reveal a `data-reveal` attribute (or pass a custom `selector`).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { stagger?: number; y?: number; duration?: number; selector?: string; ease?: string } = {}
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = el.querySelectorAll<HTMLElement>(options.selector ?? '[data-reveal]');
    if (targets.length === 0) return;

    if (reduce) {
      targets.forEach((t) => {
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        opacity: 0,
        y: options.y ?? 12,
        willChange: 'transform, opacity'
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.4,
        ease: options.ease ?? 'power2.out',
        stagger: options.stagger ?? 0.05,
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    }, el);

    return () => ctx.revert();
  }, [options.stagger, options.y, options.duration, options.selector, options.ease]);

  return ref;
}
