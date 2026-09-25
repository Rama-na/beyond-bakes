# Photographs

All exported at web size (1600px long edge; the full-bleed reveal at 1900px
wide), JPEG, with no camera metadata carried over.

## In use

```
signature-art-cake.jpg        Pastel palette-knife cake              hero, carousel, filmstrip
dessert-cart-glasshouse.jpg   White dessert cart in the glasshouse   full-bleed reveal, filmstrip
signature-red-rose-cake.jpg   Three tiers, red garden roses          carousel, craft (Texture), filmstrip
garden-floral-cake.jpg        Pressed-flower tiered cake             carousel, craft (Detail), filmstrip
floral-event-cake.jpg         Floral celebration, arched plinth      carousel, filmstrip
blueberry-cheesecake-cups.jpg "Blueberry Bliss" cups                 craft (Time), filmstrip
plated-tasting.jpg            A composed tasting plate               craft (Balance)
strawberry-mousse-cups.jpg    "Strawberry Dream" mousse cups         filmstrip
dessert-cart-close.jpg        The cart, closer in                    filmstrip
cupcakes-and-buns.jpg         Chocolate cakes, edible flowers, buns  filmstrip
mousse-cups-florals.jpg       Mousse cups under flowers              filmstrip
chocolate-cupcakes-table.jpg  Chocolate cakes on the dessert table   filmstrip
dessert-and-savoury-table.jpg Cupcakes and savouries                 filmstrip
portrait-girvani.jpg          Girvani                                story, filmstrip
portrait-swapna.jpg           Swapna                                 story, filmstrip
```

## Kept, not used

```
savoury-cups.jpg              Pasta salad and corn cups
savoury-table-drinks.jpg      Sandwiches and a blue drinks tower
sandwiches-drinks-menu.jpg    Sandwiches and the drinks menu
welcome-table.jpg             Welcome sign and buns
```

Busier and further from the palette than the rest — and the welcome sign
names a third-party planner, which shouldn't be the first thing seen on
BeyondBakes' own site. Kept in case they are wanted later.

## Adding more

1. Export at roughly 1600px on the long edge, JPEG.
2. Drop it in this folder with a descriptive name.
3. Reference it from `src/data/bakes.ts`, `src/data/craft.ts` or
   `src/data/socialGallery.ts`.

No component changes are needed. Every path resolves through `asset()`
(`src/lib/asset.ts`), so it works on the GitHub Pages subpath.
