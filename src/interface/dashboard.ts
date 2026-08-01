import type { Role } from "./auth";
import type { ActiveStatus } from "./user";
import type { BookingStatus } from "./booking";

export interface BookingStatusCounts {
  REQUESTED: number;
  ACCEPTED: number;
  DECLINED: number;
  CANCELLED: number;
  PAID: number;
  IN_PROGRESS: number;
  COMPLETED: number;
}

export interface RecentBooking {
  id: string;
  scheduleDate: string;
  timeSlot: string;
  status: BookingStatus;
  createdAt: string;
  customer: { id: string; name: string; email: string };
  technician: { id: string; name: string; email: string };
  service: { id: string; name: string; price: string };
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  activeStatus: ActiveStatus;
  createdAt: string;
}

export interface AdminDashboardStats {
  totals: {
    users: number;
    customers: number;
    technicians: number;
    admins: number;
    services: number;
    categories: number;
    bookings: number;
    revenue: number;
  };
  bookingStatusCounts: BookingStatusCounts;
  recentBookings: RecentBooking[];
  recentUsers: RecentUser[];
}

export interface UpcomingAppointment {
  id: string;
  scheduleDate: string;
  timeSlot: string;
  status: BookingStatus;
  customer: { id: string; name: string; email: string };
  service: { id: string; name: string; price: string };
}

export interface RecentReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerName: string;
  serviceName: string;
}

export interface TechnicianDashboardStats {
  totals: {
    bookings: number;
    pendingBookings: number;
    activeServices: number;
    completedBookings: number;
    earnings: number;
    averageRating: number;
    reviewCount: number;
  };
  bookingStatusCounts: BookingStatusCounts;
  upcomingAppointments: UpcomingAppointment[];
  recentReviews: RecentReview[];
}
