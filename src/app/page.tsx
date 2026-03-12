import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import { getAllPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <RecentBlogPosts posts={recentPosts} />
    </>
  );
}
