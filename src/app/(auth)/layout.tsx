import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left — Full-screen Image + Branding Overlay */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/assets/auth-image.png"
          alt="Home Services"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Right — Auth Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-2xl font-bold">FixItNow</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
