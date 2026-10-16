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

## Contact policy
Contact is email only (info@ / jobs@). No forms.
