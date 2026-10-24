import React, { useState } from 'react';
import {
  HardHat,
  ShieldCheck,
  Clock,
  Building2,
  Check,
  ArrowRight,
  Star,
  MapPin,
  FileText as FileTextIcon,
  Heart,
  Ruler,
  Layers3,
  Quote,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Award,
  Compass,
  CheckCircle,
  HeartHandshake,
  Home,
  Hammer,
  Layers,
  Paintbrush,
  HousePlus,
  DraftingCompass,
  Construction,
  Factory,
  PaintRoller,
  ChevronLeft,
  ChevronRight,
  type LucideIcon
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { InstrumentPanelCard } from '../components/common/InstrumentPanelCard';
import { LocationCoverageCard } from '../components/common/LocationCoverageCard';
import { ImmersiveProjectCard } from '../components/common/ImmersiveProjectCard';
import { LiveEstimatorSection } from '../components/hero/LiveEstimatorSection';
import { PackageCard } from '../components/packages/PackageCard';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useFitOneLine } from '../lib/useFitOneLine';
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  PACKAGES_DATA,
  TESTIMONIALS_DATA,
  SERVICE_AREAS_DATA,
  WHY_CHOOSE_US,
  COMPANY_DATA
} from '../data/companyData';

interface HomePageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeProjectTab, setActiveProjectTab] = useState<'all' | 'residential' | 'commercial' | 'villas'>('all');
  const projectsRailRef = React.useRef<HTMLDivElement>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const pillarsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const typesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.04, y: 16 });
  const servicesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const projectsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.06 });
  const whyRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const testimonialsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const areasRef = useScrollReveal<HTMLDivElement>({ stagger: 0.02, y: 10 });

  // One-line auto-fit for each of this page's standalone <h2 class="vh-heading
  // vh-heading-size"> titles (the ones not going through SectionHeading,
  // which handles its own fit internally) — see useFitOneLine.ts.
  const exploreTypesHeadingRef = useFitOneLine<HTMLHeadingElement>();
  const featuredProjectsHeadingRef = useFitOneLine<HTMLHeadingElement>();
  const testimonialsHeadingRef = useFitOneLine<HTMLHeadingElement>();
  const areasHeadingRef = useFitOneLine<HTMLHeadingElement>();
  const newsletterHeadingRef = useFitOneLine<HTMLHeadingElement>();

  const filteredProjects = activeProjectTab === 'all'
    ? PROJECTS_DATA.slice(0, 5)
    : PROJECTS_DATA.filter((p) => {
        if (activeProjectTab === 'residential') return p.category.toLowerCase().includes('residential');
        if (activeProjectTab === 'commercial') return p.category.toLowerCase().includes('commercial');
        if (activeProjectTab === 'villas') return p.category.toLowerCase().includes('villa') || p.category.toLowerCase().includes('renovation');
        return true;
      }).slice(0, 5);

  const scrollProjectsRail = (direction: 'prev' | 'next') => {
    const el = projectsRailRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-project-card]')?.clientWidth ?? 320;
    el.scrollBy({ left: direction === 'next' ? cardWidth + 24 : -(cardWidth + 24), behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 3500);
  };

  return (
    <div className="space-y-0 w-full overflow-x-hidden">
      {/* TRUST PILLARS BAR — "Live Instrument Panel" treatment: a slow
          discreet rotating dashed ring around each icon (pure CSS
          transform, always spinning, effectively free — no WebGL, no
          scroll/hover gate needed), a blue hairline + per-card 3D tilt on
          hover, and each pillar as its own standalone premium card (own
          border/shadow/hover-lift) — matching the treatment given to the
          Explore Project Types cards below, rather than 4 panels sharing
          one outer border with thin dividers. */}
      <section className="bg-[var(--canvas)] border-b border-[var(--line)] py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto" ref={pillarsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HardHat,
                title: 'Quality Materials',
                desc: 'Tested cement, Fe-550 TMT steel, and grade-A bricks.'
              },
              {
                icon: FileTextIcon,
                title: 'Transparent BOQ',
                desc: 'Itemized specifications with zero hidden surcharges.'
              },
              {
                icon: Clock,
                title: 'On-Time Handover',
                desc: 'Milestone-based project scheduling & daily reporting.'
              },
              {
                icon: ShieldCheck,
                title: 'Structural Warranty',
                desc: 'Engineered foundation and RCC core longevity guarantee.'
              }
            ].map((pillar, index) => (
              <InstrumentPanelCard key={index} index={index} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE PROJECT TYPES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[var(--canvas)] border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-10 sm:mb-12">
            <div className="vh-eyebrow justify-center">
              <span>What We Build</span>
            </div>
            <h2 ref={exploreTypesHeadingRef} className="vh-heading vh-heading-size">
              Explore Project Types
            </h2>
            <div className="vh-heading-rule" />
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink)] hover:text-[var(--brick)] transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" ref={typesRef}>
            {SERVICES_DATA.map((srv, idx) => {
              // Swapped for more specific/distinctive icons than the
              // original generic set (plain Home/Compass/Hammer/Building2/
              // Layers/Paintbrush) — each one now reads as literally what
              // the service is (a drafting compass for architectural
              // planning, a paint roller for finishing work, a factory for
              // commercial-scale builds) rather than a generic stand-in.
              const iconMap: Record<string, LucideIcon> = {
                Home: HousePlus,
                Compass: DraftingCompass,
                Hammer: Construction,
                Building2: Factory,
                Layers: Layers3,
                Paintbrush: PaintRoller
              };
              const SrvIcon = iconMap[srv.iconName] || Factory;
              const activeCount = PROJECTS_DATA.filter((p) =>
                srv.title.toLowerCase().includes(p.category.toLowerCase()) ||
                p.category.toLowerCase().includes(srv.title.toLowerCase().split(' ')[0].toLowerCase())
              ).length;
              const displayCount = activeCount > 0 ? activeCount : (idx % 4) + 2;

              return (
                <div key={srv.id} data-reveal>
                  <ImmersiveProjectCard
                    image={srv.image}
                    title={srv.title.replace(' Construction', '').replace(' & Interior Work', '').replace(' & Remodeling', '')}
                    activeCount={displayCount}
                    Icon={SrvIcon}
                    onClick={() => onNavigate(`/services#${srv.slug}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIVE CONSTRUCTION ESTIMATOR (moved out of hero, standalone section) */}
      <LiveEstimatorSection
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenConsultationModal={onOpenConsultationModal}
      />

      {/* CORE SERVICES SHOWCASE */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[var(--canvas)]">
        <div className="w-full max-w-[1920px] mx-auto">
          <SectionHeading
            badge="Our Construction Services"
            title="Engineered for Strength. Finished with Elegance."
            highlightWords={['Strength.', 'Elegance.']}
            description="We provide comprehensive end-to-end building services across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj, ensuring structural rigor and architectural refinement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={servicesRef}>
            {SERVICES_DATA.map((srv, idx) => (
              <div
                key={srv.id}
                data-reveal
                className="vh-card-glass p-7 sm:p-8 flex flex-col justify-between group relative overflow-hidden shadow-elevate"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-semibold text-[var(--ink)]/10 group-hover:text-[var(--brick)]/20 transition-colors font-sans">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 bg-[var(--canvas-alt)] group-hover:bg-[var(--brick)]/10 text-[var(--ink)] flex items-center justify-center transition-all duration-300 rounded-full border border-[var(--line)] group-hover:rotate-6">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <h3 className="font-sans font-semibold text-lg sm:text-xl text-[var(--ink)] transition-colors mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed mb-4 font-light">
                    {srv.shortDescription}
                  </p>

                  <div className="space-y-2 border-t border-[var(--line)] pt-4">
                    {srv.keyFeatures.slice(0, 3).map((kf, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
                        <Check className="w-3.5 h-3.5 text-[var(--ink)] flex-shrink-0" />
                        <span>{kf.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <a
                    href={`/services#${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/services#${srv.slug}`);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </a>

                  <span className="text-[10px] font-bold px-2.5 py-1 bg-[var(--canvas-alt)] group-hover:bg-[var(--brick)]/10 text-[var(--ink-soft)] rounded-full border border-[var(--line)] transition-colors">
                    {srv.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="md"
              showArrow
              onClick={() => onNavigate('/services')}
            >
              VIEW ALL CONSTRUCTION SERVICES
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS RAIL */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-16 sm:py-24 border-y border-[var(--line)] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center text-center mb-10 gap-6">
            <div className="max-w-2xl mx-auto">
              <div className="vh-eyebrow mb-3 justify-center">
                <HardHat className="w-3.5 h-3.5" />
                <span>Our Track Record</span>
              </div>
              <h2 ref={featuredProjectsHeadingRef} className="vh-heading vh-heading-size">
                Featured Projects in Bhadohi
              </h2>
              <div className="vh-heading-rule" />
              <p className="vh-subtext vh-subtext-size mt-3 max-w-2xl mx-auto">
                Explore real ongoing sites and completed architectural residential & commercial builds across Harirampur, Aurai Road, and Gyanpur.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="vh-btn-pill"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjectsRail('prev')}
                aria-label="Scroll projects left"
                className="vh-btn-icon-round !w-10 !h-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjectsRail('next')}
                aria-label="Scroll projects right"
                className="vh-btn-icon-round !w-10 !h-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[var(--canvas-alt)] p-1.5 border border-[var(--line)] self-start flex-wrap rounded-full mb-8 w-fit">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'residential', label: 'Residential' },
              { key: 'commercial', label: 'Commercial' },
              { key: 'villas', label: 'Villas & Renovation' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveProjectTab(tab.key as any)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-full relative ${
                  activeProjectTab === tab.key
                    ? 'bg-[var(--brick)]/10 text-[var(--ink)] border border-[var(--line)]'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--canvas)] border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects horizontal scroll-snap rail */}
          <div
            ref={projectsRailRef}
            className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={projectsRef} className="contents">
              {filteredProjects.map((proj) => {
                const isOngoing = proj.stage === 'In Progress';
                return (
                  <button
                    type="button"
                    key={proj.id}
                    data-project-card
                    data-reveal
                    onClick={() => onNavigate(`/projects/${proj.id}`)}
                    className="vh-image-card group snap-start flex-shrink-0 w-[80vw] xs:w-72 sm:w-80 lg:w-[calc(20%-19.2px)] aspect-[4/5] text-left cursor-pointer shadow-elevate"
                  >
                    {/* Full-bleed photo — the whole card IS the image, per
                        the Ospey property-card pattern (no separate white
                        content panel below it). */}
                    <img
                      src={proj.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?q=80&w=800&auto=format&fit=crop'}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient scrim, strongest at the bottom, so the
                        white overlay text stays legible over any photo. */}
                    <div className="vh-image-card__scrim" />

                    {/* Status chip, top-left */}
                    <div className="vh-image-card__chip">
                      <span className={`w-1.5 h-1.5 rounded-full bg-[var(--brick)] ${isOngoing ? 'animate-pulse' : ''}`} />
                      <span>{proj.stage}</span>
                    </div>

                    {/* Save icon, top-right */}
                    <span
                      role="button"
                      tabIndex={-1}
                      aria-label="Save project"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 z-[1] w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center border border-white/25 backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </span>

                    {/* White overlay text — name, location, and quick specs
                        sitting directly on the scrim at the bottom of the
                        card. */}
                    <div className="vh-image-card__overlay p-5 sm:p-6 space-y-2.5">
                      <div className="font-heading font-extrabold text-lg sm:text-xl leading-tight tracking-tight line-clamp-2">
                        {proj.title}
                      </div>

                      <div className="flex items-center gap-1.5 text-white/85 text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{proj.location}</span>
                      </div>

                      <div className="flex items-center gap-3 pt-2.5 mt-1 border-t border-white/20 text-[11px] text-white/80">
                        <span className="flex items-center gap-1.5">
                          <Ruler className="w-3.5 h-3.5" />
                          {proj.builtUpArea}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Layers3 className="w-3.5 h-3.5" />
                          {proj.floors}
                        </span>
                        <span className="flex items-center gap-1.5 ml-auto font-bold text-white">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="white"
              size="md"
              showArrow
              onClick={() => onNavigate('/projects')}
            >
              EXPLORE ALL PROJECTS & ARCHIVES
            </Button>
          </div>
        </div>
      </section>

      {/* CONSTRUCTION PACKAGES PREVIEW */}
      <section className="bg-[var(--canvas)] py-16 sm:py-20 border-y border-[var(--line)] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-10">
          <div className="flex flex-col items-center text-center gap-4">
            <SectionHeading
              badge="Pricing & Specifications"
              title="Transparent Construction Packages"
              highlightWords={['Construction', 'Packages']}
              description="Authentic turnkey packages, guaranteed industrial-grade materials, zero hidden surprises."
              className="mb-0"
              tight
            />

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                showArrow
                onClick={() => onNavigate('/packages')}
              >
                VIEW FULL SPECIFICATION MATRIX
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_DATA.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isPopular={pkg.id === 'standard'}
                onSelectPackage={() => onOpenQuoteModal()}
                onBookConsultation={onOpenConsultationModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[var(--canvas)]">
        <div className="w-full max-w-[1920px] mx-auto">
          <SectionHeading
            badge="Bhadohi's Trusted Builder"
            title="Why Homeowners & Businesses Trust Us"
            highlightWords={['Trust', 'Us']}
            description="Engineering discipline, strict quality checks, and transparent communication."
          />

          <div className="vh-card-glass p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10" ref={whyRef}>
              {WHY_CHOOSE_US.slice(0, 4).map((item) => {
                const iconMap: Record<string, LucideIcon> = {
                  MessageSquare,
                  Award,
                  Clock,
                  Compass,
                  CheckCircle,
                  HeartHandshake
                };
                const ItemIcon = iconMap[item.icon as string] || ShieldCheck;
                return (
                  <div
                    key={item.title}
                    data-reveal
                    className="group flex flex-col items-start text-left p-4 -m-4 rounded-2xl cursor-default transition-[background-color,transform] duration-300 hover:bg-[var(--brick)]/[0.04] hover:-translate-y-1"
                  >
                    {/* Icon + slow, always-running rotating dashed ring —
                        same "live instrument" treatment as the trust-pillar
                        cards above (InstrumentPanelCard.tsx), so this
                        static-looking icon reads as an animated, alive
                        element instead of a plain flat badge. Hover adds a
                        soft glow, a filled-blue icon badge, and a gentle
                        icon scale-up, so the whole tile visibly responds
                        rather than just tinting the ring. */}
                    <div className="relative w-14 h-14 mb-5">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full bg-[var(--brick)]/0 group-hover:bg-[var(--brick)]/20 blur-md scale-150 transition-colors duration-500"
                      />
                      <svg
                        viewBox="0 0 56 56"
                        className="absolute inset-0 w-full h-full animate-instrument-spin text-[var(--brick)] group-hover:text-[var(--brick-deep)] transition-colors duration-500"
                        aria-hidden="true"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="26"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="2 5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-[6px] rounded-full bg-[var(--canvas-alt)] group-hover:bg-[var(--brick)] border border-[var(--line)] group-hover:border-[var(--brick)] flex items-center justify-center text-[var(--ink)] group-hover:text-white transition-[background-color,border-color,color,transform] duration-300 group-hover:scale-110">
                        <ItemIcon className="w-6 h-6 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-[var(--ink)] mb-2 transition-colors duration-300 group-hover:text-[var(--brick)]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <div className="vh-card-glass p-5 space-y-1 text-center sm:text-left">
              <p className="text-xs font-bold text-[var(--ink)]">
                Site Location & Landmark:
              </p>
              <p className="text-xs text-[var(--ink-soft)]">
                Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi — 221401
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              SCHEDULE A SITE VISIT
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-16 sm:py-20 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center text-center gap-6 mb-10 sm:mb-14">
            <div>
              <div className="vh-eyebrow mb-4 justify-center">
                Client Feedback
              </div>
              <h2 ref={testimonialsHeadingRef} className="vh-heading vh-heading-size">
                What Our <em>Clients Say</em>
              </h2>
              <div className="vh-heading-rule" />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)}
                aria-label="Previous testimonial"
                className="vh-btn-icon-round !w-10 !h-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
                aria-label="Next testimonial"
                className="vh-btn-icon-round !w-10 !h-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={testimonialsRef}>
            {[0, 1, 2].map((offset) => {
              const t = TESTIMONIALS_DATA[(testimonialIdx + offset) % TESTIMONIALS_DATA.length];
              return (
                <div
                  key={`${t.id}-${offset}`}
                  data-reveal
                  className="vh-card-glass p-7 flex flex-col justify-between space-y-5 shadow-elevate"
                >
                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-[var(--ink)]/10 fill-[var(--ink)]/10" />

                    <div className="flex items-center gap-1 text-[var(--brick)]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-current' : 'fill-none text-[var(--line)]'}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--canvas-alt)] text-[var(--ink)] flex items-center justify-center font-sans font-semibold text-sm flex-shrink-0 border border-[var(--line)]">
                      {t.customerName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans font-semibold text-xs text-[var(--ink)] truncate">
                        {t.customerName}
                      </h3>
                      <p className="text-[10px] text-[var(--ink-soft)] truncate">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex sm:hidden items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)}
              aria-label="Previous testimonial"
              className="vh-btn-icon-round !w-10 !h-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
              aria-label="Next testimonial"
              className="vh-btn-icon-round !w-10 !h-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICE COVERAGE REGIONS — Bhadohi district localities plus the
          extended Mirzapur/Jaunpur/Varanasi/Prayagraj coverage. */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[var(--canvas)]">
        <div className="w-full max-w-[1920px] mx-auto vh-card-glass p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div>
              <span className="vh-eyebrow">
                Operational Coverage
              </span>
              <h2 ref={areasHeadingRef} className="vh-heading vh-heading-size mt-2">
                Serving Bhadohi, Mirzapur, Jaunpur, Varanasi &amp; Prayagraj
              </h2>
              <div className="vh-heading-rule is-left" />
              <p className="vh-subtext vh-subtext-size mt-2 max-w-xl">
                Our construction crews, logistics, and site supervisors are actively deployed across Bhadohi district and the wider Purwanchal region.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" ref={areasRef} style={{ perspective: '1000px' }}>
            {SERVICE_AREAS_DATA.map((area) => (
              <LocationCoverageCard key={area.id} name={area.name} status={area.status} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA BAND */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] w-full relative overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center min-h-[380px]">
          <div className="relative h-64 lg:h-full lg:min-h-[380px] overflow-hidden order-2 lg:order-1">
            {/* Parallax (useParallax) removed from this section — kept only
                on the two page-hero images (ProjectDetailPage,
                IndividualServicePage) per the "hero + at most one other
                section" scroll-performance budget; this decorative
                newsletter-band image was the least essential of the three
                scrub-driven ScrollTriggers running site-wide. Plain
                object-cover now that there's no translateY range to hide
                the edges of (the oversizing was only ever there to serve
                the parallax shift). */}
            <img
              src={PROJECTS_DATA[3]?.image || PROJECTS_DATA[0]?.image}
              alt="Interior construction detail"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--canvas)] via-[var(--canvas)]/40 to-transparent" />
          </div>

          <div className="relative z-10 py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6 order-1 lg:order-2">
            <h2 ref={newsletterHeadingRef} className="vh-heading vh-heading-size max-w-lg">
              Get Construction Tips &amp; <em>Project Updates</em>
            </h2>
            <div className="vh-heading-rule is-left !mt-3" />

            <p className="vh-subtext vh-subtext-size max-w-md leading-relaxed font-light">
              Subscribe for BOQ cost guides, material price updates, and new project milestones from Abdul Salam Construction Company — straight to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-md">
              {newsletterSubmitted ? (
                <div className="flex items-center gap-2.5 vh-card-glass px-5 py-3.5 text-sm font-semibold text-[var(--ink)]">
                  <CheckCircle className="w-4.5 h-4.5 text-[var(--brick)] flex-shrink-0" />
                  <span>Thanks! We'll keep you posted at {newsletterEmail}.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <div className="flex-1 flex items-center gap-2.5 bg-[var(--canvas-alt)] rounded-full border border-[var(--line)] px-5 py-1">
                    <Mail className="w-4 h-4 text-[var(--ink)] flex-shrink-0" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full py-2.5 text-sm text-[var(--ink)] bg-transparent outline-none placeholder:text-[var(--ink-soft)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="vh-btn-pill vh-btn-pill-solid text-xs sm:text-sm font-bold uppercase tracking-wider flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </button>
                </div>
              )}
            </form>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                className="inline-flex items-center gap-2 text-[var(--ink)] font-bold text-sm hover:text-[var(--brick)] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-[var(--canvas-alt)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <span>{COMPANY_DATA.contact.phoneDisplay}</span>
              </a>

              <Button
                variant="white"
                size="md"
                showArrow
                onClick={onOpenQuoteModal}
              >
                Get a Free Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
