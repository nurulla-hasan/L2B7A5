import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar skeleton */}
      <header className="flex h-16 items-center gap-4 border-b px-6">
        <Skeleton className="h-8 w-28" />
        <div className="ml-auto flex items-center gap-3">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </header>

      {/* Hero skeleton */}
      <main className="flex-1">
        <div className="flex flex-col items-center gap-6 px-6 pt-24 pb-16">
          <Skeleton className="h-12 w-96" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="mt-4 h-12 w-80 rounded-full" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
