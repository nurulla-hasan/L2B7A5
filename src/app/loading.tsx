import { Logo } from "@/components/common/logo";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background">
      {/* Brand */}
      <div className="animate-pulse">
        <Logo size="lg" showText />
      </div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center gap-5">
        {/* Gradient ring */}
        <div className="relative">
          <div className="size-10 animate-spin rounded-full border-[3px] border-muted-foreground/15 border-t-primary border-r-yellow-500" />
          <div className="absolute inset-0 m-auto size-2 rounded-full bg-primary/80" />
        </div>

        {/* Bouncing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-bounce rounded-full bg-linear-to-br from-primary to-yellow-500"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
