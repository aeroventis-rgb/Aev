import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pages (required for localePrefix: "as-needed" paths like /qui-sommes-nous)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
