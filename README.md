# Aev — AEROVENTIS

Multilingual HVAC site (Next.js 15 + next-intl).

## Vercel deploy

1. Import GitHub repo `mxhardx/Aev` on [vercel.com](https://vercel.com).
2. **Root Directory:** leave empty.
3. **Framework:** Next.js (auto).
4. **Environment variable** (Production + Preview):

   `NEXT_PUBLIC_SITE_URL` = `https://www.aeroventis.ma`

5. Deploy **main** — wait until status is **Ready** (not Failed).
6. **Settings → Domains:** add `aeroventis.ma` and `www.aeroventis.ma` on **this** project only.
7. Open the **Production** deployment URL first (e.g. `https://aev-….vercel.app`). If that works, the custom domain will work after DNS propagates.

If you see `404 NOT_FOUND` / `DEPLOYMENT_NOT_FOUND`, the domain has no live deployment — fix the build or redeploy, do not only change DNS.
