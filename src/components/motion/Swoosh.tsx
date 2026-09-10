import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './swoosh.css';

interface SwooshProps {
  /** Width of the stroke in ch units, so it scales with the heading. */
  width?: number;
  className?: string;
}

/**
 * The thread, reappearing small.
 *
 * A single piped stroke that draws itself under a heading as the heading
 * arrives. Same gesture and same colour as `BrandThread`, at a different
 * scale — which is what makes the motif read as one language rather than two
 * unrelated decorations.
 *
 * Used on a couple of headings only. Under every heading it would stop being
 * a motif and start being a rule.
 */
export function Swoosh({ width = 8, className = '' }: SwooshProps) {
  const root = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const path = el.querySelector('path');
    if (!path) return;

    if (prefersReducedMotion()) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={root}
      className={`swoosh ${className}`}
      style={{ width: `${width}ch` }}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* A single unsteady stroke — piped, not ruled. */}
      <path
        d="M 2 8 C 18 2, 36 11, 54 6 C 72 1, 92 10, 118 4"
        pathLength={1}
        fill="none"
      />
    </svg>
  );
}
