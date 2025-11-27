"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/types/ebook";

interface EbookFiltersProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function EbookFilters({ currentSort, onSortChange }: EbookFiltersProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="wordcount-asc">Word Count (Low to High)</SelectItem>
          <SelectItem value="wordcount-desc">Word Count (High to Low)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

