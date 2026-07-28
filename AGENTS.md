<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FixItNow Frontend — Agent Instructions

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (Geist fonts, Tailwind)
│   ├── page.tsx            # Landing page
│   └── globals.css         # Tailwind v4 CSS-first setup
└── lib/                    # Server-side utilities
    ├── getValidAccessToken.ts   # Token validation & refresh
    └── nextServerFetch.ts       # Typed fetch wrapper with auth
```

## ⚡ Commands

```bash
npm run dev      # Next.js dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint flat config
```

## 🧩 Key Conventions

1. **Server-side data fetching**: Use `nextServerFetch<T>()` from `src/lib/nextServerFetch.ts` — handles auth cookies, JSON parsing, and unified error formatting. Supports `auth: "required" | "optional" | "none"` option.

2. **Token management**: Use `getValidAccessToken()` from `src/lib/getValidAccessToken.ts` — reads cookies, auto-refreshes expired access tokens via `/auth/refresh-token` API, sets new cookies on refresh.

3. **Styling**: Tailwind CSS v4 — uses CSS-first approach (`@import "tailwindcss"`, `@theme` blocks). No `tailwind.config.js`. Prefer `@theme inline {}` for custom values.

4. **Fonts**: Geist and Geist_Mono from `next/font/google`, applied via CSS variables `--font-geist-sans` and `--font-geist-mono`.

5. **Path alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json`). Prefer this for imports.

6. **ESLint**: Flat config (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.

## 🔐 Auth Pattern

- Access token stored in `accessToken` cookie, refresh token in `refreshToken` cookie
- Both are `httpOnly`, `secure`, `sameSite: "lax"`
- `getValidAccessToken()` automatically refreshes if token expires within 30 seconds
- Refresh calls `POST /auth/refresh-token` with `{ refreshToken, rememberMe }`
- Backend API base URL from `NEXT_PUBLIC_BASE_API` env var

## 🖥️ Layout & Rendering

- Root layout wraps all pages with Geist fonts and `flex flex-col min-h-full` body
- `globals.css` defines `--background` and `--foreground` CSS variables
- Dark mode via `@media (prefers-color-scheme: dark)`

> 📖 For full API documentation, see [`backend/README.md`](../backend/README.md) and the Postman collection at `backend/docs/postman_collection.json`.
