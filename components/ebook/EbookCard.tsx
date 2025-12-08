import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SampleChapter } from "@/components/ebook/SampleChapter";
import type { EbookWithSlug } from "@/types/ebook";
import { getEbookImagePath, calculatePageCount, calculateReadingTime } from "@/lib/ebook-utils";

interface EbookCardProps {
  ebook: EbookWithSlug;
  imagePosition: "left" | "right";
}

export function EbookCard({ ebook, imagePosition }: EbookCardProps) {
  const imagePath = getEbookImagePath(ebook.slug, "audiobook");
  const detailsUrl = `/ebooks/${ebook.slug}`;

  return (
    <div
      className={`flex flex-col gap-8 md:gap-12 p-8 rounded-xl border border-border/30 bg-card/40 transition-all duration-500 max-w-5xl mx-auto group ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image Section - Clickable */}
      <Link
        href={detailsUrl}
        className="flex-shrink-0 mx-auto md:mx-0 relative"
      >
        <div className="relative w-[280px] h-[280px] rounded-md overflow-hidden shadow-2xl transition-transform duration-500">
          <Image
            src={imagePath}
            alt={`${ebook.title} cover`}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center gap-6 min-w-0 text-center md:text-left">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-2">
            <Link href={detailsUrl} className="hover:text-primary transition-colors">
              {ebook.title}
            </Link>
          </h3>
          <p className="text-lg text-primary/80 font-serif italic mb-4">
            by {ebook.author.name}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground/80 uppercase tracking-wider font-medium">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {calculatePageCount(ebook.wordCount)} pages
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {calculateReadingTime(ebook.wordCount)}
            </span>
          </div>
        </div>
        
        <div className="relative">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3 font-light">
            {ebook.summary.logLine}
          </p>
        </div>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-transparent hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs h-10 px-6">
            <Link href={detailsUrl}>View Details</Link>
          </Button>
          <SampleChapter 
            bookTitle={ebook.title}
            slug={ebook.slug}
            amazonLink={ebook.links.ebookAmazonLink}
            triggerClassName="border-primary/30 text-primary hover:bg-transparent hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs h-10 px-6"
            enableStickyFooter={false}
            label="Read the first chapter"
          />
        </div>
      </div>
    </div>
  );
}

