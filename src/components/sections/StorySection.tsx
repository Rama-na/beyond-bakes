import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { story, founders } from '../../data/story';
import { RevealText } from '../motion/RevealText';
import { Swoosh } from '../motion/Swoosh';
import { Figure } from '../common/Figure';
import './story-section.css';

/**
 * INTIMATE.
 *
 * One headline, one sentence, two portraits. The portraits already carry each
 * founder's name and line inside the photograph, so the page adds almost
 * nothing beside them. As you scroll they drift together from either side, and
 * an ampersand settles into the space between them once they meet.
 */
export function StorySection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 721px)' },
      (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };

        if (!motion) {
          gsap.set('.story__amp', { opacity: 1, scale: 1 });
          gsap.set('.story__line', { opacity: 1 });
          return;
        }

        gsap.fromTo(
          '.story__line',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.story__line', start: 'top 85%', once: true },
          },
        );

        // Each portrait opens from the bottom of its arch as it arrives.
        gsap.fromTo(
          '.founder__arch',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'expo.inOut',
            stagger: 0.15,
            scrollTrigger: { trigger: '.story__pair', start: 'top 80%', once: true },
          },
        );

        // …then the two drift together, scrubbed to the scroll.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.story__pair',
              start: 'top 75%',
              end: 'center 50%',
              scrub: 1.2,
            },
          })
          .fromTo(
            '.founder--girvani',
            { xPercent: wide ? -16 : 0, yPercent: wide ? 0 : 6, rotate: wide ? -2 : 0 },
            { xPercent: 0, yPercent: 0, rotate: 0, ease: 'power2.out' },
            0,
          )
          .fromTo(
            '.founder--swapna',
            { xPercent: wide ? 16 : 0, yPercent: wide ? 10 : 6, rotate: wide ? 2 : 0 },
            { xPercent: 0, yPercent: 0, rotate: 0, ease: 'power2.out' },
            0,
          )
          .fromTo(
            '.story__amp',
            { opacity: 0, scale: 0.5, rotate: -12 },
            { opacity: 1, scale: 1, rotate: 0, ease: 'back.out(1.6)' },
            0.55,
          );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="section story" id="about" ref={root} aria-labelledby="story-title">
      <div className="shell">
        <header className="story__head">
          <div>
            <p className="micro eyebrow">{story.label}</p>
            <div className="story__title-wrap">
              <RevealText lines={story.headline} as="h2" id="story-title" className="story__title display halo" />
              <Swoosh width={8} />
            </div>
          </div>
          <p className="story__line display halo">{story.line}</p>
        </header>

        <div className="story__pair">
          {founders.map((f) => (
            <figure className={`founder founder--${f.id}`} key={f.id}>
              <div className="founder__arch">
                <Figure
                  src={f.portrait}
                  alt={`${f.name}, ${f.role.toLowerCase()} of BeyondBakes`}
                  ratio="4 / 5"
                />
              </div>
              <figcaption className="founder__caption">
                <span className="sr-only">{f.name}, {f.role}. </span>
                <a
                  className="micro link-underline founder__handle"
                  href={`https://instagram.com/${f.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{f.handle}
                </a>
              </figcaption>
            </figure>
          ))}

          <span className="story__amp display" aria-hidden="true">
            &amp;
          </span>
        </div>
      </div>
    </section>
  );
}
