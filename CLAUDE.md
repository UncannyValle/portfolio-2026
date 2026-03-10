# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # Biome check (read-only)
pnpm lint:fix     # Biome check with auto-fix
pnpm format       # Biome format with write
pnpm check        # Biome fix + next build (pre-commit)
```

## Architecture

Single-page portfolio built with **Next.js 16 App Router**, **React 19**, and **Tailwind CSS v4**. The homepage (`src/app/page.tsx`) composes six full-width sections: Hero → About → Skills → Projects → Experience → Contact.

### Content system

Project case studies are written as Markdown files in `content/posts/*.md` and parsed server-side via `src/lib/posts.ts` (marked `server-only`). Each post has required frontmatter: `title`, `subtitle`, `description`, `publishedAt`, `tags[]`, `color` (hex), `accent` (hex), and optional `heroImage`/`heroAlt`. Use `content/postTemplate.md` as the starting point for new posts.

Post slugs must match `[a-z0-9-]+`. Posts are sorted newest-first and statically generated at build time via `generateStaticParams`. The post detail page lives at `/posts/[slug]`.

### Data flow

- `src/lib/posts.ts` — reads `content/posts/`, parses gray-matter frontmatter, exposes `getProjectCards()`, `getPostBySlug()`, `getPostSummaries()`, and `getPostSlugs()` (all use `"use cache"`)
- `src/lib/data.ts` — static `SKILLS` and `CAREERS` arrays; edit directly to update those sections
- `src/lib/constants.ts` — `NAV_LINKS`, `SOCIAL_LINKS`, `CONTACT_EMAIL`, `SITE_METADATA`
- `src/types/index.ts` — shared TypeScript interfaces (`Project`, `ProjectPost`, `Skill`, `Career`)

### Styling

Tailwind v4 with CSS variables for theming. Fonts are loaded via `next/font/google`: `--font-outfit` (display/headings), `--font-dm-sans` (body), `--font-jetbrains-mono` (mono). Dark mode is default (`defaultTheme="dark"`, `enableSystem={false}`). The `cn()` utility from `src/lib/utils.ts` wraps `clsx` + `tailwind-merge`.

UI primitives in `src/components/ui/` are thin wrappers around Radix UI using `class-variance-authority`.

### Linting

Biome 2.2 handles both linting and formatting (2-space indent, spaces). Import organization is automatic. The `next` and `react` rule domains are enabled at recommended level.
