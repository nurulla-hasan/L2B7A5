import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link href="/login">
        <Button variant="ghost">Login</Button>
      </Link>
      <Link href="/register">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
