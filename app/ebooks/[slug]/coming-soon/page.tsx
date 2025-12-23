import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEbookBySlug } from "@/lib/ebooks";
import { Button } from "@/components/ui/button";

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

  return {
    title: `${ebook.title} - Coming Soon`,
    description: `${ebook.title} is coming soon to Amazon.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = await getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            {ebook.title}
          </h1>
          <p className="text-3xl md:text-4xl text-primary font-serif italic">
            Coming Soon
          </p>
        </div>

        <div className="pt-8">
          <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all uppercase tracking-widest text-xs h-12 px-8">
            <Link href={`/ebooks/${slug}`} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Book Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

