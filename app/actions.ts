"use server";

import { getSampleChapter } from "@/lib/ebooks";

export async function getSampleChapterContent(slug: string) {
  try {
    const content = await getSampleChapter(slug);
    return content;
  } catch (error) {
    console.error(`Error fetching sample chapter for ${slug}:`, error);
    return null;
  }
}

