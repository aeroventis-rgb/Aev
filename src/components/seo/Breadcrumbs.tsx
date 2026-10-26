import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = {
  name: string;
  pathname?: string;
};

export function Breadcrumbs({
  items,
  label = "Fil d'Ariane",
}: {
  items: readonly BreadcrumbItem[];
  label?: string;
}) {
  return (
    <nav aria-label={label} className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-navy/70">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-brand-silver-mid">
                  /
                </span>
              ) : null}
              {item.pathname && !last ? (
                <Link
                  href={item.pathname}
                  className="font-semibold text-brand-blue underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-semibold text-brand-ink">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
