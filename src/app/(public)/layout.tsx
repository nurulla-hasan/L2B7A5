export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">Service Platform</span>
          <nav className="flex items-center gap-6">
            <a href="/services">Services</a>
            <a href="/technicians">Technicians</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Service Platform. All rights reserved.
      </footer>
    </>
  );
}
