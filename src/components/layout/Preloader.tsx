import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import { asset } from '../../lib/asset';
import './preloader.css';

const SEEN_KEY = 'bb:intro-seen';
/** Hard ceiling — the site never waits on a stalled video. */
const MAX_MS = 4200;

interface PreloaderProps {
  onDone: () => void;
}

/**
 * The brand entrance: the "B" monogram piped in icing, resolving to the mark.
 *
 * Shown once per session and never for reduced-motion users. It always
 * releases the page — on video end, on error, or on the timeout — so a slow
 * connection can't trap anyone behind it.
 */
export function Preloader({ onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const finished = useRef(false);

  const [skip] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (prefersReducedMotion()) return true;
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });

  /**
   * Unmounts the overlay once the intro is over. Fading to opacity 0 is not
   * enough — a transparent fixed layer still covers the page and swallows
   * every click behind it.
   */
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode — showing it again next time is harmless */
    }

    const el = root.current;
    const vid = video.current;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;

      // Stop the lifting layer from catching clicks meant for the page.
      gsap.set(el, { pointerEvents: 'none' });

      // The curtain lifts away upward while the mark sinks back into it; the
      // page is released part-way, so the hero rises as the curtain clears.
      gsap
        .timeline({ onComplete: () => setGone(true) })
        .to(vid, { scale: 0.86, opacity: 0, duration: 0.9, ease: 'power3.in' }, 0)
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.25, ease: 'expo.inOut' }, 0.35)
        .add(() => onDone(), 0.7);
    };

    vid?.play().catch(finish); // autoplay blocked → just get out of the way
    vid?.addEventListener('ended', finish);
    vid?.addEventListener('error', finish);

    const timer = window.setTimeout(finish, MAX_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      vid?.removeEventListener('ended', finish);
      vid?.removeEventListener('error', finish);
    };
  }, [skip, onDone]);

  if (skip || gone) return null;

  return (
    <div ref={root} className="preloader" role="status" aria-label="BeyondBakes">
      <video
        ref={video}
        className="preloader__video"
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={asset('/brand/logo-mark.png')}
        aria-hidden="true"
      >
        <source src={asset('/brand/logo-animation.webm')} type="video/webm" />
        <source src={asset('/brand/logo-animation.mp4')} type="video/mp4" />
      </video>
      <span className="sr-only">Loading BeyondBakes</span>
    </div>
  );
}
