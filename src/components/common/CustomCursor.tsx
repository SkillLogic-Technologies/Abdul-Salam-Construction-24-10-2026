import React, { useEffect, useRef, useState } from 'react';

/**
 * Two-element custom cursor (§5.1): an 8px ink dot that follows instantly,
 * and a 40px ring (1px ink) that follows with lerp ~0.15, scaling to 64px
 * and filling brick at 12% opacity over interactive elements.
 * Desktop-only (>=1024px, fine pointer), and fully inert on touch or
 * reduced-motion — the native cursor is left alone in both cases.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || !wide || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('asc-custom-cursor');

    // Self-stopping rAF loop: previously ran requestAnimationFrame(tick)
    // unconditionally for as long as the page was open, regardless of
    // whether the mouse had moved, whether the ring had already caught up
    // to it, or whether the user was scrolling through an unrelated section
    // — a per-frame main-thread callback with no visibility/idle gate at
    // all. That's precisely the "one continuous unbroken purple Animations
    // bar across the whole recording" signature: unlike Hero.tsx's canvas
    // loop (scoped to that section actually being mounted and doing real
    // per-frame decode/composite work) or the parallax ScrollTriggers
    // (scrub-driven, idle whenever scroll position isn't changing), this
    // loop had no stop condition whatsoever. Now the loop exits once the
    // ring has visually converged to the pointer (< 0.05px remaining, i.e.
    // sub-pixel — not perceptible) and is restarted only by the next real
    // mousemove, so it's actually idle — not just cheap — whenever the
    // cursor isn't moving, including for the entire duration of any scroll
    // the user does without also moving the mouse.
    let looping = false;

    const tick = () => {
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      ring.current.x += dx * 0.15;
      ring.current.y += dy * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        looping = false;
        return;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (looping) return;
      looping = true;
      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      startLoop();
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.documentElement.classList.remove('asc-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--ink)] pointer-events-none"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`fixed top-0 left-0 z-[9998] rounded-full border pointer-events-none transition-[width,height,background-color,border-color] duration-200 ease-out ${
          hovering
            ? 'w-16 h-16 -ml-8 -mt-8 border-[var(--brick)] bg-[var(--brick)]/[0.12]'
            : 'w-10 h-10 -ml-5 -mt-5 border-[var(--line)] bg-transparent'
        }`}
      />
    </>
  );
};
