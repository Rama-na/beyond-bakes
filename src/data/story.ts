/**
 * Girvani + Swapna.
 *
 * The one fact supplied by the client: they met in a baking class, became
 * friends straight away, and started BeyondBakes together. The line below is
 * written around that fact — SAMPLE until approved. See CONTENT_TODO.md.
 *
 * The portraits carry each founder's name, role and personal line inside the
 * photograph itself, so the page adds almost nothing beside them.
 */

export interface Founder {
  id: string;
  name: string;
  /** Instagram handle, without the @ */
  handle: string;
  portrait: string;
  /** Used for alt text and screen readers — the visible version is in the photo. */
  role: string;
}

export const STORY_IS_SAMPLE = true;

export const founders: Founder[] = [
  {
    id: 'girvani',
    name: 'Girvani',
    handle: 'girvanii',
    portrait: '/images/portrait-girvani.jpg',
    role: 'Co-founder',
  },
  {
    id: 'swapna',
    name: 'Swapna',
    handle: 'yours.truly.swapna',
    portrait: '/images/portrait-swapna.jpg',
    role: 'Co-founder and pastry chef',
  },
];

export const story = {
  label: 'About us',
  headline: ['Two friends.', 'One kitchen.'],
  /** SAMPLE — built on the supplied fact. One sentence, no more. */
  line: 'They met in a baking class, over a sponge that refused to rise — and have baked together ever since.',
} as const;
