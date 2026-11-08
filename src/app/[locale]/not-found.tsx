import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("nav");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-5xl font-semibold text-brand-blue">404</p>
      <h1 className="mt-4 text-xl font-semibold text-brand-ink">
        Page introuvable
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white"
      >
        ← {t("backHome")}
      </Link>
    </div>
  );
}
