"use client";

import { MapPin, SlidersHorizontal, X, RotateCcw } from "lucide-react";

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

const PRICE_MAX = 10000;

export function TechnicianFilter() {
  const {
    getFilter,
    updateFilter,
    updateBatch,
    clearAll,
    isFilterActive,
    getActiveCount,
  } = useNextFilter();

  const location = getFilter("location");
  const rating = getFilter("rating");
  const minPrice = getFilter("minPrice");
  const maxPrice = getFilter("maxPrice");
  const hasFilters = isFilterActive();
  const activeCount = getActiveCount();

  const filterForm = (
    <div className="space-y-5">
      {/* ── Header + Clear ───────────────────────────────── */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h3 className="font-heading text-sm font-semibold text-foreground">
            Filter Technicians
          </h3>
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              {activeCount}
            </span>
          )}
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => clearAll()}
            className="gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <RotateCcw className="size-3" />
            Clear
          </Button>
        )}
      </div>

      {/* ── Search ────────────────────────────────────────── */}
      <div className="grid gap-1.5">
        <label className="text-xs font-semibold text-foreground/80">
          Search Keyword
        </label>
        <div>
          <SearchInput
            filterKey="searchTerm"
            debounce={300}
            placeholder="Search by name or skill…"
            className="xl:max-w-full rounded-lg"
          />
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* ── Location ──────────────────────────────────────── */}
      <div className="grid gap-1.5">
        <label className="text-xs font-semibold text-foreground/80">
          Location / Area
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter area (e.g. Dhaka)"
            className="pl-9 text-xs rounded-lg border-border/60"
            value={location}
            onChange={(e) =>
              updateFilter("location", e.target.value || null)
            }
          />
          {location && (
            <button
              type="button"
              onClick={() => updateFilter("location", null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* ── Minimum Rating ────────────────────────────────── */}
      <div className="grid gap-1.5">
        <label className="text-xs font-semibold text-foreground/80">
          Minimum Rating
        </label>
        <div className="flex items-center gap-2 pt-0.5">
          <StarRating
            rating={rating ? Number(rating) : 0}
            totalStars={5}
            size={18}
            gap={2}
            onRate={(value) => {
              updateFilter("rating", value > 0 ? String(value) : null);
            }}
          />
          {rating && (
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              {rating}+ Stars
            </span>
          )}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* ── Price Range ───────────────────────────────────── */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-foreground/80">
            Price Range (per hour)
          </label>
          <span className="text-xs font-medium text-primary">
            {minPrice ? `৳${Number(minPrice).toLocaleString("en-BD")}` : "৳0"} -{" "}
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
          className="py-1"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile: filter button + Drawer ─────────────────── */}
      <div className="md:hidden">
        <Drawer swipeDirection="down">
          <DrawerTrigger render={<Button variant="outline" size="sm" className="w-full gap-2 rounded-xl border-border/60" />}>
            <SlidersHorizontal className="size-3.5" />
            Filters
            {activeCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Technicians</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="px-4 pb-6">{filterForm}</ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>

      {/* ── Desktop: sticky sidebar ────────────────────────── */}
      <aside className="sticky top-24 hidden w-full self-start md:block">
        <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-xs backdrop-blur-xs">
          {filterForm}
        </div>
      </aside>
    </>
  );
}
