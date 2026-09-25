# Content to replace before launch

Everything in `src/data/` is designed to be edited without touching a component.
This is the list of what is currently **sample copy** and what is still **missing**.

---

## 1. Photographs

All six are in `public/images/`:

| File | What it is | Where it appears |
| --- | --- | --- |
| `signature-art-cake.jpg` | Pastel palette-knife cake, cakesicles and cone | **Hero**, carousel, craft, filmstrip |
| `floral-event-cake.jpg` | The floral celebration, white arched plinth | Full-bleed reveal, carousel, craft, filmstrip |
| `garden-floral-cake.jpg` | Pressed-flower tiered cake, close-up | Carousel, craft, filmstrip |
| `signature-red-rose-cake.jpg` | Three tiers, red garden roses | Carousel, craft, filmstrip |
| `portrait-girvani.jpg` | Girvani | Story, filmstrip |
| `portrait-swapna.jpg` | Swapna | Story, filmstrip |

### More photographs are the biggest single upgrade left

Four cake photographs carry the whole page, so each appears three or four
times. The filmstrip already re-crops them into close-ups to hide it, but real
variety would lift the page more than any further design change. Adding one is
a data change only — drop the file in `public/images/` and reference it from
`bakes.ts`, `craft.ts` or `socialGallery.ts`. With eight or more, the filmstrip
can take a second row drifting the other way (see the note in
`socialGallery.ts`).

**Note:** a batch of new images was mentioned in the brief for this revision,
but it did not arrive — nothing new reached the session or the repository.
Resend and they will be sorted into the right places.

### The red-rose topper

The red-rose cake carries a "Durai ♥ Monisha" topper. It is real commissioned
work and fine to show; it is no longer the hero, but it is still visible in the
carousel and the craft sequence.

---

## 2. Sample copy — written for the draft, needs approval

It reads as finished, but **none of it has been confirmed with Girvani and
Swapna.** There is now very little of it — about a hundred words on the page —
so approving it is a short job.

### `src/data/brand.ts`

- [ ] `manifesto` — "Every celebration has a feeling. We turn it into something you can taste."
- [ ] `momentLine` — "Made for the moments worth remembering."

### `src/data/story.ts`

Built on the one supplied fact: *they met in a baking class, became friends
straight away, and started BeyondBakes together.* "Over a sponge that refused
to rise" is invented for the draft.

- [ ] `headline` — "Two friends. One kitchen."
- [ ] `line` — the one-sentence origin
- [ ] `founders[].role` — used for screen readers and alt text only; the
      visible roles are inside the portraits themselves
- [ ] Set `STORY_IS_SAMPLE = false` once approved

### `src/data/craft.ts`

Four steps, a word and a line each. They describe a real pastry process, but
not necessarily *this* kitchen's.

- [ ] Detail — "Every flower, placed by hand."
- [ ] Texture — "Buttercream combed in a single pass."
- [ ] Time — "Rested overnight. Never rushed."
- [ ] Balance — "It should taste as good as it looks."
- [ ] Set `CRAFT_IS_SAMPLE = false` once approved

### `src/data/bakes.ts` — the menu

The photographs are real work. The **names, flavours, ingredients, sizes and lead
times are invented.** Every bake carries `isSample: true`. On the page only the
name shows; the rest lives in the detail panel that opens from the carousel.

- [ ] Cake names — currently *The Vow*, *Sundae Afternoon*, *Wildflower Season*,
      *The Glasshouse*
- [ ] `flavour` for each
- [ ] `ingredients[]` — the quality details (these make specific claims: Madagascar
      vanilla, 82% cultured butter, single-origin white chocolate, no artificial
      colour). **Confirm or replace each one.**
- [ ] `details[]` — kept in the data for a future product page; not shown at present
- [ ] `sizes[]` — labels and serving counts
- [ ] `leadTime` — currently 5 days / 3 weeks / 4–6 weeks
- [ ] Set `isSample: false` per bake once approved

---

## 3. Signatures

The page no longer shows signatures — the two portraits already carry each
founder's name in their own lettering, and a typeset stand-in beside them read
as redundant. If scanned signatures are supplied, they would sit well under the
portraits in the story section.

---

## 4. Still to confirm

- [ ] **Instagram URL** — `brand.instagramUrl` is set to
      `https://instagram.com/beyondbakes.co`. Confirm this is the right account.
- [ ] **Domain** — currently `rama-na.github.io/beyond-bakes/`. If it moves, update
      `canonical` / `og:url` in `index.html` and build with `VITE_BASE=/`.
- [ ] **Logo** — the current mark is a frame extracted from the supplied animation
      (`public/brand/logo-mark.png`, 512×512). If a vector or high-resolution original
      exists, use that instead.
- [ ] **Delivery / service area** — not stated anywhere on the site. Add if wanted.
- [ ] **Lead time** — currently stated per cake. Confirm the real minimums.
- [ ] Anything the client wants said about allergens or dietary options.

---

## 5. Deliberately absent

Per the brief, the site contains **no** prices, reviews, testimonials, ratings,
statistics, awards, stock photography, or invented customer names. Please keep it
that way unless the client supplies the real thing.
