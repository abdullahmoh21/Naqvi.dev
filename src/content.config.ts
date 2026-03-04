import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseFields = {
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};

const posts = defineCollection({
  loader: glob({
    base: new URL('../content/posts', import.meta.url),
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object(baseFields),
});

const projects = defineCollection({
  loader: glob({
    base: new URL('../content/projects', import.meta.url),
    pattern: '**/*.{md,mdx}',
  }),
  schema: z
    .object(baseFields)
    .extend({
      repoUrl: z.string().url().optional(),
      deployedAt: z.string().url().optional(),
      status: z
        .enum(['experiment', 'in-progress', 'stable'])
        .default('experiment'),
    }),
});

const home = defineCollection({
  loader: glob({
    base: new URL('../content/home', import.meta.url),
    pattern: 'home.mdx',
  }),
  schema: z.object({
    selectedProjectSlugs: z.array(z.string()).default([]),
  }),
});

const homeNow = defineCollection({
  loader: glob({
    base: new URL('../content/home', import.meta.url),
    pattern: 'now.mdx',
  }),
  schema: z.object({}),
});

export const collections = {
  posts,
  projects,
  home,
  homeNow,
};