"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNextFilter } from "@/hooks/useNextFilter";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  filterKey?: string;
  debounce?: number;
}

export function SearchInput({
  filterKey = "searchTerm",
  debounce = 300,
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const { getFilter, updateFilter } = useNextFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter(filterKey, e.target.value, { debounce });
  };

  return (
    <div className={cn("relative w-full xl:max-w-64", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={getFilter(filterKey)}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-9"
        {...props}
      />
    </div>
  );
}
