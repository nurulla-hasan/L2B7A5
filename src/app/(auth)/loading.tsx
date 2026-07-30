import { Spinner } from "@/components/ui/spinner";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen">
      {/* Left side — image placeholder */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="size-full animate-pulse bg-muted" />
      </div>

      {/* Right side — centered spinner */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
