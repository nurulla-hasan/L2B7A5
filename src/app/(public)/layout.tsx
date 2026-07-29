import { Navbar } from "@/components/layout/navbar/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-5">
          &copy; {new Date().getFullYear()} FixItNow. All rights reserved.
        </div>
      </footer>
    </>
  );
}
