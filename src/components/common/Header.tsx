import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Heart, User } from 'lucide-react';
import gsap from 'gsap';
import { Logo } from './Logo';
import { Button } from './Button';
import { NAVIGATION_ITEMS, COMPANY_DATA } from '../../data/companyData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  // Only the home page has the full-bleed Hero underneath — there the header
  // overlays it as a fixed light frosted-glass bar; every other page keeps
  // its normal sticky, opaque header. Both use the same light bar + ink-text
  // styling (see the bar's className below), so the logo/nav/CTA always
  // read as one connected unit instead of the logo needing its own card.
  const isHomePage = currentPath === '/' || currentPath === '';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for sticky header styling. Lenis re-fires the
  // native `scroll` event on every one of its own rAF ticks while scrolling,
  // so this listener can be called dozens of times per second — rAF-batch it
  // to at most once per painted frame, and only touch React state on the
  // actual boundary crossing, so a full Header re-render never competes with
  // Hero's canvas redraw and Lenis's own rAF loop for the same frame budget.
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        if (next !== lastScrolled) {
          lastScrolled = next;
          setIsScrolled(next);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = mobileDrawerRef.current;
    if (!el) return;
    if (mobileMenuOpen) {
      // Animating to a measured pixel height, not GSAP's `height: 'auto'`.
      // The drawer sits in-flow inside a fixed/sticky <header> (it needs to
      // actually grow the header's box to reveal itself, so switching to a
      // compositor-only transform like scaleY isn't safe here — the element
      // would keep occupying its full natural height in layout while
      // visually scaled to 0, which is worse). But 'auto' as the tween
      // target forces GSAP to re-resolve the natural height via a fresh
      // layout read on every single animation frame for the whole 0.3s,
      // since 'auto' has no fixed number to interpolate toward. Reading
      // `scrollHeight` ONCE here (a single forced reflow, same cost class
      // as the click's own re-render that already just happened) and
      // animating to that literal pixel value instead lets GSAP interpolate
      // a plain number — still a layout-triggering property per frame, but
      // without the repeated "what is auto right now" re-measurement, which
      // was the more expensive part of the pattern DevTools flagged.
      const targetHeight = el.scrollHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: targetHeight, opacity: 1, duration: 0.3, ease: 'power2.out', clearProps: 'height' }
      );
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`${isHomePage ? 'fixed z-[9999]' : 'sticky z-50'} top-0 left-0 right-0 w-full`}
    >
      {/* Main header — a light frosted-glass bar at all times (home page
          included). Previously the home page used a fully transparent bar
          with white text so it blended into the Hero photo, but that made
          the (necessarily light-backed) logo look like a disconnected card
          floating on top of it — nothing else in the bar shared its
          background. A single light bar lets the logo, nav links, icons
          and CTA all read as one connected unit, on every page. */}
      <div
        className={`transition-all duration-300 w-full ${
          !isHomePage
            ? 'bg-[var(--canvas)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-[0_1px_2px_rgba(15,20,32,0.06)] py-2.5 sm:py-3'
            : 'bg-white/80 backdrop-blur-md border-b border-white/40 shadow-[0_2px_16px_rgba(10,16,32,0.12)] py-3 sm:py-3.5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-2 focus:outline-none group pr-2 sm:pr-4 min-w-0 flex-shrink"
            aria-label="Abdul Salam Construction Company Home"
          >
            <Logo
              variant="light"
              size="md"
              compactOnMobile
              className="transform transition-transform group-hover:scale-[1.01] min-w-0"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-3.5 py-2.5 text-xs uppercase tracking-wider font-bold transition-all rounded-full ${
                    isActive
                      ? 'text-[var(--brick)]'
                      : 'text-[var(--ink)] hover:text-[var(--brick)] hover:bg-[var(--canvas-alt)]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-[var(--brick)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: wishlist + account icons, then solid clay pill CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenConsultationModal}
              aria-label="Saved projects"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer text-[var(--ink-soft)] hover:text-[var(--brick)] hover:bg-[var(--canvas-alt)]"
            >
              <Heart className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={onOpenQuoteModal}
              aria-label="Your account"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer text-[var(--ink-soft)] hover:text-[var(--brick)] hover:bg-[var(--canvas-alt)]"
            >
              <User className="w-4.5 h-4.5" />
            </button>
            <Button variant="primary" size="sm" onClick={onOpenConsultationModal}>
              <Phone className="w-3.5 h-3.5 mr-2" />
              <span>Book Consultation</span>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenQuoteModal}
            >
              Quote
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 focus:outline-none rounded-full transition-colors text-[var(--ink-soft)] hover:text-[var(--brick)] hover:bg-[var(--canvas-alt)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="lg:hidden bg-[var(--canvas)] border-b border-[var(--line)] shadow-[0_20px_50px_rgba(15,20,32,0.12)] overflow-hidden"
        >
          <div className="px-4 pt-3 pb-6 space-y-1 divide-y divide-[var(--line)] max-h-[80vh] overflow-y-auto">
            <div className="py-2 space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(item.href);

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`block px-3.5 py-3 text-xs uppercase tracking-wider font-bold rounded-xl ${
                      isActive
                        ? 'text-[var(--brick)] bg-[var(--canvas-alt)]'
                        : 'text-[var(--ink)] hover:bg-[var(--canvas-alt)]'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Mobile CTA Buttons & Office Info */}
            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full justify-center"
              >
                GET A FREE QUOTE
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultationModal();
                }}
                className="w-full justify-center text-xs"
              >
                REQUEST SITE CONSULTATION
              </Button>

              <div className="text-center pt-2 text-xs text-[var(--ink-soft)]">
                <p className="font-semibold text-[var(--ink)]">Office Location:</p>
                <p>{COMPANY_DATA.address.fullAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
