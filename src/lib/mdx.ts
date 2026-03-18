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
  author?: string;
  image: string;
  isTopic?: boolean; // Added to distinguish folder posts
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const items = fs.readdirSync(CONTENT_DIR);
  const posts: PostMeta[] = [];

  for (const item of items) {
    const fullPath = path.join(CONTENT_DIR, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Look for metadata file in the directory
      const subFiles = fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
      if (subFiles.length === 0) continue;

      const metaFile = subFiles.includes("index.mdx") ? "index.mdx" : subFiles.includes("index.md") ? "index.md" : subFiles[0];
      const raw = fs.readFileSync(path.join(fullPath, metaFile), "utf-8");
      const { data } = matter(raw);
      const stats = readingTime(raw);

      posts.push({
        slug: item,
        title: data.title ?? item,
        date: data.date ?? new Date().toISOString().split("T")[0],
        excerpt: data.excerpt ?? "",
        readingTime: stats.text,
        tags: data.tags ?? [],
        author: data.author ?? "Unknown",
        image: data.image,
        isTopic: true,
      });
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      const slug = item.replace(/\.(mdx|md)$/, "");
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(raw);
      const stats = readingTime(raw);

      posts.push({
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? new Date().toISOString().split("T")[0],
        excerpt: data.excerpt ?? "",
        readingTime: stats.text,
        tags: data.tags ?? [],
        author: data.author ?? "Unknown",
        image: data.image,
        isTopic: false,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string, subtopic?: string): Post | null {
  const folderPath = path.join(CONTENT_DIR, slug);
  let filePath = "";

  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    if (subtopic) {
      const mdxPath = path.join(folderPath, `${subtopic}.mdx`);
      const mdPath = path.join(folderPath, `${subtopic}.md`);
      filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    } else {
      // If no subtopic, look for index or first file
      const subFiles = fs.readdirSync(folderPath).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
      if (subFiles.length === 0) return null;
      const defaultFile = subFiles.includes("index.mdx") ? "index.mdx" : subFiles.includes("index.md") ? "index.md" : subFiles[0];
      filePath = path.join(folderPath, defaultFile);
    }
  } else {
    const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
    filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return null;

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
    image: data.image,
    isTopic: !!subtopic || (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()),
  };
}

export function getTopicSubtopics(slug: string) {
  const folderPath = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) return [];

  return fs.readdirSync(folderPath)
    .filter((f) => (f.endsWith(".mdx") || f.endsWith(".md")) && !f.startsWith("index"))
    .map((filename) => {
      const subSlug = filename.replace(/\.(mdx|md)$/, "");
      const raw = fs.readFileSync(path.join(folderPath, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: subSlug,
        title: data.title ?? subSlug,
      };
    });
}
