import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";
import { publishedBlogLocales } from "@/lib/blog-published-locales";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const PLACEHOLDER_RE = /\[PLACEHOLDER[^\]]*\]/;
const INTERNAL_TODO_RE = /\[LIEN INTERNE:[^\]]*\]/;

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  /** Document title when it differs from the visible heading. */
  seoTitle?: string;
  description: string;
  keywords: string[];
  date: string;
  draft: boolean;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
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

function imageSize(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  if (buf.length > 24 && buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 8 < buf.length) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        offset += 2;
        continue;
      }
      const length = buf.readUInt16BE(offset + 2);
      if (length < 2 || offset + 2 + length > buf.length) break;
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isStartOfFrame) {
        return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
      }
      offset += 2 + length;
    }
  }
  throw new Error(`Could not read image dimensions for ${filePath}`);
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

      const imageRaw = String(data.image ?? "").trim();
      let image: string | undefined;
      let imageAlt: string | undefined;
      let imageCaption: string | undefined;
      let imageWidth: number | undefined;
      let imageHeight: number | undefined;
      if (imageRaw) {
        if (!imageRaw.startsWith("/")) {
          throw new Error(`Blog ${fullPath} image must be a public path starting with /`);
        }
        imageAlt = String(data.imageAlt ?? data.image_alt ?? "").trim();
        if (!imageAlt) {
          throw new Error(`Blog ${fullPath} sets image but is missing imageAlt`);
        }
        const disk = path.join(process.cwd(), "public", imageRaw.replace(/^\//, ""));
        if (!fs.existsSync(disk)) {
          throw new Error(`Blog ${fullPath} image not found at ${imageRaw}`);
        }
        const size = imageSize(disk);
        image = imageRaw;
        imageWidth = size.width;
        imageHeight = size.height;
        const caption = String(data.imageCaption ?? data.image_caption ?? "").trim();
        imageCaption = caption || undefined;
      }

      const seoTitleRaw = String(data.seo_title ?? data.seoTitle ?? "").trim();
      const { body, faqs } = splitArticle(parsed.content);
      return {
        slug,
        locale,
        title,
        seoTitle: seoTitleRaw || undefined,
        description,
        keywords: asKeywords(data.keywords),
        date: asDate(data.date),
        draft,
        image,
        imageAlt,
        imageCaption,
        imageWidth,
        imageHeight,
        body,
        faqs,
      };
    });
}

let cache: BlogPost[] | null = null;

function assertPublishedLocaleIndex(posts: readonly BlogPost[]) {
  const actual = new Map<string, Locale[]>();
  for (const post of posts) {
    if (post.draft) continue;
    const locales = actual.get(post.slug) ?? [];
    locales.push(post.locale);
    actual.set(post.slug, locales);
  }

  const expectedSlugs = Object.keys(publishedBlogLocales).sort();
  const actualSlugs = [...actual.keys()].sort();
  if (expectedSlugs.join("\n") !== actualSlugs.join("\n")) {
    throw new Error(
      `publishedBlogLocales is out of date. Published slugs: ${actualSlugs.join(", ") || "(none)"}.`
    );
  }

  for (const slug of actualSlugs) {
    const want = routing.locales.filter((locale) => actual.get(slug)?.includes(locale));
    const got = publishedBlogLocales[slug] ?? [];
    if (want.join(",") !== [...got].join(",")) {
      throw new Error(
        `publishedBlogLocales["${slug}"] must be [${want.join(", ")}] so missing translations are not linked.`
      );
    }
  }
}

function loadAll(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(path.join(CONTENT_DIR, "fr"))) {
    throw new Error("content/blog/fr is missing");
  }
  const posts = routing.locales.flatMap((locale) => readLocaleDir(locale));
  assertPublishedLocaleIndex(posts);
  cache = posts;
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

/** Locales that publish this slug, in site order, for hreflang. */
export function publishedLocalesForSlug(slug: string): Locale[] {
  const found = new Set(
    getPublishedPosts()
      .filter((post) => post.slug === slug)
      .map((post) => post.locale)
  );
  return routing.locales.filter((locale) => found.has(locale));
}

export const BLOG_PAGE_SIZE = 6;
