"use client";

import { useEffect } from "react";
import { classifyLeadLink, trackLeadClick, type LeadMethod } from "@/lib/analytics";

const DEDUPE_MS = 1200;
const lastFired = new Map<string, number>();

function leadFromAnchor(anchor: HTMLAnchorElement): { method: LeadMethod; href: string } | null {
  const raw = anchor.getAttribute("href") ?? "";
  const method = classifyLeadLink(raw) ?? classifyLeadLink(anchor.href);
  if (!method) return null;
  return { method, href: anchor.href || raw };
}

/**
 * Listens for real clicks on tel: and WhatsApp links anywhere on the site
 * (home, service pages, contact, blog). Opening a page does not count.
 */
export function LeadClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.type === "auxclick") {
        if (event.button !== 1) return;
      } else if (event.button !== 0) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const lead = leadFromAnchor(anchor);
      if (!lead) return;

      const key = `${lead.method}|${lead.href}`;
      const now = Date.now();
      const previous = lastFired.get(key);
      if (previous !== undefined && now - previous < DEDUPE_MS) return;
      lastFired.set(key, now);

      trackLeadClick(lead.method, lead.href, anchor.textContent ?? undefined);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
