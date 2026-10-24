import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'asc-preloader-shown';

/**
 * First-load-only preloader: full-screen ink panel with a tabular counter
 * 00→100 and a clay progress line, splitting into two curtain halves on
 * completion. Shown once per session via sessionStorage. Skips straight
 * through (no animation) under reduced-motion.
 */
export const Preloader: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Computed once per fiber (lazy initializer), so it survives React
  // StrictMode's dev-only effect mount->cleanup->remount on the same
  // instance — unlike reading sessionStorage inside the effect, which
  // the *first* pass would already mark as "shown" before the *second*
  // (kept) pass re-reads it and wrongly skips restarting the rAF loop
  // that the first pass's cleanup just cancelled, leaving progress at 0.
  const isFirstLoadRef = useRef<boolean | null>(null);
  if (isFirstLoadRef.current === null) {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // sessionStorage unavailable (privacy mode etc.) — just show it once per load
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* noop */
    }
    isFirstLoadRef.current = !alreadyShown;
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFirstLoadRef.current || reducedMotion) {
      return;
    }

    setShouldRender(true);

    const start = performance.now();
    const durationMs = 1400;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  // Curtain split animation, driven once `exiting` flips true.
  useEffect(() => {
    if (!exiting) return;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!top || !bottom) {
      setDone(true);
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => setDone(true)
    });
    tl.to(top, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0);
    tl.to(bottom, { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, 0);
  }, [exiting]);

  if (!shouldRender || done) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--ink)] flex items-end justify-center overflow-hidden"
      >
        <PreloaderContent progress={progress} />
      </div>
      <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--ink)]" />
    </div>
  );
};

const PreloaderContent: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="pb-6 flex flex-col items-center gap-4 translate-y-1/2">
    <span
      className="font-heading text-6xl sm:text-7xl text-[var(--canvas)] tabular-nums tracking-tight"
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {String(progress).padStart(2, '0')}
    </span>
    <div className="w-40 sm:w-56 h-px bg-[var(--ink-soft)] relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[var(--brick)]"
        style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
      />
    </div>
  </div>
);
