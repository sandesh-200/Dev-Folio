import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  tags?: string[];
  author?: string; // ← added
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data } = matter(raw);
    const stats = readingTime(raw);

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString().split("T")[0],
      excerpt: data.excerpt ?? "",
      readingTime: stats.text,
      tags: data.tags ?? [],
      author: data.author ?? "Unknown", // ← added
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString().split("T")[0],
    excerpt: data.excerpt ?? "",
    readingTime: stats.text,
    tags: data.tags ?? [],
    content,
    author: data.author ?? "Unknown",
  };
}
