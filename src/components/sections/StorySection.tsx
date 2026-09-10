import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { story, founders } from '../../data/story';
import { RevealText } from '../motion/RevealText';
import { Swoosh } from '../motion/Swoosh';
import { Figure } from '../common/Figure';
import { revealUp } from '../../lib/animations';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './story-section.css';

/**
 * The INTIMATE beat.
 *
 * The two portraits start apart and are drawn together as you scroll, with the
 * brand name settling between them once they meet. It is the story of the
 * section performed rather than described — two people who found each other,
 * and the thing that came of it.
 */
export function StorySection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.story__journey p', { y: 26, start: 'top 84%', stagger: 0.1 });

      el.querySelectorAll('.founder').forEach((f) => {
        revealUp(f.querySelectorAll('[data-founder-reveal]'), {
          y: 28,
          start: 'top 80%',
          stagger: 0.07,
        });
      });

      if (prefersReducedMotion()) {
        gsap.set('.story__union', { opacity: 1 });
        return;
      }

      // They converge as the block crosses the viewport — no pin, so the
      // meeting lands naturally as the section settles into the middle.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.story__founders',
            start: 'top 85%',
            end: 'center 55%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          '.founder--girvani .founder__portrait',
          { xPercent: -14, opacity: 0.75 },
          { xPercent: 0, opacity: 1, ease: 'power2.out' },
          0,
        )
        .fromTo(
          '.founder--swapna .founder__portrait',
          { xPercent: 14, opacity: 0.75 },
          { xPercent: 0, opacity: 1, ease: 'power2.out' },
          0,
        )
        .fromTo(
          '.story__union',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, ease: 'power2.out' },
          0.55,
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section story" id="story" ref={root}>
      <div className="shell">
        <header className="story__head">
          <p className="micro">{story.journeyCaption}</p>
          <RevealText lines={story.headline} as="h2" className="story__headline display" />
          <Swoosh width={10} />
        </header>

        <div className="story__journey">
          {story.journey.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="story__founders">
          {founders.map((f) => (
            <article className={`founder founder--${f.id}`} key={f.id}>
              <div className="founder__portrait">
                <Figure
                  src={f.portrait ?? ''}
                  alt={`Portrait of ${f.name}, co-founder of BeyondBakes`}
                  ratio="4 / 5"
                  placeholderLabel={`Portrait of ${f.name} — awaiting photograph`}
                />
              </div>

              <div className="founder__text">
                <p className="micro" data-founder-reveal>
                  {f.role}
                </p>
                <h3 className="founder__name display" data-founder-reveal>
                  {f.name}
                </h3>
                <p className="founder__quote display" data-founder-reveal>
                  &ldquo;{f.pullQuote}&rdquo;
                </p>
                <p className="founder__body body-muted" data-founder-reveal>
                  {f.body}
                </p>
                <a
                  className="founder__handle micro link-underline"
                  href={`https://instagram.com/${f.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-founder-reveal
                >
                  @{f.handle} ↗
                </a>
              </div>
            </article>
          ))}

          {/* Settles between them once they have met. */}
          <span className="story__union display" aria-hidden="true">
            BeyondBakes
          </span>
        </div>
      </div>
    </section>
  );
}
