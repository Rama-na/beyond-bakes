import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared animation vocabulary.
 *
 * Every helper degrades to a plain fade when reduced motion is on: the
 * content still arrives, it just stops travelling.
 */

interface RevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
  stagger?: number;
}

/** The workhorse: rise + fade, once, as the element enters. */
export function revealUp(
  target: gsap.TweenTarget,
  { delay = 0, duration = 1, y = 44, start = 'top 85%', stagger = 0 }: RevealOptions = {},
) {
  const reduced = prefersReducedMotion();
  const trigger = Array.isArray(target) ? (target[0] as Element) : (target as Element);

  return gsap.fromTo(
    target,
    { y: reduced ? 0 : y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: reduced ? 0.4 : duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger, start, once: true },
    },
  );
}

/**
 * Line-by-line reveal for editorial paragraphs. Each line is expected to be
 * wrapped in a masking element so the text slides out from behind its own edge.
 */
export function revealLines(lines: Element[], { start = 'top 82%', stagger = 0.09 } = {}) {
  const reduced = prefersReducedMotion();
  if (!lines.length) return;

  return gsap.fromTo(
    lines,
    { yPercent: reduced ? 0 : 108, opacity: reduced ? 0 : 1 },
    {
      yPercent: 0,
      opacity: 1,
      duration: reduced ? 0.4 : 1.05,
      ease: 'power4.out',
      stagger: reduced ? 0 : stagger,
      scrollTrigger: { trigger: lines[0].parentElement ?? lines[0], start, once: true },
    },
  );
}

/** Slow vertical drift on a photograph inside an overflow-hidden frame. */
export function parallax(image: Element, strength = 12) {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    image,
    { yPercent: -strength / 2 },
    {
      yPercent: strength / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: image.parentElement ?? image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

/** A frame that opens from a clipped edge as it enters. */
export function clipReveal(frame: Element, { start = 'top 80%' } = {}) {
  if (prefersReducedMotion()) {
    gsap.set(frame, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
    return;
  }

  return gsap.fromTo(
    frame,
    { clipPath: 'inset(0% 0% 100% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.35,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: frame, start, once: true },
    },
  );
}

/**
 * Transitions the page background as a section passes through the viewport.
 * Used sparingly — twice on the page — so it reads as a mood change, not a
 * light show.
 */
export function backgroundShift(section: Element, color: string) {
  const original = getComputedStyle(document.body).backgroundColor;

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => gsap.to(document.body, { backgroundColor: color, duration: 0.9 }),
    onEnterBack: () => gsap.to(document.body, { backgroundColor: color, duration: 0.9 }),
    onLeave: () => gsap.to(document.body, { backgroundColor: original, duration: 0.9 }),
    onLeaveBack: () => gsap.to(document.body, { backgroundColor: original, duration: 0.9 }),
  });
}

/** Splits a string into word spans, each inside its own masking span. */
export function splitWords(el: HTMLElement) {
  const text = el.textContent ?? '';
  el.textContent = '';
  const inners: HTMLElement[] = [];

  text.split(/(\s+)/).forEach((chunk) => {
    if (!chunk.trim()) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const mask = document.createElement('span');
    mask.style.display = 'inline-block';
    mask.style.overflow = 'hidden';
    mask.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = chunk;

    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  });

  return inners;
}
