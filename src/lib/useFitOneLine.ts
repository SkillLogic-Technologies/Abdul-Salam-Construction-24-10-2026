import { useEffect, useRef } from 'react';

/**
 * Shrinks an element's font-size just enough to fit its text on one line,
 * measured against its own available width — a per-element complement to
 * .vh-heading-size's viewport-based clamp(), which scales with screen width
 * but has no notion of how long a given heading's actual string is. A
 * short title (e.g. "Explore Project Types") sits comfortably under the
 * clamp's max size and never triggers a shrink; a long one (e.g. "Why
 * Homeowners & Businesses Trust Us") would otherwise wrap to a second line
 * at that same max size, so this measures the rendered `scrollWidth`
 * against `clientWidth` and ratios the font-size down until it fits.
 *
 * Single-pass ratio scale (not a binary-search loop) — font metrics scale
 * near-linearly with size for a fixed string, so one measurement + one
 * corrective resize gets within a pixel or two of the true fit, which is
 * plenty for a heading (unlike, say, fitting a canvas-rendered label
 * pixel-perfectly). Re-runs on window resize (debounced) so it re-fits
 * across breakpoints instead of freezing at whatever size it first
 * measured on mount.
 *
 * Skips entirely under reduced-motion? No — this isn't an animation, it's
 * a one-time layout measurement, so it always runs; there's nothing to
 * disable for motion-sensitivity here.
 */
export function useFitOneLine<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Reset to the CSS-defined size/wrap before measuring, so repeated
      // calls (e.g. on resize, after a previous shrink) always measure
      // against the element's natural/full size rather than compounding a
      // shrink from the last pass.
      el.style.fontSize = '';
      el.style.whiteSpace = '';

      // The element's OWN clientWidth, read while it's still wrapping
      // normally, is the true available width — whether that width comes
      // from the element's own max-width (e.g. a heading with `max-w-lg`
      // right on it) or is inherited from an ancestor's constraint. Reading
      // the parent's width instead would be wrong whenever the element has
      // a tighter max-width of its own than its parent does.
      const available = el.clientWidth;

      // Force single-line for the *second* measurement — otherwise the
      // browser has already wrapped the text (scrollWidth would just be
      // the current line's width, not the full string) and the "would this
      // overflow on one line" question can't be answered.
      const prevWhiteSpace = el.style.whiteSpace;
      el.style.whiteSpace = 'nowrap';
      const natural = el.scrollWidth;

      if (available <= 0 || natural <= available) {
        el.style.whiteSpace = prevWhiteSpace;
        return;
      }

      const computed = window.getComputedStyle(el).fontSize;
      const naturalSize = parseFloat(computed);
      if (!Number.isFinite(naturalSize) || naturalSize <= 0) {
        el.style.whiteSpace = prevWhiteSpace;
        return;
      }

      // Small safety margin (0.98) so the fitted size lands just under the
      // container width rather than exactly at it, where sub-pixel
      // rounding could still trigger a wrap.
      const ratio = (available / natural) * 0.98;
      el.style.fontSize = `${naturalSize * ratio}px`;
      // Keep nowrap: the whole point is a guaranteed single line at the
      // shrunk size — letting it wrap again after shrinking would defeat
      // the fit.
      el.style.whiteSpace = 'nowrap';
    };

    fit();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fit, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return ref;
}
