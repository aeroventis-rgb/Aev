import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isLocale, localesForPath } from "./lib/routes";

const handleI18nRouting = createMiddleware(routing);

/** Same intent as plomberie-{city}. Kept off the sitemap so the two URLs do not compete. */
const PLUMBER_ALIAS: Record<string, string> = {
  "/plombier-casablanca": "/plomberie-casablanca",
  "/plombier-rabat": "/plomberie-rabat",
  "/plombier-marrakech": "/plomberie-marrakech",
};

export default function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const pathWithoutLocale =
    maybeLocale && isLocale(maybeLocale) ? `/${segments.slice(1).join("/")}` : request.nextUrl.pathname;
  const alias = PLUMBER_ALIAS[pathWithoutLocale];
  if (alias) {
    const url = request.nextUrl.clone();
    url.pathname = `/fr${alias}`;
    return NextResponse.redirect(url, 308);
  }

  if (maybeLocale && isLocale(maybeLocale) && segments.length > 1) {
    const rest = `/${segments.slice(1).join("/")}`;
    const allowed = localesForPath(rest);
    if (allowed && !allowed.includes(maybeLocale)) {
      return NextResponse.rewrite(new URL(`/${maybeLocale}/__unavailable`, request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
