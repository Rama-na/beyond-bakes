# Content to replace before launch

Everything in `src/data/` is designed to be edited without touching a component.
This is the list of what is currently **sample copy** and what is still **missing**.

---

## 1. Photographs — MISSING (blocks launch)

The four cake photographs and the two portraits are **not in the repository**. They
came through as inline images in the brief rather than as files, so they could not be
saved.

Drop them into `public/images/` with exactly these filenames:

| File | What it is |
| --- | --- |
| `signature-red-rose-cake.jpg` | Three-tier ivory cake with deep red garden roses. Used as the **hero**. |
| `signature-art-cake.jpg` | Pastel palette-knife cake with cakesicles, waffle cone, cocoa spheres. |
| `garden-floral-cake.jpg` | Pressed-flower tiered cake, close-up. |
| `floral-event-cake.jpg` | The full floral celebration setup with the white arched plinth. |
| `portrait-girvani.jpg` | Portrait of Girvani (4:5 crop works best). |
| `portrait-swapna.jpg` | Portrait of Swapna (4:5 crop works best). |

Until they are added, each frame shows a blush placeholder naming the file it needs —
the layout is already correct, so nothing shifts when the real images land.

**Sizing:** export at roughly 1600px on the long edge. Anything larger is wasted on a
phone. See "Image optimisation" in `README.md`.

---

## 2. Sample copy — written for the draft, needs approval

All of this reads as real, finished copy. **None of it has been confirmed with
Girvani and Swapna.** It exists so the site could be designed against real sentences
instead of lorem ipsum.

### `src/data/story.ts` — the personal chapter

Built on the one fact supplied: *they met in a baking class, became friends
immediately, and started BeyondBakes together.* Everything around that fact —
the Saturday morning, the sponge that refused to rise, the third Saturday, staying
behind after class — is **invented for the draft**.

- [ ] `story.journey` — the five-line origin story
- [ ] `founders[].body` — the personal paragraph for each of them
- [ ] `founders[].pullQuote` — the line beside each portrait
- [ ] `founders[].role` — "Design & celebrations" / "Pastry chef"
- [ ] `story.message.quote` — the "From us, to you" line
- [ ] Set `STORY_IS_SAMPLE = false` once approved

### `src/data/bakes.ts` — the menu

The photographs are real work. The **names, flavours, ingredients, sizes and lead
times are invented.** Every bake carries `isSample: true`.

- [ ] Cake names — currently *The Vow*, *Sundae Afternoon*, *Wildflower Season*,
      *The Glasshouse*
- [ ] `flavour` for each
- [ ] `ingredients[]` — the quality details (these make specific claims: Madagascar
      vanilla, 82% cultured butter, single-origin white chocolate, no artificial
      colour). **Confirm or replace each one.**
- [ ] `details[]` — the craft notes
- [ ] `sizes[]` — labels and serving counts
- [ ] `leadTime` — currently 5 days / 3 weeks / 4–6 weeks
- [ ] Set `isSample: false` per bake once approved

### `src/data/craft.ts` — the process

Describes a real pastry process, but not necessarily *this* kitchen's.

- [ ] `craft.standfirst` — the claim that nothing is batched, frozen or bought in
- [ ] The four sections: Detail, Time, Texture, Balance
- [ ] Set `CRAFT_IS_SAMPLE = false` once approved

### `src/data/brand.ts`

- [ ] `brand.intro` and `brand.introSecondary` — the editorial opening

---

## 3. Signatures

The "From us, to you" section currently sets each name in a script face
(`kind: 'typeset'`). This is an honest visual stand-in — **not** an imitation of
anyone's handwriting.

To use the real signatures: scan them as transparent PNG or SVG, put them in
`public/brand/`, and switch the entry in `src/data/story.ts`:

```ts
signature: { kind: 'image', src: '/brand/signature-girvani.svg', isSample: false }
```

The component handles both without further changes.

---

## 4. Still to confirm

- [ ] **Instagram URL** — `brand.instagramUrl` is set to
      `https://instagram.com/beyondbakes.co`. Confirm this is the right account.
- [ ] **Domain** — once confirmed, set the canonical URL and `og:url` in `index.html`.
- [ ] **Logo** — the current mark is a frame extracted from the supplied animation
      (`public/brand/logo-mark.png`, 960×960). If a vector or high-resolution original
      exists, use that instead.
- [ ] **Delivery / service area** — not stated anywhere on the site. Add if wanted.
- [ ] **Lead time** — currently stated per cake. Confirm the real minimums.
- [ ] Anything the client wants said about allergens or dietary options.

---

## 5. Deliberately absent

Per the brief, the site contains **no** prices, reviews, testimonials, ratings,
statistics, awards, stock photography, or invented customer names. Please keep it
that way unless the client supplies the real thing.
