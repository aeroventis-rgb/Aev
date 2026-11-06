import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isLocale, localesForPath } from "./lib/routes";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

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
