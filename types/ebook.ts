export interface EbookMetadata {
  id: string;
  title: string;
  author: {
    name: string;
    biography: string;
  };
  wordCount: number;
  publicationDate: string;
  summary: {
    under120: string;
    under240: string;
    logLine: string;
  };
  links: {
    goodReadsLink: string | null;
    ebookAmazonLink: string | null;
    ebookAppleLink: string | null;
    audiobookAmazonLink: string | null;
    audiobookAppleLink: string | null;
  };
  keywords?: string[];
  categories?: string[];
  sampleChapterPath?: string;
}

export interface EbookWithSlug extends EbookMetadata {
  slug: string;
}

export type SortOption = "recent" | "wordcount-asc" | "wordcount-desc";

