import React, { useEffect, useRef, useState } from 'react';
import {
  SERVICES_DATA,
  FAQ_DATA
} from '../data/companyData';
import { INDIVIDUAL_SERVICES_DATA } from '../data/servicePagesData';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ServiceFrameSequence } from '../components/common/ServiceFrameSequence';
import {
  Check,
  Clock,
  HelpCircle,
  HardHat,
  ArrowRight,
  Layers,
  HousePlus,
  DraftingCompass,
  Construction,
  Factory,
  Layers3,
  PaintRoller,
  type LucideIcon
} from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal';

// 8-frame construction-progress sequences, one per SERVICES_DATA slug —
// generated to match each service's own scope (e.g. "structural" shows
// footing -> rebar -> shuttering -> pour -> cured slab, not a generic
// house build). Filenames are ordered 01-08 per service in
// public/frames/services/. commercial/structural/finishing use a premium
// Indian-architecture concept (glass towers, marble interiors, editorial
// lighting) generated separately from the first 3 services' rural-site
// aesthetic — ServiceFrameSequence falls back to each service's static
// `image` only if a prefix is missing here or its frames 404.
const SERVICE_SEQUENCE_PREFIX: Record<string, string> = {
  'residential-house-construction': 'residential',
  'new-home-construction': 'new-home',
  'renovation-remodeling': 'renovation',
  'commercial-construction': 'commercial',
  'structural-work': 'structural',
  'finishing-interior-work': 'finishing'
};

// Computed once at module scope (not inside the component/render), and the
// empty array for slugs with no sequence is the SAME shared reference every
// time (not a fresh `[]` per call) — ServiceFrameSequence's effect depends
// on `frames` by reference, so a new array identity on every render (e.g.
// from calling Array.from() inline in the .map() below) would re-run that
// effect — tearing down and recreating its ScrollTrigger — on every
// unrelated parent re-render (such as the scroll-spy's activeSlug updating
// while the user is mid-scroll through a pinned section), which is exactly
// what caused the pin to blank out partway through a scrub.
const EMPTY_FRAMES: string[] = [];
const SERVICE_FRAMES: Record<string, string[]> = Object.fromEntries(
  Object.entries(SERVICE_SEQUENCE_PREFIX).map(([slug, prefix]) => {
    const base = `${import.meta.env.BASE_URL}frames/services/`;
    return [slug, Array.from({ length: 8 }, (_, i) => `${base}${prefix}-0${i + 1}.jpg`)];
  })
);

function getServiceFrames(slug: string): string[] {
  return SERVICE_FRAMES[slug] ?? EMPTY_FRAMES;
}

// Only Residential keeps the full pinned/scroll-scrub cinematic treatment.
// The other 5 services render as plain static cards (image beside text, in
// normal document flow — no pin, no canvas, no ScrollTrigger) per explicit
// request to dial most of the page back from "cinematic" to "normal."
const CINEMATIC_SLUGS = new Set(['residential-house-construction']);

interface ServicesPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

