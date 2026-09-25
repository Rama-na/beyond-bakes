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

/**
 * Tints the page ground while a section is in view, and returns it to cream
 * afterwards. Used on a few quiet sections only, so it reads as a change of
 * mood rather than a light show.
 *
 * It tweens the --page-bg variable rather than the body colour, so everything
 * that must match the ground — the text halos — follows it frame for frame.
 * The resting colour comes from the --cream token rather than the live value,
 * which may be mid-tint when a breakpoint change rebuilds the triggers.
 */
export function backgroundShift(section: Element, color: string) {
  const root = document.documentElement;
  const rest = getComputedStyle(root).getPropertyValue('--cream').trim() || '#fffdf9';
  const tint = (to: string) =>
    gsap.to(root, { '--page-bg': to, duration: 1, ease: 'power2.inOut', overwrite: 'auto' });

  return ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => tint(color),
    onEnterBack: () => tint(color),
    onLeave: () => tint(rest),
    onLeaveBack: () => tint(rest),
  });
}

