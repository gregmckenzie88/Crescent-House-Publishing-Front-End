import type { EbookWithSlug } from "@/types/ebook";

/**
 * Convert a title to a kebab-case slug
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get the path to an e-book image
 */
export function getEbookImagePath(
  slug: string,
  type: "audiobook" | "ebook"
): string {
  return `/ebooks/${slug}/compressed_${type}_cover.webp`;
}

/**
 * Sort e-books by the specified criteria
 */
export function sortEbooks(
  ebooks: EbookWithSlug[],
  sortBy: "recent" | "wordcount-asc" | "wordcount-desc"
): EbookWithSlug[] {
  const sorted = [...ebooks];
  
  switch (sortBy) {
    case "recent":
      return sorted.sort(
        (a, b) =>
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime()
      );
    case "wordcount-asc":
      return sorted.sort((a, b) => a.wordCount - b.wordCount);
    case "wordcount-desc":
      return sorted.sort((a, b) => b.wordCount - a.wordCount);
    default:
      return sorted;
  }
}

/**
 * Format word count with commas
 */
export function formatWordCount(count: number): string {
  return count.toLocaleString();
}

/**
 * Calculate page count based on word count
 * Assumes 270 words per page, rounded up
 */
export function calculatePageCount(wordCount: number): number {
  const WORDS_PER_PAGE = 270;
  return Math.ceil(wordCount / WORDS_PER_PAGE);
}

/**
 * Calculate reading time based on word count
 * Assumes 270 words per page and 1.25 minutes per page
 */
export function calculateReadingTime(wordCount: number): string {
  const MINUTES_PER_PAGE = 1.25;
  
  // Calculate pages (rounded up)
  const pages = calculatePageCount(wordCount);
  
  // Calculate total minutes
  const totalMinutes = pages * MINUTES_PER_PAGE;
  
  // Convert to hours
  const hours = totalMinutes / 60;
  
  // Format to 1 decimal place
  return `~${hours.toFixed(1)}-hour read`;
}

