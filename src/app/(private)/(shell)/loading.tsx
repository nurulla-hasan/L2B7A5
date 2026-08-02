export default function ShellLoading() {
  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="size-10 animate-spin rounded-full border-[3px] border-muted-foreground/15 border-t-primary border-r-yellow-500" />
        <div className="absolute inset-0 m-auto size-2 rounded-full bg-primary/80" />
      </div>

      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-linear-to-br from-primary to-yellow-500"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
}
