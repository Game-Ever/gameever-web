// Archives every project from the old WordPress site (gameeverstudio.com) into
// legacy/legacy-projects.json so nothing is lost, including projects we don't publish.
// Usage: node scripts/scrape-legacy.mjs
import { writeFile, mkdir } from 'node:fs/promises';

const BASE = 'https://gameeverstudio.com';
const FIELDS = ['FORMAT', 'YEAR', 'DURATION', 'PLATFORM', 'LANGUAGE', 'TECHNIQUE', 'CATEGORY', 'AGE GROUP', 'CLIENT', 'DIRECTOR'];

const decode = (s) =>
  s.replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ').trim();

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'GameEver-archive/1.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function parseList(html) {
  const items = [];
  const blocks = html.split(/(?=<div class="col[^"]*?elastic-portfolio-item)/).slice(1);
  for (const block of blocks) {
    const slug = (block.match(/\/portfolio\/([^/"]+)\//) || [])[1];
    if (!slug) continue;
    const cats = (block.match(/class="col ([^"]*?)elastic-portfolio-item/) || [])[1] || '';
    const img = (block.match(/data-nectar-img-src="([^"]+)"/) || block.match(/<img[^>]+src="([^"]+uploads[^"]+)"/) || [])[1];
    if (!items.find((i) => i.slug === slug)) items.push({ slug, categories: cats.trim().split(/\s+/).filter((c) => !/^(span_|instance|element|has-post)/.test(c) && c), cover: img });
  }
  return items;
}

function parseProject(html) {
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ''));
  const title = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const info = {};
  for (const f of FIELDS) {
    const m = text.match(new RegExp(`\\b${f} (.+?) (?=${FIELDS.join('|')}|CREDITS|NAME EMAIL|$)`));
    if (m) info[f.toLowerCase().replace(' ', '_')] = m[1].trim();
  }
  const descMatch = text.match(new RegExp(`${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} (.+?) INFO `));
  const credits = (text.match(/CREDITS (.+?) NAME EMAIL MESSAGE/) || [])[1] || '';
  const youtube = [...new Set([...html.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/g)].map((m) => m[1]))];
  const images = [...new Set([...html.matchAll(/(?:src|data-nectar-img-src|href)="(https:\/\/gameeverstudio\.com\/wp-content\/uploads\/[^"]+\.(?:png|jpe?g|webp|gif))"/g)].map((m) => m[1]))]
    .filter((u) => !/logo|badget|-\d+x\d+\./i.test(u));
  // Store/play links only from the project body, not the shared footer or "next project" area
  const body = html.split(/class="bottom_controls|id="footer-outer/)[0];
  const links = [...new Set([...body.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]))]
    .filter((u) => !/gameeverstudio\.com|twitter|facebook|linkedin|instagram|youtube\.com\/user|leafletjs|openstreetmap|gmpg\.org|wordpress|w\.org/.test(u));
  return { title, description: descMatch ? descMatch[1].trim() : '', info, credits, youtube, images, links };
}

const list = parseList(await get(`${BASE}/portfolio/`));
console.log(`Found ${list.length} projects`);
const out = [];
for (const item of list) {
  try {
    const data = parseProject(await get(`${BASE}/portfolio/${item.slug}/`));
    out.push({ ...item, url: `${BASE}/portfolio/${item.slug}/`, ...data });
    console.log('✓', item.slug);
  } catch (e) {
    console.log('✗', item.slug, e.message);
    out.push({ ...item, error: e.message });
  }
}
await mkdir('legacy', { recursive: true });
await writeFile('legacy/legacy-projects.json', JSON.stringify({ source: BASE, archivedAt: new Date().toISOString(), projects: out }, null, 2));
console.log('Saved legacy/legacy-projects.json');
