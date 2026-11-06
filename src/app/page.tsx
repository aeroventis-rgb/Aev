import { permanentRedirect } from "next/navigation";

/** Fallback if the permanent redirect in next.config did not run. */
export default function RootPage() {
  permanentRedirect("/fr");
}
