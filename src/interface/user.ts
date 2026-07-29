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
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  skills: string;
  experience: string;
  pricing: number;
  availability: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicianWithProfile extends User {
  technicianProfile: TechnicianProfile | null;
  services?: ServiceSummary[];
}

interface ServiceSummary {
  id: string;
  name: string;
  price: number;
}
