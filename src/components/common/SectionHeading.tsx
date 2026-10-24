import React from 'react';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { useFitOneLine } from '../../lib/useFitOneLine';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightWords?: string[];
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
  /** Tighter vertical rhythm (smaller gap above the description, smaller
   * bottom margin on the whole block) for sections that want a more
   * compact header — default spacing (used everywhere else) is unchanged
   * unless this is explicitly opted into. */
  tight?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightWords = [],
  description,
  align = 'center',
  className = '',
  tight = false
}) => {
  const isCenter = align === 'center';
  // More noticeable than the site's default scroll-reveal (which is
  // deliberately minimal elsewhere): a bigger rise distance and a slower,
  // slightly overshooting ease so every section title visibly animates in
  // as you scroll to it, rather than just crisply appearing.
  const ref = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal-item]',
    stagger: 0.12,
    y: 32,
    duration: 0.8,
    ease: 'back.out(1.4)'
  });
  // Auto-shrinks just this heading's font-size if its specific title text
  // is too long to fit the container on one line at the shared
  // .vh-heading-size — short titles never trigger a shrink and keep their
  // full size; only a long one like "Why Homeowners & Businesses Trust Us"
  // gets ratioed down, rather than every heading site-wide being capped to
  // whatever size the longest title needs.
  const fitRef = useFitOneLine<HTMLHeadingElement>();

  const renderHighlightedTitle = () => {
    if (!highlightWords || highlightWords.length === 0) {
      return title;
    }

    const parts = title.split(new RegExp(`(${highlightWords.join('|')})`, 'gi'));
    return parts.map((part, idx) => {
      const isMatch = highlightWords.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return <em key={idx}>{part}</em>;
      }
      return part;
    });
  };

  return (
    <div
      ref={ref}
      className={`max-w-5xl ${tight ? 'mb-6 sm:mb-8' : 'mb-14 sm:mb-20'} ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div data-reveal-item className={`vh-eyebrow mb-4 ${isCenter ? 'justify-center' : ''}`}>
          {badge}
        </div>
      )}

      <h2 ref={fitRef} data-reveal-item className="vh-heading vh-heading-size">
        {renderHighlightedTitle()}
      </h2>

      <div data-reveal-item className={`vh-heading-rule ${isCenter ? '' : 'is-left'}`} />

      {description && (
        <p
          data-reveal-item
          className={`vh-subtext vh-subtext-size ${tight ? 'mt-3' : 'mt-6'} ${isCenter ? 'max-w-2xl mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
