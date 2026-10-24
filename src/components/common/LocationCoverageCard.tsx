import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocationCoverageCardProps {
  name: string;
  status: string;
}

/**
 * Service-coverage location card ("Bhadohi", "Varanasi", "& Nearby Areas",
 * etc.) — a compact 3D mouse-tilt card, same technique as
 * InstrumentPanelCard.tsx / ImmersiveProjectCard.tsx (perspective +
 * rotateX/rotateY driven by cursor position, transform/opacity only so it
 * stays compositor-only). Kept as its own small component rather than
 * inlining the tilt math into the section's .map() so each of the 8 cards
 * gets its own ref/handlers without re-running the mouse-move listener
 * setup on every render of the parent section.
 */
export const LocationCoverageCard: React.FC<LocationCoverageCardProps> = ({ name, status }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // perspective() only applied while actually tilting (see
    // InstrumentPanelCard.tsx for why: a permanent 3D context on a resting
    // card softens its text rendering for no benefit).
    el.style.transform = `perspective(700px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(6px)`;
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
      className="group relative isolate bg-[var(--canvas)] border border-[var(--line)] rounded-xl p-4 text-center cursor-pointer overflow-hidden shadow-[0_1px_2px_rgba(10,16,32,0.04)] hover:border-[var(--brick)]/40 hover:shadow-[0_20px_36px_-16px_rgba(201, 162, 74,0.28)] transition-[box-shadow,border-color] duration-300"
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.3s', transformStyle: 'preserve-3d' }}
    >
      {/* Soft directional glow, same cue as InstrumentPanelCard/ImmersiveProjectCard */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[var(--brick)]/0 group-hover:bg-[var(--brick)]/[0.1] blur-2xl transition-colors duration-500"
      />

      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[var(--brick)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mb-0.5" />
        <p className="text-xs font-bold text-[var(--ink)]">{name}</p>
        <span className="text-[10px] text-[var(--ink-soft)] font-semibold">{status}</span>
      </div>
    </div>
  );
};
