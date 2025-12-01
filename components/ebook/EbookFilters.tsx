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
    <div className="flex justify-end mb-8">
      <div className="flex items-center gap-3 bg-card/30 backdrop-blur-sm py-2 px-4 rounded-full border border-border/30">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Sort Collection:</span>
        <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[180px] border-none bg-transparent focus:ring-0 h-8 text-sm">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="wordcount-asc">Length (Shortest First)</SelectItem>
            <SelectItem value="wordcount-desc">Length (Longest First)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

