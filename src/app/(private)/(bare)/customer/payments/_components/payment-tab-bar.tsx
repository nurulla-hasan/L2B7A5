"use client";

import { useNextFilter } from "@/hooks/useNextFilter";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Payment } from "@/interface/payment";

const PAYMENT_TABS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
] as const;

export function PaymentTabBar({
  currentTab,
  payments,
}: {
  currentTab: string;
  payments: Payment[];
}) {
  const { updateFilter } = useNextFilter();
  const completedCount = payments.filter((p) => p.status === "COMPLETED").length;

  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => {
        updateFilter("tab", value === "all" ? null : value);
      }}
    >
      <TabsList variant="line">
        {PAYMENT_TABS.map((t) => (
          <TabsTrigger key={t.key} value={t.key}>
            {t.label}
            {t.key === "completed" && completedCount > 0 && (
              <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary">
                {completedCount}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
