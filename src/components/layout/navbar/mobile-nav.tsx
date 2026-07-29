import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="border-t md:hidden">
      <nav className="flex flex-col gap-1 px-5 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <hr className="my-2" />
        <Link
          href="/login"
          onClick={onClose}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Login
        </Link>
        <Link href="/register" onClick={onClose} className="mt-1">
          <Button className="w-full">Get Started</Button>
        </Link>
      </nav>
    </div>
  );
}
