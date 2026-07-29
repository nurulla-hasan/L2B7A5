import {
  Info,
  LayoutDashboard,
  Phone,
  Users,
  CalendarCheck,
  Tags,
  Waypoints,
  Wrench,
  Clock,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

export const publicNavLinks: NavLink[] = [
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Technicians", href: "/technicians", icon: Users },
  { label: "How It Works", href: "/how-it-works", icon: Waypoints },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const adminLinks: NavLink[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Categories", href: "/admin/categories", icon: Tags },
];

export const technicianLinks: NavLink[] = [
  { label: "Dashboard", href: "/technician/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/technician/bookings", icon: CalendarCheck },
  { label: "My Services", href: "/technician/services", icon: Wrench },
  { label: "Profile", href: "/technician/profile", icon: UserRound },
  { label: "Availability", href: "/technician/availability", icon: Clock },
];
