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
        className="mb-10 text-center text-xs font-black uppercase tracking-[0.4em] text-brand-silver-mid md:mb-12"
      >
        {title}
      </p>

      <ul className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
        {PARTNERS.map((partner) => (
          <li
            key={partner.id}
            className="w-[calc(50%-0.4rem)] sm:w-[calc(33.333%-0.7rem)]"
          >
            <div className="flex h-[4.75rem] items-center justify-center rounded-md border border-brand-silver bg-white px-3 py-2.5 shadow-brand transition hover:border-brand-blue/40 hover:shadow-brand-lg sm:h-24 sm:px-5">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                unoptimized
                className="h-auto max-h-10 w-auto min-w-0 max-w-full object-contain object-center sm:max-h-14"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
