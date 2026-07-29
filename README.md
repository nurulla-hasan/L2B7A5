# Service Platform — Frontend

A full-stack home service booking platform built with **Next.js 16**, **Tailwind CSS v4**, and **shadcn/ui**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 16** | App Router, React 19, Server Actions |
| **Tailwind CSS v4** | CSS-first utility framework |
| **shadcn/ui** | Accessible, unstyled UI primitives |
| **Lucide React** | Icons |
| **React Hook Form + Zod** | Form validation |
| **CVA + clsx + tailwind-merge** | Utility-first styling helpers |

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
NEXT_PUBLIC_BASE_API=http://localhost:5000/api
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Geist fonts, Tailwind)
│   ├── page.tsx                # Landing page
│   └── globals.css             # Tailwind v4 CSS-first setup
│
│   ├── (public)/               # Public routes — Header + Footer layout
│   │   ├── services/           # Browse & detail services
│   │   ├── technicians/        # Browse & detail technicians
│   │   └── payment/            # SSLCommerz callback pages (success/fail/cancel)
│   │
│   ├── (auth)/                 # Auth routes — Centered card layout
│   │   ├── login/
│   │   └── register/
│   │
│   └── (private)/              # Authenticated routes
│       ├── customer/           # Simple navbar layout
│       │   ├── bookings/       # List, detail, create, review
│       │   ├── payments/       # List & detail
│       │   └── profile/
│       ├── technician/         # Sidebar dashboard layout
│       │   ├── dashboard/
│       │   ├── bookings/
│       │   ├── services/
│       │   ├── profile/
│       │   └── availability/
│       └── admin/              # Sidebar dashboard layout
│           ├── dashboard/
│           ├── users/
│           ├── bookings/
│           └── categories/
│
└── lib/
    ├── nextServerFetch.ts      # Typed fetch wrapper with auth cookie support
    └── getValidAccessToken.ts  # Auto-refresh token logic
```

## Key Conventions

### Data Fetching

Use `nextServerFetch<T>()` from `@/lib/nextServerFetch` for all server-side API calls. It handles auth cookies, JSON parsing, and unified error formatting.

```ts
import { nextServerFetch } from "@/lib/nextServerFetch";

const data = await nextServerFetch<ResponseType>("/services", {
  auth: "optional",    // "required" | "optional" | "none"
  next: { revalidate: 60 },
});
```

### Auth

Access and refresh tokens are stored in `httpOnly` cookies. `getValidAccessToken()` auto-refreshes expired tokens via `POST /auth/refresh-token`.

### Forms

Use **React Hook Form** + **Zod** + **shadcn/ui** on the client, and call **Server Actions** (with `'use server'`) for mutations.

### Styling

Tailwind CSS v4 — uses `@import "tailwindcss"` with `@theme` blocks. No `tailwind.config.js`. Prefer `@theme inline {}` for custom values.

## API

Backend API documentation and Postman collection are available at:

- [`backend/README.md`](../backend/README.md)
- [`backend/docs/postman_collection.json`](../backend/docs/postman_collection.json)
