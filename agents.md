# agents.md — Julian Valle Portfolio
                            
                            ## Project Overview
                            
                            This is Julian Valle's personal developer portfolio, built with **Next.js 16** (App Router, Cache Components enabled), **React 19**, **TypeScript**, **shadcn/ui**, and **Tailwind CSS**. It is a single page scroll site with sections: Hero, About (bento grid), Skills, Projects, Experience, and Contact. Deployed on **Vercel** using **pnpm** as the package manager.
                            
                            ## MCP Servers
                            
                            ### Context7
                            
                            Always use the Context7 MCP to fetch up to date documentation before implementing code involving external libraries or frameworks.
                            
                            1. Call `resolve-library-id` to get the correct library identifier
                            2. Call `get-library-docs` to pull current documentation
                            3. Base all code on the retrieved docs, never on training data
                            
                            This applies to: Next.js APIs, shadcn/ui components, Tailwind utilities, Framer Motion, React 19 patterns, and any other dependency.
                            
                            ### Next.js DevTools MCP
                            
                            When starting work on this project, ALWAYS call the `init` tool from `next-devtools-mcp` FIRST to set up proper context and establish documentation requirements.
                            
                            Use `nextjs_index` and `nextjs_call` to:
                            
                            - Check for build errors before and after changes
                            - Inspect routes, layouts, and rendered segments
                            - Query runtime state during development
                            - Validate cache behavior on `'use cache'` components
                            
                            Prefer `nextjs_runtime` tools over browser console log forwarding for error detection.
                            
                            ## Architecture Rules
                            
                            ### Directory Structure
                            
                            ```
                            src/
                            ├── app/
                            │   ├── layout.tsx              # Root layout (Server Component)
                            │   ├── page.tsx                # Home page (Server Component, minimal logic)
                            │   ├── globals.css             # Global styles + Tailwind directives
                            │   └── fonts/                  # Local font files (Outfit, DM Sans, JetBrains Mono)
                            ├── components/
                            │   ├── ui/                     # shadcn/ui primitives (Button, Card, Badge, etc.)
                            │   ├── sections/               # Page sections as individual components
                            │   │   ├── hero.tsx            # Hero section
                            │   │   ├── about.tsx           # About bento grid
                            │   │   ├── skills.tsx          # Skills with filter tabs and animated bars
                            │   │   ├── projects.tsx        # Projects card grid
                            │   │   ├── experience.tsx      # Career timeline
                            │   │   └── contact.tsx         # Contact CTA
                            │   ├── nav.tsx                 # Sticky navigation
                            │   ├── footer.tsx              # Site footer
                            │   ├── section-header.tsx      # Reusable section heading component
                            │   ├── noise-overlay.tsx       # Decorative noise texture overlay
                            │   └── scroll-indicator.tsx    # Scroll down indicator animation
                            ├── hooks/
                            │   ├── use-in-view.ts          # Intersection Observer for scroll animations
                            │   ├── use-counter.ts          # Animated number counter
                            │   ├── use-active-section.ts   # Track active nav section on scroll
                            │   └── use-scrolled.ts         # Track whether user has scrolled past threshold
                            ├── lib/
                            │   ├── data.ts                 # Static data: projects, skills, careers arrays
                            │   ├── constants.ts            # Nav links, social links, metadata constants
                            │   └── utils.ts                # cn() helper and shared utility functions
                            ├── providers/
                            │   └── theme-provider.tsx      # Dark/light mode context provider ('use client')
                            └── types/
                                └── index.ts                # Shared TypeScript interfaces (Project, Skill, Career, etc.)
                            ```
                            
                            ### Server Component vs Client Component Hierarchy
                            
                            Pages and layouts are **always Server Components**. They contain zero interactivity logic. Their only job is to compose sections and pass data as props.
                            
                            ```
                            page.tsx (Server Component)
                              └── renders section components
                                    ├── hero.tsx ('use client' — animations, loaded state)
                                    ├── about.tsx ('use client' — useInView, useCounter)
                                    ├── skills.tsx ('use client' — filter tabs, animated bars)
                                    ├── projects.tsx ('use client' — useInView scroll animations)
                                    ├── experience.tsx ('use client' — useInView scroll animations)
                                    └── contact.tsx ('use client' — useInView scroll animation)
                            ```
                            
                            **Rule:** If a component uses `useState`, `useEffect`, `useRef`, event handlers, or browser APIs, it MUST be `'use client'`. Everything else stays as a Server Component.
                            
                            **Rule:** Data (projects, skills, careers) lives in `lib/data.ts` as plain TypeScript arrays/objects and is imported directly. These are static and do not require fetching.
                            
                            ### Page Component Pattern
                            
                            Pages must be thin. They import sections, compose them, and pass data. No hooks, no state, no effects.
                            
                            ```tsx
                            // CORRECT — src/app/page.tsx
                            import { Hero } from '@/components/sections/hero'
                            import { About } from '@/components/sections/about'
                            import { Skills } from '@/components/sections/skills'
                            import { Projects } from '@/components/sections/projects'
                            import { Experience } from '@/components/sections/experience'
                            import { Contact } from '@/components/sections/contact'
                            import { PROJECTS, SKILLS, CAREERS } from '@/lib/data'
                            
                            export default function Home() {
                              return (
                                <main>
                                  <Hero />
                                  <About />
                                  <Skills skills={SKILLS} />
                                  <Projects projects={PROJECTS} />
                                  <Experience careers={CAREERS} />
                                  <Contact />
                                </main>
                              )
                            }
                            ```
                            
                            ```tsx
                            // WRONG — logic in page
                            export default function Home() {
                              const [activeSection, setActiveSection] = useState('about') // NO
                              // ...
                            }
                            ```
                            
                            ### Custom Hooks
                            
                            All reusable logic must be extracted into custom hooks in `src/hooks/`.
                            
                            - `useInView(threshold?)` — returns `[ref, isInView]` via IntersectionObserver. Used by every section for scroll reveal animations.
                            - `useCounter(target, duration?, trigger?)` — returns animated number value. Used by About section stats.
                            - `useActiveSection(sectionIds)` — returns current active section string. Used by Nav for active link highlighting.
                            - `useScrolled(offset?)` — returns boolean. Used by Nav for background blur on scroll.
                            
                            **Rule:** Never inline IntersectionObserver, scroll listeners, or animation counters directly in components. Always use the corresponding hook.
                            
                            ### Helper Functions
                            
                            Utility logic goes in `src/lib/utils.ts`:
                            
                            - `cn(...classes)` — Tailwind class merging via `clsx` + `tailwind-merge` (from shadcn setup)
                            
                            ### Data Layer
                            
                            All portfolio content lives in `src/lib/data.ts` as typed constants:
                            
                            ```tsx
                            import type { Project, Skill, Career } from '@/types'
                            
                            export const PROJECTS: Project[] = [...]
                            export const SKILLS: Skill[] = [...]
                            export const CAREERS: Career[] = [...]
                            export const NAV_LINKS = [...]
                            export const SOCIAL_LINKS = [...]
                            ```
                            
                            ## Cache Components
                            
                            This project uses Next.js 16 Cache Components with `cacheComponents: true` in `next.config.ts`.
                            
                            ### Rules
                            
                            - The root `layout.tsx` is a synchronous Server Component with NO `'use cache'` and NO `async`
                            - The `page.tsx` does not need `'use cache'` since all data is static (imported constants, not fetched)
                            - Do NOT add `'use cache'` unless a component or function performs data fetching (e.g., `fetch()` calls)
                            - If future API routes or data fetching are added, apply `'use cache'` at the function or component level, not the layout level
                            - Use `cacheTag()` and `updateTag()` when cache invalidation is needed
                            - Wrap dynamic content (anything reading `cookies()`, `headers()`, or `searchParams`) in `<Suspense>` boundaries
                            - Use `import { connection } from 'next/server'` before non deterministic operations (`Math.random()`, `Date.now()`) that must run per request
                            
                            ### Configuration
                            
                            ```ts
                            // next.config.ts
                            import type { NextConfig } from 'next'
                            
                            const nextConfig: NextConfig = {
                              cacheComponents: true,
                            }
                            
                            export default nextConfig
                            ```
                            
                            ## shadcn/ui Usage
                            
                            Use shadcn/ui components for all interactive primitives. Install components as needed:
                            
                            ```bash
                            pnpm dlx shadcn@latest add button card badge tabs toggle separator
                            ```
                            
                            - Use `<Card>` for bento grid items and project cards
                            - Use `<Badge>` for skill tags and project tech tags
                            - Use `<Button>` for CTAs (hero buttons, contact)
                            - Use `<Tabs>` for skill category filters
                            - Use `<Separator>` for subtle dividers between sections
                            
                            **Rule:** Always import from `@/components/ui/`. Never recreate what shadcn already provides.
                            
                            **Rule:** shadcn components should be styled using Tailwind utility classes and the `cn()` helper. Do not create separate CSS files for individual components.
                            
                            ## Styling
                            
                            ### Tailwind CSS
                            
                            - All styling uses Tailwind utility classes
                            - Custom colors defined in `tailwind.config.ts` using CSS variables for dark/light mode theming
                            - Font families registered in Tailwind config: `font-display` (Outfit), `font-body` (DM Sans), `font-mono` (JetBrains Mono)
                            - Use `cn()` from `@/lib/utils` for conditional class merging
                            
                            ### Theme Colors
                            
                            Dark mode is the default. Light mode is available via toggle.
                            
                            | Token            | Dark                  | Light                |
                            |------------------|-----------------------|----------------------|
                            | background       | `#0f0f14`             | `#f5f3ee`            |
                            | foreground       | `#fafaf9`             | `#0f0f14`            |
                            | accent (gold)    | `#e8c872`             | `#b8860b`            |
                            | accent-blue      | `#2563eb` / `#60a5fa` | `#2563eb` / `#60a5fa`|
                            | muted            | `rgba(255,255,255,0.55)` | `rgba(0,0,0,0.55)` |
                            
                            ### Fonts
                            
                            Load locally via `next/font/local` in `layout.tsx`:
                            
                            - **Outfit** (display/headings) — weights 400, 600, 700, 800
                            - **DM Sans** (body text) — weights 400, 500, 600
                            - **JetBrains Mono** (code/accents) — weights 400, 500, 600, 700
                            
                            ### Animations
                            
                            Use Tailwind's built in animation utilities where possible. For complex scroll triggered reveals, use `useInView` hook with CSS transitions via inline `style` or Tailwind classes with conditional application.
                            
                            Do NOT install Framer Motion unless explicitly needed for a feature beyond what CSS transitions and IntersectionObserver provide.
                            
                            ## Linting and Formatting
                            
                            This project uses **Biome** for linting and formatting. Do NOT use ESLint or Prettier.
                            
                            ```bash
                            pnpm add -D @biomejs/biome
                            pnpm biome init
                            ```
                            
                            ### Biome Configuration
                            
                            ```json
                            // biome.json
                            {
                              "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
                              "organizeImports": {
                                "enabled": true
                              },
                              "linter": {
                                "enabled": true,
                                "rules": {
                                  "recommended": true,
                                  "correctness": {
                                    "noUnusedImports": "error",
                                    "noUnusedVariables": "warn"
                                  },
                                  "style": {
                                    "useConst": "error",
                                    "noNonNullAssertion": "warn"
                                  },
                                  "suspicious": {
                                    "noExplicitAny": "warn"
                                  }
                                }
                              },
                              "formatter": {
                                "enabled": true,
                                "indentStyle": "space",
                                "indentWidth": 2,
                                "lineWidth": 100
                              },
                              "javascript": {
                                "formatter": {
                                  "quoteStyle": "single",
                                  "semicolons": "asNeeded"
                                }
                              }
                            }
                            ```
                            
                            ### Scripts
                            
                            ```json
                            // package.json scripts
                            {
                              "dev": "next dev --turbopack",
                              "build": "next build",
                              "start": "next start",
                              "lint": "biome check .",
                              "lint:fix": "biome check --fix .",
                              "format": "biome format --write .",
                              "check": "biome check --fix . && next build"
                            }
                            ```
                            
                            **Rule:** Run `pnpm lint` before every commit. Run `pnpm check` before every PR.
                            
                            ## TypeScript
                            
                            ### Strict Mode
                            
                            `tsconfig.json` must have `"strict": true`. No exceptions.
                            
                            ### Type Definitions
                            
                            All shared types go in `src/types/index.ts`:
                            
                            ```ts
                            export interface Project {
                              title: string
                              subtitle: string
                              description: string
                              tags: string[]
                              color: string
                              accent: string
                              href?: string
                            }
                            
                            export interface Skill {
                              name: string
                              level: number
                              category: 'frontend' | 'backend' | 'devops' | 'ai'
                            }
                            
                            export interface Career {
                              company: string
                              role: string
                              period: string
                              logo: string
                              highlight: string
                            }
                            ```
                            
                            **Rule:** Never use `any`. Prefer `unknown` when the type is genuinely unknown, then narrow with type guards.
                            
                            ## Code Style
                            
                            - Use named exports, not default exports (exception: page.tsx and layout.tsx which require default exports by Next.js convention)
                            - Use function declarations for components, not arrow functions assigned to variables
                            - Keep components under 150 lines. If a component exceeds this, extract sub components or hooks.
                            - Props interfaces should be defined adjacent to the component, not in a separate file, unless shared across multiple components
                            - No barrel exports (`index.ts` re-exporting everything). Import directly from the source file.
                            
                            ## Git Conventions
                            
                            - Commit messages follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`
                            - Branch names: `feat/section-name`, `fix/description`, `refactor/description`
                            
                            ## Deployment
                            
                            - Platform: Vercel
                            - Build command: `pnpm build`
                            - Node.js 22+ required
                            - Environment: No secrets needed for the portfolio (all data is static)
                            
                            ## Do NOT
                            
                            - Do NOT install ESLint or Prettier (use Biome)
                            - Do NOT use `npm` or `yarn` (use `pnpm`)
                            - Do NOT put interactivity logic in page.tsx or layout.tsx
                            - Do NOT use inline `<style>` tags or CSS modules
                            - Do NOT add `'use cache'` to components that do not fetch data
                            - Do NOT use barrel exports
                            - Do NOT use `any` type
                            - Do NOT install Framer Motion unless CSS transitions are insufficient for a specific animation
                            - Do NOT create separate CSS/JS files for components (everything in one file using Tailwind)
                            - Do NOT use dashes in AI generated text responses
