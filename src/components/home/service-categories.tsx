import { getAllCategories } from "@/services/category.service";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import Link from "next/link";
import {
  Bolt,
  Hammer,
  PaintBucket,
  Sparkles,
  Wrench,
  Zap,
  Wind,
} from "lucide-react";
import type { Category } from "@/interface/category";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Electrical: Zap,
  Plumbing: Wrench,
  Cleaning: Sparkles,
  Painting: PaintBucket,
  Carpentry: Hammer,
  "AC Repair": Wind,
  default: Bolt,
};

function getIcon(name: string) {
  return categoryIcons[name] || categoryIcons.default;
}

export async function ServiceCategories() {
  const categoriesRes = await getAllCategories();
  const categories: Category[] = categoriesRes.success ? categoriesRes.data : [];

  if (categories.length === 0) return null;

  return (
    <SectionWrapper bg="muted" padding="lg">
      <SectionHeading
        badge="Categories"
        title="What are you looking for?"
        description="Browse our wide range of professional home services"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => {
          const Icon = getIcon(cat.name);
          return (
            <Link
              key={cat.id}
              href={`/services?type=${encodeURIComponent(cat.name)}`}
              className="group flex items-center gap-4 rounded-xl border bg-background p-5 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-medium">{cat.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
