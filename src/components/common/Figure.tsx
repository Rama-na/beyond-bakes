import { useRef, useState, type CSSProperties } from 'react';
import './figure.css';

interface FigureProps {
  src: string;
  alt: string;
  /** Focal point for the editorial crop, e.g. '50% 40%'. */
  objectPosition?: string;
  /** CSS aspect-ratio, reserved up front so nothing shifts on load. */
  ratio?: string;
  /** The hero photograph loads eagerly; everything else waits. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** A short label shown in the placeholder while the photograph is missing. */
  placeholderLabel?: string;
  /**
   * Where the placeholder content sits. 'bottom' keeps it clear of overlaid
   * type — used by the hero, where the title crosses the centre of the frame.
   */
  placeholderAlign?: 'center' | 'bottom';
}

/**
 * Photographs, with the two failure modes handled.
 *
 * 1. Still decoding → the blush frame is already the right size, and the
 *    image fades up over it. No layout shift, no white flash.
 * 2. File not present → the frame stays, and shows a quiet monogram instead
 *    of a broken-image icon. This is what keeps the site presentable while
 *    the client's photography is still being handed over.
 */
export function Figure({
  src,
  alt,
  objectPosition = '50% 50%',
  ratio,
  priority = false,
  className = '',
  style,
  placeholderLabel,
  placeholderAlign = 'center',
}: FigureProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'missing'>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className={`figure ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      data-status={status}
    >
      {status !== 'missing' && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-expect-error -- fetchpriority is valid HTML, not yet in React's types
          fetchpriority={priority ? 'high' : undefined}
          style={{ objectPosition }}
          data-loaded={status === 'loaded'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('missing')}
        />
      )}

      {status === 'missing' && (
        <div
          className="figure__placeholder"
          data-align={placeholderAlign}
          role="img"
          aria-label={alt}
        >
          <span className="figure__monogram" aria-hidden="true">
            B
          </span>
          {placeholderLabel && <span className="figure__label">{placeholderLabel}</span>}
        </div>
      )}
    </div>
  );
}
