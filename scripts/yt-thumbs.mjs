// Records which YouTube thumbnail sizes exist for every video in the project files.
// YouTube always serves hqdefault (480x360, letterboxed); sddefault (640x480) and maxresdefault (1280x720)
// only exist for some videos. The result goes to src/data/yt-thumbs.json, read by src/components/YouTube.astro.
// Run after adding videos: node scripts/yt-thumbs.mjs  (videos missing from the file are checked at build time).
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const DIR = 'src/content/projects';
const OUT = 'src/data/yt-thumbs.json';
const known = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const ids = new Set();
for (const f of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const s = readFileSync(`${DIR}/${f}`, 'utf8');
  // Video ids appear quoted in `videos:` lists and as `id:` / `video:` values (highlights, process, press).
  for (const block of s.matchAll(/videos:\s*(\[[^\]]*\]|(?:\n\s+- .*)+)/g)) {
    for (const m of block[1].matchAll(/["']([A-Za-z0-9_-]{11})["']/g)) ids.add(m[1]);
  }
  for (const m of s.matchAll(/\b(?:id|video):\s*["']([A-Za-z0-9_-]{11})["']/g)) ids.add(m[1]);
}
const exists = async (url) => {
  for (let i = 0; i < 3; i++) {
    try { return (await fetch(url, { method: 'HEAD' })).status === 200; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  return false;
};
const todo = [...ids].filter((id) => !known[id] || process.argv.includes('--all'));
let done = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (todo.length) {
    const id = todo.shift();
    const [maxres, sd] = await Promise.all([
      exists(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`),
      exists(`https://i.ytimg.com/vi/${id}/sddefault.jpg`),
    ]);
    known[id] = maxres ? 'maxres' : sd ? 'sd' : 'hq';
    done++;
  }
}));
const sorted = Object.fromEntries(Object.entries(known).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, JSON.stringify(sorted, null, 1) + '\n');
const counts = Object.values(sorted).reduce((a, v) => ({ ...a, [v]: (a[v] ?? 0) + 1 }), {});
console.log(`checked ${done}, total ${ids.size} videos:`, counts);
