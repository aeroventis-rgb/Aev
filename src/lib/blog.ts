import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const PLACEHOLDER_RE = /\[PLACEHOLDER[^\]]*\]/;
const INTERNAL_TODO_RE = /\[LIEN INTERNE:[^\]]*\]/;

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  draft: boolean;
  body: string;
  faqs: BlogFaq[];
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function markdownToPlain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~`>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitArticle(markdown: string): { body: string; faqs: BlogFaq[] } {
  const withoutH1 = markdown.replace(/^\uFEFF?/, "").replace(/^#\s+[^\n]+\n+/, "");
  const parts = withoutH1.split(/\n## FAQ\s*\n/i);
  const body = (parts[0] ?? "").trim();
  const faqBlock = parts.slice(1).join("\n").trim();
  if (!faqBlock) return { body, faqs: [] };

  const chunks = `\n${faqBlock}`
    .split(/\n###\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const faqs = chunks
    .map((chunk) => {
      const breakAt = chunk.indexOf("\n");
      const question = (breakAt === -1 ? chunk : chunk.slice(0, breakAt)).trim();
      const answer = (breakAt === -1 ? "" : chunk.slice(breakAt + 1)).trim();
      return { question, answer };
    })
    .filter((faq) => faq.question && faq.answer);

  return { body, faqs };
}

function asKeywords(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function asDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(text)) {
    throw new Error(`Blog date must be YYYY-MM-DD, received ${text}`);
  }
  return text.slice(0, 10);
}

function readLocaleDir(locale: Locale): BlogPost[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "plan.md")
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Record<string, unknown>;
      const slug = String(data.slug ?? "").trim();
      const title = String(data.title ?? "").trim();
      const description = String(data.meta_description ?? data.description ?? "").trim();
      const lang = String(data.lang ?? "").trim();
      const draft = data.draft === true;
      const filenameSlug = file.replace(/\.md$/, "");

      if (!slug || !title || !description || !lang) {
        throw new Error(`Blog file ${fullPath} is missing title, meta_description, slug or lang`);
      }
      if (slug !== filenameSlug) {
        throw new Error(`Blog slug ${slug} does not match filename ${file}`);
      }
      if (lang !== locale || !isLocale(lang)) {
        throw new Error(`Blog ${fullPath} lang ${lang} does not match directory ${locale}`);
      }
      if (!draft && (PLACEHOLDER_RE.test(raw) || INTERNAL_TODO_RE.test(raw))) {
        throw new Error(
          `Blog post ${fullPath} is publishable but still contains [PLACEHOLDER...] or [LIEN INTERNE:...]. Keep draft: true until they are filled.`
        );
      }

      const { body, faqs } = splitArticle(parsed.content);
      return {
        slug,
        locale,
        title,
        description,
        keywords: asKeywords(data.keywords),
        date: asDate(data.date),
        draft,
        body,
        faqs,
      };
    });
}

let cache: BlogPost[] | null = null;

function loadAll(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(path.join(CONTENT_DIR, "fr"))) {
    throw new Error("content/blog/fr is missing");
  }
  cache = routing.locales.flatMap((locale) => readLocaleDir(locale));
  return cache;
}

export function getAllBlogPosts(): readonly BlogPost[] {
  return loadAll();
}

export function getPublishedPosts(locale?: Locale): BlogPost[] {
  return loadAll()
    .filter((post) => !post.draft && (!locale || post.locale === locale))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export function getPublishedPost(locale: string, slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.locale === locale && post.slug === slug);
}

export const BLOG_PAGE_SIZE = 6;
