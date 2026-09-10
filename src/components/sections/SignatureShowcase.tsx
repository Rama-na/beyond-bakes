import type { Bake } from '../../data/bakes';
import { DepthCarousel } from './DepthCarousel';
import { RevealText } from '../motion/RevealText';
import { Swoosh } from '../motion/Swoosh';
import './signature-showcase.css';

interface SignatureShowcaseProps {
  onOpenBake: (bake: Bake) => void;
}

/**
 * The PLAY beat.
 *
 * A depth carousel rather than a grid: the cards sit in real Z-space so the
 * photography reads as something physical you turn through, which a flat
 * three-column layout never does.
 */
export function SignatureShowcase({ onOpenBake }: SignatureShowcaseProps) {
  return (
    <section className="section sigs" id="signatures">
      <div className="shell">
        <header className="sigs__head">
          <p className="micro">Our signatures</p>
          <RevealText
            lines={['Four we', 'come back to.']}
            as="h2"
            className="sigs__headline display"
          />
          <Swoosh width={9} />
          <p className="body-muted sigs__note">
            Everything is made to order, so nothing here is a fixed menu — these are simply
            the ones people ask for most.
          </p>
        </header>

        <DepthCarousel onOpenBake={onOpenBake} />
      </div>
    </section>
  );
}
