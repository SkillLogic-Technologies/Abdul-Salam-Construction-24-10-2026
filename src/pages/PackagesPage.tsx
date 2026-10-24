import React, { useEffect, useRef, useState } from 'react';
import {
  PACKAGES_DATA,
  PACKAGE_COMPARISON_SECTIONS
} from '../data/companyData';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PackageCard } from '../components/packages/PackageCard';
import { useScrollReveal } from '../lib/useScrollReveal';
import {
  Check,
  ShieldCheck,
  FileText,
  Building2,
  Layers,
  Scale,
  IndianRupee
} from 'lucide-react';
import gsap from 'gsap';

interface PackagesPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: (packageId?: string) => void;
  onOpenConsultationModal: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'comparison' | 'models'>('packages');
  const [packageFilter, setPackageFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const tabPanelRef = useRef<HTMLDivElement>(null);
  // Scroll-triggered reveal for the package cards' initial scroll-into-view
  // (separate from tabPanelRef's own fade above, which correctly stays
  // unconditional since it's re-animating already-in-view content on a tab
  // switch, not a first-time reveal). Targets PackageCard's own root class
  // (`.vh-card-glass`) directly rather than wrapping each card in an extra
  // div — PackageCard's root has no explicit height class and relies on
  // being a direct CSS Grid item for the grid's default stretch behavior to
  // give it equal height with its siblings; adding a wrapper div would
  // insert an extra, non-stretching layer between the grid and the card,
  // breaking that equal-height layout.
  const packagesGridRef = useScrollReveal<HTMLDivElement>({ selector: '.vh-card-glass', stagger: 0.08, y: 24 });

  // Single tween per tab switch — a simple fade-in on the panel container,
  // not per-element staggers, so switching tabs stays cheap.
  useEffect(() => {
    const el = tabPanelRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [activeTab]);

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    if (packageFilter === 'all') return true;
    if (packageFilter === 'commercial') return pkg.id === 'essential' || pkg.id === 'custom';
    if (packageFilter === 'residential') return pkg.id === 'standard' || pkg.id === 'premium' || pkg.id === 'custom';
    return true;
  });

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* PAGE HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-12 sm:py-16 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <div className="vh-eyebrow">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Turnkey Engineering Rates & Client BOQ</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
            Transparent Construction Packages
          </h1>

          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            Structured turnkey construction rates crafted with verified concrete mix ratios (3:2:1), genuine Fe 550D TMT steel rebars, authorized brand fixtures, and transparent milestone billing across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.
          </p>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <section className="border-b border-[var(--line)] bg-[var(--canvas)] sticky top-16 z-30">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-4 py-3">
          <div className="vh-scroll-hint flex-1 min-w-0">
          <div className="vh-scroll-fade flex items-center gap-2 overflow-x-auto">
            {[
              { key: 'packages', label: 'Package Tiers (₹1,500 – ₹2,650)', icon: Building2 },
              { key: 'comparison', label: 'Brand & Technical Matrix', icon: Layers },
              { key: 'models', label: 'Contract Models (Cost-Plus vs Lump-Sum)', icon: Scale }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg whitespace-nowrap flex items-center gap-2 border active:scale-95 ${
                    isActive
                      ? 'bg-[var(--ink)] text-white border-[var(--ink)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                      : 'bg-[var(--canvas-alt)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--line)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--brick)]' : 'text-[var(--ink-soft)]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs text-[var(--ink-soft)] font-semibold">Need custom estimate?</span>
            <button
              onClick={onOpenConsultationModal}
              className="text-xs font-black text-[var(--brick)] hover:text-[var(--ink)] underline cursor-pointer uppercase tracking-wider"
            >
              Talk to Lead Engineer
            </button>
          </div>
        </div>
      </section>

      {/* TAB VIEWS */}
      <div ref={tabPanelRef}>
        {activeTab === 'packages' && (
          <section className="py-12 sm:py-16 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-10">
            <div className="flex flex-col items-center text-center gap-6 border-b border-[var(--line)] pb-8">
              <SectionHeading
                badge="Standardized Engineering Tiers"
                title="Choose Your Build Tier"
                highlightWords={['Build', 'Tier']}
                description="Engineered turn-key packages covering civil masonry, RCC casting, plumbing, electricals, flooring, woodwork, and premium painting with zero hidden extras."
                className="mb-0"
              />

              <div className="flex items-center gap-1.5 bg-[var(--canvas-alt)] p-1.5 rounded-lg border border-[var(--line)] flex-wrap justify-center">
                {[
                  { key: 'all', label: 'All Packages (4)' },
                  { key: 'residential', label: 'Residential Turnkey' },
                  { key: 'commercial', label: 'Commercial & Hall' }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setPackageFilter(f.key as any)}
                    className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-md border ${
                      packageFilter === f.key
                        ? 'bg-[var(--ink)] text-white border-[var(--ink)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                        : 'text-[var(--ink-soft)] border-transparent hover:text-[var(--ink)] hover:bg-[var(--line)]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={packagesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isPopular={pkg.id === 'standard'}
                  onSelectPackage={(id) => onOpenQuoteModal(id)}
                  onBookConsultation={onOpenConsultationModal}
                />
              ))}
            </div>

            {/* Trust Guarantee band */}
            <div className="bg-[#1C1C22] text-white rounded-xl border border-[var(--ink)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative overflow-hidden mt-4">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-[var(--brick)]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 flex items-start gap-3 md:flex-col md:items-start md:border-r md:border-white/10 md:pr-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Authentic Industrial Brands
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial grade), Tata / Jindal 550D TMT, Jaquar, Kajaria, and Astral fittings only.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-3 md:flex-col md:items-start md:border-r md:border-white/10 md:pr-6">
                <Building2 className="w-6 h-6 text-[var(--brick)] flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Standardized Measurement Rules
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    Clear calculation formula: Slab Area at 100%, Double Slab (Do Chhatti) at 50%, and Staircase Steps at 150%.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-3 md:flex-col md:items-start">
                <FileText className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    7-Stage Milestone Protection
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    Pay strictly per stage: 20% Booking, 10% Plinth, 15% Columns, 10% Walls, 20% Slab Casting, 5% Plaster, and 20% Handover.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs Bar */}
            <div className="p-7 sm:p-8 bg-[var(--canvas-alt)] text-[var(--ink)] rounded-xl border border-[var(--line)] shadow-elevate flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-heading font-black text-xl text-[var(--ink)]">
                  Want an Itemized Bill of Quantities (BOQ) for Your Site?
                </h3>
                <p className="text-xs text-[var(--ink-soft)]">
                  We generate exact structural estimates based on your plot dimensions and soil condition anywhere across Bhadohi, Mirzapur, Jaunpur, Varanasi or Prayagraj.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  showArrow
                  onClick={() => onOpenQuoteModal('standard')}
                >
                  CALCULATE YOUR ESTIMATE
                </Button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'comparison' && (
          <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8">
            <SectionHeading
              badge="Detailed Matrix"
              title="Side-by-Side Specification Comparison"
              highlightWords={['Specification', 'Comparison']}
              description="Examine exactly what materials, mix ratios, and brand caps are included across our packages to make an informed decision."
            />

            <div className="bg-[var(--canvas)] border border-[var(--line)] overflow-x-auto shadow-elevate rounded-xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[var(--ink)] text-white text-xs uppercase tracking-wider">
                    <th className="p-4 font-heading font-black">Feature / Material Component</th>
                    <th className="p-4 font-heading font-black">Open Hall (₹1,500)</th>
                    <th className="p-4 font-heading font-black bg-[var(--brick)] text-white">Standard (₹1,850)</th>
                    <th className="p-4 font-heading font-black">Premium + POP (₹2,250)</th>
                    <th className="p-4 font-heading font-black">Custom Villa (₹2,650+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-[var(--line)] text-xs">
                  {PACKAGE_COMPARISON_SECTIONS.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr className="bg-[var(--canvas-alt)] font-heading font-bold text-[var(--ink)] border-t border-[var(--line)]">
                        <td colSpan={5} className="p-3 uppercase tracking-wider bg-[var(--canvas-alt)]">
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((feat, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[var(--canvas-alt)]/80 transition-colors">
                          <td className="p-3.5 font-bold text-[var(--ink)]">{feat.featureName}</td>
                          <td className="p-3.5 text-[var(--ink-soft)]">{String(feat.essential)}</td>
                          <td className="p-3.5 bg-[var(--brick)]/5 font-semibold text-[var(--ink)] border-x-2 border-[var(--line)]">
                            {String(feat.standard)}
                          </td>
                          <td className="p-3.5 text-[var(--ink-soft)]">{String(feat.premium)}</td>
                          <td className="p-3.5 text-[var(--ink-soft)]">{String(feat.custom)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-4">
              <Button
                variant="primary"
                size="lg"
                showArrow
                onClick={() => onOpenQuoteModal('standard')}
              >
                REQUEST CUSTOM ESTIMATE BASED ON MATRIX
              </Button>
            </div>
          </section>
        )}

        {activeTab === 'models' && (
          <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
            <SectionHeading
              badge="Execution Frameworks"
              title="Flexible Construction Contracting Models"
              highlightWords={['Contracting', 'Models']}
              description="Choose the contract structure that gives you maximum confidence, control, and financial clarity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cost-Plus Model */}
              <div className="bg-[var(--canvas)] border border-[var(--line)] p-7 sm:p-9 space-y-5 hover:-translate-y-1 transition-all duration-200 shadow-elevate rounded-xl">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider rounded-md border border-blue-200">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Model A: Cost-Plus Management</span>
                </div>

                <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
                  Transparent Cost-Plus Contract
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                  You pay the actual factory/dealer invoice cost for all cement, steel, bricks, sand, and fixtures, plus a fixed pre-agreed contractor management fee (typically 12%–15%) for site supervision and engineering oversight.
                </p>

                <div className="space-y-2 border-t border-[var(--line)] pt-4 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[var(--ink)]">Key Benefits:</h4>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Bill Verification:</strong> Inspect original vendor GST vouchers and weigh-bridge slips.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Flexible Customization:</strong> Change brand specifications anytime during construction without contract penalty.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Direct Savings:</strong> Any bulk purchasing discount from distributors is passed directly to you.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)]">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onOpenConsultationModal}
                  >
                    Discuss Cost-Plus Model
                  </Button>
                </div>
              </div>

              {/* Lump-Sum Turnkey Model */}
              <div className="bg-[var(--canvas)] border border-[var(--line)] p-7 sm:p-9 space-y-5 hover:-translate-y-1 transition-all duration-200 shadow-elevate rounded-xl">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[var(--brick)]/10 text-[var(--brick)] text-xs font-black uppercase tracking-wider rounded-md border border-[var(--brick)]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Model B: Turnkey Lump-Sum</span>
                </div>

                <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
                  Fixed-Price Turnkey Contract
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                  A single fixed price per square foot agreed upon in advance based on detailed architectural blueprints, BOQ specifications, and milestone completion stages.
                </p>

                <div className="space-y-2 border-t border-[var(--line)] pt-4 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[var(--ink)]">Key Benefits:</h4>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                    <span><strong>Budget Certainty:</strong> Protect yourself against market fluctuations in steel and cement prices.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                    <span><strong>Clear Milestone Payments:</strong> Pay only when each stage (Plinth, Slab, Masonry, Plaster) is certified.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--ink-soft)]">
                    <Check className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Management Burden:</strong> We handle all supplier logistics, deliveries, and day-to-day site operations.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)]">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onOpenQuoteModal('standard')}
                  >
                    Discuss Turnkey Model
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
