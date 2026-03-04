import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseFields = {
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  tags: z.array(z.string()).default([]),
};

const postFields = {
  ...baseFields,
  draft: z.boolean().default(false),
};

const posts = defineCollection({
  loader: glob({
    base: new URL('../../content/posts', import.meta.url),
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object(postFields),
});

const projects = defineCollection({
  loader: glob({
    base: new URL('../../content/projects', import.meta.url),
    pattern: '**/*.{md,mdx}',
  }),
  schema: z
    .object(baseFields)
    .extend({
      repoUrl: z.string().url().optional(),
      deployedAt: z.string().url().optional(),
    }),
});

const home = defineCollection({
  loader: glob({
    base: new URL('../../content/home', import.meta.url),
    pattern: '*.json',
  }),
  schema: z.object({
    selectedProjectSlugs: z.array(z.string()).default([]),
    now: z.string().default(''),
  }),
});

export const collections = {
  posts,
  projects,
  home,
};

