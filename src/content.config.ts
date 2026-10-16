import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SERVICE_KEYS, PLATFORM_KEYS } from './data/taxonomy';

const localized = z.object({ en: z.string().min(1), es: z.string().min(1) });
const text = z.union([z.string(), localized]);

const projects = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!_*.md'], base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string(),
    /** Year used for sorting and the era filter (last year for multi-year projects). */
    year: z.number().int().min(2010).max(2100),
    /** Optional label for multi-year projects, e.g. "2013–2022". */
    years: z.string().optional(),
    services: z.array(z.enum(SERVICE_KEYS)).min(1),
    platforms: z.array(z.enum(PLATFORM_KEYS)).default([]),
    genre: localized.optional(),
    /** Position in the "Featured" order; projects without it follow, newest first. */
    featured: z.number().int().positive().optional(),
    /** Kept in the repo but not published (no page, not in the wall). */
    hidden: z.boolean().default(false),
    /** Square key art, relative to the Markdown file (../../assets/projects/<slug>/...). */
    cover: image(),
    summary: localized,
    description: localized,
    role: localized.optional(),
    videos: z.array(z.string()).default([]),
    entries: z
      .array(z.object({ title: text, year: z.string(), videos: z.array(z.string()).default([]), note: text.optional() }))
      .default([]),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    gallery: z.array(image()).default([]),
    credits: z.string().optional(),
    /** Old WordPress slugs (/portfolio/<slug>/) that redirect to this project. */
    legacySlugs: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
