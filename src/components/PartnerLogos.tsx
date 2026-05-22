import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

type Props = {
  title: string;
};

export function PartnerLogos({ title }: Props) {
  return (
    <section className="mt-16 border-t border-brand-silver/20 pt-14 md:mt-20 md:pt-16" aria-labelledby="partners-heading">
      <p
        id="partners-heading"
        className="mb-12 text-center text-xs font-black uppercase tracking-[0.4em] text-brand-silver-mid"
      >
        {title}
      </p>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        {PARTNERS.map((partner) => {
          const { id, name, logo } = partner;
          const isDark = "tile" in partner && partner.tile === "dark";
          return (
          <li key={id}>
            <div
              className={`flex h-[4.75rem] items-center justify-center rounded-md border px-4 py-3 shadow-brand transition hover:border-brand-blue/40 hover:shadow-brand-lg sm:h-[5.25rem] sm:px-5 ${
                isDark
                  ? "border-brand-navy/30 bg-brand-ink"
                  : "border-brand-silver bg-brand-white"
              }`}
            >
              <Image
                src={logo}
                alt={name}
                width={200}
                height={80}
                className={`h-9 w-auto max-h-10 max-w-[8.5rem] object-contain object-center sm:max-w-[9.5rem] ${
                  isDark ? "brightness-110" : ""
                }`}
              />
            </div>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
