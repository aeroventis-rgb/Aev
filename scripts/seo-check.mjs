/**
 * Post-build checks against `next start`:
 * canonical host, hreflang, unique titles, one h1, sitemap URLs return 200.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = path.resolve(import.meta.dirname, "..");
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aeroventis.ma").replace(/\/+$/, "");
const host = "127.0.0.1";
const port = Number(process.env.SEO_CHECK_PORT || 3456);
const origin = `http://${host}:${port}`;
const failures = [];

function fail(message) {
  failures.push(message);
}

async function request(url, options = {}) {
  const response = await fetch(url, { redirect: "manual", ...options });
  const body = await response.text();
  return { status: response.status, headers: response.headers, body };
}

function requestWithHost(urlPath, hostHeader) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: host, port, path: urlPath, method: "GET", headers: { host: hostHeader } },
      (res) => {
        res.resume();
        const location = res.headers.location;
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            location: Array.isArray(location) ? location[0] : location || "",
          })
        );
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return match ? match[2] ?? match[3] : null;
}

function tags(html, rel) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => (attr(tag, "rel") || "").toLowerCase().split(/\s+/).includes(rel));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await request(`${origin}/fr`);
      if (response.status < 500) return;
    } catch {
      // server still booting
    }
    await delay(500);
  }
  throw new Error("next start did not become ready");
}

function localeFromUrl(url) {
  const parts = new URL(url).pathname.split("/").filter(Boolean);
  return parts[0];
}

function pathWithoutLocale(url) {
  const parts = new URL(url).pathname.split("/").filter(Boolean).slice(1);
  return `/${parts.join("/")}` || "/";
}

async function checkPlaceholders() {
  const blogRoot = path.join(root, "content", "blog");
  const locales = await readdir(blogRoot, { withFileTypes: true });
  for (const locale of locales.filter((entry) => entry.isDirectory())) {
    const files = await readdir(path.join(blogRoot, locale.name));
    for (const file of files.filter((name) => name.endsWith(".md") && name.toLowerCase() !== "plan.md")) {
      const raw = await readFile(path.join(blogRoot, locale.name, file), "utf8");
      const draft = /^draft:\s*true\s*$/m.test(raw);
      if (!draft && (/\[PLACEHOLDER[^\]]*\]/.test(raw) || /\[LIEN INTERNE:[^\]]*\]/.test(raw))) {
        fail(`${file} is not draft:true but still contains a placeholder or internal-link token`);
      }
    }
  }
}

async function main() {
  if (!existsSync(path.join(root, ".next"))) {
    throw new Error("Missing .next. Run npm run build before npm run seo:check.");
  }

  await checkPlaceholders();

  const child = spawn(
    process.execPath,
    [path.join(root, "node_modules/next/dist/bin/next"), "start", "-H", host, "-p", String(port)],
    { cwd: root, env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"] }
  );
  let logs = "";
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString();
  });

  try {
    await waitForServer();

    const rootResponse = await request(`${origin}/`);
    const location = rootResponse.headers.get("location") || "";
    if (![301, 308].includes(rootResponse.status) || !location.endsWith("/fr")) {
      fail(`GET / should permanently redirect to /fr, got ${rootResponse.status} ${location}`);
    }

    const apex = await requestWithHost("/contact", "aeroventis.ma");
    if (![301, 308].includes(apex.status) || !apex.location.startsWith("https://www.aeroventis.ma/")) {
      fail(`apex host should redirect to www, got ${apex.status} ${apex.location}`);
    }

    const robots = await request(`${origin}/robots.txt`);
    if (robots.status !== 200) fail(`robots.txt returned ${robots.status}`);
    if (!robots.body.includes("Allow: /")) fail("robots.txt does not allow all");
    if (!robots.body.includes(`Sitemap: ${site}/sitemap.xml`)) {
      fail(`robots.txt sitemap is not ${site}/sitemap.xml`);
    }

    const security = await request(`${origin}/fr`);
    const requiredHeaders = {
      "strict-transport-security": /max-age=\d+/,
      "x-content-type-options": /nosniff/i,
      "referrer-policy": /strict-origin-when-cross-origin/i,
      "x-frame-options": /SAMEORIGIN/i,
      "content-security-policy": /frame-ancestors/i,
      "permissions-policy": /camera=\(\)/i,
    };
    for (const [header, pattern] of Object.entries(requiredHeaders)) {
      const value = security.headers.get(header) || "";
      if (!pattern.test(value)) fail(`missing security header ${header}: ${value}`);
    }

    const sitemapResponse = await request(`${origin}/sitemap.xml`);
    if (sitemapResponse.status !== 200) fail(`sitemap returned ${sitemapResponse.status}`);
    const urls = [...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    if (!urls.length) fail("sitemap has no URLs");

    const pages = new Map();
    const titles = new Map();
    const localesByPath = new Map();

    for (const url of urls) {
      let parsed;
      try {
        parsed = new URL(url);
      } catch {
        fail(`invalid sitemap URL ${url}`);
        continue;
      }
      if (parsed.origin !== site) fail(`sitemap URL is not on ${site}: ${url}`);
      const localUrl = `${origin}${parsed.pathname}${parsed.search}`;
      const response = await request(localUrl);
      if (response.status !== 200) {
        fail(`${url} returned ${response.status}`);
        continue;
      }

      const canonicals = tags(response.body, "canonical").map((tag) => attr(tag, "href")).filter(Boolean);
      if (canonicals.length !== 1) fail(`${url} has ${canonicals.length} canonicals`);
      const canonical = canonicals[0];
      if (canonical !== url) fail(`${url} canonical is ${canonical}`);
      if (new URL(canonical).origin !== site) fail(`${url} canonical host is not ${site}`);

      const alternates = tags(response.body, "alternate")
        .map((tag) => ({ lang: attr(tag, "hreflang"), href: attr(tag, "href") }))
        .filter((item) => item.lang && item.href);
      const hreflang = Object.fromEntries(alternates.map((item) => [item.lang, item.href]));
      if (!hreflang["x-default"]) fail(`${url} is missing x-default`);
      for (const [lang, href] of Object.entries(hreflang)) {
        if (!["fr", "en", "ar", "x-default"].includes(lang)) fail(`${url} has invalid hreflang ${lang}`);
        if (new URL(href).origin !== site) fail(`${url} hreflang ${lang} leaves ${site}`);
      }
      const self = localeFromUrl(url);
      if (hreflang[self] !== canonical) fail(`${url} hreflang ${self} is not self-referential`);

      const titleMatch = response.body.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : "";
      if (!title) fail(`${url} has an empty title`);
      if (/AEROVENTIS\s*\|\s*AEROVENTIS/i.test(title)) fail(`${url} duplicates the brand in the title: ${title}`);
      const previous = titles.get(title);
      if (previous) fail(`duplicate title "${title}" on ${previous} and ${url}`);
      else titles.set(title, url);

      const h1Count = [...response.body.matchAll(/<h1[\s>]/gi)].length;
      if (h1Count !== 1) fail(`${url} has ${h1Count} h1 elements`);

      pages.set(url, { canonical, hreflang });
      const barePath = pathWithoutLocale(url);
      const locales = localesByPath.get(barePath) ?? new Set();
      locales.add(self);
      localesByPath.set(barePath, locales);
    }

    for (const [url, info] of pages) {
      for (const [lang, href] of Object.entries(info.hreflang)) {
        if (lang === "x-default") {
          const targets = new Set(Object.entries(info.hreflang).filter(([code]) => code !== "x-default").map(([, value]) => value));
          if (!targets.has(href)) fail(`${url} x-default ${href} is not one of the alternates`);
          continue;
        }
        const target = pages.get(href);
        if (!target) fail(`${url} hreflang ${lang} points outside the sitemap: ${href}`);
        else if (target.hreflang[lang] !== href) {
          fail(`${url} hreflang ${lang} is not confirmed by ${href}`);
        }
        const sourceLang = localeFromUrl(url);
        if (target && target.hreflang[sourceLang] !== url) {
          fail(`${href} does not point back to ${url} for ${sourceLang}`);
        }
      }
    }

    for (const [barePath, locales] of localesByPath) {
      for (const locale of ["fr", "en", "ar"]) {
        if (locales.has(locale)) continue;
        const suffix = barePath === "/" ? "" : barePath;
        const response = await request(`${origin}/${locale}${suffix}`);
        if (response.status !== 404) {
          fail(`/${locale}${suffix} should 404 because it is absent from hreflang, got ${response.status}`);
        }
      }
    }

    const home = pages.get(`${site}/fr`) ? await request(`${origin}/fr`) : null;
    if (home) {
      const image = [...home.body.matchAll(/\/_next\/image\?[^"'\s]+/g)]
        .map((match) => match[0].replaceAll("&amp;", "&"))
        .find((src) => decodeURIComponent(src).includes("hero-background"));
      if (!image) fail("homepage does not render the hero through next/image");
      else {
        const optimized = await request(`${origin}${image}`, {
          headers: { accept: "image/avif,image/webp,image/apng,*/*;q=0.8" },
        });
        const type = optimized.headers.get("content-type") || "";
        if (optimized.status !== 200 || !/image\/(avif|webp)/i.test(type)) {
          fail(`hero optimizer returned ${optimized.status} ${type}`);
        }
      }
      if (!/<link[^>]*rel="preload"[^>]*hero-background\.webp/i.test(home.body)) {
        fail("homepage hero is not preloaded by next/image priority");
      }
    }

    for (const locale of ["fr", "en", "ar"]) {
      const image = await fetch(`${origin}/${locale}/opengraph-image`);
      const bytes = Buffer.from(await image.arrayBuffer());
      const type = image.headers.get("content-type") || "";
      const width = bytes.length > 24 ? bytes.readUInt32BE(16) : 0;
      const height = bytes.length > 24 ? bytes.readUInt32BE(20) : 0;
      if (image.status !== 200 || !type.includes("image/png") || width !== 1200 || height !== 630) {
        fail(`/${locale}/opengraph-image is ${image.status} ${type} ${width}x${height}`);
      }
    }

    const icon = await request(`${origin}/favicon.ico`);
    if (icon.status !== 200) fail(`favicon.ico returned ${icon.status}`);
    const manifest = await request(`${origin}/manifest.webmanifest`);
    if (manifest.status !== 200) fail(`manifest returned ${manifest.status}`);
  } finally {
    child.kill("SIGTERM");
    await delay(300);
    if (!child.killed) child.kill("SIGKILL");
  }

  if (failures.length) {
    console.error(`SEO check failed (${failures.length}):`);
    for (const message of failures) console.error(`- ${message}`);
    if (process.env.SEO_CHECK_DEBUG) console.error(logs.slice(-4000));
    process.exit(1);
  }
  console.log(`SEO check passed for ${site}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
