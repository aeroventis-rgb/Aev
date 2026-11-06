import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
};

/** Full brand slide, contained so the artwork and its text stay readable. */
export function BrandSlide({ src, alt, caption, priority = false, sizes = "(max-width: 1024px) 100vw, 720px" }: Props) {
  return (
    <figure className="overflow-hidden rounded-md border border-brand-silver bg-white shadow-brand-sm">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        priority={priority}
        className="h-auto w-full"
        sizes={sizes}
      />
      {caption ? (
        <figcaption className="px-3 py-2 text-[11px] font-bold leading-snug text-brand-navy/80">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
