import type { Bake } from '../../data/bakes';
import { bakes } from '../../data/bakes';
import { DepthCarousel } from './DepthCarousel';
import { RevealText } from '../motion/RevealText';
import { Swoosh } from '../motion/Swoosh';
import './signature-showcase.css';

interface SignatureShowcaseProps {
  onOpenBake: (bake: Bake) => void;
}

/**
 * PLAY.
 *
 * One word for a heading, then the cakes themselves in real depth. Names and
 * details live in the readout and the detail panel — the section itself lets
 * the photography do the talking.
 */
export function SignatureShowcase({ onOpenBake }: SignatureShowcaseProps) {
  return (
    <section className="section sigs" id="signatures" aria-labelledby="sigs-title">
      <div className="shell">
        <header className="sigs__head">
          <p className="micro eyebrow">
            Signatures <span className="sigs__count">({String(bakes.length).padStart(2, '0')})</span>
          </p>
          <div>
            <RevealText lines={['The ones we', 'come back to.']} as="h2" id="sigs-title" className="sigs__title display halo" />
            <Swoosh width={9} />
          </div>
        </header>

        <DepthCarousel onOpenBake={onOpenBake} />
      </div>
    </section>
  );
}
