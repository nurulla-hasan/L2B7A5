export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
