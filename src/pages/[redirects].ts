// Generates the Cloudflare Pages `_redirects` file so every old WordPress URL keeps working.
// (Files starting with "_" are ignored by Astro's router, hence the dynamic route.)
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [{ params: { redirects: '_redirects' } }];
}

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const lines = [
    '/ /en/ 302',
    '/portfolio/ /en/#work 301',
    '/about-us/ /en/#clients 301',
    '/contact/ /en/#contact 301',
  ];
  for (const p of projects) {
    const target = p.data.hidden ? '/en/#work' : `/en/work/${p.id}/`;
    for (const old of p.data.legacySlugs) {
      lines.push(`/portfolio/${old}/ ${target} 301`, `/portfolio/${old} ${target} 301`);
    }
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain' } });
};
