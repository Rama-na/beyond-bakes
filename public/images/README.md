# Photographs

Supplied and in place:

```
signature-red-rose-cake.jpg   Three-tier ivory cake, red garden roses  (HERO)
signature-art-cake.jpg        Pastel palette-knife cake, cakesicles + cone
garden-floral-cake.jpg        Pressed-flower tiered cake, close-up
floral-event-cake.jpg         Floral celebration setup, white arched plinth
portrait-girvani.jpg          Portrait of Girvani
```

Still missing:

```
portrait-swapna.jpg           Portrait of Swapna  (4:5 crop, to match Girvani's)
```

Until it exists, that frame shows a blush placeholder naming the file it is
waiting for — the layout is already correct, so nothing moves when it lands.

Filenames are referenced from `src/data/bakes.ts`, `src/data/story.ts`,
`src/data/craft.ts`, `src/data/socialGallery.ts` and
`src/components/hero/Hero.tsx`. Everything resolves through `asset()`
(`src/lib/asset.ts`) so it works on the GitHub Pages subpath.

See `../../CONTENT_TODO.md`.
