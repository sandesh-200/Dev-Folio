import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts, getTopicSubtopics } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { SharePost } from "@/components/blog/SharePost";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import rehypePrettyCode from "rehype-pretty-code";
import CommentSection from "@/components/blog/CommentSection";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: { slug: string[] }[] = [];

  for (const post of posts) {
    if (post.isTopic) {
      const subtopics = getTopicSubtopics(post.slug);
      params.push({ slug: [post.slug] });
      for (const sub of subtopics) {
        params.push({ slug: [post.slug, sub.slug] });
      }
    } else {
      params.push({ slug: [post.slug] });
    }
  }

  return params;
}

// src/app/blog/[slug]/page.tsx

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug[0], slug.length > 1 ? slug[1] : undefined);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://sandeshdhakal1.com.np/blog/${post.slug}`,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}




export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const mainSlug = slug[0];
  const subtopicSlug = slug.length > 1 ? slug[1] : undefined;

  const post = getPostBySlug(mainSlug, subtopicSlug);

  if (!post) {
    notFound();
  }

  const subtopics = getTopicSubtopics(mainSlug);
  const isTopicMode = subtopics.length > 0;



  return (
    <>
      <article className="min-h-screen pt-24 pb-20">
        <div className={`mx-auto px-6 lg:px-8 ${isTopicMode ? "max-w-7xl" : "max-w-4xl"}`}>
          <div className={isTopicMode ? "flex flex-col lg:flex-row gap-12" : ""}>
            {isTopicMode && (
              <BlogSidebar
                mainSlug={mainSlug}
                subtopics={subtopics}
                activeSubtopic={subtopicSlug}
              />
            )}

            <div className="flex-1 min-w-0">
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
              <div className="text-[hsl(var(--foreground)/0.85)] leading-[1.8] text-base mb-12">
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
                url={`https://sandeshdhakal1.com.np/blog/${slug.join('/')}`}
              />

              <CommentSection />

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
          </div>
        </div>
      </article>
    </>
  );
}
