import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

type Props = {
  title: string;
};

export function PartnerLogos({ title }: Props) {
  return (
    <section className="border-t border-[#e6eef6] bg-white py-12 md:py-20" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-8">
        <h2 id="partners-heading" className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">
          {title}
        </h2>
        <ul className="mt-8 grid grid-cols-3 items-center justify-items-center gap-x-3 gap-y-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 md:mt-10">
          {PARTNERS.map((partner) => (
            <li key={partner.id} className="flex w-full min-w-0 items-center justify-center sm:w-auto">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                unoptimized
                className="h-7 w-auto max-w-full object-contain sm:h-10 sm:max-w-[9rem]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
