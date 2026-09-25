import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import './footer.css';

interface FooterProps {
  onStartOrder: () => void;
}

/**
 * The sign-off: a row of the few facts that matter, then the wordmark set as
 * large as the page is wide, rising into place as you reach the end.
 */
export function Footer({ onStartOrder }: FooterProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.footer__char',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.035,
          scrollTrigger: { trigger: '.footer__mark', start: 'top 95%', once: true },
        },
      );
      gsap.fromTo(
        '.footer__row > *',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const word = (text: string) =>
    text.split('').map((c, i) => (
      <span className="footer__char-mask" key={i}>
        <span className="footer__char">{c}</span>
      </span>
    ));

  return (
    <footer className="footer" ref={root}>
      <div className="shell">
        <div className="footer__row">
          <span className="micro">{brand.location}</span>
          <nav className="footer__links" aria-label="Footer">
            <a
              className="micro link-underline footer__link"
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <button className="micro link-underline footer__link" onClick={onStartOrder}>
              Start an order
            </button>
          </nav>
          <span className="micro">© {new Date().getFullYear()}</span>
        </div>

        <p className="footer__mark display halo">
          <span className="sr-only">{brand.name}</span>
          <span aria-hidden="true">
            {word('Beyond')}
            <em>{word('Bakes')}</em>
          </span>
        </p>
      </div>
    </footer>
  );
}
