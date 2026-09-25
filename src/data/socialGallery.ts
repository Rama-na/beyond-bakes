/**
 * The Instagram wall — two filmstrips drifting in opposite directions.
 *
 * Hand-maintained, never scraped at runtime. To add photographs: drop them in
 * /public/images and add an entry. Keep every view within a row distinct —
 * a strip is wide enough that a repeat shows up on screen at the same time
 * as the original.
 *
 * `zoom` + `focus` make a genuine close-up crop. `objectPosition` alone cannot:
 * the photographs are portrait and so are the tiles, so there is no slack for
 * it to move the image into.
 */

export interface GalleryItem {
  src: string;
  alt: string;
  /** Alternating shapes give the strip its rhythm. */
  shape: 'arch' | 'rect';
  /** Magnification for a detail crop. 1 = the whole photograph. */
  zoom?: number;
  /** Point to zoom towards, as a CSS position, e.g. '30% 70%'. */
  focus?: string;
  /** Optional deep link to the specific post */
  href?: string;
}

export const galleryRows: GalleryItem[][] = [
  // The cakes, the cart, and the two of them.
  [
    {
      src: '/images/signature-art-cake.jpg',
      alt: 'Pastel palette-knife cake topped with cakesicles and a waffle cone',
      shape: 'arch',
    },
    {
      src: '/images/dessert-cart-close.jpg',
      alt: 'A white dessert cart with a scalloped canopy, set with mousse cups, cupcakes and flowers',
      shape: 'rect',
    },
    {
      src: '/images/garden-floral-cake.jpg',
      alt: 'A tiered cake set with pressed edible flowers',
      shape: 'arch',
    },
    {
      src: '/images/portrait-swapna.jpg',
      alt: 'Swapna, co-founder of BeyondBakes',
      shape: 'rect',
    },
    {
      src: '/images/signature-red-rose-cake.jpg',
      alt: 'Close detail of red garden roses against combed buttercream',
      shape: 'arch',
      zoom: 1.9,
      focus: '38% 74%',
    },
    {
      src: '/images/strawberry-mousse-cups.jpg',
      alt: 'Strawberry Dream — cups of strawberry mousse finished with edible flowers',
      shape: 'rect',
    },
    {
      src: '/images/floral-event-cake.jpg',
      alt: 'A floral celebration with the cake on a white arched plinth',
      shape: 'arch',
    },
    {
      src: '/images/portrait-girvani.jpg',
      alt: 'Girvani, co-founder of BeyondBakes',
      shape: 'rect',
    },
  ],
  // The dessert table, closer in.
  [
    {
      src: '/images/cupcakes-and-buns.jpg',
      alt: 'Chocolate cakes with piped ganache and edible flowers, below a stand of baked buns',
      shape: 'rect',
    },
    {
      src: '/images/mousse-cups-florals.jpg',
      alt: 'Rows of mousse cups on a white table beneath a spray of flowers',
      shape: 'arch',
    },
    {
      src: '/images/chocolate-cupcakes-table.jpg',
      alt: 'Chocolate cakes with edible flowers and a tray of buns on a dessert table',
      shape: 'rect',
    },
    {
      src: '/images/signature-art-cake.jpg',
      alt: 'Close detail of palette-knife buttercream and a drizzled cakesicle',
      shape: 'arch',
      zoom: 2,
      focus: '30% 70%',
    },
    {
      src: '/images/dessert-and-savoury-table.jpg',
      alt: 'Vanilla and chocolate cupcakes set out on a white dessert table',
      shape: 'rect',
    },
    {
      src: '/images/blueberry-cheesecake-cups.jpg',
      alt: 'Close detail of blueberry cheesecake cups topped with edible flowers',
      shape: 'arch',
      zoom: 1.8,
      focus: '66% 78%',
    },
    {
      src: '/images/dessert-cart-glasshouse.jpg',
      alt: 'Close detail of the flowers dressing a white dessert cart',
      shape: 'rect',
      zoom: 1.9,
      focus: '72% 34%',
    },
    {
      src: '/images/garden-floral-cake.jpg',
      alt: 'Close detail of pressed violas and statice set into buttercream',
      shape: 'arch',
      zoom: 2.1,
      focus: '42% 62%',
    },
  ],
];
