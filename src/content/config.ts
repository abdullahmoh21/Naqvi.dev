import { defineCollection, z } from 'astro:content';

const baseFields = {
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};

const posts = defineCollection({
  type: 'content',
  schema: z.object(baseFields),
});

const projects = defineCollection({
  type: 'content',
  schema: z
    .object(baseFields)
    .extend({
      repoUrl: z.string().url().optional(),
      status: z
        .enum(['experiment', 'in-progress', 'stable'])
        .default('experiment'),
    }),
});

export const collections = {
  posts,
  projects,
};

