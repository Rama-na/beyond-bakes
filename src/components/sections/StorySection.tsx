import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { story, founders } from '../../data/story';
import { RevealText } from '../motion/RevealText';
import { Figure } from '../common/Figure';
import { revealUp } from '../../lib/animations';
import './story-section.css';

export function StorySection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // The journey reads as one paragraph arriving line by line.
      revealUp('.story__journey p', { y: 26, start: 'top 84%', stagger: 0.1 });
      revealUp('.story__names', { y: 30, start: 'top 82%' });

      el.querySelectorAll('.founder').forEach((f) => {
        revealUp(f.querySelectorAll('[data-founder-reveal]'), {
          y: 28,
          start: 'top 80%',
          stagger: 0.07,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section story" id="story" ref={root}>
      <div className="shell">
        <header className="story__head">
          <p className="micro">{story.journeyCaption}</p>
          <RevealText lines={story.headline} as="h2" className="story__headline display" />
        </header>

        <div className="story__grid">
          <div className="story__journey">
            {story.journey.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {/* Typographic composition — carries the section until the real
              portraits are supplied. */}
          <div className="story__names" aria-hidden="true">
            <span className="story__name display">Girvani</span>
            <span className="story__plus display">+</span>
            <span className="story__name display">Swapna</span>
          </div>
        </div>

        <div className="story__founders">
          {founders.map((f) => (
            <article className="founder" key={f.id}>
              <div className="founder__portrait">
                <Figure
                  src={f.portrait ?? ''}
                  alt={`Portrait of ${f.name}`}
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
        </div>
      </div>
    </section>
  );
}
