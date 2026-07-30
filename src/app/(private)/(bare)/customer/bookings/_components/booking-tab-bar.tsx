"use client";

import { useNextFilter } from "@/hooks/useNextFilter";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BOOKING_TABS } from "@/constants/booking";
import type { BookingTab } from "@/interface/booking";

export function BookingTabBar({
  currentTab,
  activeCount,
}: {
  currentTab: BookingTab;
  activeCount: number;
}) {
  const { updateFilter } = useNextFilter();

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => {
        updateFilter("tab", value === "all" ? null : value);
      }}
    >
      <TabsList variant="line">
        {BOOKING_TABS.map((t) => (
          <TabsTrigger key={t.key} value={t.key}>
            {t.label}
            {t.key === "active" && activeCount > 0 && (
              <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary">
                {activeCount}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
