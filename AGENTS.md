<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- Design Rules -->

# 📚 Documentation & Knowledge Rules

1. DO NOT rely on your pre-trained outdated knowledge.
2. ALWAYS search and read the latest official documentation for React, Tailwind CSS, and Shadcn UI before generating or modifying code.

# 🎨 Shadcn UI Rules

1. Shadcn components are pre-designed. Prefer built-in props like `variant` and `size` over ad-hoc styling.
2. NEVER use `className` on a shadcn component to change appearance such as size, color, spacing, or typography.
3. For layout and spacing, wrap the shadcn component in regular HTML elements and apply Tailwind utilities to the wrapper, not the component itself.
4. If you need a new appearance, EXTEND the component's `variant` or `size` in its source file with `cva()`. Add only what you actually need.
5. The same rule applies to any custom component that already uses `cva()` — extend variants, do not override with `className`.

✅ Correct:

```tsx
// button.tsx — add new size
size: {
  xl: "h-12 gap-2 px-5 text-base";
}

// usage
<Button size="xl">Book now</Button>;
```

❌ Wrong:

```tsx
<Button className="h-12 px-5 text-base">Book now</Button>
```

# 🎨 Color System Rules

1. NEVER use hardcoded color values (e.g., `text-amber-500`, `bg-[#123456]`, `border-blue-300`, custom hex/rgb/oklch) directly on any component.
2. ALWAYS use CSS variable-based colors: `text-primary`, `bg-muted`, `border-border`, etc. All colors must be defined in `globals.css`.
3. Every color variable MUST have BOTH `:root` (light mode) and `.dark` (dark mode) definitions in `globals.css`, plus an `@theme inline` entry for Tailwind v4.
4. If a color you need doesn't exist in `globals.css`, add it first — in all three places: `@theme inline` block, `:root` section, and `.dark` section. Never skip dark mode.
5. For opacity variants, use the slash syntax with CSS variables: `text-primary/80`, `bg-primary/10`, `border-border/50`. Do NOT hardcode separate opacity colors.

# Responsive Design Rule

1. ALWAYS follow a mobile-first approach. Use base Tailwind utility classes for mobile screens and apply breakpoints (sm:, md:, lg:) for larger screens.

# TypeScript Error Handling Rule

1. ALWAYS use `error: unknown` in `catch` blocks instead of `error: any` to satisfy strict linting rules.
2. When extracting error messages, safely check the error type using `error instanceof Error ? error.message : "Fallback message"`.

<!-- End: Design rules -->


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
