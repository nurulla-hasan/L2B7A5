import { Skeleton } from "@/components/ui/skeleton";

export default function ShellLoading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 shrink-0 border-r lg:flex lg:flex-col">
        <div className="flex h-14 items-center gap-3 border-b px-4">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex flex-col gap-1 p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header skeleton */}
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <Skeleton className="size-6 lg:hidden" />
          <div className="ml-auto flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-5 py-8">
            <div className="flex flex-col gap-6">
              {/* Title + action */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>

              {/* Table skeleton */}
              <div className="rounded-xl border">
                <div className="flex gap-4 border-b px-4 py-3">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-20 ml-auto" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4 border-b px-4 py-4 last:border-0">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
