import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { revealLines } from '../../lib/animations';
import './reveal-text.css';

interface RevealTextProps {
  /** Each entry becomes one masked line. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  stagger?: number;
  start?: string;
  children?: ReactNode;
}

/**
 * Masked, line-by-line reveal for editorial headlines.
 *
 * Used for the handful of moments that carry the page — not for every
 * heading. Each line slides up from behind its own overflow edge.
 */
export function RevealText({
  lines,
  as: Tag = 'h2',
  className = '',
  stagger = 0.09,
  start = 'top 82%',
}: RevealTextProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inners = Array.from(el.querySelectorAll<HTMLElement>('.reveal-line__inner'));
      revealLines(inners, { stagger, start });
    }, el);

    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <Tag ref={root} className={`reveal-text ${className}`}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          {/* The trailing space is collapsed visually by the block layout, but
              keeps assistive tech from running two lines into one word. */}
          <span className="reveal-line__inner">
            {line}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
