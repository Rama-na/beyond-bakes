# Photographs

```
signature-art-cake.jpg        Pastel palette-knife cake, cakesicles + cone   (HERO)
floral-event-cake.jpg         Floral celebration, white arched plinth       (full-bleed reveal)
garden-floral-cake.jpg        Pressed-flower tiered cake, close-up
signature-red-rose-cake.jpg   Three tiers, red garden roses
portrait-girvani.jpg          Girvani
portrait-swapna.jpg           Swapna
```

## Adding more

More photographs are the biggest single upgrade left — four cake shots
currently carry the whole page. To add one:

1. Export at roughly 1600px on the long edge, JPEG.
2. Drop it in this folder.
3. Reference it from `src/data/bakes.ts`, `src/data/craft.ts` or
   `src/data/socialGallery.ts`.

No component changes are needed. Every path resolves through `asset()`
(`src/lib/asset.ts`), so it works on the GitHub Pages subpath.

See `../../CONTENT_TODO.md`.
