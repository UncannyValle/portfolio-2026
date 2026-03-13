import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type {
  Project,
  ProjectPost,
  ProjectPostFrontmatter,
  ProjectPostSummary,
} from "@/types";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content/projects");
const PROJECT_EXTENSION = ".md";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/u.test(slug);
}

function getTimestamp(value: string): number {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function toSlug(fileName: string): string {
  return fileName.slice(0, -PROJECT_EXTENSION.length);
}

function estimateReadingTimeMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function readStringField(
  source: Record<string, unknown>,
  field: keyof ProjectPostFrontmatter,
  slug: string,
): string {
  const value = source[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`[posts] Missing or invalid "${field}" in "${slug}.md".`);
  }

  return value.trim();
}

function readOptionalStringField(
  source: Record<string, unknown>,
  field: "heroImage" | "heroAlt",
): string | undefined {
  const value = source[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }

  return value.trim();
}

function readOptionalStringArrayField(
  source: Record<string, unknown>,
  field: "images",
): string[] | undefined {
  const value = source[field];

  if (!isStringArray(value) || value.length === 0) {
    return undefined;
  }

  return value.map((s) => s.trim()).filter(Boolean);
}

function readPublishedAtField(
  source: Record<string, unknown>,
  slug: string,
): string {
  const value = source.publishedAt;

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error(`[posts] Missing or invalid "publishedAt" in "${slug}.md".`);
}

function parseFrontmatter(
  frontmatter: unknown,
  slug: string,
): ProjectPostFrontmatter {
  if (!isObject(frontmatter)) {
    throw new Error(`[posts] Frontmatter must be an object in "${slug}.md".`);
  }

  const tags = frontmatter.tags;

  if (!isStringArray(tags) || tags.length === 0) {
    throw new Error(`[posts] Missing or invalid "tags" in "${slug}.md".`);
  }

  return {
    title: readStringField(frontmatter, "title", slug),
    subtitle: readStringField(frontmatter, "subtitle", slug),
    description: readStringField(frontmatter, "description", slug),
    publishedAt: readPublishedAtField(frontmatter, slug),
    tags,
    color: readStringField(frontmatter, "color", slug),
    accent: readStringField(frontmatter, "accent", slug),
    heroImage: readOptionalStringField(frontmatter, "heroImage"),
    heroAlt: readOptionalStringField(frontmatter, "heroAlt"),
    images: readOptionalStringArrayField(frontmatter, "images"),
  };
}

function sortPostsByDate(a: ProjectPostSummary, b: ProjectPostSummary): number {
  return getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt);
}

async function getPostFileNames(): Promise<string[]> {
  const files = await fs.readdir(PROJECTS_DIRECTORY);

  return files
    .filter((fileName) => fileName.endsWith(PROJECT_EXTENSION))
    .sort((a, b) => a.localeCompare(b));
}

async function readPostSource(slug: string): Promise<string | null> {
  const filePath = path.join(PROJECTS_DIRECTORY, `${slug}${PROJECT_EXTENSION}`);

  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
}

async function readPostSummary(fileName: string): Promise<ProjectPostSummary> {
  const slug = toSlug(fileName);

  if (!isValidSlug(slug)) {
    throw new Error(
      `[posts] File name "${fileName}" includes invalid slug characters.`,
    );
  }

  const source = await readPostSource(slug);

  if (!source) {
    throw new Error(`[posts] Missing source for slug "${slug}".`);
  }

  const parsed = matter(source);
  const frontmatter = parseFrontmatter(parsed.data, slug);

  return {
    slug,
    ...frontmatter,
    readingTimeMinutes: estimateReadingTimeMinutes(parsed.content),
  };
}

export async function getPostSummaries(): Promise<ProjectPostSummary[]> {
  "use cache";

  const fileNames = await getPostFileNames();
  const posts = await Promise.all(fileNames.map(readPostSummary));

  return posts.sort(sortPostsByDate);
}

export async function getProjectSlugs(): Promise<string[]> {
  "use cache";

  const posts = await getPostSummaries();
  return posts.map((post) => post.slug);
}

export async function getProjectCards(): Promise<Project[]> {
  "use cache";

  const posts = await getPostSummaries();

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    tags: post.tags,
    color: post.color,
    accent: post.accent,
  }));
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectPost | null> {
  "use cache";

  if (!isValidSlug(slug)) {
    return null;
  }

  const source = await readPostSource(slug);

  if (!source) {
    return null;
  }

  const parsed = matter(source);
  const frontmatter = parseFrontmatter(parsed.data, slug);

  return {
    slug,
    ...frontmatter,
    content: parsed.content,
    readingTimeMinutes: estimateReadingTimeMinutes(parsed.content),
  };
}
