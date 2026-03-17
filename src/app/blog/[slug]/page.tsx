import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { SharePost } from "@/components/blog/SharePost";
import rehypePrettyCode from "rehype-pretty-code";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Blog
        </Link>

        {/* Post header */}
        <header className="mb-12 pb-8 border-b border-[hsl(var(--border))]">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[hsl(var(--muted-foreground))] mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>·</span>
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
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] leading-[1.15]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* MDX Content */}
        <div className="text-[hsl(var(--foreground)/0.85)] leading-[1.8] text-base">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark",
                        light: "github-light",
                      },
                      keepBackground: false,

                      onVisitLine(node: { children: string | any[]; }) {
                        if (node.children.length === 0) {
                          node.children = [{ type: "text", value: " " }]
                        }
                      }
                    },
                  ],
                ],
              },
            }}
          />
        </div>


        <SharePost
          title={post.title}
          url={`https://sandeshdhakal1.com.np/blog/${post.slug}`}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
