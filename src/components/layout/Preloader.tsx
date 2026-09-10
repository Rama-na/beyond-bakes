import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
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

      // Release the page as the fade begins so the hero entrance overlaps it,
      // and stop the fading layer from catching clicks meant for the page.
      gsap.set(el, { pointerEvents: 'none' });
      onDone();

      gsap.to(el, {
        opacity: 0,
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => setGone(true),
      });
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
        poster="/brand/logo-mark.png"
        aria-hidden="true"
      >
        <source src="/brand/logo-animation.webm" type="video/webm" />
        <source src="/brand/logo-animation.mp4" type="video/mp4" />
      </video>
      <span className="sr-only">Loading BeyondBakes</span>
    </div>
  );
}
