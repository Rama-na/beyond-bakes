import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * One shared Lenis instance for the whole app, driven by the GSAP ticker so
 * smooth scrolling and ScrollTrigger stay on the same clock.
 *
 * Skipped entirely when the user prefers reduced motion — native scrolling
 * is the accessible default, and ScrollTrigger works fine without Lenis.
 */
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Scroll to an element or offset through Lenis, with a native fallback. */
export function scrollTo(target: string | HTMLElement | number, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const el =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (typeof el === 'number') {
    window.scrollTo({ top: el + offset, behavior: 'auto' });
  } else if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  }
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch feels better than a simulated one.
      syncTouch: false,
    });
    lenis = instance;

    instance.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Late-loading images change page height; keep triggers honest.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

/** Lock/unlock page scroll — used by the enquiry panel and bake detail. */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? 'hidden' : '';
}
