import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

interface TokenPayload {
  exp?: number;
  role?: unknown;
}

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/help",
  "/how-it-works",
  "/payment",
  "/privacy",
  "/services",
  "/technicians",
  "/terms",
];

const AUTH_ROUTES = [
  "/login",
  "/register",
];

// Turn this on when the auth flow is ready to test
const IS_PROTECTION_ON = true;

const ROLE_HOME: Record<UserRole, string> = {
  CUSTOMER: "/customer",
  TECHNICIAN: "/technician/dashboard",
  ADMIN: "/admin/dashboard",
};

const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
};

const isExpired = (token: string): boolean => {
  const payload = decodeToken(token);

  if (!payload?.exp) return true;

  return Date.now() / 1000 >= payload.exp;
};

const getRole = (token: string): UserRole | null => {
  const payload = decodeToken(token);
  const role = payload?.role as string;

  return role === "CUSTOMER" || role === "TECHNICIAN" || role === "ADMIN"
    ? (role as UserRole)
    : null;
};

export async function proxy(request: NextRequest): Promise<NextResponse> {
  if (!IS_PROTECTION_ON) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  let newAccessToken: string | undefined = undefined;

  // Try to refresh token if missing or expired
  if ((!accessToken || isExpired(accessToken)) && refreshToken) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await res.json();

      if (data?.success && data?.data?.accessToken) {
        newAccessToken = data.data.accessToken;
        accessToken = newAccessToken;
      }
    } catch (error) {
      console.error("Token refresh failed in proxy:", error);
    }
  }

  let response: NextResponse;

  // Redirect authenticated users away from auth pages (login, register, etc.)
  if (isAuthRoute && accessToken && !isExpired(accessToken)) {
    const role = getRole(accessToken);

    if (role) {
      response = NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
    } else {
      response = NextResponse.next();
    }
  }
  // Redirect logged-in admin/technician away from public routes
  else if (isPublic && accessToken && !isExpired(accessToken)) {
    const role = getRole(accessToken);

    if (role === "ADMIN" || role === "TECHNICIAN") {
      response = NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
    } else {
      response = NextResponse.next();
    }
  }
  // Redirect unauthenticated users to login for protected pages
  else if (!isPublic && !isAuthRoute) {
    if (!accessToken || isExpired(accessToken)) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("callbackUrl", pathname);

      response = NextResponse.redirect(loginUrl);
    } else {
      const role = getRole(accessToken);

      if (!role) {
        response = NextResponse.redirect(new URL("/login", request.url));
      } 
      // Role-based access control
      else if (pathname.startsWith("/customer") && role !== "CUSTOMER") {
        response = NextResponse.redirect(new URL("/not-found", request.url));
      } else if (pathname.startsWith("/technician") && role !== "TECHNICIAN") {
        response = NextResponse.redirect(new URL("/not-found", request.url));
      } else if (pathname.startsWith("/admin") && role !== "ADMIN") {
        response = NextResponse.redirect(new URL("/not-found", request.url));
      } else {
        response = NextResponse.next();
      }
    }
  } 
  else {
    response = NextResponse.next();
  }

  // If a new access token was fetched, set it in the response cookies
  if (newAccessToken) {
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*).*)",
  ],
};