import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("nav");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-off px-4 text-center">
      <p className="text-6xl font-black text-brand-blue">404</p>
      <h1 className="mt-4 text-xl font-black uppercase tracking-wide text-brand-ink">
        Page introuvable
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center rounded-md brand-gradient px-8 py-3 text-sm font-bold uppercase tracking-wide text-brand-white"
      >
        ← {t("backHome")}
      </Link>
    </div>
  );
}
