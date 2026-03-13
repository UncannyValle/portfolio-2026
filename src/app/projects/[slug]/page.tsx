import { CalendarDays, Clock3, MoveLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";
import { Badge } from "@/components/ui/Badge";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectsPageProps {
  params: Promise<{ slug: string }>;
}

const articleContentClassName = cn(
  "mt-12 text-[1.02rem] leading-8 text-foreground/90",
  "[&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight",
  "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight",
  "[&_p]:mt-6 [&_p]:text-[1.02rem] [&_p]:leading-8 [&_p]:text-muted-foreground",
  "[&_ul]:mt-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-muted-foreground",
  "[&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-muted-foreground",
  "[&_li>p]:mt-2 [&_blockquote]:mt-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)]/70 [&_blockquote]:pl-6",
  "[&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:leading-9 [&_blockquote]:text-foreground",
  "[&_a]:font-medium [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-4",
  "[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-foreground",
  "[&_pre]:mt-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-popover [&_pre]:p-4",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs",
  "[&_hr]:mt-12 [&_hr]:border-border/70",
  "[&_img]:mt-8 [&_img]:rounded-2xl [&_img]:border [&_img]:border-border/70",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
);

function formatProjectDate(dateValue: string): string {
  const timestamp = Date.parse(dateValue);

  if (Number.isNaN(timestamp)) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(timestamp);
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectsPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 pb-24 pt-34">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <MoveLeft className="size-4" />
          Back to Projects
        </Link>

        <header className="mt-8 space-y-6">
          <span
            className="inline-flex rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
            style={{
              backgroundColor: `${project.color}22`,
              color: project.accent,
            }}
          >
            {project.subtitle}
          </span>

          <h1 className="font-display text-[clamp(2.2rem,6vw,4.1rem)] leading-[0.98] font-extrabold tracking-tight">
            {project.title}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {formatProjectDate(project.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4" />
              {project.readingTimeMinutes} min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <div
            className="h-px w-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${project.color}, ${project.accent}, transparent 90%)`,
            }}
          />
        </header>

        {project.heroImage ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border/80 bg-card/60">
            <Image
              src={project.heroImage}
              alt={project.heroAlt ?? project.title}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        <div className={articleContentClassName}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {project.images && project.images.length > 0 ? (
          <ProjectImageCarousel
            images={project.images}
            alt={project.title}
            accent={project.accent}
          />
        ) : null}
      </article>
    </main>
  );
}
