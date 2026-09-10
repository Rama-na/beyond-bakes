import type { Bake } from '../../data/bakes';
import { Figure } from '../common/Figure';

interface SignatureCardProps {
  bake: Bake;
  index: number;
  onOpen: (bake: Bake) => void;
}

export function SignatureCard({ bake, index, onOpen }: SignatureCardProps) {
  return (
    <article className="sig-card">
      {/*
        The whole card is one button. Everything it shows is also read out,
        so nothing here depends on hover to be discoverable.
      */}
      <button
        className="sig-card__hit"
        data-cursor="view"
        onClick={() => onOpen(bake)}
        aria-label={`View details for ${bake.name}`}
      >
        <span className="sig-card__frame">
          <Figure
            src={bake.images[0]}
            alt={bake.shortDescription}
            objectPosition={bake.objectPosition}
            placeholderLabel={`Add ${bake.images[0].split('/').pop()}`}
          />
        </span>

        <span className="sig-card__meta">
          <span className="sig-card__index micro">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="sig-card__title display">{bake.name}</span>

          <span className="sig-card__desc">{bake.shortDescription}</span>

          <span className="sig-card__more micro">
            View details
            <span className="sig-card__arrow" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </button>
    </article>
  );
}
