import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered count-up for a single stat number (e.g. "15+", "20+",
 * "75,000+"). Animates a plain JS value via GSAP and writes it to the
 * element's `textContent` on every tick — never touches a CSS property, so
 * there's no layout/paint cost beyond a text-node update, and nothing here
 * needs `will-change`/layer promotion the way a transform/opacity reveal
 * does.
 *
 * `once: true` on the ScrollTrigger (same pattern as useScrollReveal.ts) —
 * GSAP destroys the trigger after it fires once, so it stops consuming any
 * per-frame work entirely rather than just visually finishing; there is no
 * rAF loop left running once the count finishes or the trigger never fires
 * (element scrolled past without entering view keeps the trigger alive but
 * idle — GSAP's own ScrollTrigger bookkeeping, not a loop this hook adds).
 *
 * `end` (the numeric target) is parsed from the suffix/prefix automatically
 * so the visible label can carry its own formatting (e.g. "75,000+",
 * "20+", "100%") — pass the target as the initial rendered text via the
 * `end` option's sibling `formatter`, or simply give the element that final
 * string as its literal children and this hook re-renders it progressively
 * from 0 using the same prefix/suffix.
 *
 * Usage: `const ref = useCountUp<HTMLSpanElement>({ end: 20, suffix: '+' });`
 * attach `ref` to the element whose text content should count up — its
 * initial rendered text is irrelevant, this hook overwrites it starting
 * from 0 the moment the trigger fires (or shows the final value immediately
 * if reduced motion is on).
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(options: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Formats the in-progress/final number, e.g. toLocaleString for commas. */
  format?: (value: number) => string;
}) {
  const ref = useRef<T | null>(null);
  const { end, duration = 1.4, prefix = '', suffix = '' } = options;
  const format = options.format ?? ((v: number) => Math.round(v).toString());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.textContent = `${prefix}${format(end)}${suffix}`;
      return;
    }

    el.textContent = `${prefix}${format(0)}${suffix}`;

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          el.textContent = `${prefix}${format(counter.value)}${suffix}`;
        }
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration, prefix, suffix, format]);

  return ref;
}
