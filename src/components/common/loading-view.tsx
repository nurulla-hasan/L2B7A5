import { Spinner } from "@/components/ui/spinner";

export function LoadingView({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      <span>{label}...</span>
    </div>
  );
}
