import React from 'react';
import logoImg from '../../logo.png';
import logoFullColorImg from '../../Abdul-Salam-Logo/logo-full-color.png';

interface LogoProps {
  /** 'dark' selects the full-color logo (navy + gold wordmark, PNG canvas
   * is genuinely transparent outside the icon's own navy tile) — for use
   * over a dark or image background, e.g. the Header's dark-glass bar over
   * the Hero. Placed directly, no extra card, so it reads as part of the
   * same bar as the nav links and CTA rather than a separate floating
   * element. Every other variant uses the default logo.png. */
  variant?: 'light' | 'dark' | 'footer' | 'full' | 'emblem' | 'header';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Hide the "CONSTRUCTION COMPANY" / tagline lines below the sm breakpoint,
   * so a narrow header row (logo + hamburger + CTA) never wraps or overflows.
   * Kept as a prop for API compatibility — both logo images already bake
   * their own wordmark/tagline in, so this has no visual effect on the
   * image itself, only on layout sizing below. */
  compactOnMobile?: boolean;
}

// Two flattened company logo images (emblem + "ABDUL-SALAM CONSTRUCTION"
// wordmark baked in):
//   - src/logo.png                             — solid white background,
//                          default, for light surfaces.
//   - src/Abdul-Salam-Logo/logo-full-color.png — same mark on a genuinely
//                          transparent PNG canvas (only the icon's own
//                          navy tile is opaque), for the Header's dark
//                          glass bar over the Hero (see `dark` variant).
const sizeClasses = {
  sm: 'h-12 sm:h-14',
  md: 'h-11 sm:h-12 md:h-14',
  lg: 'h-16 sm:h-20 md:h-24',
  xl: 'h-24 sm:h-28 md:h-32'
};

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', size = 'md' }) => {
  const isTransparentContext = variant === 'dark';

  return (
    <span className={className}>
      <img
        src={isTransparentContext ? logoFullColorImg : logoImg}
        alt="M/S Abdul Salam Constructions Company"
        className={`${sizeClasses[size]} w-auto object-contain select-none block`}
        draggable={false}
        decoding="async"
      />
    </span>
  );
};
