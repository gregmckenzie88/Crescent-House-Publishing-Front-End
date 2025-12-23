import { ClientHome } from "@/components/ClientHome";
import { getAllEbooks } from "@/lib/ebooks";

export default async function Home() {
  const ebooks = await getAllEbooks();

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
      <ClientHome initialEbooks={ebooks} />
    </>
  );
}
