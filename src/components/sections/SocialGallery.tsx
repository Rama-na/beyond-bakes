import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { socialGallery, socialCta } from '../../data/socialGallery';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import { revealUp } from '../../lib/animations';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './social-gallery.css';

/**
 * The last MOVEMENT beat before the page goes quiet for the ask.
 *
 * The tiles drift at slightly different rates as the section passes, and
 * hovering one settles the others back — the wall reacts, but slowly, and
 * nothing here is a 3D showpiece competing with the carousel.
 *
 * Hand-maintained from `socialGallery.ts`; nothing is fetched from Instagram.
 */
export function SocialGallery() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.social__item', { y: 40, start: 'top 88%', stagger: 0.08 });
      revealUp('.social__text > *', { y: 22, start: 'top 86%', stagger: 0.08 });

      if (prefersReducedMotion()) return;

      // Alternating drift. Small — it should read as the wall breathing.
      el.querySelectorAll<HTMLElement>('.social__item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: i % 2 === 0 ? 26 : -18 },
          {
            y: i % 2 === 0 ? -26 : 18,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section social" ref={root}>
      <div className="shell">
        <div className="social__head">
          <div className="social__text">
            <p className="micro">@{brand.instagramHandle}</p>
            <h2 className="social__headline display">{socialCta.headline}</h2>
            <p className="body-muted">{socialCta.body}</p>
          </div>

          <a
            className="btn social__btn"
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow along
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <ul className="social__grid">
          {socialGallery.map((item, i) => (
            <li className="social__item" key={`${item.src}-${i}`}>
              <a
                href={item.href ?? brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social__link"
              >
                <Figure
                  src={item.src}
                  alt={item.alt}
                  objectPosition={item.objectPosition}
                  ratio="4 / 5"
                  placeholderLabel={`Add ${item.src.split('/').pop()}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
