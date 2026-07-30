export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED";

export type BookingTab = "all" | "active" | "completed" | "cancelled";

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduleDate: string;
  timeSlot: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithRelations extends Booking {
  customer: { id: string; name: string; email: string };
  technician: { id: string; name: string; email?: string };
  service: {
    id: string;
    name: string;
    price: string;
    description?: string;
  };
  payment?: unknown;
  review?: unknown;
}

export interface BookingWithService extends Booking {
  service?: { id: string; name: string; price: string };
  technician?: { id: string; name: string; email: string };
  payment?: unknown;
}

export interface TechnicianBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: string;
  customerName: string;
  customerEmail: string;
  scheduleDate: string;
  timeSlot: string;
  status: BookingStatus;
}
