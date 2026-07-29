"use client";

import { MapPin, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { StarRating } from "@/components/common/star-rating";
import { SearchInput } from "@/components/common/search-input";
import { useNextFilter } from "@/hooks/useNextFilter";
import { cn } from "@/lib/utils";
import type { Category } from "@/interface/category";

const PRICE_MAX = 10000;

type ServiceFilterProps = {
  categories: Category[];
};

export function ServiceFilter({ categories }: ServiceFilterProps) {
  const {
    getFilter,
    updateFilter,
    updateBatch,
    clearAll,
    isFilterActive,
    getActiveCount,
  } = useNextFilter();

  const activeCategory = getFilter("type");
  const location = getFilter("location");
  const rating = getFilter("rating");
  const minPrice = getFilter("minPrice");
  const maxPrice = getFilter("maxPrice");
  const hasFilters = isFilterActive();

  const filterForm = (
    <div className="space-y-5">
      {/* ── Header + Clear ───────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-medium text-foreground">
          Filters
        </h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearAll()}
            className="gap-1 text-muted-foreground"
          >
            <X className="size-3" />
            Clear all
          </Button>
        )}
      </div>

      {/* ── Search ────────────────────────────────────────── */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">
          Search
        </label>
        <div>
          <SearchInput
            filterKey="searchTerm"
            debounce={300}
            placeholder="Search services…"
            className="xl:max-w-full"
          />
        </div>
      </div>

      <Separator />

      {/* ── Category / Type ───────────────────────────────── */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => updateFilter("type", null)}
            className={cn(
              "rounded-full",
              !activeCategory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => updateFilter("type", cat.name)}
              className={cn(
                "rounded-full",
                activeCategory === cat.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Location ──────────────────────────────────────── */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter location…"
            className="pl-8"
            value={location}
            onChange={(e) =>
              updateFilter("location", e.target.value || null)
            }
          />
          {location && (
            <button
              type="button"
              onClick={() => updateFilter("location", null)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <Separator />

      {/* ── Minimum Rating ────────────────────────────────── */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">
          Minimum Rating
        </label>
        <div className="flex items-center gap-2">
          <StarRating
            rating={rating ? Number(rating) : 0}
            totalStars={5}
            size={18}
            gap={2}
            onRate={(value) => {
              updateFilter("rating", value > 0 ? String(value) : null);
            }}
          />
        </div>
      </div>

      <Separator />

      {/* ── Price Range ───────────────────────────────────── */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">
          Price Range
        </label>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {minPrice
              ? `৳${Number(minPrice).toLocaleString("en-BD")}`
              : "৳0"}
          </span>
          <span>
            {maxPrice
              ? `৳${Number(maxPrice).toLocaleString("en-BD")}`
              : `৳${PRICE_MAX.toLocaleString("en-BD")}`}
          </span>
        </div>

        <Slider
          value={[
            minPrice ? Number(minPrice) : 0,
            maxPrice ? Number(maxPrice) : PRICE_MAX,
          ]}
          min={0}
          max={PRICE_MAX}
          step={100}
          onValueChange={(value) => {
            const [newMin, newMax] = Array.isArray(value)
              ? value
              : [0, PRICE_MAX];
            const updates: Record<string, string | null> = {};
            updates.minPrice = newMin > 0 ? String(newMin) : null;
            updates.maxPrice = newMax < PRICE_MAX ? String(newMax) : null;
            updateBatch(updates, { debounce: 300 });
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile: filter button + Drawer ─────────────────── */}
      <div className="md:hidden">
        <Drawer swipeDirection="down">
          <DrawerTrigger render={<Button variant="outline" size="sm" />}>
            <SlidersHorizontal className="size-3.5" />
            Filters
            {getActiveCount() > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {getActiveCount()}
              </span>
            )}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="px-4 pb-6">{filterForm}</ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>

      {/* ── Desktop: sticky sidebar ────────────────────────── */}
      <aside className="sticky top-24 hidden w-full self-start md:block">
        <div className="rounded-xl border border-border bg-card p-4">
          {filterForm}
        </div>
      </aside>
    </>
  );
}
