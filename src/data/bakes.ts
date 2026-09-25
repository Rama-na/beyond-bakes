/**
 * The signature bakes.
 *
 * The same model carries the dessert-table menu (./indulgences.ts), so every
 * product on the site shares one detail panel and one enquiry path — and can
 * move to checkout together.
 *
 * ────────────────────────────────────────────────────────────────────
 *  SAMPLE COPY
 *
 *  The photographs are real work by BeyondBakes. The *names, flavours,
 *  ingredient lists, sizes and lead times* below are written samples,
 *  drafted so the product system can be built and reviewed.
 *
 *  Replace with the real menu before launch — see CONTENT_TODO.md.
 *  No prices are set: V1 is enquiry-only by design.
 * ────────────────────────────────────────────────────────────────────
 */

import { indulgences } from './indulgences';

export interface BakeSize {
  label: string;
  serves?: string;
  /** Intentionally unset for V1. Populated when orderingMode becomes 'checkout'. */
  price?: number;
}

export interface Bake {
  id: string;
  slug: string;
  /** SAMPLE name */
  name: string;
  /**
   * The small label above the name, carried into the enquiry. A neutral
   * description for the signatures (safe to show before names are approved);
   * the menu's own title for the dessert table.
   */
  referenceLabel: string;
  /** One line. Also the photograph's alt text wherever the bake is shown. */
  shortDescription: string;
  description: string;
  images: string[];
  /** Per-image focal point so editorial crops never cut the cake badly. */
  objectPosition?: string;
  categories: string[];
  /** SAMPLE — flavour / build */
  flavour?: string;
  /** SAMPLE — the quality detail the client specifically wanted surfaced. */
  ingredients?: string[];
  /** SAMPLE — craft notes, kept for a future product page. Not shown at present. */
  details?: string[];
  /** Kept for filtering later. Not shown at present. */
  madeFor?: string[];
  sizes?: BakeSize[];
  /** SAMPLE — ordering lead time */
  leadTime?: string;
  available: boolean;
  orderingMode: 'enquiry' | 'checkout';
  isSample: boolean;
}

