import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, tools, and the craft of software development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-[hsl(var(--muted-foreground))] mb-3">
            Writing
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] mb-4">
            Blog
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-md">
            Thoughts on engineering, developer tools, open source, and things
            I'm building or learning.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              No posts yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, i) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-6 hover:opacity-80 transition-opacity"
                >
                  <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] tabular-nums sm:w-28 shrink-0 pt-0.5">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-[hsl(var(--foreground))] mb-1.5 group-hover:text-[hsl(var(--foreground))] leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                      <span>{post.readingTime}</span>
                      {post.author && (
                        <>
                          <span>·</span>
                          <span>By {post.author}</span>
                        </>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span>·</span>
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors shrink-0 hidden sm:block pt-0.5">
                    <ArrowRight size={15} />
                  </span>
                </Link>
                {i < posts.length - 1 && (
                  <div className="h-px bg-[hsl(var(--border))]" />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
