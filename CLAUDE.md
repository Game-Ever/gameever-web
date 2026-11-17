# Game Ever website

Astro 7 static site for gameeverstudio.com, bilingual (EN default, ES). Design direction "D · Showcase": full-screen reel, statement, filterable project wall, services, clients, contact.

## Commands
Node is installed at `C:\Program Files\nodejs` (add it to PATH in new shells).
- `npm run dev`: dev server on http://localhost:4321 (or the `astro-dev` entry in `.claude/launch.json`)
- `npm run build`: builds to `dist/` and validates every project against the schema

## Adding or editing a project
1. Copy `src/content/projects/_template.md` to `src/content/projects/<slug>.md`. The slug is the URL.
2. Fill in **both** `en` and `es` for `summary`, `description`, `genre` and `role`. Never leave one language behind.
3. `services` and `platforms` only accept the keys in `src/data/taxonomy.ts`. Add a new key there (with both labels) if needed.
4. Put images in `src/assets/projects/<slug>/` and reference them relative to the Markdown file (`../../assets/projects/<slug>/cover.jpg`). The cover is square key art (1:1, at least 1200×1200, character-led, no text); landscape screenshots in `gallery` are also used as the page hero, or set `heroImage` (landscape, characters toward the top/right, since the title sits bottom-left). On phones the hero always shows the square cover whole, so the cover must keep the characters uncut. Astro converts everything to WebP at the needed sizes, so originals can be large.
5. Link the client by setting `clientUrl` (the client name in the fact sheet becomes a link). Only link pages that work, and never link to a dead store page.
6. Run `npm run build`. A schema error names the file and field (including missing images).

Rules:
- Projects under NDA are never published, not even anonymized.
- Projects we drop from the site get `hidden: true` instead of being deleted, so their information is kept.
- One page per product: each album, series or line of videos is its own project (e.g. `las-canciones-del-zoo-1` … `-7`, `las-canciones-del-zoo-la-serie`, `las-canciones-del-zoo-a-jugar`, `la-granja-de-zenon-a-rodar` and `-a-jugar`), because each was made in different years by different people. `entries` lists the clips of that product, most viewed first, with `views`; `entriesTitle` (en/es) names the block ("Los videoclips", "Los capítulos"). Small repeated ad campaigns (`puro-sol.md`) can still share one page.
- Images: static only (no moving hero). The site uses two image formats only: `cover` is square (1:1, at least 1200×1200, the characters whole and centered, no text; used for the cards, the thumbnail next to the title and the phone hero) and `heroImage` is 16:9 (at least 1920×1080, ideally 2560×1440; important things in the center and upper half, nothing key in the bottom-left third where the title sits; also used for link previews). When there is no studio art, both can come from the product's most viewed clip, two different frames when possible (YouTube serves the thumbnail plus frames maxres1–3.jpg). Older covers are still 4:3 and are shown center-cropped to a square. Optional `heroMobile` (square) replaces the cover as the phone hero, e.g. the center of the header art. Song lists come from the album on Spotify/Deezer, matched to the YouTube clips. Credits use `creditList` (role → names, collapsed under "Créditos"; `group` makes one panel per campaign/year), without the client, agency or the client's executives. The old `credits` text field is no longer used.
- `legacySlugs` lists old WordPress URLs (`/portfolio/<slug>/`); they become 301 redirects in `dist/_redirects`.

## Structure
- `src/content.config.ts`: project schema
- `src/i18n/index.ts`: UI strings for both languages, client list, social links, helpers
- `src/components/`: Reel, Statement, Wall (area tabs/search/sort with URL state), Services, Clients, Contact, YouTube
- `src/pages/[lang]/`: home and `work/[slug]` project pages; `[redirects].ts` generates `_redirects`
- `legacy/legacy-projects.json`: full archive of the old WordPress portfolio (49 projects); `scripts/scrape-legacy.mjs` re-creates it
- `scripts/import-legacy.mjs`: one-time import used to create the project files (the `.md` files are now the source of truth)
- `scripts/localize-images.mjs`: downloaded the old site's images into `src/assets/` (no image is hot-linked from WordPress anymore)
- `prototypes/` and `content-audit.csv`: local-only design prototypes and inventory (git-ignored)

## Two designs side by side
- **v1 / D · Showcase** (current): `/en/`, `/es/`, built from `src/layouts/Base.astro` and `src/components/`.
- **v2 · GDC-style** (comparison): `/v2/en/`, `/v2/es/`, built from `src/layouts/BaseV2.astro`, `src/components/v2/` and `src/i18n/v2.ts`. Always `noindex` and excluded from the sitemap.
Both read the same project files. When one design is chosen, delete the other one's layout, components and pages.

## Deploys
- Preview: every push to `main` deploys to GitHub Pages at https://game-ever.github.io/gameever-web/ (`.github/workflows/deploy-pages.yml`), with `noindex` on every page.
- Internal links must go through `url()`, `v2url()` or `withBase()` (`src/i18n/`), because the preview lives under `/gameever-web/`. `SITE_URL`, `BASE_PATH` and `PUBLIC_NOINDEX` env vars control this; without them the build targets gameeverstudio.com at the root.
- Git push uses SSH with the repo-local `core.sshCommand` (key `~/.ssh/DesktopPablo`).

## Current phase: design
Until the user says the design is final: only the GitHub Pages preview is updated. Do not move the site to gameeverstudio.com (Cloudflare/DNS) and do not connect the form to a delivery service.

## Brand phrases (use exactly)
- Tagline — EN: "We dream. We create. We play." · ES: "Soñamos. Creamos. Jugamos." (shown once, as the page h1 over the reel video with the subtitle in a side block; not repeated in the footer)
- Closing — EN: "Let's make something awesome." · ES: "Hagamos algo increíble juntos."

