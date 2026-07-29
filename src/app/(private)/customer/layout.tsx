export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <a href="/" className="font-semibold">Service Platform</a>
          <nav className="flex items-center gap-4">
            <a href="/bookings">My Bookings</a>
            <a href="/payments">Payments</a>
            <a href="/profile">Profile</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
