import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

type Props = {
  title: string;
};

export function PartnerLogos({ title }: Props) {
  return (
    <section className="mt-14 border-t border-brand-silver pt-12" aria-labelledby="partners-heading">
      <p
        id="partners-heading"
        className="mb-10 text-center text-xs font-black uppercase tracking-[0.4em] text-brand-silver-mid"
      >
        {title}
      </p>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
        {PARTNERS.map(({ id, name, logo }) => (
          <li key={id}>
            <div className="flex h-[4.5rem] items-center justify-center rounded-md border border-brand-silver bg-brand-white px-4 py-3 shadow-brand transition hover:border-brand-blue/40 hover:shadow-brand-lg sm:h-[5rem] sm:px-5">
              <Image
                src={logo}
                alt={name}
                width={160}
                height={48}
                className="h-8 w-auto max-h-9 max-w-[7.5rem] object-contain object-center sm:h-9 sm:max-w-[8.5rem]"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
