import "server-only";

import { cookies } from "next/headers";

type AuthMode = "required" | "optional" | "none";

type NextServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: AuthMode;
  next?: NextFetchRequestConfig;
};

type ApiResult<T> =
  | { success: true; data: T; status: number }
  | { success: false; message: string; status: number };

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

const buildErrorMessage = (errorData: unknown, status: number): string => {
  if (
    isObject(errorData) &&
    typeof errorData.message === "string" &&
    errorData.message.trim()
  ) {
    return errorData.message.trim();
  }

  return `Request failed with status ${status}`;
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
        message: "NEXT_PUBLIC_API_URL is not defined",
        status: 500,
      };
    }

    const accessToken = auth === "none" ? null : await getAccessToken();

    if (auth === "required" && !accessToken) {
      return {
        success: false,
        message: "Authorization token is required",
        status: 401,
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
        message: `Unable to connect to backend server (${normalizedBaseUrl}): ${message}`,
        status: 503,
      };
    }

    const responseData = await parseJsonResponse(response);

    if (!response.ok) {
      return {
        success: false,
        message: buildErrorMessage(responseData, response.status),
        status: response.status,
      };
    }

    // Auto-unwrap backend's `data` field so callers don't need .data.data
    const unwrapped =
      responseData &&
      typeof responseData === "object" &&
      "data" in (responseData as Record<string, unknown>)
        ? (responseData as Record<string, unknown>).data
        : responseData;

    return { success: true, data: unwrapped as T, status: response.status };
  } catch (error) {
    // ApiError is a normal runtime failure (e.g. invalid JSON response).
    // Anything else is a programming error (e.g. GET with a body, unsupported
    // body type) — log it so it is not silently swallowed during development.
    if (!(error instanceof ApiError)) {
      console.error("[nextServerFetch] Unexpected error:", error);
    }

    return {
      success: false,
      message:
        error instanceof ApiError
          ? error.message
          : "An unexpected error occurred",
      status: error instanceof ApiError ? error.status : 500,
    };
  }
};
