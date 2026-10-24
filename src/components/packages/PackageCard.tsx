import React, { useRef, useState } from 'react';
import { ConstructionPackage } from '../../types';
import { Button } from '../common/Button';
import {
  Check,
  FileText,
  Sparkles,
  Heart
} from 'lucide-react';

interface PackageCardProps {
  pkg: ConstructionPackage;
  isPopular?: boolean;
  onSelectPackage: (packageId: string) => void;
  onBookConsultation?: () => void;
  compactMode?: boolean;
}

// Pricing-card visual language: a soft gradient surface, a centered
// name/price/tagline header with a bottom divider, and flat rows with a
// filled-circle checkmark for every included item. The "Included
// Engineering Standards" pills and the expandable itemized-material-specs
// drawer (per-category brand/rate caps) were removed per explicit request
// — the card now ends with the highlights list, then the action buttons.
// Every highlight row uses the filled blue check (not a gray/X state)
// since every highlight in this data set is something the package
// actually includes — there's nothing genuinely "excluded" to mark.
export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isPopular = false,
  onSelectPackage,
  compactMode = false
}) => {
  const [isSaved, setIsSaved] = useState(false);

  // Phone-only highlight carousel: the vertical checklist reads fine on
  // desktop/tablet where there's height to spare, but on a narrow phone
  // 7-8 rows of wrapped text made the card extremely tall (real feedback:
  // "itna scroll karna padta hai"). Below sm:, the same highlight text
  // instead renders as horizontally snap-scrolling mini-cards with dot
  // indicators — same content, same order, just paged sideways so the
  // card's height stays roughly constant regardless of how many highlights
  // a given package has.
  const [activeHighlightSlide, setActiveHighlightSlide] = useState(0);
  const highlightRailRef = useRef<HTMLDivElement>(null);

  const handleHighlightScroll = () => {
    const el = highlightRailRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    if (slideWidth <= 0) return;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setActiveHighlightSlide(idx);
  };

  const scrollToHighlight = (idx: number) => {
    const el = highlightRailRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div
      className={`relative rounded-2xl border p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br transition-shadow duration-300 ${
        isPopular
          ? 'border-[var(--brick)]/30 from-[var(--brick)]/[0.06] to-[var(--brick)]/[0.01] shadow-[0_20px_50px_-24px_rgba(201, 162, 74,0.35)]'
          : 'border-[var(--line)] from-[var(--canvas-alt)] to-[var(--canvas)] shadow-elevate'
      }`}
    >
      {/* Save icon — top-right, floating over the gradient surface */}
      <button
        type="button"
        onClick={() => setIsSaved((v) => !v)}
        aria-label="Save package"
        aria-pressed={isSaved}
        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--canvas)] hover:bg-[var(--brick)]/10 flex items-center justify-center border border-[var(--line)] transition-colors z-10 cursor-pointer"
      >
        <Heart className={`w-3.5 h-3.5 transition-colors ${isSaved ? 'fill-[var(--ink)] text-[var(--ink)]' : 'text-[var(--ink)]'}`} />
      </button>

      {/* Header — badge/tier pill, centered name + price + tagline, bottom divider */}
      <div className="flex flex-col items-center text-center border-b border-[var(--line)] pb-6">
        <div className="mb-4 px-3 py-1.5 bg-[var(--canvas)] text-[var(--ink)] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[var(--line)] flex items-center gap-1.5">
          {pkg.badge ? (
            <>
              <Sparkles className="w-3 h-3 text-[var(--brick)]" />
              <span>{pkg.badge}</span>
            </>
          ) : (
            <span>{pkg.tier} TIER</span>
          )}
        </div>

        <span className="mb-3 font-sans font-semibold text-lg text-[var(--ink)]">{pkg.name}</span>

        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-4xl font-bold text-[var(--ink)] tracking-tight">
            ₹{pkg.ratePerSqFt.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-[var(--ink-soft)]">/sq.ft</span>
        </div>
        <span className="text-xs font-semibold text-[var(--ink-soft)] mt-1">{pkg.gstRate}</span>

        <span className="text-[var(--ink-soft)] text-sm mt-3">{pkg.tagline}</span>

        {pkg.officialPdfRef && (
          <span className="text-[10px] font-semibold text-[var(--ink-soft)] flex items-center gap-1 mt-2">
            <FileText className="w-3 h-3 text-[var(--ink)]" />
            <span>Official Proposal Available</span>
          </span>
        )}
      </div>

      {/* Feature rows — checkmark-circle list. Desktop/tablet: plain
          vertical list (unchanged). Phone: the same items as a horizontal
          snap-scroll carousel with dot indicators, so a package with many
          highlights doesn't force a much taller card just on small
          screens. */}
      {(() => {
        const featureItems: React.ReactNode[] = [
          <>
            Turnkey rate: <strong className="text-[var(--ink)]">calculated on standard built-up slab area</strong> (100% slab, 50% do chhatti, 150% stairs)
          </>,
          ...pkg.highlights.slice(0, compactMode ? 4 : 6).map((hl) => <>{hl}</>)
        ];

        return (
          <div className="py-7">
            {/* Desktop/tablet — plain vertical list */}
            <div className="hidden sm:block space-y-3.5">
              {featureItems.map((content, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
                  <span className="grid size-5 flex-shrink-0 place-content-center rounded-full bg-[var(--brick)] text-white">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span>{content}</span>
                </div>
              ))}
            </div>

            {/* Phone — horizontal snap-scroll mini-cards + dot indicators */}
            <div className="sm:hidden">
              <div
                ref={highlightRailRef}
                onScroll={handleHighlightScroll}
                className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6"
              >
                {featureItems.map((content, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 snap-start px-1"
                  >
                    <div className="flex items-start gap-3 text-sm text-[var(--ink-soft)] bg-[var(--canvas)] border border-[var(--line)] rounded-xl p-4 min-h-[6.5rem]">
                      <span className="grid size-5 flex-shrink-0 place-content-center rounded-full bg-[var(--brick)] text-white">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span>{content}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {featureItems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to highlight ${i + 1}`}
                    onClick={() => scrollToHighlight(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      activeHighlightSlide === i ? 'w-5 bg-[var(--brick)]' : 'w-1.5 bg-[var(--line)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BOTTOM ACTION BUTTON — the "View Official BOQ & Quotation" link
          that used to sit below this was removed per explicit request. */}
      <div className="pt-6 mt-2 border-t border-[var(--line)]">
        <Button
          variant={isPopular ? 'primary' : 'secondary'}
          size="md"
          className="w-full justify-center"
          onClick={() => onSelectPackage(pkg.id)}
        >
          <span>SELECT {pkg.name.toUpperCase()}</span>
        </Button>
      </div>
    </div>
  );
};
