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
      line: 'Rested overnight. Never rushed.',
      image: '/images/signature-art-cake.jpg',
      objectPosition: '50% 40%',
      alt: 'A palette-knife cake finished with cakesicles and cocoa spheres',
    },
    {
      title: 'Balance',
      line: 'It should taste as good as it looks.',
      image: '/images/floral-event-cake.jpg',
      objectPosition: '50% 48%',
      alt: 'A tiered cake on a white arched plinth among spring flowers',
    },
  ] as CraftStep[],
} as const;
