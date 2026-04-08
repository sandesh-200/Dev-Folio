"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

export function BlogList({ initialPosts }: { initialPosts: PostMeta[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract a singular primary category for each post for cleaner filtering
    const postsWithCategory = useMemo(() => {
        return initialPosts.map(post => {
            let category = "General";
            if (post.isTopic) {
                category = post.slug;
            } else if (post.tags && post.tags.length > 0) {
                // Use the first tag as the primary category
                category = post.tags[0];
            }
            
            // Normalize common categories for better filtering
            const lowerCat = category.toLowerCase();
            if (lowerCat.includes("cicd") || lowerCat.includes("automation")) category = "CI/CD & DevOps";
            if (lowerCat.includes("data") || lowerCat.includes("analysis")) category = "Data Science";
            if (lowerCat.includes("crypto")) category = "Cryptography";
            
            return { ...post, primaryCategory: category };
        });
    }, [initialPosts]);

    const categories = useMemo(() => {
        const cats = postsWithCategory.map((post) => post.primaryCategory);
        return ["All", ...Array.from(new Set(cats))].sort((a, b) => {
            if (a === "All") return -1;
            if (b === "All") return 1;
            return a.localeCompare(b);
        });
    }, [postsWithCategory]);

    const filteredPosts = useMemo(() => {
        return postsWithCategory.filter((post) => {
            const matchesCategory =
                selectedCategory === "All" || post.primaryCategory === selectedCategory;
            return matchesCategory;
        });
    }, [postsWithCategory, selectedCategory]);

    // Helper to format category names
    const formatCategory = (cat: string) => {
        if (cat === "CI/CD & DevOps") return "CI/CD & DevOps";
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    return (
        <div className="space-y-10">
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2 pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 ${selectedCategory === cat
                                ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-[hsl(var(--foreground))] shadow-sm"
                                : "bg-transparent text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                }`}
                        >
                            {formatCategory(cat)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-0">
                {filteredPosts.length === 0 ? (
                    <div className="py-20 text-center border border-dashed border-[hsl(var(--border))] rounded-lg">
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">
                            No posts found matching your criteria.
                        </p>
                        <button 
                            onClick={() => { setSelectedCategory("All"); }}
                            className="text-xs mt-4 text-[hsl(var(--foreground))] underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    filteredPosts.map((post, i) => (
                        <article key={post.slug} className="group">
                            <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row sm:items-start gap-6 py-8 hover:opacity-80 transition-all duration-300">
                                {post.image && (
                                    <div className="sm:w-56 w-full shrink-0 overflow-hidden rounded-md border border-[hsl(var(--border))]">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-36 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-2 py-0.5 rounded">
                                            {formatCategory(post.primaryCategory)}
                                        </span>
                                        <div className="text-xs font-mono text-[hsl(var(--muted-foreground))] tabular-nums">
                                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2 leading-tight group-hover:text-[hsl(var(--foreground))] transition-colors">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2 sm:line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-[hsl(var(--muted-foreground))] uppercase tracking-tight">
                                        <span>{post.readingTime}</span>
                                        {post.author && (
                                            <>
                                                <span>·</span>
                                                <span>By {post.author}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <span className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] group-hover:translate-x-1 transition-all shrink-0 hidden sm:block pt-1">
                                    <ArrowRight size={18} />
                                </span>
                            </Link>
                            {i < filteredPosts.length - 1 && <div className="h-px bg-[hsl(var(--border))] opacity-50" />}
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
