import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      className={`flex flex-col gap-6 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors max-w-5xl mx-auto ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image Section - Clickable - Fixed size for better proportions */}
      <Link
        href={detailsUrl}
        className="flex-shrink-0 mx-auto md:mx-0 group"
      >
        <div className="relative w-[280px] h-[280px] rounded-lg overflow-hidden group-hover:ring-2 group-hover:ring-primary group-hover:shadow-lg transition-all">
          <Image
            src={imagePath}
            alt={`${ebook.title} cover`}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </Link>

      {/* Content Section - Flows naturally beside image */}
      <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-bold">{ebook.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {calculatePageCount(ebook.wordCount)} pages
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {calculateReadingTime(ebook.wordCount)}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          by {ebook.author.name}
        </p>
        
        <p className="text-sm text-foreground leading-relaxed line-clamp-4">
          {ebook.summary.under120}
        </p>
        
        <div className="mt-2">
          <Button asChild size="default">
            <Link href={detailsUrl}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

