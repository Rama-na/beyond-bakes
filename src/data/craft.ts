/**
 * The craft / quality chapter.
 *
 * ────────────────────────────────────────────────────────────────────
 *  SAMPLE COPY — written to give the section its shape and rhythm.
 *  These describe a real pastry process, but they have not been
 *  confirmed against how BeyondBakes actually works.
 *  Review with the client before launch — see CONTENT_TODO.md.
 * ────────────────────────────────────────────────────────────────────
 */

export interface CraftSection {
  /** The large word */
  title: string;
  /** Micro-label above the word */
  label: string;
  body: string;
  image?: string;
  objectPosition?: string;
}

export const CRAFT_IS_SAMPLE = true;

export const craft = {
  headline: 'Made with intention.',
  standfirst:
    'Nothing here is batched, frozen, or brought in. Every cake is made to order in one small kitchen, which is the reason we can only take so many a week — and the reason we would not do it any other way.',

  sections: [
    {
      label: '01',
      title: 'Detail',
      body: 'A stem placed by hand sits differently to a stem placed quickly. We work at the scale of the single flower, the single ridge, the single pearl — because that is the scale at which a cake is actually looked at when it is standing in front of someone.',
      image: '/images/garden-floral-cake.jpg',
      objectPosition: '50% 40%',
    },
    {
      label: '02',
      title: 'Time',
      body: 'Sponges are baked the day before and rested overnight. Caramel is cooked slowly to a dark amber, never rushed pale. Chocolate is tempered properly, which takes as long as it takes. Most of what makes a cake good happens before anyone sees it.',
      image: '/images/signature-art-cake.jpg',
      objectPosition: '50% 35%',
    },
    {
      label: '03',
      title: 'Texture',
      body: 'Swiss meringue rather than American buttercream — less sweet, more stable, and it holds its edge in Chennai heat. The crumb should be tender enough to give under a fork and firm enough to carry three tiers. Those two things fight each other. Getting them to agree is the job.',
      image: '/images/signature-red-rose-cake.jpg',
      objectPosition: '50% 55%',
    },
    {
      label: '04',
      title: 'Balance',
      body: 'A cake that only looks beautiful is a decoration. We taste every component on its own and then together, and if the whole thing is sweeter than the sum of its parts, something goes back. It should taste better than it looks. That is a high bar here, deliberately.',
      image: '/images/floral-event-cake.jpg',
      objectPosition: '50% 45%',
    },
  ] as CraftSection[],
} as const;
