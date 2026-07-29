import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
];

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
