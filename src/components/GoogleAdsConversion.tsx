"use client";

import { useEffect } from "react";
import { GOOGLE_ADS_CONVERSION_SEND_TO } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const SESSION_KEY = "aeroventis-google-ads-conversion";

/** Fires Google Ads conversion once per session on the contact page */
export function GoogleAdsConversion() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const fire = () => {
      if (typeof window.gtag !== "function") return false;

      const transactionId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
        transaction_id: transactionId,
      });
      sessionStorage.setItem(SESSION_KEY, transactionId);
      return true;
    };

    if (fire()) return;

    const timer = window.setInterval(() => {
      if (fire()) window.clearInterval(timer);
    }, 200);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
