import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './brand-thread.css';

/**
 * The BeyondBakes thread.
 *
 * One continuous line, piped from the top of the page to the bottom, that the
 * visitor draws as they scroll. It weaves left and right between the sections
 * so the page reads as one gesture rather than a stack of blocks.
 *
 * Two strokes travel together — a blush line and a paler cream line offset
 * behind it — which is what stops it reading as a plain border and starts it
 * reading as icing laid down by a piping bag.
 *
 * Geometry notes:
 * - The viewBox is a normalised 0–100 square stretched over the whole document
 *   (`preserveAspectRatio="none"`), so the path is written in percentages and
 *   adapts to any page height without recalculating control points.
 * - `vector-effect="non-scaling-stroke"` keeps the line hairline-thin despite
 *   that very non-uniform scale.
 * - `pathLength={1}` normalises the dash maths, so drawing is simply
 *   `strokeDashoffset` 1 → 0. This is what DrawSVG does, without the paid plugin.
 *
 * It sits at z-index 0 with content above it, so it passes *behind* the
 * photography and type — visible in the open margins, implied everywhere else.
 */

/**
 * Weaves through: hero → intro → reveal → signatures → craft → story → social → CTA.
 *
 * Fifteen segments rather than a handful: the page is many viewports tall, so a
 * gentle whole-page S would present as a straight vertical line on any single
 * screen. This oscillates often enough that curvature is visible at any scroll
 * position, with the amplitude varied so it reads as piped rather than plotted.
 */
const PATH =
  'M 50 0.0 C 50 2.6, 78.0 4.1, 78.0 6.7 C 78.0 9.2, 22.7 10.8, 22.7 13.3 C 22.7 15.9, 68.6 17.4, 68.6 20.0 C 68.6 22.6, 38.6 24.1, 38.6 26.7 C 38.6 29.2, 63.7 30.8, 63.7 33.3 C 63.7 35.9, 27.2 37.4, 27.2 40.0 C 27.2 42.6, 78.9 44.1, 78.9 46.7 C 78.9 49.2, 24.7 50.8, 24.7 53.3 C 24.7 55.9, 65.9 57.4, 65.9 60.0 C 65.9 62.6, 39.0 64.1, 39.0 66.7 C 39.0 69.2, 66.0 70.8, 66.0 73.3 C 66.0 75.9, 24.7 77.4, 24.7 80.0 C 24.7 82.6, 78.9 84.1, 78.9 86.7 C 78.9 89.2, 27.3 90.8, 27.3 93.3 C 27.3 95.9, 50 97.4, 50 100.0';

export function BrandThread() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const paths = el.querySelectorAll<SVGPathElement>('.thread__line');

    if (prefersReducedMotion()) {
      // Present, but already drawn — no scroll-linked motion.
      gsap.set(paths, { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        paths,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          // The trailing line lags very slightly behind the leading one.
          stagger: 0.02,
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div className="thread" ref={root} aria-hidden="true">
      <svg
        className="thread__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        {/* Cream underline, offset a touch — gives the stroke body. */}
        <path
          className="thread__line thread__line--under"
          d={PATH}
          pathLength={1}
          fill="none"
        />
        <path className="thread__line thread__line--over" d={PATH} pathLength={1} fill="none" />
      </svg>
    </div>
  );
}
