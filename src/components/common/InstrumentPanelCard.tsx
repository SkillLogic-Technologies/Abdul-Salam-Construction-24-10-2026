import React, { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface InstrumentPanelCardProps {
  index: number;
  pillar: {
    icon: LucideIcon;
    title: string;
    desc: string;
  };
}

/**
 * "Live Instrument Panel" trust-pillar card.
 *
 * v1 (flat icon+text row) → v2 (oversized ghost numeral, dashed rotating
 * ring) had a real overflow bug, fixed in v3 by pinning a card min-height.
 * v4: the numeral is gone per explicit feedback (felt like clutter, not a
 * refinement), and the icon itself carries the visual weight instead —
 * bigger, bolder stroke, brand blue instead of the muted-ink/gold
 * treatment v3 had. v5 (this version): matches the individually-bordered,
 * shadowed, hover-lift "premium card" treatment given to the Explore
 * Project Types cards right below this section — each pillar is now its
 * own standalone white card (own border/radius/shadow) instead of 4 panels
 * sharing one outer border with thin dividers between them.
 */
export const InstrumentPanelCard: React.FC<InstrumentPanelCardProps> = ({ index: _index, pillar }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = pillar.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Only set an actual 3D transform (with its perspective()) while a
    // real tilt is in effect. Leaving `perspective(900px)` permanently
    // applied — even with rotateX/Y at 0deg — forces the browser to keep
    // this element (and its text) in a separate 3D rendering/compositing
    // context all the time, which is what was making the card's body text
    // look soft/blurry ("pixel fata fata") at rest, not just on hover.
    el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      data-reveal
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative isolate min-h-[15rem] flex flex-col bg-[var(--canvas)] border border-[var(--line)] rounded-2xl shadow-[0_1px_3px_rgba(10,16,32,0.04)] hover:shadow-[0_20px_40px_-16px_rgba(201, 162, 74,0.22)] hover:border-[var(--brick)]/40 hover:-translate-y-1 p-7 sm:p-8 overflow-hidden transition-[box-shadow,border-color,transform] duration-300"
      style={{ transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.3s' }}
    >
      {/* Soft directional glow that fades in on hover — same cue used on
          the Explore Project Types cards, for a consistent "premium
          surface" feel between the two sections. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[var(--brick)]/0 group-hover:bg-[var(--brick)]/[0.08] blur-2xl transition-colors duration-500"
      />

      {/* Hairline accent that traces in along the top edge on hover, now in
          the brand blue rather than gold. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-[var(--brick)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />

      <div className="relative z-10 flex flex-col flex-1 items-center text-center">
        {/* Icon + slow, discreet rotating instrument ring — icon itself is
            the focal element (bigger, bolder stroke, brand blue), and the
            whole card is centered rather than left-aligned. */}
        <div className="relative w-20 h-20 mb-5">
          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 w-full h-full animate-instrument-spin text-[var(--brick)]/30 group-hover:text-[var(--brick)] transition-colors duration-500"
            aria-hidden="true"
          >
            <circle
              cx="40"
              cy="40"
              r="37"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="1.5 6"
            />
          </svg>
          <div className="absolute inset-[8px] rounded-full bg-[var(--brick)]/[0.08] border border-[var(--brick)]/25 flex items-center justify-center group-hover:bg-[var(--brick)]/[0.14] group-hover:border-[var(--brick)]/50 transition-colors duration-500">
            <Icon className="w-9 h-9 text-[var(--brick)]" strokeWidth={2.25} />
          </div>
        </div>

        <h4 className="font-sans font-semibold text-[13px] text-[var(--ink)] uppercase tracking-[0.14em]">
          {pillar.title}
        </h4>
        <p className="text-sm text-[var(--ink)] mt-2.5 leading-relaxed font-normal max-w-[24ch]">
          {pillar.desc}
        </p>

        <div className="mt-auto pt-5">
          <div className="h-px w-8 mx-auto bg-[var(--line)] group-hover:w-12 group-hover:bg-[var(--brick)] transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};
