import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getEbookBySlug, getSampleChapter } from "@/lib/ebooks";
import { getEbookImagePath } from "@/lib/ebook-utils";
import {
  formatWordCount,
  calculatePageCount,
  calculateReadingTime,
} from "@/lib/ebook-utils";
import { SampleChapter } from "@/components/ebook/SampleChapter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const pageCount = calculatePageCount(ebook.wordCount);
  const readingTime = calculateReadingTime(ebook.wordCount);

  // Format publication date
  const publicationDate = new Date(ebook.publicationDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>

        {/* Main content */}
        <div className="grid md:grid-cols-[400px_1fr] gap-12 mb-12">
          {/* Left column - Cover image */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={ebookCoverPath}
                alt={`${ebook.title} cover`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right column - Book details */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {ebook.title}
            </h1>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xl text-muted-foreground">
                  by {ebook.author.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1 italic">
                  {ebook.author.biography}
                </p>
              </div>

              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {formatWordCount(ebook.wordCount)} words
                </Badge>
                <Badge variant="secondary">{pageCount} pages</Badge>
                <Badge variant="secondary">{readingTime}</Badge>
                <Badge variant="outline">Published {publicationDate}</Badge>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">About This Book</h2>
              <p className="text-foreground leading-relaxed text-lg">
                {ebook.summary.under240}
              </p>
            </div>

            {/* Purchase links */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Get This Book</h2>
              <div className="grid gap-3">
                {/* E-book links */}
                {(ebook.links.ebookAmazonLink ||
                  ebook.links.ebookAppleLink) && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                      E-book
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ebook.links.ebookAmazonLink && (
                        <Button asChild variant="default" size="sm">
                          <a
                            href={ebook.links.ebookAmazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            Amazon Kindle
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {ebook.links.ebookAppleLink && (
                        <Button asChild variant="default" size="sm">
                          <a
                            href={ebook.links.ebookAppleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            Apple Books
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Audiobook links */}
                {(ebook.links.audiobookAmazonLink ||
                  ebook.links.audiobookAppleLink) && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                      Audiobook
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ebook.links.audiobookAmazonLink && (
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={ebook.links.audiobookAmazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            Audible
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {ebook.links.audiobookAppleLink && (
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={ebook.links.audiobookAppleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            Apple Books
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Goodreads link */}
                {ebook.links.goodReadsLink && (
                  <div>
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={ebook.links.goodReadsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View on Goodreads
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}

                {/* No links available message */}
                {!ebook.links.ebookAmazonLink &&
                  !ebook.links.ebookAppleLink &&
                  !ebook.links.audiobookAmazonLink &&
                  !ebook.links.audiobookAppleLink &&
                  !ebook.links.goodReadsLink && (
                    <p className="text-sm text-muted-foreground">
                      Purchase links coming soon.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Sample chapter section */}
        {sampleChapter && (
          <SampleChapter content={sampleChapter} bookTitle={ebook.title} />
        )}
      </div>
    </div>
  );
}
