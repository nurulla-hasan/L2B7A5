import { Skeleton } from "@/components/ui/skeleton";

export default function BareLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar skeleton */}
      <header className="flex h-16 items-center gap-4 border-b px-6">
        <Skeleton className="h-8 w-28" />
        <div className="ml-auto flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
        </div>
      </header>

      {/* Page content skeleton */}
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-5 py-12 lg:py-18">
          <div className="flex flex-col gap-8">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-5 w-96" />
            </div>

            {/* Table-like skeleton */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 border-b pb-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-36" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t py-8">
        <div className="container mx-auto max-w-7xl px-5">
          <Skeleton className="h-4 w-48" />
        </div>
      </footer>
    </div>
  );
}
