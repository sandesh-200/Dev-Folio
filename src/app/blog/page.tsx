import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, tools, and the craft of software development.",
  openGraph: {
    title: "Blog | Sandesh Dhakal",
    description: "Thoughts on engineering, tools, and the craft of software development.",
    type: "website",
    url: "https://sandeshdhakal1.com.np/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Sandesh Dhakal",
    description: "Thoughts on engineering, tools, and the craft of software development.",
  },
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

        <BlogList initialPosts={posts} />
      </div>
    </div>
  );
}
