"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNextFilter } from "@/hooks/useNextFilter";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  filterKey?: string;
  debounce?: number;
  size?: "default" | "lg" | "xl";
}

export function SearchInput({
  filterKey = "searchTerm",
  debounce = 300,
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const { getFilter, updateFilter } = useNextFilter();

  return (
    <div className={cn("relative w-full xl:max-w-64", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={getFilter(filterKey)}
        onChange={(e) => updateFilter(filterKey, e.target.value, { debounce })}
        placeholder={placeholder}
        className="pl-9 pr-8"
        {...props}
      />
      {getFilter(filterKey) && (
        <button
          type="button"
          onClick={() => updateFilter(filterKey, null)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
