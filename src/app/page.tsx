import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Fallback when `/` is hit without middleware rewrite — send users to default locale. */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
