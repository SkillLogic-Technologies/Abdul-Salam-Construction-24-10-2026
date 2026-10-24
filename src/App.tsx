import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { QuoteModal } from './components/modals/QuoteModal';
import { ConsultationModal } from './components/modals/ConsultationModal';
import { SEOHelmet } from './components/common/SEOHelmet';
import { ChatSupport } from './components/chat/ChatSupport';
import { SmoothScroll } from './components/common/SmoothScroll';
import { Preloader } from './components/common/Preloader';
import Hero from "./Hero";

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndividualServicePage } from './pages/IndividualServicePage';
import { PackagesPage } from './pages/PackagesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GetAQuotePage } from './pages/GetAQuotePage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [defaultQuotePackage, setDefaultQuotePackage] = useState<string | undefined>(undefined);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lightweight page-switch fade — a single GSAP tween on the page
  // container (transform+opacity only), not a per-element stagger, so
  // route changes never compete with in-flight scroll-reveal triggers.
  // clearProps: 'transform' removes the inline `transform` GSAP leaves on
  // this element once the tween settles at y:0 — a non-"none" transform on
  // ANY ancestor turns `position: fixed` descendants into `position:
  // absolute`-relative-to-that-ancestor instead of the viewport (CSS
  // containing-block spec), which silently broke every `pin: true`
  // ScrollTrigger section nested under this ref (e.g. ServicesPage's
  // ServiceFrameSequence) — pinned canvases drifted increasingly far off
  // the top of the viewport the deeper the user scrolled, since "top: 0"
  // was being measured against mainRef's own (scrolling-away) position,
  // not the real viewport. Hero.tsx's own fixed canvas never hit this
  // because <Hero /> renders as a sibling of this ref, not nested inside it.
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
    );
  }, [currentPath]);

  // Route through the Lenis smooth-scroll engine when it's mounted (desktop,
  // no reduced-motion), falling back to native smooth-scroll otherwise.
  const smoothScrollTo = (target: string | HTMLElement, offset = 0) => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset });
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) smoothScrollTo(el);
      return;
    }

    const [pathname, hash] = href.split('#');
    const targetPath = pathname || '/';

    window.history.pushState({}, '', href);
    setCurrentPath(targetPath);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) smoothScrollTo(el);
      }, 100);
    } else {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  };

  const handleOpenQuoteModal = (packageId?: string) => {
    setDefaultQuotePackage(packageId);
    setIsQuoteModalOpen(true);
  };

  const handleOpenConsultationModal = () => {
    setIsConsultationModalOpen(true);
  };

  // Route Resolver
  const renderCurrentPage = () => {
    const cleanPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    if (cleanPath === '' || cleanPath === '/') {
      return (
        <HomePage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/services') {
      return (
        <ServicesPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      return (
        <IndividualServicePage
          slug={slug}
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/packages') {
      return (
        <PackagesPage
          onNavigate={navigateTo}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/projects') {
      return (
        <ProjectsPage
          onNavigate={navigateTo}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath.startsWith('/projects/')) {
      const slug = cleanPath.replace('/projects/', '');
      return (
        <ProjectDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/about') {
      return (
        <AboutPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/contact') {
      return (
        <ContactPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/get-a-quote') {
      return (
        <GetAQuotePage
          onNavigate={navigateTo}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    // Default fallback to Home
    return (
      <HomePage
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenConsultationModal={handleOpenConsultationModal}
      />
    );
  };

  const isHomePage = (currentPath.toLowerCase().replace(/\/$/, '') || '/') === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--canvas)] text-[var(--ink)] font-sans selection:bg-[var(--brick)]/20 selection:text-[var(--ink)]">
      {/* Scroll-driven construction image-sequence hero — home page only */}
      {isHomePage && <Hero />}

      {/* First-load-only curtain preloader */}
      <Preloader />

      {/* Site-wide inertial smooth scroll + GSAP ScrollTrigger integration */}
      <SmoothScroll />

      {/* Global paper-grain overlay — fixed, pointer-none, sits above everything */}
      <div className="fixed inset-0 z-[9997] bg-paper-grain pointer-events-none" aria-hidden="true" />

      {/* Dynamic SEO & Breadcrumbs Route Manager */}
      <SEOHelmet currentPath={currentPath} />

      {/* Global Navigation Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenConsultationModal={handleOpenConsultationModal}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full overflow-hidden">
        <div key={currentPath} ref={mainRef} className="w-full">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Floating Action Buttons (Scroll to Top) */}
      <FloatingActions onOpenConsultationModal={handleOpenConsultationModal} />

      {/* 24/7 Intelligent Construction Chat Support & WhatsApp Lead Bridge */}
      <ChatSupport />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPackageId={defaultQuotePackage}
      />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
