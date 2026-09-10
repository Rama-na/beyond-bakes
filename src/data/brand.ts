/**
 * Brand-level facts and configuration.
 *
 * Fields marked SUPPLIED come from the client's Instagram profile.
 * Fields marked SAMPLE are working copy written for the launch draft and
 * are meant to be reviewed/replaced. See CONTENT_TODO.md.
 */

export const brand = {
  /** SUPPLIED */
  name: 'BeyondBakes',
  /** SUPPLIED */
  location: 'Anna Nagar, Chennai',
  /** SUPPLIED — profile positioning line */
  tagline: 'Where every bite is a work of art.',
  /** SUPPLIED */
  instagramHandle: 'beyondbakes.co',
  /**
   * Confirm the exact destination before launch. Kept as a single source of
   * truth — never hardcode the handle inside a component.
   */
  instagramUrl: 'https://instagram.com/beyondbakes.co',
  /** SUPPLIED — the two founders' personal accounts */
  founders: [
    { name: 'Girvani', handle: 'girvanii', role: 'Design & celebrations' },
    { name: 'Swapna', handle: 'yours.truly.swapna', role: 'Pastry chef' },
  ],

  /** SAMPLE — editorial intro paragraph. Section 9. */
  intro:
    'Every celebration has a feeling behind it — the hush before a name is read out, the noise of a room that has waited all year for this. We spend our days turning that feeling into something you can see, share, and taste.',

  /** SAMPLE — used under the intro headline as a quieter second line. */
  introSecondary:
    'A small kitchen in Anna Nagar. Two pairs of hands. Everything made to order, for one table at a time.',
} as const;

export const INSTAGRAM_HANDLE = brand.instagramHandle;
export const INSTAGRAM_URL = brand.instagramUrl;
