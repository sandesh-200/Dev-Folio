import Image from "next/image";
import { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

// Callout / info box — can be embedded in MDX
interface CalloutProps {
  type?: "info" | "warning" | "tip" | "note";
  children: ReactNode;
}

const calloutStyles = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-200",
  tip: "border-green-500/30 bg-green-500/5 text-green-200",
  note: "border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--muted-foreground))]",
};

const calloutIcons = {
  info: "ℹ",
  warning: "⚠",
  tip: "💡",
  note: "📝",
};

export function Callout({ type = "note", children }: CalloutProps) {
  return (
    <div
      className={`flex gap-3 p-4 rounded-md border my-6 text-sm ${calloutStyles[type]}`}
    >
      <span className="text-base shrink-0">{calloutIcons[type]}</span>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

// Inline demo component — embeddable React component in blog posts
interface ProjectDemoProps {
  title: string;
  description?: string;
  href?: string;
  tech?: string[];
}

export function ProjectDemo({
  title,
  description,
  href,
  tech,
}: ProjectDemoProps) {
  return (
    <div className="my-8 p-5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="font-semibold text-[hsl(var(--foreground))] text-base m-0!">
          {title}
        </h4>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors shrink-0 no-underline"
          >
            View →
          </a>
        )}
      </div>
      {description && (
        <p className="text-sm text-[hsl(var(--muted-foreground))] m-0! mt-0! leading-relaxed">
          {description}
        </p>
      )}
      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tech.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 text-xs font-mono bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded border border-[hsl(var(--border))]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-xl border border-[hsl(var(--border))]"
      />
      {caption && (
        <figcaption className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// MDX component map
export const mdxComponents = {
  Callout,
  ProjectDemo,
  BlogImage,

  // Override standard elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))] mt-10 mb-4 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))] mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold text-[hsl(var(--foreground))] mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[hsl(var(--foreground)/0.8)] leading-[1.8] my-5"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 my-5 space-y-1.5 text-[hsl(var(--foreground)/0.8)]"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 my-5 space-y-1.5 text-[hsl(var(--foreground)/0.8)]"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-[hsl(var(--border))] pl-5 my-6 text-[hsl(var(--muted-foreground))] italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="text-[0.875em] px-1.5 py-0.5 rounded  text-[hsl(var(--foreground))] font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="my-8 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
      <CodeBlock {...props} />
    </div>
  ),
  hr: () => <hr className="my-10 border-[hsl(var(--border))]" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline underline-offset-3 text-[hsl(var(--foreground))] hover:opacity-70 transition-opacity"
      {...props}
    />
  ),
};
