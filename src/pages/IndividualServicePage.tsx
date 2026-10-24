import React from 'react';
import { INDIVIDUAL_SERVICES_DATA } from '../data/servicePagesData';
import { Button } from '../components/common/Button';
import { useParallax } from '../lib/useParallax';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  HardHat,
  Layers,
  ShieldAlert,
  Calculator,
  ArrowRight
} from 'lucide-react';
interface IndividualServicePageProps {
  slug: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const IndividualServicePage: React.FC<IndividualServicePageProps> = ({
  slug,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const service =
    INDIVIDUAL_SERVICES_DATA[slug] ||
    INDIVIDUAL_SERVICES_DATA['residential-turnkey-construction'];
  const heroImgRef = useParallax<HTMLImageElement>({ strength: 28 });

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* 1. TOP BREADCRUMB BAR */}
      <div className="bg-[var(--ink)] text-white border-b border-[#232a3d] py-3 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] hover:text-white transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
            <span className="hidden sm:inline">Category:</span>
            <span className="text-[var(--brick)] font-semibold">{service.category}</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-12 sm:py-16 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--brick)]/10 text-[var(--brick)] text-xs font-bold uppercase tracking-[0.2em] rounded-md border border-[var(--brick)]">
                <HardHat className="w-3.5 h-3.5" />
                <span>{service.heroBadge}</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.02]">
                {service.title}
              </h1>

              <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-3xl leading-relaxed">
                {service.definition}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={onOpenQuoteModal}
                >
                  CALCULATE ESTIMATE
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenConsultationModal}
                >
                  REQUEST SITE CONSULTATION
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('/packages')}
                >
                  VIEW TURNKEY PACKAGES
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]">
                <img
                  ref={heroImgRef}
                  src={service.image}
                  alt={`${service.title} execution by M/S Abdul Salam Constructions Company`}
                  className="absolute inset-0 w-full h-[calc(100%+56px)] -top-7 object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-gray-300 bg-black/85 p-3 rounded-md border border-white/20">
                  <span className="text-[var(--brick)] font-bold">M/S Abdul Salam Constructions Company</span>
                  <p className="text-[11px] text-[var(--ink-soft)]">Phase-II, Rajpura Colony, Aurai Road, Bhadohi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 space-y-12">
        {/* SCOPE & DELIVERABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 sm:p-8 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] space-y-4">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--brick)]" />
                <span>Scope of Work & Engineering Deliverables</span>
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                {service.scopeDescription}
              </p>
              <div className="space-y-2.5 pt-2">
                {service.keyDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink-soft)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUOTATION SPECIFICATIONS TABLE */}
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 sm:p-8 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] space-y-4">
              <h3 className="font-heading font-bold text-lg text-[var(--ink)]">
                Quotation-Verified Material & Mix Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--canvas-alt)] border-b border-[var(--line)] text-[var(--ink)] font-bold">
                      <th className="py-2.5 px-3">Parameter / Item</th>
                      <th className="py-2.5 px-3">Specification / Ratio</th>
                      <th className="py-2.5 px-3">Brand / Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)] text-[var(--ink-soft)]">
                    {service.specifications.map((spec, sIdx) => (
                      <tr key={sIdx} className="hover:bg-[var(--canvas-alt)]/60">
                        <td className="py-2.5 px-3 font-semibold text-[var(--ink)]">{spec.label}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-gray-900">{spec.specification}</td>
                        <td className="py-2.5 px-3 text-[var(--ink-soft)]">{spec.brandOrGrade || spec.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PACKAGES & EXCLUSIONS */}
          <div className="lg:col-span-5 space-y-6">
            {/* PACKAGE SCOPE BREAKDOWN */}
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 sm:p-8 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[var(--ink)] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[var(--brick)]" />
                <span>Quotation Packages Application</span>
              </h3>
              <div className="space-y-3">
                {service.packageComparison.map((pkg, pIdx) => (
                  <div key={pIdx} className="p-3.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xs text-[var(--ink)]">{pkg.packageName}</span>
                      <span className="text-[11px] font-mono font-bold text-[var(--brick)]">{pkg.rate}</span>
                    </div>
                    <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">{pkg.scopeSummary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* INCLUSIONS VS EXCLUSIONS */}
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] space-y-4">
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-green-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Standard Inclusions</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--ink-soft)] pl-1">
                  {service.inclusions.map((inc, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[var(--line)] space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Exclusions (Billed on actuals or Owner Scope)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--ink-soft)] pl-1">
                  {service.exclusions.map((exc, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4. VISIBLE SERVICE FAQS */}
        <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 sm:p-8 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brick)]">Technical Guidance</span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)]">
              Frequently Asked Questions on {service.shortTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-4 bg-[var(--canvas)] rounded-lg border border-[var(--line)] space-y-2">
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--ink)] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-[var(--ink-soft)] pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TOPICAL INTERNAL LINKING: RELATED SERVICES */}
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-base text-[var(--ink)]">
            Explore Related Construction Services
          </h3>
          {/* Horizontal rail instead of a fixed grid — keeps related-links sections from repeating the same skeleton site-wide */}
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {service.relatedServiceSlugs.map((relSlug) => {
              const rel = INDIVIDUAL_SERVICES_DATA[relSlug];
              if (!rel) return null;
              return (
                <div
                  key={relSlug}
                  onClick={() => onNavigate(`/services/${relSlug}`)}
                  className="p-5 bg-[var(--canvas)] border border-[var(--line)] rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] hover:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] transition-all duration-150 cursor-pointer group flex-shrink-0 w-[220px] sm:w-[240px] snap-start"
                >
                  <span className="text-[10px] font-bold uppercase text-[var(--brick)]">{rel.shortTitle}</span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[var(--ink)] mt-1 group-hover:text-[var(--brick)] transition-colors">
                    {rel.title}
                  </h4>
                  <div className="inline-flex items-center gap-1 text-[11px] text-[var(--ink-soft)] font-medium mt-3 group-hover:text-[var(--ink)]">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. BOTTOM CTA */}
        <div className="bg-[var(--canvas-alt)] text-[var(--ink)] border border-[var(--line)] p-8 sm:p-14 rounded-xl shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] text-center space-y-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--ink)]">
            Plan Your Construction Project with M/S Abdul Salam Constructions Company
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] max-w-2xl mx-auto leading-relaxed">
            Registered site office at Phase-II, Rajpura Colony, Opposite H.P. Petrol Pump, Aurai Road, Bhadohi (221401). Site engineers available for plot inspection and estimation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenQuoteModal}
            >
              CALCULATE ESTIMATE
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onOpenConsultationModal}
            >
              BOOK ON-SITE CONSULTATION
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('/contact')}
            >
              VIEW OFFICE LOCATION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
