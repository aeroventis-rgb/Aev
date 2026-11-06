import { notFound } from "next/navigation";

/** Internal target for locale URLs that have no translation. */
export default function UnavailableLocalePage() {
  notFound();
}