export const bakes: Bake[] = [
  {
    id: 'bake-01',
    slug: 'the-vow',
    name: 'The Vow',
    referenceLabel: 'A celebration in red',
    shortDescription: 'Three tiers of ivory buttercream, combed by hand, carrying fresh garden roses.',
    description:
      'The one we make when two families are meeting for the first time. Three tiers of Swiss meringue buttercream, combed by hand so the ridges catch the light differently from every seat in the room, then dressed with deep red garden roses cut the morning of. Nothing about it is loud. It simply does not let you look away.',
    images: ['/images/signature-red-rose-cake.jpg'],
    objectPosition: '50% 45%',
    categories: ['Weddings', 'Engagements', 'Anniversaries'],
    flavour: 'Vanilla bean sponge, rose and raspberry preserve, Swiss meringue buttercream',
    ingredients: [
      'Madagascar vanilla bean, seeds scraped fresh',
      'Single-origin white chocolate in the buttercream',
      'Raspberry preserve cooked down in-house, no pectin',
      'European cultured butter, 82% fat',
      'Fresh garden roses, food-safe and cut the same morning',
    ],
    details: [
      'Sponge baked the day before and rested overnight so it slices cleanly',
      'Swiss meringue, not American buttercream — less sweet, holds in Chennai heat',
      'Combed by hand on a turntable; every tier is finished in one pass',
      'Internal dowelling on all tiers, structurally safe for transport and display',
    ],
    madeFor: ['Weddings', 'Engagements', 'Milestones', 'Gifting'],
    sizes: [
      { label: 'Two tier', serves: '35–45' },
      { label: 'Three tier', serves: '60–80' },
      { label: 'Four tier', serves: '100+' },
    ],
    leadTime: '3 weeks notice for tiered celebration cakes',
    available: true,
    orderingMode: 'enquiry',
    isSample: true,
  },
  {
    id: 'bake-02',
    slug: 'sundae-afternoon',
    name: 'Sundae Afternoon',
    referenceLabel: 'Pastel art cake',
    shortDescription: 'A palette-knife cake in blush and caramel, loaded with cakesicles and cocoa spheres.',
    description:
      'Painted rather than iced. The buttercream goes on with a palette knife in blush, cream and burnt caramel, left deliberately unsmoothed so you can see the hand that made it. Then it gets loaded — cakesicles, a cracked cocoa sphere, a waffle cone, sugar shards, pearls. It is the least serious thing we make, and easily the most photographed.',
    images: ['/images/signature-art-cake.jpg'],
    objectPosition: '50% 50%',
    categories: ['Birthdays', 'Baby showers', 'Just because'],
    flavour: 'Salted caramel sponge, dulce de leche, vanilla bean buttercream',
    ingredients: [
      'Caramel cooked to a dark amber in-house, salted with fleur de sel',
      'Couverture chocolate for every sphere and cakesicle shell',
      'Freeze-dried strawberry for the pink — no artificial colour in the sponge',
      'Cultured butter and free-range eggs',
      'Hand-tempered cocoa butter for the pearl finish',
    ],
    details: [
      'Every sphere and cakesicle is tempered, moulded and hand-drizzled individually',
      'Palette-knife finish is done wet, in one sitting — it cannot be reworked',
      'Colour is built in layers so it reads soft, never neon',
      'Toppers are all edible; nothing is there just to look good',
    ],
    madeFor: ['Birthdays', 'Baby showers', 'Celebrations', 'Gifting'],
    sizes: [
      { label: '6 inch', serves: '10–12' },
      { label: '8 inch', serves: '18–22' },
      { label: '10 inch', serves: '30–35' },
    ],
    leadTime: '5 days notice',
    available: true,
    orderingMode: 'enquiry',
    isSample: true,
  },
  {
    id: 'bake-03',
    slug: 'wildflower-season',
    name: 'Wildflower Season',
    referenceLabel: 'Garden floral cake',
    shortDescription: 'Pressed edible blooms set into soft ivory buttercream, like a page from a herbarium.',
    description:
      'Our quietest cake and the one that takes the longest. Edible blooms — statice, larkspur, pressed viola, fine ferns — are placed one at a time into soft ivory buttercream, stems and all, so each tier reads like a pressed-flower page rather than a decorated cake. No two are ever the same, because no two batches of flowers ever are.',
    images: ['/images/garden-floral-cake.jpg'],
    objectPosition: '50% 55%',
    categories: ['Weddings', 'Milestones', 'Garden parties'],
    flavour: 'Elderflower and lemon sponge, mascarpone cream, white chocolate buttercream',
    ingredients: [
      'Edible blooms, food-safe and unsprayed, sourced fresh per order',
      'Elderflower cordial folded into the soak',
      'Mascarpone cream stabilised without gelatin',
      'Unwaxed lemons, zested by hand',
      'European cultured butter, 82% fat',
    ],
    details: [
      'Flowers are placed individually — a three-tier takes roughly four hours to dress',
      'Buttercream kept deliberately soft-textured so the blooms sit into it, not on it',
      'Finished within hours of delivery so nothing wilts',
      'Every cake is composed differently; we do not copy a previous one',
    ],
    madeFor: ['Weddings', 'Milestone birthdays', 'Garden parties', 'Gifting'],
    sizes: [
      { label: 'Single tier', serves: '12–15' },
      { label: 'Two tier', serves: '35–45' },
      { label: 'Three tier', serves: '60–80' },
    ],
    leadTime: '3 weeks notice — flowers are ordered per cake',
    available: true,
    orderingMode: 'enquiry',
    isSample: true,
  },
  {
    id: 'bake-04',
    slug: 'the-glasshouse',
    name: 'The Glasshouse',
    referenceLabel: 'Floral celebration',
    shortDescription: 'The cake, and the whole moment around it — styled as one composition.',
    description:
      'Sometimes the cake is not the whole ask. For a milestone we will design the cake and the moment it sits in together — the plinth, the arch, the florals, the height it needs to be so the photograph works. It is the same instinct as the baking, applied to the room: everything considered, nothing shouting.',
    images: ['/images/floral-event-cake.jpg'],
    objectPosition: '50% 50%',
    categories: ['Milestones', 'Events', 'Styling'],
    flavour: 'Built to the celebration — flavours chosen with you',
    ingredients: [
      'The same kitchen standards as every cake on this page',
      'Florals coordinated with your stylist, or arranged by us',
      'Plinths and backdrop specified to suit the venue',
    ],
    details: [
      'We visit or review photographs of the venue before designing',
      'Cake height and plinth scale are set for the room, not by default',
      'Delivered and installed by us — never handed over at a door',
      'Collaborates with your existing planner or decorator',
    ],
    madeFor: ['Milestone birthdays', 'Events', 'Receptions', 'Brand celebrations'],
    sizes: [
      { label: 'Cake only', serves: 'Scaled to guests' },
      { label: 'Cake + plinth styling', serves: 'Scaled to guests' },
      { label: 'Full centrepiece installation', serves: 'Scaled to guests' },
    ],
    leadTime: '4–6 weeks notice for styled installations',
    available: true,
    orderingMode: 'enquiry',
    isSample: true,
  },
];

/** Everything that can be enquired about — or, later, bought. */
export const allBakes = (): Bake[] => [...bakes, ...indulgences];

export const getBakeBySlug = (slug: string) => allBakes().find((b) => b.slug === slug);
