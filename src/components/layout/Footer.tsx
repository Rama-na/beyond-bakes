import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../../data/brand';
import { RevealText } from '../motion/RevealText';
import { revealUp } from '../../lib/animations';
import './footer.css';

interface FooterProps {
  onStartOrder: () => void;
}

export function Footer({ onStartOrder }: FooterProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      revealUp('.footer__cols > *', { y: 20, start: 'top 92%', stagger: 0.06 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={root}>
      <div className="shell">
        <RevealText
          lines={["Let's make", 'something beautiful.']}
          as="p"
          className="footer__statement display"
        />

        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__brand display">{brand.name}</p>
            <p className="micro footer__loc">{brand.location}</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <a
              className="footer__link link-underline"
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <button className="footer__link link-underline" onClick={onStartOrder}>
              Start an order
            </button>
          </nav>

          <div className="footer__col footer__col--end">
            <p className="micro footer__copy">
              © {new Date().getFullYear()} {brand.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
