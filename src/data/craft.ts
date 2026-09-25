/**
 * The craft — four words and a line each.
 *
 * SAMPLE COPY: describes a real pastry process, but has not been confirmed
 * against how BeyondBakes actually works. See CONTENT_TODO.md.
 */

export interface CraftStep {
  /** The large word */
  title: string;
  /** One line. If it needs a second, it is too long. */
  line: string;
  image: string;
  objectPosition?: string;
  alt: string;
}

export const CRAFT_IS_SAMPLE = true;

export const craft = {
  headline: ['Made with', 'intention.'],
  steps: [
    {
      title: 'Detail',
      line: 'Every flower, placed by hand.',
      image: '/images/garden-floral-cake.jpg',
      objectPosition: '50% 38%',
      alt: 'Pressed edible flowers set one by one into ivory buttercream',
    },
    {
      title: 'Texture',
      line: 'Buttercream combed in a single pass.',
      image: '/images/signature-red-rose-cake.jpg',
      objectPosition: '50% 62%',
      alt: 'Hand-combed ridges of ivory buttercream beside deep red roses',
    },
    {
      title: 'Time',
      line: 'Set overnight. Never rushed.',
      image: '/images/blueberry-cheesecake-cups.jpg',
      objectPosition: '62% 60%',
      alt: 'Blueberry Bliss — no-bake blueberry cheesecake cups beside a vase with a pink rose',
    },
    {
      title: 'Balance',
      line: 'It should taste as good as it looks.',
      image: '/images/plated-tasting.jpg',
      objectPosition: '50% 62%',
      alt: 'A tasting plate — a savoury roll, a tart, a chocolate cake and a blueberry cheesecake cup — under a table of flowers',
    },
  ] as CraftStep[],
} as const;
