import Link from "next/link";

const sidebarLinks = [
  { label: "Dashboard", href: "/technician/dashboard" },
  { label: "Bookings", href: "/technician/bookings" },
  { label: "My Services", href: "/technician/services" },
  { label: "Profile", href: "/technician/profile" },
  { label: "Availability", href: "/technician/availability" },
];

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-4">
        <h2 className="mb-6 text-lg font-semibold">Technician Panel</h2>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