// Same icon swap HomePage's "Explore Project Types" grid uses — each one
// reads as literally what the service is, rather than SERVICES_DATA's
// original generic Home/Compass/Hammer/Building2/Layers/Paintbrush set.
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Home: HousePlus,
  Compass: DraftingCompass,
  Hammer: Construction,
  Building2: Factory,
  Layers: Layers3,
  Paintbrush: PaintRoller
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const catGridRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal-cat]', stagger: 0.06, y: 16 });
  const railRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal-card]', stagger: 0.06, y: 16 });
  const faqRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });

  // Scroll-spy: highlights the currently-visible service in the category
  // grid and the floating dot-nav as the user scrolls through the pinned
  // detail sections below — one IntersectionObserver watching all section
  // tops, rather than a per-item listener, so this stays cheap regardless
  // of how many services exist.
  const [activeSlug, setActiveSlug] = useState(SERVICES_DATA[0]?.slug ?? '');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const detailBlockRef = useRef<HTMLDivElement>(null);
  // Gates the floating dot-nav: it's `position: fixed`, which isn't bounded
  // by its parent <section>, so without this it would stay pinned to the
  // viewport for the rest of the page (over the FAQ/CTA sections) instead
  // of disappearing once the services detail block scrolls out of view.
  const [showFloatingNav, setShowFloatingNav] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const block = detailBlockRef.current;
    if (!block) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingNav(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  const scrollToService = (slug: string) => {
    sectionRefs.current[slug]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* PAGE HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-14 sm:py-20 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <div className="vh-eyebrow">
            <HardHat className="w-3.5 h-3.5" />
            <span>End-to-End Construction Capabilities</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
            Our Construction Services
          </h1>

          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            From preliminary architectural 2D/3D floor layouts and deep foundation RCC civil framework to turnkey interior finishes and renovations across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.
          </p>
        </div>
      </section>

      {/* CATEGORY GRID — jumps straight to the matching detail section below.
          Replaces the removed header dropdown: this is now the one place
          all 6 service categories are browsable at a glance. */}
      <section className="py-12 sm:py-14 bg-[var(--canvas)] border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div
            ref={catGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {SERVICES_DATA.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.iconName] || Factory;
              return (
                <button
                  key={service.id}
                  type="button"
                  data-reveal-cat
                  onClick={() => scrollToService(service.slug)}
                  className={`group flex flex-col items-center text-center gap-2.5 p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                    activeSlug === service.slug
                      ? 'bg-[var(--canvas-alt)] border-[var(--brick)]/40 shadow-elevate'
                      : 'bg-[var(--canvas)] border-[var(--line)] hover:bg-[var(--canvas-alt)] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[var(--brick)]/10 text-[var(--brick)] group-hover:bg-[var(--brick)]/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[var(--ink)] leading-snug">
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES DETAILED SECTIONS — Residential keeps the full-bleed,
          pinned cinematic treatment (8-frame construction-progress
          sequence scrubbing via canvas + GSAP ScrollTrigger, see
          ServiceFrameSequence), while the other 5 services render as plain
          static cards in normal document flow per explicit request to dial
          most of the page back to "normal." A floating pill nav (desktop)
          tracks whichever cinematic service is active and jumps between
          them — only Residential currently, but written to scale if more
          services rejoin the cinematic set later. */}
      <section ref={detailBlockRef} className="relative w-full">
        {/* Floating jump-nav — desktop only, overlays the pinned sections.
            Only rendered while the detail block itself is in view (see
            showFloatingNav) since `fixed` positioning isn't bounded by the
            parent <section>, and only lists cinematic services since the
            static cards below have no pin/scroll-spy to jump between. */}
        {showFloatingNav && (
        <nav className="hidden lg:flex flex-col gap-1 fixed right-6 top-1/2 -translate-y-1/2 z-40">
          {SERVICES_DATA.filter((service) => CINEMATIC_SLUGS.has(service.slug)).map((service) => {
            const isActive = activeSlug === service.slug;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToService(service.slug)}
                aria-label={service.title}
                className="group relative flex items-center justify-end cursor-pointer"
              >
                <span
                  className={`mr-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap bg-[var(--ink)]/90 text-white backdrop-blur-sm transition-all duration-200 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
                  }`}
                >
                  {service.title}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive ? 'w-2.5 h-2.5 bg-[var(--brick)]' : 'w-2 h-2 bg-white/50 group-hover:bg-white/80'
                  }`}
                />
              </button>
            );
          })}
        </nav>
        )}

        {SERVICES_DATA.map((service, index) => {
          const Icon = SERVICE_ICON_MAP[service.iconName] || Factory;
          const isCinematic = CINEMATIC_SLUGS.has(service.slug);

          if (!isCinematic) {
            return (
              <div
                key={service.id}
                id={service.slug}
                ref={(el) => {
                  sectionRefs.current[service.slug] = el;
                }}
                className="scroll-mt-28 bg-[var(--canvas)] border-b border-[var(--line)] py-10 sm:py-14"
              >
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5">
                      <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-[var(--line)]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--brick)]/10 text-[var(--brick)]">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--ink-soft)]">
                          Service 0{index + 1} &middot; Comprehensive Scope
                        </span>
                      </div>

                      <h2 className="font-heading font-black text-2xl sm:text-4xl text-[var(--ink)] tracking-tight leading-tight">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed max-w-xl">
                        {service.fullDescription}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--ink)]">
                        {service.deliverables.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {service.keyFeatures.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-4 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)] hover:bg-[var(--canvas)] hover:-translate-y-0.5 transition-all duration-150"
                          >
                            <p className="font-heading font-extrabold text-xs text-[var(--ink)]">
                              {feat.title}
                            </p>
                            <p className="text-[11px] text-[var(--ink-soft)] mt-1 leading-snug">
                              {feat.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-soft)]">
                          <Clock className="w-4 h-4 text-[var(--brick)]" />
                          <span>Typical Timeline: <strong className="text-[var(--ink)]">{service.timeline}</strong></span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          showArrow
                          onClick={onOpenQuoteModal}
                        >
                          Get Quote For This Service
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          const frames = getServiceFrames(service.slug);
          return (
            <div
              key={service.id}
              id={service.slug}
              ref={(el) => {
                sectionRefs.current[service.slug] = el;
              }}
              className="scroll-mt-28"
            >
              <ServiceFrameSequence frames={frames} fallbackImage={service.image}>
                {/* Cinematic veil — matches Hero's left/bottom gradient
                    treatment so overlaid text stays legible against any
                    frame's brightness. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(8,10,14,.78) 0%, rgba(8,10,14,.35) 45%, rgba(8,10,14,.05) 75%), linear-gradient(0deg, rgba(8,10,14,.75) 0%, rgba(8,10,14,0) 38%)'
                  }}
                />

                <div className="relative z-10 h-full w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col justify-end sm:justify-center py-10 sm:py-0">
                  <div className="max-w-2xl space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                        Service 0{index + 1} &middot; Comprehensive Scope
                      </span>
                    </div>

                    <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.02]">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                      {service.fullDescription}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/85 pt-1">
                      {service.deliverables.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                        <Clock className="w-4 h-4 text-[var(--brick)]" />
                        <span>Typical Timeline: <strong className="text-white">{service.timeline}</strong></span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        showArrow
                        onClick={onOpenQuoteModal}
                      >
                        Get Quote For This Service
                      </Button>
                    </div>
                  </div>
                </div>
              </ServiceFrameSequence>

              {/* Key features — sits below the pinned cinematic section in
                  normal flow, keeping the frosted frame-sequence focused on
                  the scope/deliverables and deferring the feature-tile grid
                  to a calmer, static beat right after each pin releases. */}
              <div className="bg-[var(--canvas)] border-b border-[var(--line)] py-8 sm:py-10">
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {service.keyFeatures.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)] hover:bg-[var(--canvas)] hover:-translate-y-0.5 transition-all duration-150"
                      >
                        <p className="font-heading font-extrabold text-xs text-[var(--ink)]">
                          {feat.title}
                        </p>
                        <p className="text-[11px] text-[var(--ink-soft)] mt-1 leading-snug">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* TECHNICAL BREAKDOWN DIRECTORY */}
      <section className="py-12 bg-[var(--canvas)] border-y border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="vh-eyebrow">
              <Layers className="w-3.5 h-3.5" />
              <span>Quotation-Verified Technical Workscopes</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
              Individual Construction Works & Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
              Explore itemized engineering scopes, mix ratios, approved brands, package comparisons, and exclusions for each specific civil and finishing work derived directly from our official construction quotations.
            </p>
          </div>

          <div
            ref={railRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {Object.values(INDIVIDUAL_SERVICES_DATA).map((serv) => (
              <div
                key={serv.slug}
                data-reveal-card
                onClick={() => onNavigate(`/services/${serv.slug}`)}
                className="p-5 bg-[var(--canvas-alt)] rounded-xl border border-[var(--line)] shadow-elevate hover:bg-[var(--canvas)] cursor-pointer flex flex-col justify-between group flex-shrink-0 w-[250px] sm:w-[270px] snap-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-[var(--canvas)] text-[var(--ink-soft)] rounded-md border border-[var(--line)]">
                      {serv.shortTitle}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--brick)]">
                      Detailed Specs
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[var(--ink)] group-hover:text-[var(--brick)] transition-colors leading-snug">
                    {serv.title}
                  </h3>
                  <p className="text-[11px] text-[var(--ink-soft)] line-clamp-2 leading-relaxed">
                    {serv.definition}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs text-[var(--ink)] font-bold">
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--brick)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELEVANT FAQ SNIPPET */}
      <section className="bg-[var(--canvas)] py-16 sm:py-20 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Questions Regarding Our Services"
            highlightWords={['Services']}
            description="Clear answers on our construction methodology, materials, and consultation steps."
          />

          <div className="space-y-4" ref={faqRef}>
            {FAQ_DATA.slice(0, 5).map((faq) => (
              <div
                key={faq.id}
                data-reveal
                className="p-6 bg-[var(--canvas-alt)] rounded-xl border border-[var(--line)] shadow-elevate hover:bg-[var(--canvas)]"
              >
                <h3 className="font-heading font-bold text-sm sm:text-base text-[var(--ink)] flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[var(--canvas-alt)] text-[var(--ink)] py-14 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
            Have a Specific Project or Blueprint in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] max-w-xl mx-auto leading-relaxed">
            Our site engineers are available for direct consultations across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj to evaluate your drawings and plot dimensions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenQuoteModal}
            >
              CALCULATE DETAILED ESTIMATE
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onOpenConsultationModal}
            >
              REQUEST SITE INSPECTION
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
