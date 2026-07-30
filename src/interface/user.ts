import type { Role } from "./auth";

export type ActiveStatus = "ACTIVE" | "BLOCKED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  activeStatus: ActiveStatus;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: TechnicianProfile | null;
}

export interface TechnicianProfile {
  id: string;
  userId?: string;
  skills: string;
  experience: string;
  pricing: string;
  availability: Record<string, string[]> | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceSummary {
  id: string;
  name: string;
  location: string;
  price: string;
}

export interface TechnicianWithProfile extends User {
  technicianProfile: TechnicianProfile | null;
  services?: ServiceSummary[];
}
