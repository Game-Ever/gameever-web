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
4. Put images in `src/assets/projects/<slug>/` and reference them relative to the Markdown file (`../../assets/projects/<slug>/cover.jpg`). The cover is square key art (character-led, no text); landscape screenshots in `gallery` are also used as the page hero, or set `heroImage` (landscape, characters toward the top/right, since the title sits bottom-left). On phones the hero always shows the square cover whole, so the cover must keep the characters uncut. Astro converts everything to WebP at the needed sizes, so originals can be large.
5. Link the client by setting `clientUrl` (the client name in the fact sheet becomes a link). Only link pages that work, and never link to a dead store page.
6. Run `npm run build`. A schema error names the file and field (including missing images).

Rules:
- Projects under NDA are never published, not even anonymized.
- Projects we drop from the site get `hidden: true` instead of being deleted, so their information is kept.
- One page per product: each album, series or line of videos is its own project (e.g. `las-canciones-del-zoo-1` … `-7`, `las-canciones-del-zoo-la-serie`, `las-canciones-del-zoo-a-jugar`, `la-granja-de-zenon-a-rodar` and `-a-jugar`), because each was made in different years by different people. `entries` lists the clips of that product, most viewed first, with `views`; `entriesTitle` (en/es) names the block ("Los videoclips", "Los capítulos"). Small repeated ad campaigns (`puro-sol.md`) can still share one page.
- Images: static only (no moving hero). Both come from the product's most viewed clip, two different frames when possible (YouTube serves the thumbnail plus frames maxres1–3.jpg): `cover` (4:3, the characters whole and centered, used for cards and on phones) and `heroImage` (16:9, the scene). Song lists come from the album on Spotify/Deezer, matched to the YouTube clips. Credits use `creditList` (role → names, collapsed under "Créditos"; `group` makes one panel per campaign/year), without the client, agency or the client's executives. The old `credits` text field is no longer used.
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
