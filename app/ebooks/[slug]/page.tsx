import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BookOpen, Headphones, Clock } from "lucide-react";
import { getEbookBySlug, getSampleChapter } from "@/lib/ebooks";
import { getEbookImagePath } from "@/lib/ebook-utils";
import {
  formatWordCount,
  calculatePageCount,
  calculateReadingTime,
} from "@/lib/ebook-utils";
import { SampleChapter } from "@/components/ebook/SampleChapter";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ebook/TrackedLink";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const ebook = await getEbookBySlug(slug);

  if (!ebook) {
    return {
      title: "Book Not Found",
    };
  }

  const ebookCoverPath = getEbookImagePath(slug, "ebook");
  const absoluteCoverPath = `https://crescenthousepublishing.com${ebookCoverPath}`;

  return {
    title: `${ebook.title} by ${ebook.author.name}`,
    description: ebook.summary.logLine || ebook.summary.under240,
    alternates: {
      canonical: `/ebooks/${slug}`,
    },
    openGraph: {
      title: ebook.title,
      description: ebook.summary.logLine || ebook.summary.under240,
      url: `https://crescenthousepublishing.com/ebooks/${slug}`,
      images: [
        {
          url: absoluteCoverPath,
          width: 800,
          height: 1200,
          alt: `Cover of ${ebook.title}`,
        },
      ],
      type: "book",
      authors: [ebook.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: ebook.title,
      description: ebook.summary.logLine || ebook.summary.under240,
      images: [absoluteCoverPath],
    },
  };
}

export default async function EbookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch ebook data
  const ebook = await getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  // Fetch sample chapter (optional)
  const sampleChapter = await getSampleChapter(slug);

  const ebookCoverPath = getEbookImagePath(slug, "ebook");
  const absoluteCoverPath = `https://crescenthousepublishing.com${ebookCoverPath}`;
  const pageCount = calculatePageCount(ebook.wordCount);
  const readingTime = calculateReadingTime(ebook.wordCount);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": ebook.title,
    "author": {
      "@type": "Person",
      "name": ebook.author.name,
      "description": ebook.author.biography
    },
    "description": ebook.summary.under240,
    "numberOfPages": pageCount,
    "wordCount": ebook.wordCount,
    "inLanguage": "en",
    "url": `https://crescenthousepublishing.com/ebooks/${slug}`,
    "image": absoluteCoverPath,
    "genre": ["Romance", "Erotica", "Adult Fiction"],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-xs font-medium"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        {/* Main content */}
        <div className="grid md:grid-cols-[400px_1fr] gap-12 lg:gap-20 mb-20">
          {/* Left column - Cover image */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-[300px] md:w-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-white/5 sticky top-8">
              <Image
                src={ebookCoverPath}
                alt={`${ebook.title} cover`}
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right column - Book details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium mb-4 leading-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent text-center md:text-left">
              {ebook.title}
            </h1>

            <div className="space-y-8 mb-10">
              <div className="border-l-2 border-primary/30 pl-6">
                <p className="text-2xl text-primary font-serif italic">
                  by {ebook.author.name}
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md font-light">
                  {ebook.author.biography}
                </p>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground uppercase tracking-wider border-y border-border/30 py-4">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {pageCount} pages
                </span>
                <span className="text-primary">•</span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readingTime}
                </span>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl leading-relaxed font-light text-foreground/90">
                  {ebook.summary.under240}
                </p>
              </div>
            </div>

            {/* Purchase links */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  Available Formats
                </h3>
                <div className="flex flex-wrap gap-4">
                  {/* E-book links */}
                  {(ebook.links.ebookAmazonLink || ebook.links.ebookAppleLink) && (
                    <div className="flex gap-3">
                      {ebook.links.ebookAmazonLink && (
                        <Button asChild variant="outline" className="h-12 px-6 border-primary/30 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all uppercase tracking-wider text-xs">
                          <TrackedLink
                            href={ebook.links.ebookAmazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                            eventName="click_buy_link"
                            eventProperties={{ 
                              provider: "Amazon", 
                              book: ebook.title,
                              location: "details_page" 
                            }}
                          >
                            <BookOpen className="h-4 w-4" />
                            Amazon Kindle
                          </TrackedLink>
                        </Button>
                      )}
                      {ebook.links.ebookAppleLink && (
                        <Button asChild variant="outline" className="h-12 px-6 border-primary/30 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all uppercase tracking-wider text-xs">
                          <TrackedLink
                            href={ebook.links.ebookAppleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                            eventName="click_buy_link"
                            eventProperties={{ 
                              provider: "Apple Books", 
                              book: ebook.title, 
                              location: "details_page" 
                            }}
                          >
                            <BookOpen className="h-4 w-4" />
                            Apple Books
                          </TrackedLink>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Audiobook links */}
                  {(ebook.links.audiobookAmazonLink || ebook.links.audiobookAppleLink) && (
                    <div className="flex gap-3">
                      {ebook.links.audiobookAmazonLink && (
                        <Button asChild variant="outline" className="h-12 px-6 border-primary/30 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all uppercase tracking-wider text-xs">
                          <TrackedLink
                            href={ebook.links.audiobookAmazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                            eventName="click_buy_link"
                            eventProperties={{ 
                              provider: "Audible", 
                              book: ebook.title,
                              location: "details_page" 
                            }}
                          >
                            <Headphones className="h-4 w-4" />
                            Audible
                          </TrackedLink>
                        </Button>
                      )}
                      {ebook.links.audiobookAppleLink && (
                        <Button asChild variant="outline" className="h-12 px-6 border-primary/30 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all uppercase tracking-wider text-xs">
                          <TrackedLink
                            href={ebook.links.audiobookAppleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                            eventName="click_buy_link"
                            eventProperties={{ 
                              provider: "Apple Audio", 
                              book: ebook.title,
                              location: "details_page" 
                            }}
                          >
                            <Headphones className="h-4 w-4" />
                            Apple Audio
                          </TrackedLink>
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Goodreads */}
                {ebook.links.goodReadsLink && (
                    <div className="mt-4">
                      <TrackedLink
                        href={ebook.links.goodReadsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        eventName="click_goodreads"
                        eventProperties={{ 
                          book: ebook.title,
                          location: "details_page" 
                        }}
                      >
                        View on Goodreads <ExternalLink className="h-3 w-3" />
                      </TrackedLink>
                    </div>
                )}

                 {/* No links available message */}
                 {!ebook.links.ebookAmazonLink &&
                  !ebook.links.ebookAppleLink &&
                  !ebook.links.audiobookAmazonLink &&
                  !ebook.links.audiobookAppleLink &&
                  !ebook.links.goodReadsLink && (
                    <p className="text-sm text-muted-foreground italic">
                      Purchase links coming soon.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Sample chapter section */}
        {sampleChapter && (
          <div className="border-t border-border/30 pt-16 md:pt-24">
            <div className="text-center mb-12">
              <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Preview</span>
              <h2 className="text-4xl md:text-5xl font-display mt-3 mb-6">Sample Chapter</h2>
              <div className="w-24 h-1 bg-primary/40 mx-auto rounded-full" />
            </div>
            <SampleChapter 
              content={sampleChapter} 
              bookTitle={ebook.title} 
              amazonLink={ebook.links.ebookAmazonLink}
            />
          </div>
        )}
      </div>
    </div>
  );
}
