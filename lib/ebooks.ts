import fs from "fs";
import path from "path";
import type { EbookMetadata, EbookWithSlug } from "@/types/ebook";

/**
 * Load all e-book metadata from the data directory
 * Server-side only function
 */
export async function getAllEbooks(): Promise<EbookWithSlug[]> {
  const dataDir = path.join(process.cwd(), "data", "ebooks");
  
  try {
    const bookDirs = fs.readdirSync(dataDir);
    
    const ebooks = await Promise.all(
      bookDirs
        .filter((dir) => !dir.startsWith(".")) // Skip hidden files
        .map(async (dir) => {
          const metadataPath = path.join(dataDir, dir, "metadata.json");
          
          try {
            const metadataContent = fs.readFileSync(metadataPath, "utf-8");
            const metadata: EbookMetadata = JSON.parse(metadataContent);
            
            return {
              ...metadata,
              slug: dir, // Use the directory name as slug
            };
          } catch (error) {
            console.error(`Error reading metadata for ${dir}:`, error);
            return null;
          }
        })
    );
    
    return ebooks.filter((book): book is EbookWithSlug => book !== null);
  } catch (error) {
    console.error("Error reading ebooks directory:", error);
    return [];
  }
}

/**
 * Get a single e-book by slug
 * Server-side only function
 */
export async function getEbookBySlug(
  slug: string
): Promise<EbookWithSlug | null> {
  const metadataPath = path.join(
    process.cwd(),
    "data",
    "ebooks",
    slug,
    "metadata.json"
  );
  
  try {
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    const metadata: EbookMetadata = JSON.parse(metadataContent);
    
    return {
      ...metadata,
      slug,
    };
  } catch (error) {
    console.error(`Error reading metadata for ${slug}:`, error);
    return null;
  }
}

/**
 * Get sample chapter content for an e-book
 * Server-side only function
 */
export async function getSampleChapter(slug: string): Promise<string | null> {
  const sampleChapterPath = path.join(
    process.cwd(),
    "data",
    "ebooks",
    slug,
    "sample-chapter.md"
  );
  
  try {
    const content = fs.readFileSync(sampleChapterPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading sample chapter for ${slug}:`, error);
    return null;
  }
}

