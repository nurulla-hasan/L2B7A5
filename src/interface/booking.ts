export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED";

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
  technician: { id: string; name: string };
  service: { id: string; name: string; price: number };
}
