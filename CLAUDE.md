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
4. Put images in `src/assets/projects/<slug>/` and reference them relative to the Markdown file (`../../assets/projects/<slug>/cover.jpg`). The cover is square key art (character-led, no text); landscape screenshots in `gallery` are also used as the page hero. Astro converts everything to WebP at the needed sizes, so originals can be large.
5. Run `npm run build`. A schema error names the file and field (including missing images).

Rules:
- Projects under NDA are never published, not even anonymized.
- Projects we drop from the site get `hidden: true` instead of being deleted, so their information is kept.
- Repeated campaigns of the same client/IP go in one project with `entries` (see `puro-sol.md`, `las-canciones-del-zoo.md`).
- `legacySlugs` lists old WordPress URLs (`/portfolio/<slug>/`); they become 301 redirects in `dist/_redirects`.

## Structure
- `src/content.config.ts`: project schema
- `src/i18n/index.ts`: UI strings for both languages, client list, social links, helpers
- `src/components/`: Reel, Statement, Wall (filters/search/sort with URL state), Services, Clients, Contact, YouTube
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
- Tagline — EN: "We dream. We create. We play." · ES: "Soñamos. Creamos. Jugamos." (shown once, in the pink statement band; not repeated in the footer)
- Closing — EN: "Let's make something awesome." · ES: "Hagamos algo increíble juntos."

## Type scale
Every section title uses `var(--title-size)` and every sub-title (card titles, accordion names, form title) uses `var(--subtitle-size)` (both in `src/styles/global.css`). Only the pink statement band and project page heroes are larger. Paragraphs use `var(--body-size)`. Text next to a section title goes in the global `.aside` block: one pink left bar per block, body paragraphs inside and at most one bold `.lead` line (`var(--lead-size)`). Used in Nosotros, Qué hacemos, Servicios and Todos los proyectos; title + aside use a 1fr/1fr grid, top-aligned. On pink backgrounds add `.on-pink` (ink bar instead of pink). Multi-line titles are arrays of lines in i18n (rendered as block spans). New sections must use these variables, not their own clamp().

## Copy style
Short, strong phrases. No repeated key words across the home. Professional tone: first person plural or no verb; never tú/vos (no "Contanos", "Escribinos", "¿Buscás…?").

## Home vs. projects page
- Home shows a selection of 6 projects (`Wall` variant `home`, first 6 in Featured order) and a "Ver todos los proyectos" link.
- `/[lang]/work/` lists every project with search, filters and sort (`Wall` variant `full`). Links from Qué hacemos and Servicios open it pre-filtered (`?sv=a,b`).

## Version stamp
The footer shows `Versión X.Y.Z` on the left (commit and build date only in data attributes, `src/data/build.ts`) and "© YEAR Game Ever. Todos los derechos reservados." on the right. Bump `version` in package.json on each design round.

## Language
The user is writing and reviewing the site in Spanish first; English copy is a draft to be translated at the end. Write new copy in Spanish, keep an English draft so builds and the EN pages still work.

## Contact
The closing section (`src/components/Contact.astro`) has a short contact form (name, email, message) plus the direct info@ / jobs@ emails and social icons.
- Delivery: set `PUBLIC_FORM_ENDPOINT` (and `PUBLIC_FORM_KEY` if the service needs one, e.g. Web3Forms) at build time. Without them the form opens the visitor's email app with the message addressed to info@.
- Spam: hidden honeypot field `botcheck`.
