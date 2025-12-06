"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { EbookList } from "./ebook/EbookList";
import type { EbookWithSlug } from "@/types/ebook";
import { Search } from "lucide-react";

interface ClientHomeProps {
  initialEbooks: EbookWithSlug[];
}

export function ClientHome({ initialEbooks }: ClientHomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredEbooks = useMemo(() => {
    if (!searchTerm.trim()) {
      return initialEbooks;
    }
    
    const lowerTerm = searchTerm.toLowerCase();
    return initialEbooks.filter((ebook) => {
      // Search in summary.under240 as requested
      const searchContent = ebook.summary.under240.toLowerCase();
      return searchContent.includes(lowerTerm);
    });
  }, [initialEbooks, searchTerm]);

  // Scroll to results when search term changes
  useEffect(() => {
    if (searchTerm && listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Search */}
      <header className="fixed top-0 left-0 right-0 border-b border-border/40 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-center mb-4">
               <div className="w-1 h-16 bg-gradient-to-b from-transparent via-primary to-transparent opacity-80" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Love, Lust, and <br />
              Everything Between.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed font-serif italic">
              Stories that ignite the imagination and stir the soul.
            </p>
          </div>
        </div>
      </section>

      {/* E-books Listing */}
      <section className="container mx-auto px-4 py-16 md:py-24 border-t border-border/30">
        
        <div ref={listRef} className="scroll-mt-32">
          <EbookList 
            initialEbooks={filteredEbooks} 
            emptyMessage="No titles found. Please try a new search term."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-lg font-serif font-bold text-foreground">Crescent House Publishing</span>
              <p className="text-sm text-muted-foreground">
                © 2025 All rights reserved.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground uppercase tracking-wider">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

