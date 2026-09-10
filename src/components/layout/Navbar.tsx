import { useEffect, useRef, useState } from 'react';
import { brand } from '../../data/brand';
import { scrollTo } from '../../hooks/useLenis';
import { asset } from '../../lib/asset';
import './navbar.css';

const LINKS = [
  { label: 'Signatures', target: '#signatures' },
  { label: 'Our story', target: '#story' },
  { label: 'The craft', target: '#craft' },
];

interface NavbarProps {
  onStartOrder: () => void;
}

export function Navbar({ onStartOrder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Transparent over the hero, warm translucent once past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, returning focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (target: string) => {
    setMenuOpen(false);
    scrollTo(target, -80);
  };

  return (
    <header className="nav" data-scrolled={scrolled} data-open={menuOpen}>
      <div className="nav__inner shell">
        <a
          className="nav__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go('#top');
          }}
        >
          <img src={asset('/brand/logo-mark-small.png')} alt="" className="nav__mark" width="36" height="36" />
          <span className="nav__wordmark">{brand.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.target}
              className="nav__link link-underline"
              onClick={() => go(l.target)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="nav__link link-underline nav__ig"
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <button className="nav__cta" onClick={onStartOrder}>
            Start an order
          </button>
        </div>

        <button
          ref={toggleRef}
          className="nav__toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile sheet */}
      <div className="nav__menu" id="nav-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {LINKS.map((l) => (
            <button key={l.target} className="nav__menu-link display" onClick={() => go(l.target)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav__menu-foot">
          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="micro">
            Instagram ↗
          </a>
          <button
            className="btn btn--solid"
            onClick={() => {
              setMenuOpen(false);
              onStartOrder();
            }}
          >
            Start an order
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
