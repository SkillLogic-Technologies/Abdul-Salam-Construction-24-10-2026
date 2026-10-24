import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenConsultationModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // rAF-batched + change-only: Lenis re-fires the native `scroll` event on
    // every one of its own animation-frame ticks, so an unthrottled listener
    // here would re-render this component dozens of times a second while the
    // user scrolls — competing with Lenis's own rAF loop for the same frame
    // budget and reading back as scroll jank/stutter, not just a wasted render.
    let ticking = false;
    let lastShown = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 350;
        if (next !== lastShown) {
          lastShown = next;
          setShowBackToTop(next);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || !showBackToTop) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, [showBackToTop]);

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    // Smaller + pulled in on phones (bottom-20/right-4 vs bottom-24/right-6)
    // so this button's footprint, stacked right above ChatSupport's own
    // fixed launcher at the same corner, covers less of whatever content
    // scrolls underneath it — the two together were occupying a fairly
    // large permanently-visible chunk of the one corner on narrow screens.
    <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {showBackToTop && (
        <button
          ref={btnRef}
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 sm:p-3.5 bg-[var(--ink)] hover:bg-[var(--brick)] text-[var(--canvas)] transition-all duration-200 hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brick)] rounded-full shadow-[0_20px_60px_-20px_rgba(15,20,32,0.4)]"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
};
