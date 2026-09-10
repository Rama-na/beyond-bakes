import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { socialGallery, socialCta } from '../../data/socialGallery';
import { brand } from '../../data/brand';
import { Figure } from '../common/Figure';
import { revealUp } from '../../lib/animations';
import './social-gallery.css';

/**
 * Editorial gallery, hand-maintained from `socialGallery.ts`.
 * Nothing is fetched from Instagram at runtime.
 */
export function SocialGallery() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.social__item', { y: 40, start: 'top 88%', stagger: 0.08 });
      revealUp('.social__text > *', { y: 22, start: 'top 86%', stagger: 0.08 });
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
                  ratio="1 / 1"
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
