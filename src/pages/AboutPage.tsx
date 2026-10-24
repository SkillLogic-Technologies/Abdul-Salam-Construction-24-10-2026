import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Logo } from '../components/common/Logo';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useCountUp } from '../lib/useCountUp';

interface AboutPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const valuesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  // Stats strip — real, traceable numbers (not invented marketing copy):
  // 15 years in business, 20 turnkey projects delivered, 75,000 sq.ft of
  // total built-up area constructed to date.
  const statsRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal-stat]', stagger: 0.1 });
  const yearsRef = useCountUp<HTMLSpanElement>({ end: 15, suffix: '+' });
  const projectsRef = useCountUp<HTMLSpanElement>({ end: 20, suffix: '+' });
  const sqftRef = useCountUp<HTMLSpanElement>({
    end: 75000,
    suffix: '+',
    format: (v) => Math.round(v).toLocaleString('en-IN')
  });

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* HERO HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-16 sm:py-20 border-b border-[var(--line)] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl space-y-4">
            <div className="vh-eyebrow">
              <span>About Abdul Salam Construction Company</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
              Quality Construction. Built Around Your Vision.
            </h1>

            <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed font-sans">
              Headquartered at Harirampur, Aurai Road, Bhadohi, we are dedicated to transforming architectural blueprints into structurally resilient homes, commercial centers, and community landmarks.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={onOpenConsultationModal}
              >
                REQUEST OFFICE CONSULTATION
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK RECORD STATS — count-up on scroll (once, then self-destructs;
          see useCountUp.ts). transform/opacity fade+rise on the tiles
          themselves via useScrollReveal (same pattern as the rest of the
          site); the number counting itself only ever writes textContent,
          never a CSS property, so it has no layout/paint cost of its own. */}
      <section className="bg-[var(--canvas)] py-12 sm:py-16 border-b border-[var(--line)] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div data-reveal-stat className="text-center p-6 sm:p-8 border border-[var(--line)] rounded-xl">
              <span ref={yearsRef} className="block text-4xl sm:text-5xl font-black font-heading text-[var(--brick)] tracking-tight">
                0+
              </span>
              <span className="mt-2 block text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Years in Business
              </span>
            </div>

            <div data-reveal-stat className="text-center p-6 sm:p-8 border border-[var(--line)] rounded-xl">
              <span ref={projectsRef} className="block text-4xl sm:text-5xl font-black font-heading text-[var(--brick)] tracking-tight">
                0+
              </span>
              <span className="mt-2 block text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Projects Delivered
              </span>
            </div>

            <div data-reveal-stat className="text-center p-6 sm:p-8 border border-[var(--line)] rounded-xl">
              <span ref={sqftRef} className="block text-4xl sm:text-5xl font-black font-heading text-[var(--brick)] tracking-tight">
                0+
              </span>
              <span className="mt-2 block text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Sq.Ft Constructed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE & ETHOS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brick)]">
              Our Foundation
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-[1.05] tracking-tight">
              Engineering Precision Meets Transparent Construction Across Purwanchal
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
              Founded on the principles of engineering honesty and craftsmanship, <strong>Abdul Salam Construction Company</strong> has established itself as the go-to builder for families and businesses across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.
            </p>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
              We manage all dimensions of the construction lifecycle: structural soil load testing, architectural CAD drafting, sanctioning approvals, cement hydration monitoring, shuttering safety, and turnkey interior joinery.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[var(--canvas)] border border-[var(--line)] rounded-xl shadow-elevate">
                <span className="text-3xl font-black text-[var(--ink)] block font-heading tracking-tight">
                  100%
                </span>
                <span className="text-xs text-[var(--ink-soft)] font-semibold">
                  Material Verification & BOQ Adherence
                </span>
              </div>

              <div className="p-5 bg-[var(--canvas)] border border-[var(--line)] rounded-xl shadow-elevate">
                <span className="text-3xl font-black text-[var(--brick)] block font-heading tracking-tight">
                  Milestone
                </span>
                <span className="text-xs text-[var(--ink-soft)] font-semibold">
                  Stage-Wise Escrow & Site Sign-Off
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[var(--canvas)] text-[var(--ink)] p-8 sm:p-10 border border-[var(--line)] relative overflow-hidden rounded-xl shadow-elevate">
            <div className="relative z-10 space-y-6">
              <Logo variant="dark" size="lg" />

              <div className="space-y-3 pt-4 border-t border-[var(--line)] text-xs sm:text-sm text-[var(--ink-soft)]">
                <p>
                  <strong>Office Location:</strong> Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi, Uttar Pradesh – 221401
                </p>
                <p>
                  <strong>Core Specializations:</strong> RCC Civil Structure, Residential Duplex Homes, Commercial Complexes, Turnkey Interior Joinery.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={onOpenQuoteModal}
                >
                  START YOUR PROJECT WITH US
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES & VALUES */}
      <section className="bg-[var(--canvas)] py-16 sm:py-20 border-y border-[var(--line)] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="Our Guiding Principles"
            title="Core Values That Drive Every Foundation We Cast"
            highlightWords={['Core Values', 'Foundation']}
            description="We believe in complete transparency, rigorous safety protocols, and enduring structural stability."
          />

          <div ref={valuesRef} className="divide-y divide-gray-200 border-t border-b border-[var(--line)]">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                className="group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center py-7 sm:py-8 hover:bg-[var(--canvas-alt)] transition-colors duration-300 px-2 sm:px-4 rounded-xl"
              >
                <div className="sm:col-span-2 flex items-center gap-4 sm:block">
                  <span className="font-heading font-black text-4xl sm:text-5xl text-gray-200 group-hover:text-[var(--brick)]/30 transition-colors tracking-tight">
                    0{idx + 1}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <h3 className="font-heading font-extrabold text-lg text-[var(--ink)] group-hover:text-[var(--brick)] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
                <div className="sm:col-span-3 flex sm:justify-end">
                  <div className="w-11 h-11 bg-[var(--canvas-alt)] group-hover:bg-[var(--brick)] text-[var(--ink)] group-hover:text-white flex items-center justify-center transition-all duration-300 rounded-lg border border-[var(--line)] shadow-elevate group-hover:rotate-6 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE & HEADQUARTERS DIRECTORY */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto bg-[var(--canvas)] border border-[var(--line)] p-8 sm:p-12 shadow-elevate rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brick)]">
                Direct Consultation
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
                Visit Our Office at Harirampur, Aurai Road
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                Meet our senior project managers and structural civil engineers to inspect 3D floor models, material samples (cement grades, TMT steel, tile catalogs), and draft project timelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)]">Address:</strong>
                    <span className="text-[var(--ink-soft)]">Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi – 221401</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[var(--ink)]">Working Hours:</strong>
                    <span className="text-[var(--ink-soft)]">Monday – Sunday: 8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={onOpenConsultationModal}
              >
                SCHEDULE SITE / OFFICE VISIT
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/contact')}
              >
                CONTACT & INQUIRY CHANNELS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
