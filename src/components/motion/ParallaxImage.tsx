import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { parallax } from '../../lib/animations';
import { Figure } from '../common/Figure';

interface ParallaxImageProps {
  src: string;
  alt: string;
  objectPosition?: string;
  ratio?: string;
  /** Percentage of travel across the full scroll pass. Keep it small. */
  strength?: number;
  className?: string;
  placeholderLabel?: string;
  priority?: boolean;
}

/**
 * A photograph that drifts slightly against the scroll inside its frame.
 *
 * The image is oversized vertically so the drift never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  objectPosition,
  ratio,
  strength = 12,
  className = '',
  placeholderLabel,
  priority,
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = frame.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelector('.figure');
      if (inner) parallax(inner, strength);
    }, el);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div
      ref={frame}
      className={className}
      style={{ overflow: 'hidden', aspectRatio: ratio, position: 'relative' }}
    >
      <Figure
        src={src}
        alt={alt}
        objectPosition={objectPosition}
        placeholderLabel={placeholderLabel}
        priority={priority}
        // Oversized so the parallax drift never reveals the frame edge.
        style={{ height: `${100 + strength}%`, position: 'absolute', inset: 0 }}
      />
    </div>
  );
}
