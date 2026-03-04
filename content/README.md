# Content Authoring

Add new entries directly in the project-root `content/` folder:

- Blog posts: `content/posts/*.mdx`
- Project write-ups: `content/projects/*.mdx`
- Homepage config: `content/home/index.json`

Starter templates are included:

- `content/posts/_template.mdx`
- `content/projects/_template.mdx`

To publish something new, copy one template, rename it, write the content, then set `draft: false`.

## Required frontmatter fields

For both posts and projects:

```yaml
title: "My entry title"
description: "1-2 sentence summary"
publishedAt: 2026-03-02
updatedAt: 2026-03-05 # optional
draft: false # defaults to false
tags:
  - one
  - two
```

Additional fields for projects:

```yaml
status: experiment # experiment | in-progress | stable
repoUrl: "https://github.com/your/repo" # optional
deployedAt: "https://your-project.com" # optional
```

## How it gets picked up

- The schema is defined in `src/content.config.ts`.
- `getCollection("posts")` and `getCollection("projects")` read your frontmatter.
- `getCollection("home")` reads Home page config.
- Blog/projects pages sort entries by `publishedAt` and hide `draft: true`.