import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

type Props = {
  title: string;
};

export function PartnerLogos({ title }: Props) {
  return (
    <section className="border-t border-[#e6eef6] bg-white py-16 md:py-20" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="partners-heading" className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">
          {title}
        </h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {PARTNERS.map((partner) => (
            <li key={partner.id} className="flex h-12 items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                unoptimized
                className="h-8 w-auto max-w-[7.5rem] object-contain sm:h-10 sm:max-w-[9rem]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
