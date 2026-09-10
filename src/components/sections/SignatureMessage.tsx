import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { story, founders } from '../../data/story';
import { revealUp } from '../../lib/animations';
import { asset } from '../../lib/asset';
import './signature-message.css';

/**
 * "From us, to you" — the quiet beat before the ask.
 *
 * Deliberately the least designed section on the page: one line, two names,
 * nothing to click.
 */
export function SignatureMessage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('[data-msg-reveal]', { y: 24, start: 'top 82%', stagger: 0.12 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section message" ref={root}>
      <div className="shell message__inner">
        <p className="micro" data-msg-reveal>
          {story.message.headline}
        </p>

        <blockquote className="message__quote display" data-msg-reveal>
          &ldquo;{story.message.quote}&rdquo;
        </blockquote>

        <div className="message__signs" data-msg-reveal>
          {founders.map((f) => (
            <figure className="sign" key={f.id}>
              {f.signature.kind === 'image' && f.signature.src ? (
                <img
                  className="sign__img"
                  src={asset(f.signature.src)}
                  alt={`${f.name}'s signature`}
                  loading="lazy"
                />
              ) : (
                /* Typeset stand-in — a script face, not an imitation of a
                   real hand. Swapped for a scan when one is supplied. */
                <span className="sign__type" aria-hidden="true">
                  {f.name}
                </span>
              )}
              <figcaption className="sr-only">{f.name}</figcaption>
            </figure>
          ))}
        </div>

        <p className="message__attribution micro" data-msg-reveal>
          {story.message.attribution}
        </p>
      </div>
    </section>
  );
}
