import Link from "next/link";

interface BlogSidebarProps {
  mainSlug: string;
  subtopics: { slug: string; title: string }[];
  activeSubtopic?: string;
  className?: string;
}

export function BlogSidebar({ mainSlug, subtopics, activeSubtopic, className }: BlogSidebarProps) {
  return (
    <aside className={`w-full lg:w-64 shrink-0 mb-12 lg:mb-0 ${className || ""}`}>
      <div className="lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto lg:pr-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-6">
          Contents
        </h3>
        <nav className="flex flex-col gap-1">
          {/* Main topic link */}
          <Link
            href={`/blog/${mainSlug}`}
            className={`text-sm py-2 px-4 transition-colors rounded-md hover:bg-[hsl(var(--accent))] ${
               !activeSubtopic 
                 ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-medium" 
                 : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            Introduction
          </Link>

          {subtopics.map((sub) => {
            const isActive = activeSubtopic === sub.slug;
            return (
              <Link
                key={sub.slug}
                href={`/blog/${mainSlug}/${sub.slug}`}
                className={`text-sm py-2 px-4 transition-colors rounded-md hover:bg-[hsl(var(--accent))] ${
                  isActive
                    ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-medium"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {sub.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
