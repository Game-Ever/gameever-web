// Downloads every image still hot-linked from the old WordPress site into src/assets/
// and rewrites the project files to point at the local copies, so Astro can optimize them.
// Safe to re-run: files already downloaded are skipped.
// Usage: node scripts/localize-images.mjs
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const PROJECTS = 'src/content/projects';
const ASSETS = 'src/assets/projects';
const URL_RE = /https:\/\/gameeverstudio\.com\/wp-content\/uploads\/[^"\s]+\.(?:png|jpe?g|webp|gif)/gi;

const exists = (p) => access(p).then(() => true, () => false);

async function download(url, dest) {
  if (await exists(dest)) return 'cached';
  const res = await fetch(url, { headers: { 'user-agent': 'GameEver-archive/1.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`Not an image (${type}): ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return 'downloaded';
}

let count = 0;
for (const file of await readdir(PROJECTS)) {
  if (!file.endsWith('.md') || file.startsWith('_')) continue;
  const slug = file.replace(/\.md$/, '');
  const mdPath = path.join(PROJECTS, file);
  let text = await readFile(mdPath, 'utf8');
  const urls = [...new Set(text.match(URL_RE) ?? [])];
  if (!urls.length) continue;
  await mkdir(path.join(ASSETS, slug), { recursive: true });
  for (const url of urls) {
    const name = decodeURIComponent(url.split('/').pop()).toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
    const dest = path.join(ASSETS, slug, name);
    const status = await download(url, dest);
    // Paths in content files are relative to the Markdown file.
    text = text.split(url).join(`../../assets/projects/${slug}/${name}`);
    console.log(`${status.padEnd(10)} ${slug}/${name}`);
    count++;
  }
  await writeFile(mdPath, text);
}

await mkdir('src/assets', { recursive: true });
console.log(await download('https://gameeverstudio.com/wp-content/uploads/2021/02/logo-header-game-ever-small.png', 'src/assets/logo-game-ever.png'), 'logo');
console.log(`Done: ${count} project images.`);
