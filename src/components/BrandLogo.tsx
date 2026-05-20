import Image from "next/image";
import { Logo } from "@/components/Logo";
import { BRAND_LOGO_SRC } from "@/lib/constants";

type Variant = "nav" | "hero" | "footer";

const RASTER_BY_VARIANT: Record<Variant, string> = {
  nav: "h-full w-full object-cover object-center",
  hero: "h-[4.5rem] w-[4.5rem] object-cover object-center drop-shadow-lg sm:h-20 sm:w-20 md:h-[5.25rem] md:w-[5.25rem]",
  footer: "h-11 w-11 object-cover object-center sm:h-12 sm:w-12",
};

type Props = {
  alt: string;
  variant?: Variant;
  fallbackClass?: string;
  rasterClass?: string;
};

/** Square brand mark — `public/logo.jpg` (from `logo.JPG`) */
export function BrandLogo({
  alt,
  variant = "nav",
  fallbackClass = "h-9 w-9 sm:h-10 sm:w-10",
  rasterClass,
}: Props) {
  if (BRAND_LOGO_SRC.trim() !== "") {
    return (
      <Image
        src={BRAND_LOGO_SRC}
        alt={alt}
        width={1254}
        height={1254}
        priority={variant === "nav" || variant === "hero"}
        className={rasterClass ?? RASTER_BY_VARIANT[variant]}
        sizes={
          variant === "hero"
            ? "84px"
            : variant === "footer"
              ? "48px"
              : "44px"
        }
      />
    );
  }

  return <Logo className={fallbackClass} />;
}
