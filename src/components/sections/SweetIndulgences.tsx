import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Bake } from '../../data/bakes';
import { indulgences, INDULGENCES_TITLE } from '../../data/indulgences';
import { Figure } from '../common/Figure';
import { RevealText } from '../motion/RevealText';
import './sweet-indulgences.css';

interface SweetIndulgencesProps {
  onOpenBake: (bake: Bake) => void;
}

/** "Cupcake Royale" → ["Cupcake", "Royale"]: the card sets the last word in script. */
function splitName(name: string) {
  const at = name.lastIndexOf(' ');
  return at === -1 ? ['', name] : [name.slice(0, at), name.slice(at + 1)];
}

/**
 * PAUSE — the dessert table.
 *
 * Straight after the signatures, and set like BeyondBakes' own menu card: the
 * title stacked and centred, each name with its last word in italic, the
 * card's lines as written. Four arches stand at two heights, like the plinths
 * on the real table.
 *
 * It moves once — each arch blooms open from its crown as the table comes into
 * view — then keeps still: a breath between the carousel and the pinned craft.
 */
export function SweetIndulgences({ onOpenBake }: SweetIndulgencesProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap
        .timeline({
          defaults: { stagger: 0.14 },
          scrollTrigger: { trigger: '.sweets__table', start: 'top 80%', once: true },
        })
        .fromTo(
          '.sweets__arch',
          { clipPath: 'circle(0% at 50% 32%)' },
          // 90% of the box's reference radius clears its far corners.
          { clipPath: 'circle(90% at 50% 32%)', duration: 1.7, ease: 'expo.inOut', clearProps: 'clipPath' },
          0,
        )
        .fromTo(
          '.sweets__arch img',
          { scale: 1.28 },
          { scale: 1, duration: 2.2, ease: 'expo.out', clearProps: 'transform' },
          0.15,
        )
        .fromTo(
          '.sweets__meta',
          { opacity: 0, y: 18 },
          // Transform cleared at the end: while it is set, the meta block would
          // contain the stretched hit area instead of the whole item.
          { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', clearProps: 'transform' },
          0.6,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="section sweets" id="dessert-table" ref={root} aria-labelledby="sweets-title">
      <div className="shell">
        <header className="sweets__head">
          <p className="micro eyebrow">
            The dessert table{' '}
            <span className="sweets__count">({String(indulgences.length).padStart(2, '0')})</span>
          </p>
          <RevealText
            lines={INDULGENCES_TITLE.split(' ')}
            as="h2"
            id="sweets-title"
            className="sweets__title display halo"
          />
        </header>

        <ul className="sweets__table">
          {indulgences.map((item, i) => {
            const [lead, script] = splitName(item.name);
            return (
              <li className="sweets__item" key={item.id} data-cursor="view">
                <div className="sweets__arch">
                  <Figure
                    src={item.images[0]}
                    alt={item.shortDescription}
                    objectPosition={item.objectPosition}
                    ratio="4 / 5"
                    placeholderLabel={`Add ${item.images[0].split('/').pop()}`}
                  />
                </div>

                <div className="sweets__meta">
                  <span className="sweets__index micro" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="sweets__name display halo">
                    {/* Its hit area stretches over the whole item, photograph included. */}
                    <button className="sweets__open" onClick={() => onOpenBake(item)} aria-haspopup="dialog">
                      {lead} <em>{script}</em>
                    </button>
                  </h3>
                  <p className="sweets__line halo">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
