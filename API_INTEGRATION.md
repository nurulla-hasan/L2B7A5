# API Integration & Documentation

Frontend-to-backend endpoint mapping for **FixItNow** (home services booking platform).

## Base URLs

| Environment | Base URL |
|---|---|
| Development (backend) | `http://localhost:5000` |
| Production (backend) | `https://l2-b7-a4.vercel.app` |
| Production (frontend) | `https://l2-b7-a5.vercel.app` |

- Frontend calls the backend through `nextServerFetch` (`src/lib/nextServerFetch.ts`) which uses `NEXT_PUBLIC_API_URL` as the base URL.
- All mutating requests go through **Server Actions** (`_actions/` files); read-only requests are called directly in server components (`page.tsx` / `layout.tsx`).
- Auth: `Authorization: Bearer <accessToken>` header; tokens live in `httpOnly` cookies (`accessToken`, `refreshToken`) and are auto-refreshed by `nextServerFetch` / `proxy.ts`.
- Response shape: `{ success, statusCode, message, data, meta? }`.

## Endpoints (Backend)

### Auth — `/api/auth`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| POST | `/api/auth/register` | Public | `(auth)/register/page.tsx` → `registerAction` |
| POST | `/api/auth/login` | Public | `(auth)/login/page.tsx` → `loginAction` |
| POST | `/api/auth/refresh-token` | Public | `nextServerFetch.ts` / `proxy.ts` (token refresh) |
| GET | `/api/auth/me` | Any authenticated | `(public)/layout.tsx`, `(private)/(bare)/layout.tsx`, `dashboard-shell.tsx`, technician profile, customer profile |

### Categories — `/api/categories`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| GET | `/api/categories` | Public | `components/home/service-categories.tsx`, `(public)/services/page.tsx`, technician services page |

### Services — `/api/services`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| GET | `/api/services` | Public | `(public)/services/page.tsx` |
| GET | `/api/services/my-services` | TECHNICIAN | `(shell)/technician/services/page.tsx` |
| GET | `/api/services/:id` | Public | `(public)/services/[id]/page.tsx`, customer booking create page |
| POST | `/api/services` | TECHNICIAN | `service-modal.tsx` → `createServiceAction` |
| PUT | `/api/services/:id` | TECHNICIAN | `service-modal.tsx` → `updateServiceAction` |
| DELETE | `/api/services/:id` | TECHNICIAN | `service-column.tsx` → `deleteServiceAction` |

### Technicians — `/api/technicians` (public) & `/api/technician` (management)
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| GET | `/api/technicians` | Public | `(public)/technicians/page.tsx`, `components/home/featured-technicians.tsx` |
| GET | `/api/technicians/:id` | Public | `(public)/technicians/[id]/page.tsx` |
| GET | `/api/technician/dashboard/stats` | TECHNICIAN | `(shell)/technician/dashboard/page.tsx` |
| PUT | `/api/technician/profile` | TECHNICIAN | `profile-edit-modal.tsx` → `updateProfileAction` |
| PUT | `/api/technician/availability` | TECHNICIAN | `availability-edit-modal.tsx` → `updateAvailabilityAction` |
| GET | `/api/technician/bookings` | TECHNICIAN | `(shell)/technician/bookings/page.tsx` |
| PATCH | `/api/technician/bookings/:id` | TECHNICIAN | `booking-column.tsx` → `updateBookingStatusAction` |

### Bookings — `/api/bookings`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| POST | `/api/bookings` | CUSTOMER | `booking-form.tsx` → `createBookingAction` |
| GET | `/api/bookings` | CUSTOMER | `(bare)/customer/bookings/page.tsx` |
| GET | `/api/bookings/:id` | CUSTOMER | *(unused in frontend — booking detail rendered client-side)* |
| PATCH | `/api/bookings/:id/cancel` | CUSTOMER | `booking-card.tsx` → `cancelBookingAction` |

### Payments — `/api/payments`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| POST | `/api/payments/create` | CUSTOMER | `booking-card.tsx` → `createPaymentAction` |
| GET | `/api/payments` | Authenticated | `(bare)/customer/payments/page.tsx` |
| GET | `/api/payments/:id` | Authenticated | *(unused in frontend)* |
| POST | `/api/payments/success` / `fail` / `cancel` / `ipn` | Public | SSLCommerz callbacks (no frontend call) |

### Reviews — `/api/reviews`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| POST | `/api/reviews` | CUSTOMER | `review-form-modal.tsx` → `createReviewAction` |

### Admin — `/api/admin`
| Method | Endpoint | Auth | Frontend caller |
|---|---|---|---|
| GET | `/api/admin/dashboard/stats` | ADMIN | `(shell)/admin/dashboard/page.tsx` |
| GET | `/api/admin/users` | ADMIN | `(shell)/admin/users/page.tsx` |
| PATCH | `/api/admin/users/:id` | ADMIN | `user-columns.tsx` → `updateUserStatusAction` |
| GET | `/api/admin/bookings` | ADMIN | `(shell)/admin/bookings/page.tsx` |
| GET | `/api/admin/categories` | ADMIN | `(shell)/admin/categories/page.tsx` |
| POST | `/api/admin/categories` | ADMIN | `category-modal.tsx` → `createCategoryAction` |
| PATCH | `/api/admin/categories/:id` | ADMIN | `category-modal.tsx` → `updateCategoryAction` |
| DELETE | `/api/admin/categories/:id` | ADMIN | `category-columns.tsx` → `deleteCategoryAction` |

## Frontend Service Layer

All endpoint calls are centralized in `src/services/` (server-only modules):

| Service module | Exported functions |
|---|---|
| `auth.service.ts` | `login`, `register`, `getMe` |
| `category.service.ts` | `getAllCategories` |
| `service.service.ts` | `getAllServices`, `getMyServices`, `getSingleService`, `createService`, `updateService`, `deleteService` |
| `technician.service.ts` | `getTechnicianDashboardStats`, `getAllTechnicians`, `getSingleTechnician`, `getTechnicianBookings`, `updateTechnicianProfile`, `updateTechnicianAvailability`, `updateBookingStatus` |
| `booking.service.ts` | `getMyBookings`, `createBooking`, `cancelBooking` |
| `payment.service.ts` | `getMyPayments`, `createPayment` |
| `review.service.ts` | `createReview` |
| `admin.service.ts` | `getAdminDashboardStats`, `getAllUsers`, `updateUserStatus`, `getAllBookings`, `getAdminCategories`, `createAdminCategory`, `updateAdminCategory`, `deleteAdminCategory` |

## Deployment Notes

- Frontend requires `NEXT_PUBLIC_API_URL=https://l2-b7-a4.vercel.app` in production (currently `.env` points to `http://localhost:5000`).
- Backend requires `APP_URL=https://l2-b7-a5.vercel.app` (CORS origin + payment redirects) and `API_URL=https://l2-b7-a4.vercel.app` (SSLCommerz callbacks) — already set in `backend/.env`.
