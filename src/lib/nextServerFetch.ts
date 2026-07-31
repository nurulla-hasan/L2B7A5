import "server-only";

import { cookies } from "next/headers";

type AuthMode = "required" | "optional" | "none";

type NextServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: AuthMode;
  next?: NextFetchRequestConfig;
};

// Mirrors the backend's `sendResponse` / `globalErrorHandler` bodies exactly —
// nextServerFetch returns these verbatim, so callers see the same shape as Postman.
export type ApiSuccess<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number };
};

export type ApiFailure = {
  success: false;
  statusCode: number;
  message: string;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};

const getAccessToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value ?? null;
};

const parseJsonResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const responseText = await response.text();

  if (!responseText.trim()) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new ApiError(
      "API returned an invalid JSON response",
      response.status,
      {
        rawResponse: responseText.slice(0, 500),
      },
    );
  }
};

const prepareBody = (
  body: unknown,
  headers: Headers,
  method: string,
): BodyInit | undefined => {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (method === "GET" || method === "HEAD") {
    throw new TypeError(`${method} requests cannot include a body`);
  }

  // File uploads (multipart/form-data) — e.g. profile image
  if (body instanceof FormData) {
    return body;
  }

  // JSON payloads — used by ~80% of API calls
  if (isPlainObject(body) || Array.isArray(body)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return JSON.stringify(body);
  }

  throw new TypeError("Unsupported request body type");
};

export const nextServerFetch = async <T>(
  endpoint: string,
  options: NextServerFetchOptions = {},
): Promise<ApiResult<T>> => {
  try {
    const {
      auth = "required",
      body: rawBody,
      headers: customHeaders,
      method = "GET",
      next,
      ...requestOptions
    } = options;

    const normalizedMethod = method.toUpperCase();
    const headers = new Headers(customHeaders);

    const body = prepareBody(rawBody, headers, normalizedMethod);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      return {
        success: false,
        statusCode: 500,
        message: "NEXT_PUBLIC_API_URL is not defined",
      };
    }

    const accessToken = auth === "none" ? null : await getAccessToken();

    if (auth === "required" && !accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authorization token is required",
      };
    }

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");

    let response: Response;
    try {
      response = await fetch(`${normalizedBaseUrl}/${normalizedEndpoint}`, {
        ...requestOptions,
        method: normalizedMethod,
        headers,
        ...(body !== undefined ? { body } : {}),
        ...(next ? { next } : {}),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Network error";
      return {
        success: false,
        statusCode: 503,
        message: `Unable to connect to backend server (${normalizedBaseUrl}): ${message}`,
      };
    }

    const responseData = await parseJsonResponse(response);

    if (!response.ok) {
      // Backend error bodies already match the failure shape — return verbatim.
      // Only synthesize a message when there's no parseable body.
      if (
        isObject(responseData) &&
        typeof responseData.message === "string" &&
        responseData.message.trim()
      ) {
        return responseData as ApiFailure;
      }

      return {
        success: false,
        statusCode: response.status,
        message: `Request failed with status ${response.status}`,
      };
    }

    // Return the backend's success body verbatim — same as Postman.
    return responseData as ApiSuccess<T>;
  } catch (error) {
    // ApiError is a normal runtime failure (e.g. invalid JSON response).
    // Anything else is a programming error (e.g. GET with a body, unsupported
    // body type) — log it so it is not silently swallowed during development.
    if (!(error instanceof ApiError)) {
      console.error("[nextServerFetch] Unexpected error:", error);
    }

    return {
      success: false,
      statusCode: error instanceof ApiError ? error.status : 500,
      message:
        error instanceof ApiError
          ? error.message
          : "An unexpected error occurred",
    };
  }
};