## Type scale
Every section title uses `var(--title-size)` and every sub-title (card titles, accordion names, form title) uses `var(--subtitle-size)` (both in `src/styles/global.css`). Only the hero tagline over the reel (left-aligned, capped at 88px, one phrase per line) and project page titles plus the "Próximo proyecto" title (same size as that tagline) are larger. Paragraphs use `var(--body-size)`. Text next to a section title goes in the global `.aside` block: one pink left bar per block, body paragraphs only, all in the same normal style (no bold lead lines; the user chose this "option A"). Used in Nosotros, Qué hacemos, Servicios and Todos los proyectos; title + aside use a 1fr/1fr grid, top-aligned. On pink backgrounds add `.on-pink` (white bar instead of pink). Multi-line titles are arrays of lines in i18n (rendered as block spans). New sections must use these variables, not their own clamp().

## Copy style
Short, strong phrases. No repeated key words across the home. Professional tone: first person plural or no verb; never tú/vos (no "Contanos", "Escribinos", "¿Buscás…?").

## Project page patterns
- Media layout (being tried on Juanito only; other projects keep the video grid, image grid and press list until it is approved): `highlights` (1–2 videos) play big, one under the other, in a dark full-width band, each with a `title` and a short `text` (title + aside layout); the gallery is a 16:9 viewer with a thumbnail strip, images only; `process` items can be videos (speed paints, making of) under "Detrás de escena"; `press` shows 2–3 chosen items as white cards with the bottom-right corner folded (outlet name on one line with a small fixed-width pink `score` badge on its right, full headline, `author` and year) and can hold videos (TV, streams). The Game Ever page is a curated selection: the rest of the material stays commented in the project file for the game's own site.
- Videos (`src/components/YouTube.astro`): the poster is YouTube's best thumbnail (maxres 1280x720 when it exists), recorded in `src/data/yt-thumbs.json` by `node scripts/yt-thumbs.mjs` (run it after adding videos; missing ones are checked at build time). The play button is YouTube's rounded rectangle in our pink, centered, no text; it grows with the player (container queries).
- Gallery: images at their own shape, two per row (four for phone screenshots, one/two on phones); a click opens the viewer (arrows, keys, swipe, Esc).
- Corners: images that stand alone (the thumbnail next to the title, the "Próximo proyecto" one) are rounded; edge-to-edge images (hero, phone cover) are square. Some old-site covers have dark rounded corners painted in; replace them with clean images.
- The small line over the title shows service · client only (no year: it is in the fact sheet). Titles go down to 30px on phones so most fit in two lines.
- Titles with a series or franchise set `series` (e.g. "Canciones del Zoo" over "Vol. 3", "LIT Killah" over "The Game", "Juanito" over "Arcade Mayhem"): the project page shows it as a smaller line over the rest of the title; cards, search and meta use the full `title`.
- No "Ver tráiler" button in the hero: the videos are a scroll away. The hero only has the store / site buttons.
- No tags under the project title: genre and platforms live only in the fact sheet. `role` is short (e.g. "Desarrollo integral"); the detail goes in the description and credits.
- Platforms are shown as device families (`platformLabels()` in `src/data/taxonomy.ts`): iOS and Android read "Mobile", Steam reads "PC"; the stores show in the logo buttons. Project files keep the detailed keys.
- `links` render as store buttons with the store's logo (`src/components/StoreButton.astro`), recognized from the URL: App Store, Google Play, Steam, GOG ("Disponible en"), browser game portals like Poki ("En Poki / Jugar online"); a game on any other site needs `webGame: true` ("En el navegador / Jugar online"); any other site shows "Sitio web", but a client's website goes in `clientUrl` instead. A label naming another product ("Zoo Animals (App Store)") shows that name with the store as caption. Add new stores or portals there.

## Home vs. projects page
- Home shows a selection of 6 projects (`Wall` variant `home`, first 6 in Featured order) and a "Ver todos los proyectos" link. Projects used in the "Qué hacemos" cards (`src/data/worlds.ts`: one muted YouTube loop per card, now the LIT Killah game trailer and the Flexin' video) are left out of that selection so nothing repeats; they still show on the projects page.
- `/[lang]/work/` lists every project (`Wall` variant `full`) with area tabs (Todos / Videojuegos / Animación / Co-producción), search and sort (Featured, Newest, A–Z), kept in the URL (`?area=games&q=…&sort=newest`). Areas are derived from services/platforms by `areasOf()` in `src/data/taxonomy.ts` (no extra field in project files). Links from Qué hacemos and Servicios open the matching tab. Platform, era and client filters were dropped on purpose (not useful: almost one project per client).

## Version stamp
Every page ends with the same line (`src/components/Legal.astro`, used by Contact and the project pages): `Versión X.Y.Z` on the left (commit and build date only in data attributes, `src/data/build.ts`) and "© YEAR Game Ever. Todos los derechos reservados." on the right. Bump `version` in package.json on each design round.

## Language
The user is writing and reviewing the site in Spanish first; English copy is a draft to be translated at the end. Write new copy in Spanish, keep an English draft so builds and the EN pages still work.

## Contact
The closing section (`src/components/Contact.astro`) has a short contact form (name, email, message) plus the direct info@ / jobs@ emails and social icons.
- Delivery: set `PUBLIC_FORM_ENDPOINT` (and `PUBLIC_FORM_KEY` if the service needs one, e.g. Web3Forms) at build time. Without them the form opens the visitor's email app with the message addressed to info@.
- Spam: hidden honeypot field `botcheck`.
