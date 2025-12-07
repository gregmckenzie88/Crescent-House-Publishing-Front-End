import { ClientHome } from "@/components/ClientHome";
import { getAllEbooks } from "@/lib/ebooks";
import { hasAvailableLinks } from "@/lib/ebook-utils";

export default async function Home() {
  const ebooks = await getAllEbooks();
  const availableEbooks = ebooks.filter(hasAvailableLinks);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Crescent House Publishing",
    "url": "https://crescenthousepublishing.com",
    "logo": "https://crescenthousepublishing.com/icon.svg",
    "description": "Curated Erotica & Romance",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientHome initialEbooks={availableEbooks} />
    </>
  );
}
