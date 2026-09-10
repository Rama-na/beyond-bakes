/**
 * Girvani + Swapna — the personal chapter.
 *
 * ────────────────────────────────────────────────────────────────────
 *  SAMPLE COPY
 *
 *  Everything in this file is a *written sample*, drafted so the section
 *  can be designed, reviewed and felt before the real words arrive.
 *
 *  The one fact it is built on, supplied by the client:
 *    "They met in a baking class, instantly became friends,
 *     and started BeyondBakes together."
 *
 *  Dates, small details and turns of phrase around that fact are
 *  invented for the draft. Replace before launch — see CONTENT_TODO.md.
 * ────────────────────────────────────────────────────────────────────
 */

export interface Founder {
  id: string;
  name: string;
  /** Instagram handle, without the @ */
  handle: string;
  /** Short role label used as a micro-caption */
  role: string;
  /** The personal paragraph */
  body: string;
  /** A single line that sits beside the portrait */
  pullQuote: string;
  /** Portrait photograph — see CONTENT_TODO.md */
  portrait?: string;
  /**
   * Signature.
   *
   * `kind: 'typeset'` renders the name in a script face — an honest visual
   * stand-in, not an imitation of anyone's handwriting. When the real
   * signatures are scanned, switch to `kind: 'image'` and set `src` to the
   * transparent PNG/SVG; the component handles both.
   */
  signature: {
    kind: 'typeset' | 'image';
    src?: string;
    isSample: boolean;
  };
}

/** Set to false once every string below has been approved by the client. */
export const STORY_IS_SAMPLE = true;

export const founders: Founder[] = [
  {
    id: 'girvani',
    name: 'Girvani',
    handle: 'girvanii',
    role: 'Design & celebrations',
    pullQuote: 'She reads a room before she reads a recipe.',
    body: 'Girvani sees the whole table before the first bowl comes out — the colour of the linen, the light at six in the evening, the exact moment a cake gets carried in and everyone stops talking. She is the one who asks what the celebration is for before she asks what flavour you want, and somehow the answer to the first question always decides the second.',
    portrait: '/images/portrait-girvani.jpg',
    signature: { kind: 'typeset', isSample: true },
  },
  {
    id: 'swapna',
    name: 'Swapna',
    handle: 'yours.truly.swapna',
    role: 'Pastry chef',
    pullQuote: 'The third ganache was only very good.',
    body: 'Swapna is the pastry chef — the one still in the kitchen at two in the morning, tasting a ganache for the fourth time because the third one was only very good. She believes a cake should taste better than it looks, which, given how they look, is a demanding thing to promise. She has never once let it slide.',
    portrait: '/images/portrait-swapna.jpg',
    signature: { kind: 'typeset', isSample: true },
  },
];

export const story = {
  /** Section headline. Section 14. */
  headline: ['Two people.', 'One shared love for the craft.'],

  /**
   * The joint journey. Built on the supplied fact — met in a baking class,
   * became friends immediately, started BeyondBakes together.
   */
  journey: [
    'It began at the back table of a baking class, on a Saturday morning in Chennai, over a sponge that refused to rise.',
    'They laughed about it, which is how most of this started. Then they stayed behind after everyone had gone home, and tried again.',
    'By the third Saturday they were not really going for the class any more. They were going for each other — for the hour afterwards, when the room emptied out and the good conversation began.',
    'First they baked for friends. Then for friends of friends. Then for a city that kept asking, politely and then insistently, for more.',
    'BeyondBakes is simply what happened when a friendship refused to stay a hobby.',
  ],

  /** A quiet marker used beside the journey text. */
  journeyCaption: 'How it started',

  /** Section 15 — "From us, to you". */
  message: {
    headline: 'From us, to you.',
    quote:
      'We still bake the way we did in that first class — slowly, badly at first, and always together.',
    attribution: 'Girvani & Swapna',
  },
} as const;
