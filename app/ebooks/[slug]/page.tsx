export default async function EbookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">E-book Detail Page</h1>
        <p className="text-muted-foreground">
          This is a placeholder for the e-book detail page.
        </p>
        <p className="text-muted-foreground mt-2">Slug: {slug}</p>
        <p className="text-sm text-muted-foreground mt-8">
          This page will be implemented in the next phase with the full e-book
          details, including the rectangular ebook cover and the longer
          description.
        </p>
      </div>
    </div>
  );
}

