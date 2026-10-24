import React, { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ImmersiveProjectCardProps {
  image: string;
  title: string;
  activeCount: number;
  Icon: LucideIcon;
  onClick: () => void;
}

/**
 * "Explore Project Types" card — immersive 3D depth-parallax treatment,
 * replacing the plain white bordered card (which read as generic/basic —
 * explicit feedback: "bahut basic lag raha, main premium expect kar raha
 * hu"). Three things make this genuinely immersive rather than a re-skin:
 *
 *   1. Real project photography as the card's own content (not a flat
 *      icon-only card) — the actual substance the earlier version lacked.
 *   2. Three independent depth layers that shift at different rates under
 *      the same mouse-move sample: the photo (furthest back, moves least),
 *      a soft shadow/vignette (mid), and the icon+text (frontmost, moves
 *      most) — the classic multi-plane parallax-in-a-card technique that
 *      reads as real depth rather than a flat hover effect.
 *   3. A true perspective tilt on the whole card driven by the same cursor
 *      sample, so the layers' relative shift and the card's own rotation
 *      reinforce each other instead of feeling like two unrelated effects.
 *
 * All layer offsets are applied via `transform` only (translate3d/
 * perspective), read via rAF-throttled mousemove — no layout thrash, and
 * the update itself is cheap arithmetic, consistent with this codebase's
 * established performance approach for interactive effects.
 */
export const ImmersiveProjectCard: React.FC<ImmersiveProjectCardProps> = ({
  image,
  title,
  activeCount,
  Icon,
  onClick
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const pending = useRef<{ px: number; py: number } | null>(null);

  const applyTilt = () => {
    rafId.current = 0;
    const sample = pending.current;
    const card = cardRef.current;
    const photo = photoRef.current;
    const content = contentRef.current;
    if (!sample || !card || !photo || !content) return;
    const { px, py } = sample; // -0.5..0.5 each axis

    card.style.transform = `perspective(1000px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
    // Photo is the "back" layer — shifts the least, and is pre-scaled
    // (110%) so this small shift never reveals its edges.
    photo.style.transform = `translate3d(${(px * -10).toFixed(1)}px, ${(py * -10).toFixed(1)}px, 0) scale(1.1)`;
    // Icon+text is the "front" layer — shifts the most, reinforcing the
    // sense that it's floating above the photo rather than printed on it.
    content.style.transform = `translate3d(${(px * 14).toFixed(1)}px, ${(py * 14).toFixed(1)}px, 0)`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pending.current = {
      px: (e.clientX - rect.left) / rect.width - 0.5,
      py: (e.clientY - rect.top) / rect.height - 0.5
    };
    if (!rafId.current) rafId.current = requestAnimationFrame(applyTilt);
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    }
    pending.current = null;
    const card = cardRef.current;
    const photo = photoRef.current;
    const content = contentRef.current;
    if (card) card.style.transform = '';
    if (photo) photo.style.transform = 'scale(1.1)';
    if (content) content.style.transform = '';
  };

  return (
    <button
      ref={cardRef}
      type="button"
      data-reveal
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-end text-left h-[15rem] w-full rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 shadow-[0_1px_3px_rgba(10,16,32,0.08)] hover:shadow-[0_28px_50px_-20px_rgba(201, 162, 74,0.35)]"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s' }}
    >
      {/* Back layer: real project photo, oversized so the parallax shift
          never reveals empty edges. Darkened so white foreground text stays
          legible against any photo. */}
      <div
        ref={photoRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ transform: 'scale(1.1)', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Mid layer: gradient scrim for text legibility + a blue wash on
          hover that reinforces the brand accent without a flat overlay. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 group-hover:from-[#001a38]/90 group-hover:via-black/40 transition-colors duration-500" />

      {/* Front layer: icon + title, shifts most under mouse-move. */}
      <div ref={contentRef} className="relative z-10 p-5 will-change-transform" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <span className="inline-flex w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 items-center justify-center mb-3 group-hover:bg-[var(--brick)]/90 group-hover:border-[var(--brick)] transition-colors duration-300">
          <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
        </span>
        <p className="text-sm font-semibold text-white leading-snug line-clamp-2">{title}</p>
        <p className="text-[11px] text-white/70 font-medium mt-1 uppercase tracking-wider">{activeCount} Active Sites</p>
      </div>
    </button>
  );
};
