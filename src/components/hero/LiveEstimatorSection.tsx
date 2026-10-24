import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ShieldCheck,
  CheckCircle2,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { useFitOneLine } from '../../lib/useFitOneLine';

/**
 * Tweens a displayed number toward `target` whenever it changes (slider
 * drag, preset click, or tier switch) instead of hard-snapping — a plain
 * GSAP tween on a JS counter written into React state on each tick, same
 * "animate a number, not a CSS property" approach as useCountUp.ts, just
 * re-triggered on every value change rather than once on scroll-into-view.
 * Skips the tween entirely under reduced-motion (snaps straight to target).
 */
function useAnimatedNumber(target: number, duration = 0.5) {
  const [display, setDisplay] = useState(target);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const valueRef = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(target);
      valueRef.current = target;
      return;
    }
    tweenRef.current?.kill();
    const proxy = { value: valueRef.current };
    tweenRef.current = gsap.to(proxy, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        valueRef.current = proxy.value;
        setDisplay(proxy.value);
      }
    });
    return () => {
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}

interface LiveEstimatorSectionProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: (packageId?: string) => void;
  onOpenConsultationModal: () => void;
}

type EstimatorTab = 'estimator' | 'specs' | 'milestones';

export const LiveEstimatorSection: React.FC<LiveEstimatorSectionProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeTab, setActiveTab] = useState<EstimatorTab>('estimator');
  const [builtUpArea, setBuiltUpArea] = useState<number>(1500);
  // Free-typed sqft value shown/edited in the custom input — kept as a
  // string (not the numeric builtUpArea) so the field can hold an empty or
  // partially-typed value ("1", "17") while the user is mid-keystroke,
  // without forcing it back to a clamped number on every character.
  const [customAreaInput, setCustomAreaInput] = useState<string>('1500');
  const [selectedPackageId, setSelectedPackageId] = useState<'hall' | 'standard' | 'premium'>('standard');
  const cardRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal-card]', y: 24 });
  const headingRef = useFitOneLine<HTMLHeadingElement>();

  const MIN_AREA = 300;
  const MAX_AREA = 10000;

  // Slider/preset buttons set both the numeric value and keep the custom
  // input's text in sync; the custom input only pushes a numeric update
  // once it's a valid, in-range number (on blur or Enter), so an
  // in-progress keystroke never snaps the slider/cost figures around.
  const applyArea = (val: number) => {
    setBuiltUpArea(val);
    setCustomAreaInput(String(val));
  };

  const commitCustomArea = () => {
    const parsed = Number(customAreaInput.replace(/[^0-9]/g, ''));
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setCustomAreaInput(String(builtUpArea));
      return;
    }
    const clamped = Math.min(MAX_AREA, Math.max(MIN_AREA, parsed));
    setBuiltUpArea(clamped);
    setCustomAreaInput(String(clamped));
  };

  // Package rates as defined in official quotation documents
  const rates = {
    hall: { rate: 1500, label: 'Residential Hall', sub: 'Open-Span / Base Layout' },
    standard: { rate: 1850, label: 'Standard Residential', sub: 'Most Popular Turnkey' },
    premium: { rate: 2250, label: 'Premium Residential', sub: 'Luxury with POP Ceilings' }
  };

  const currentRate = rates[selectedPackageId].rate;
  const baseCost = builtUpArea * currentRate;
  const gstAmount = Math.round(baseCost * 0.18);
  const totalCostWithGst = baseCost + gstAmount;

  // Engineering material approximations
  const cementBags = Math.round(builtUpArea * 0.42); // ~0.40 - 0.43 bags per sq.ft built-up area
  const steelTons = Number((builtUpArea * 0.0038).toFixed(1)); // ~3.6 - 4.0 kg per sq.ft

  // Purely visual: the displayed figures glide toward each new value
  // (slider drag / preset / tier change) instead of hard-snapping. The
  // underlying calculation above is unchanged — these are display-only.
  const animBaseCost = useAnimatedNumber(baseCost);
  const animGstAmount = useAnimatedNumber(gstAmount);
  const animTotalCost = useAnimatedNumber(totalCostWithGst);
  const animCementBags = useAnimatedNumber(cementBags);
  const animSteelTons = useAnimatedNumber(steelTons, 0.5);

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section className="relative bg-[var(--canvas)] text-[var(--ink)] overflow-hidden border-b border-[var(--line)]">
      {/* Ambient warm glow */}
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-[var(--brick)]/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full py-16 sm:py-20 lg:py-24" ref={cardRef}>
        {/* Stacked layout — title/description block first (full-width,
            centered, matching the SectionHeading pattern used everywhere
            else on the site), THEN the estimator card below it. Was
            previously a side-by-side 12-col grid (title in a sticky left
            rail, card on the right) — that read as two unrelated blocks
            side by side rather than "heading, then this section's actual
            content" like every other section on the page. */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10 sm:mb-14 px-4 sm:px-6">
          <div className="vh-eyebrow justify-center">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Costing Tool</span>
          </div>
          <h2 ref={headingRef} className="vh-heading vh-heading-size text-balance">
            Live Construction <em>Estimator</em>
          </h2>
          <div className="vh-heading-rule" />
          <p className="vh-subtext vh-subtext-size">
            Bhadohi &amp; Eastern UP rates, zero cost escalation, zero hidden charges.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-[var(--canvas-alt)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[var(--ink)]" />
            </div>
            <span className="text-xs text-[var(--ink-soft)]">7-stage milestone payments, pay only on verified work.</span>
          </div>
        </div>

        {/* Interactive Estimator Card — edge-to-edge: only a small ~24px
            side gutter (px-6), no centered max-width box, so the card
            stretches nearly full-viewport-width instead of sitting in a
            narrow column like the rest of the page's content sections. */}
        <div className="px-6">
          {/* Premium refinement, toned down from an earlier "too loud" pass:
              large soft rounded-3xl corners, ONE calm ambient shadow (no
              blue-tinted glow layered on top of it), and a plain thin
              light-grey border — blue is reserved for the top accent line
              and the few interactive elements below, not the card chrome
              itself. */}
          <div
            data-reveal-card
            className="bg-[var(--canvas)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_1px_2px_rgba(10,16,32,0.03),0_24px_56px_-28px_rgba(10,16,32,0.16)] transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,16,32,0.03),0_32px_72px_-28px_rgba(10,16,32,0.22)]"
          >
              {/* Slim gradient accent bar along the very top edge — blue
                  fading to deep navy. The ONE color flourish on the card
                  shell; everything else stays neutral. */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--brick)] via-[var(--brick)] to-[var(--brick-deep)]" />

              {/* Card Header & Tab Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-5 mb-7">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] border border-[var(--brick)]/20 rounded-xl">
                    <Calculator className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-base sm:text-lg text-[var(--ink)]">
                      Live Construction Estimator
                    </h3>
                    <p className="text-sm text-[var(--ink-soft)]">
                      Bhadohi &amp; Eastern UP Turnkey Rates
                    </p>
                  </div>
                </div>

                {/* Sub-tabs — active state is a soft light-blue tint with
                    navy text, not a solid blue fill. Blue stays reserved for
                    the sqft chip and the primary button. */}
                <div className="flex items-center gap-1 bg-[var(--canvas-alt)] p-1 border border-[var(--line)] rounded-full">
                  <button
                    type="button"
                    onClick={() => setActiveTab('estimator')}
                    className={`px-3.5 py-1.5 text-sm transition-all duration-200 cursor-pointer rounded-full ${
                      activeTab === 'estimator'
                        ? 'bg-[var(--brick)]/10 text-[var(--brick-deep)] font-bold'
                        : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                    }`}
                  >
                    Estimate
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`px-3.5 py-1.5 text-sm transition-all duration-200 cursor-pointer rounded-full ${
                      activeTab === 'specs'
                        ? 'bg-[var(--brick)]/10 text-[var(--brick-deep)] font-bold'
                        : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                    }`}
                  >
                    Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('milestones')}
                    className={`px-3.5 py-1.5 text-sm transition-all duration-200 cursor-pointer rounded-full ${
                      activeTab === 'milestones'
                        ? 'bg-[var(--brick)]/10 text-[var(--brick-deep)] font-bold'
                        : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                    }`}
                  >
                    7 Stages
                  </button>
                </div>
              </div>

              {/* Keyed on activeTab so React remounts this wrapper on every
                  tab switch, replaying the vh-tab-fade entrance animation —
                  a cheap way to get a "tab content changed" transition
                  without hand-rolling exit/enter state. */}
              <div key={activeTab} className="vh-tab-fade">
              {/* TAB 1: LIVE ESTIMATOR */}
              {activeTab === 'estimator' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-5">
                    {/* Built-up area slider & custom input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--ink-soft)] font-bold uppercase">Roof Slab Built-up Area</span>
                        {/* Custom sqft entry — was a static read-only badge;
                            now a real editable field so a visitor with an
                            exact plot size (not one of the five presets)
                            can type it directly instead of nudging the
                            slider to approximate it. Commits (clamps to
                            300-10,000 and updates the slider/cost figures)
                            on blur or Enter, not on every keystroke, so a
                            partial value like "17" isn't fought mid-type. */}
                        <div className="flex items-center gap-1.5 bg-[var(--canvas)] border border-[var(--line)] focus-within:border-[var(--brick)] px-3 py-1.5 rounded-full transition-colors">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={customAreaInput}
                            onChange={(e) => setCustomAreaInput(e.target.value)}
                            onBlur={commitCustomArea}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              }
                            }}
                            aria-label="Enter exact built-up area in square feet"
                            className="w-16 bg-transparent text-[var(--ink)] font-bold text-right outline-none [appearance:textfield]"
                          />
                          <span className="text-xs text-[var(--ink-soft)] font-normal">SQ.FT</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="600"
                        max="4000"
                        step="50"
                        value={builtUpArea}
                        onChange={(e) => applyArea(Number(e.target.value))}
                        style={{
                          background: `linear-gradient(to right, var(--brick) 0%, var(--brick) ${((builtUpArea - 600) / (4000 - 600)) * 100}%, var(--line) ${((builtUpArea - 600) / (4000 - 600)) * 100}%, var(--line) 100%)`
                        }}
                        className="vh-range w-full cursor-pointer"
                      />

                      {/* Quick Preset Buttons */}
                      <div className="flex items-center justify-between gap-1.5 pt-1">
                        {[800, 1200, 1500, 2000, 2500].map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => applyArea(area)}
                            className={`flex-1 py-1.5 text-xs border transition-all duration-200 cursor-pointer rounded-full active:scale-95 ${
                              builtUpArea === area
                                ? 'bg-[var(--brick)] text-white border-[var(--brick)] font-bold shadow-[0_3px_10px_rgba(201, 162, 74,0.25)]'
                                : 'bg-[var(--canvas)] text-[var(--ink-soft)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--brick)]/40'
                            }`}
                          >
                            {area} sqft
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Package Selector Pills */}
                    <div className="space-y-1.5">
                      <label className="block text-xs text-[var(--ink-soft)] uppercase">
                        Select Construction Specification Tier:
                      </label>
                      {/* Active tier = a soft light-blue tint (bg-[var(--brick)]/10)
                          with a thin blue border and navy text — NOT a
                          solid saturated blue fill. Only the sqft chip above
                          and the primary CTA button use solid blue. */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPackageId('hall')}
                          className={`p-2.5 text-center border text-sm transition-all duration-200 cursor-pointer rounded-lg active:scale-95 ${
                            selectedPackageId === 'hall'
                              ? 'bg-[var(--brick)]/[0.08] border-[var(--brick)]/30 text-[var(--brick-deep)] font-bold'
                              : 'bg-[var(--canvas)] border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--brick)]/30'
                          }`}
                        >
                          <div>Hall</div>
                          <div className="font-bold text-[var(--brick)]">₹1,500</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPackageId('standard')}
                          className={`p-2.5 text-center border text-sm transition-all duration-200 cursor-pointer rounded-lg active:scale-95 ${
                            selectedPackageId === 'standard'
                              ? 'bg-[var(--brick)]/[0.08] border-[var(--brick)]/30 text-[var(--brick-deep)] font-bold'
                              : 'bg-[var(--canvas)] border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--brick)]/30'
                          }`}
                        >
                          <div>Standard</div>
                          <div className="font-bold text-[var(--brick)]">₹1,850</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPackageId('premium')}
                          className={`p-2.5 text-center border text-sm transition-all duration-200 cursor-pointer rounded-lg active:scale-95 ${
                            selectedPackageId === 'premium'
                              ? 'bg-[var(--brick)]/[0.08] border-[var(--brick)]/30 text-[var(--brick-deep)] font-bold'
                              : 'bg-[var(--canvas)] border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--brick)]/30'
                          }`}
                        >
                          <div>Premium</div>
                          <div className="font-bold text-[var(--brick)]">₹2,250</div>
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[var(--ink-soft)]">
                      *Based on horizontal built-up slab area. Staircases billed at 150%, Double slab at 50%.
                    </div>
                  </div>

                  {/* Result summary — ONE cohesive panel (not a dark box
                      glued to a separate grey box). Soft, faint-blue-tinted
                      light background, thin subtle divider lines between
                      sections instead of a hard color-contrast seam, and
                      the headline total is the one bold navy focal point.
                      Calm and minimal rather than a "dashboard" callout. */}
                  <div className="bg-[var(--brick)]/[0.035] border border-[var(--brick)]/10 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm text-[var(--ink-soft)]">
                        <span>Base Cost ({builtUpArea} sqft × ₹{currentRate}):</span>
                        <span className="font-bold text-[var(--ink)] tabular-nums">{formatRupees(animBaseCost)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-[var(--ink-soft)]">
                        <span>Applicable GST (18% Statutory):</span>
                        <span className="text-[var(--ink)] tabular-nums">{formatRupees(animGstAmount)}</span>
                      </div>
                    </div>

                    <div className="border-t border-[var(--brick)]/10 pt-4 flex items-baseline justify-between">
                      <div>
                        <span className="block text-xs text-[var(--ink-soft)] uppercase tracking-wide">
                          Est. Total Turnkey Handover
                        </span>
                        <span className="text-xs text-[var(--ink-soft)] font-semibold">Zero Cost Escalation Guarantee</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-[#0A1020] tabular-nums">
                          {formatLakhs(animTotalCost)}
                        </div>
                        <div className="text-xs text-[var(--ink-soft)] tabular-nums">
                          ({formatRupees(animTotalCost)})
                        </div>
                      </div>
                    </div>

                    {/* Material Projection strip — same panel, just a thin
                        divider above it rather than a separate box with its
                        own background/border. */}
                    <div className="border-t border-[var(--brick)]/10 pt-4 grid grid-cols-3 gap-2 text-center text-xs text-[var(--ink-soft)]">
                      <div>
                        <span className="block text-[var(--ink-soft)]">Est. Cement</span>
                        <strong className="text-[var(--ink)] text-sm tabular-nums">~{Math.round(animCementBags)} Bags</strong>
                      </div>
                      <div>
                        <span className="block text-[var(--ink-soft)]">Fe 550D Steel</span>
                        <strong className="text-[var(--ink)] text-sm tabular-nums">~{animSteelTons.toFixed(1)} Tons</strong>
                      </div>
                      <div>
                        <span className="block text-[var(--ink-soft)]">Milestone Pass</span>
                        <strong className="text-[var(--ink)] text-sm">7 Verified Stages</strong>
                      </div>
                    </div>

                    {/* Direct Action Button — the ONE strong solid-blue
                        element in this panel. */}
                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal(selectedPackageId)}
                      className="vh-btn-pill w-full py-3.5 font-sans font-semibold text-sm uppercase tracking-wider active:scale-[0.98] group/cta"
                    >
                      <span>Request Official BOQ for {builtUpArea} SQ.FT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: CIVIL SPECS COMPARISON */}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-[var(--canvas-alt)] border border-[var(--line)] p-4 space-y-2 rounded-lg">
                    <div className="font-bold text-[var(--ink)] text-sm border-b border-[var(--line)] pb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Authentic Civil Engineering Mortar Ratios</span>
                    </div>
                    <div className="space-y-1.5 text-[var(--ink-soft)] text-xs">
                      <div className="flex justify-between">
                        <span>Foundation PCC Bed:</span>
                        <strong className="text-[var(--ink)]">8:5:1</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>RCC Slabs & Columns:</span>
                        <strong className="text-[var(--ink)]">3:2:1</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>9" Exterior Brickwork:</span>
                        <strong className="text-[var(--ink)]">6:1</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>4.5" Partition Brickwork:</span>
                        <strong className="text-[var(--ink)]">5:1</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>External Wall Plaster:</span>
                        <strong className="text-[var(--ink)]">15mm Double Coat (6:1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Internal Wall Plaster:</span>
                        <strong className="text-[var(--ink)]">10mm Sponge Finish (6:1)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[var(--canvas-alt)] border border-[var(--line)] p-4 space-y-1.5 text-xs text-[var(--ink-soft)] rounded-lg">
                      <div className="font-bold text-[var(--ink)] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approved Material Standards</span>
                      </div>
                      <p className="text-[var(--ink-soft)]">
                        UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial packaging), Fe 550D TMT rebar (Tata, Jindal, Kamdhenu), 1st class Awwal kiln bricks, Astral/Supreme CPVC plumbing lines, and Godrej locksets.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('/packages')}
                      className="vh-btn-pill vh-btn-pill-solid w-full py-2.5 text-sm font-bold"
                    >
                      View Full Material Specification Schedule →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: 7-STAGE MILESTONE SCHEDULE */}
              {activeTab === 'milestones' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-[var(--canvas-alt)] border border-[var(--line)] p-4 space-y-2 rounded-lg md:col-span-2">
                    <div className="font-bold text-[var(--ink)] text-sm border-b border-[var(--line)] pb-2 flex items-center justify-between">
                      <span>7 Verified Payment Milestones</span>
                      <span className="text-xs text-[var(--ink)] bg-[var(--canvas-alt)] px-2 py-0.5 border border-[var(--line)] rounded-full">
                        Total: 100%
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                      {[
                        { stage: 'Stage 1', pct: '20%', label: 'Booking & Contract Signing' },
                        { stage: 'Stage 2', pct: '10%', label: 'Plinth Level (Footings & Tie-beams)' },
                        { stage: 'Stage 3', pct: '15%', label: 'Column Casting till Beam Bottom' },
                        { stage: 'Stage 4', pct: '10%', label: 'Brick Masonry (Jodai) of respective floor' },
                        { stage: 'Stage 5', pct: '20%', label: 'RCC Roof Slab Casting (Dhalai)' },
                        { stage: 'Stage 6', pct: '5%', label: 'Plaster Work (Internal & External)' },
                        { stage: 'Stage 7', pct: '20%', label: 'Finishing (Flooring, Bath, Paint & Handover)' }
                      ].map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1 border-b border-[var(--line)] last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--ink)] font-bold w-14">{s.stage}:</span>
                            <span className="text-[var(--ink-soft)] text-xs sm:text-sm">{s.label}</span>
                          </div>
                          <span className="font-bold text-[var(--ink)] bg-[var(--canvas-alt)] border border-[var(--line)] px-2 py-0.5 text-xs rounded-full">
                            {s.pct}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenConsultationModal}
                    className="vh-btn-pill vh-btn-pill-solid w-full py-2.5 text-sm font-bold md:col-span-2"
                  >
                    Discuss Milestones with Site Engineer →
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

