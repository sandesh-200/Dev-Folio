"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostMeta } from "@/lib/mdx";

interface RecentBlogPostsProps {
    posts: PostMeta[];
}

export function RecentBlogPosts({ posts }: RecentBlogPostsProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: { revert: () => void } | null = null;

        async function initGSAP() {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const cards = sectionRef.current?.querySelectorAll(".blog-card");
                if (!cards || cards.length === 0) return;
                gsap.fromTo(
                    Array.from(cards),
                    { y: 36, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                        },
                    }
                );
            });
        }

        initGSAP();
        return () => ctx?.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[hsl(var(--muted)/0.4)] border-t border-[hsl(var(--border))]"
            aria-label="Recent Blog Posts"
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex items-end justify-between mb-12">
                    <SectionHeading
                        label="Writing"
                        title="Recent Posts"
                        subtitle="Thoughts on engineering, tools, and things I'm learning."
                    />
                    <Link
                        href="/blog"
                        className="hidden sm:flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors shrink-0 mb-1"
                    >
                        All posts <ArrowRight size={14} />
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        No posts yet. Check back soon.
                    </p>
                ) : (
                    <div className="space-y-px">
                        {posts.map((post, i) => (
                            <article key={post.slug} className="blog-card group">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 p-4 -mx-4 rounded-lg hover:bg-[hsl(var(--muted)/0.6)] transition-colors"
                                >
                                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] shrink-0 tabular-nums sm:w-24">
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))] mb-1 leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 sm:gap-0 sm:flex-col sm:items-end shrink-0">
                                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                                            {post.readingTime}
                                        </span>
                                        <span className="text-xs text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] flex items-center gap-1 transition-colors">
                                            Read <ArrowRight size={11} />
                                        </span>
                                    </div>
                                </Link>
                                {i < posts.length - 1 && (
                                    <div className="h-px bg-[hsl(var(--border))] mx-0" />
                                )}
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-8 sm:hidden">
                    <Link
                        href="/blog"
                        className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                    >
                        All posts <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
