# Julian Valle Portfolio 2026

Next.js 16 personal portfolio with a one page home experience plus markdown driven project case study pages at `/posts/[slug]`.

## Stack

1. Next.js 16 App Router with Cache Components enabled
2. React 19 and TypeScript
3. Tailwind CSS v4 and shadcn/ui
4. Biome for linting and formatting
5. Markdown content parsing with `gray-matter` and `react-markdown`

## Local Development

```bash
pnpm install
pnpm dev
```

## Quality Checks

```bash
pnpm lint
pnpm check
```

## Project Case Studies

Project cards on the home page are generated from markdown files in `content/posts`. Each file maps to one dynamic route:

```txt
content/posts/infotrack.md -> /posts/infotrack
```

### Required Frontmatter

```yaml
title: Project Title
subtitle: Product Area
description: One sentence summary used on cards and page intro
publishedAt: "2026-01-15"
tags:
  - React
  - TypeScript
color: "#2563eb"
accent: "#60a5fa"
```

Optional fields:

1. `heroImage` as a public path, example `/projects/infotrack/hero.webp`
2. `heroAlt` for image accessibility

### Add a New Case Study

1. Copy `content/postTemplate.md`
2. Save it as `content/posts/<slug>.md` using lowercase letters and dashes only
3. Fill frontmatter and markdown body content
4. Start the app and open `/posts/<slug>`

The home projects grid and static route generation update automatically based on files in `content/posts`.
