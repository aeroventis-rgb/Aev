# Aev — AEROVENTIS

Multilingual HVAC site (Next.js 15 + next-intl).

## Local copy (Desktop)

Clone for local agents / Grok:

```powershell
gh repo clone aeroventis-rgb/Aev "$env:USERPROFILE\Desktop\Aev"
cd "$env:USERPROFILE\Desktop\Aev"
npm ci
npm run dev
```

Production build check: `npm run build` (Node **20** — see `.nvmrc`).

## Vercel deploy

GitHub repo: **`aeroventis-rgb/Aev`** (private).

1. Import that repo on [vercel.com](https://vercel.com) (or reconnect if it still points at an old fork).
2. **Root Directory:** leave empty.
3. **Framework:** Next.js (auto).
4. **Environment variable** (Production + Preview):

   `NEXT_PUBLIC_SITE_URL` = `https://www.aeroventis.ma`

5. Deploy **main** — wait until status is **Ready** (not Failed).
6. **Settings → Domains:** add `aeroventis.ma` and `www.aeroventis.ma` on **this** project only.
7. Open the **Production** deployment URL first (e.g. `https://aev-….vercel.app`). If that works, the custom domain will work after DNS propagates.

### Site down with `402` / `DEPLOYMENT_DISABLED`

If `https://www.aeroventis.ma` returns **402 Payment Required** and response header `X-Vercel-Error: DEPLOYMENT_DISABLED`, the Vercel project or team is **paused/disabled** (billing or plan limit). The app still **builds** (`npm run build` passes); you must **re-enable the project in the Vercel dashboard** (Billing / team status), then redeploy **main**.

Optional GitHub automation (after Vercel is active again):

- Add repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — workflow **Deploy to Vercel** runs on every push to `main`.
- Or add `VERCEL_DEPLOY_HOOK` (Vercel → Project → Settings → Deploy Hooks) for a simple POST redeploy.

If you see `404 NOT_FOUND` / `DEPLOYMENT_NOT_FOUND`, the domain has no live deployment — fix the build or redeploy, do not only change DNS.
