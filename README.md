# Service Platform — Frontend

A full-stack home service booking platform built with **Next.js 16**, **Tailwind CSS v4**, and **shadcn/ui**.

## Tech Stack

| Tool                            | Purpose                              |
| ------------------------------- | ------------------------------------ |
| **Next.js 16**                  | App Router, React 19, Server Actions |
| **Tailwind CSS v4**             | CSS-first utility framework          |
| **shadcn/ui**                   | Accessible, unstyled UI primitives   |
| **Lucide React**                | Icons                                |
| **React Hook Form + Zod**       | Form validation                      |
| **CVA + clsx + tailwind-merge** | Utility-first styling helpers        |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://l2-b7-a4.vercel.app
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Geist fonts, Tailwind)
│   ├── loading.tsx             # Root loading (logo + spinner)
│   └── globals.css             # Tailwind v4 CSS-first setup
│
│   ├── (public)/               # Public routes — Header + Footer layout
│   │   ├── page.tsx            # Landing page
│   │   ├── services/           # Browse & detail services
│   │   ├── technicians/        # Browse & detail technicians
│   │   ├── payment/            # SSLCommerz callback pages (success/failed/cancelled)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── help/
│   │   ├── how-it-works/
│   │   ├── privacy/
│   │   └── terms/
│   │
│   ├── (auth)/                 # Auth routes — Centered card layout
│   │   ├── login/
│   │   └── register/
│   │
│   └── (private)/              # Authenticated routes
│       ├── (bare)/             # Simple navbar layout
│       │   └── customer/       # Customer area
│       │       ├── bookings/   # List, detail, create, review
│       │       ├── payments/   # List
│       │       └── profile/
│       └── (shell)/            # Sidebar dashboard layout
│           ├── technician/     # Technician dashboard
│           │   ├── dashboard/
│           │   ├── bookings/
│           │   ├── services/
│           │   └── profile/    # Profile info + availability (edit modals)
│           └── admin/          # Admin dashboard
│               ├── dashboard/
│               ├── users/
│               ├── bookings/
│               └── categories/
│
└── lib/
    ├── nextServerFetch.ts      # Typed fetch wrapper with auth cookie + token refresh
    ├── cache-tags.ts           # Revalidation cache tag constants
    ├── buildQueryString.ts     # Query string builder for list endpoints
    ├── jwt.ts                  # JWT decode helpers
    ├── cropImage.ts            # Client-side image cropping helper
    └── utils.ts                # Shared utilities (toasts, formatters)
```

## Key Conventions

### Data Fetching

Use `nextServerFetch<T>()` from `@/lib/nextServerFetch` for all server-side API calls. It handles auth cookies, JSON parsing, and unified error formatting.

```ts
import { nextServerFetch } from "@/lib/nextServerFetch";

const data = await nextServerFetch<ResponseType>("/services", {
  auth: "optional", // "required" | "optional" | "none"
  next: { revalidate: 60 },
});
```

### Auth

Access and refresh tokens are stored in `httpOnly` cookies. `nextServerFetch` automatically attaches the access token, refreshes it via `POST /auth/refresh-token` when expired, and sets the new cookie. Route protection + refresh proxying happens in `src/proxy.ts`.

### Forms

Use **React Hook Form** + **Zod** + **shadcn/ui** on the client, and call **Server Actions** (with `'use server'`) for mutations.

### Styling

Tailwind CSS v4 — uses `@import "tailwindcss"` with `@theme` blocks. No `tailwind.config.js`. Prefer `@theme inline {}` for custom values.

