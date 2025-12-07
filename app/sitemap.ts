import { getAllEbooks } from "@/lib/ebooks";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://crescenthousepublishing.com";
  
  // Get all ebooks
  const ebooks = await getAllEbooks();
  
  // Create entries for each ebook
  const ebookEntries = ebooks.map((ebook) => ({
    url: `${baseUrl}/ebooks/${ebook.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  return [...routes, ...ebookEntries];
}

