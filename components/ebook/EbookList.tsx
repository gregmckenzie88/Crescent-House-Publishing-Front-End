"use client";

import { useState } from "react";
import { EbookCard } from "./EbookCard";
import { EbookFilters } from "./EbookFilters";
import type { EbookWithSlug, SortOption } from "@/types/ebook";
import { sortEbooks } from "@/lib/ebook-utils";

interface EbookListProps {
  initialEbooks: EbookWithSlug[];
  emptyMessage?: string;
}

export function EbookList({ initialEbooks, emptyMessage }: EbookListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  
  const sortedEbooks = sortEbooks(initialEbooks, sortBy);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <EbookFilters currentSort={sortBy} onSortChange={setSortBy} />

      {/* E-book Cards */}
      <div className="space-y-8">
        {sortedEbooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{emptyMessage || "No e-books found."}</p>
          </div>
        ) : (
          sortedEbooks.map((ebook, index) => (
            <EbookCard
              key={ebook.id}
              ebook={ebook}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))
        )}
      </div>
    </div>
  );
}

