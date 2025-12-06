import { ClientHome } from "@/components/ClientHome";
import { getAllEbooks } from "@/lib/ebooks";
import { hasAvailableLinks } from "@/lib/ebook-utils";

export default async function Home() {
  const ebooks = await getAllEbooks();
  const availableEbooks = ebooks.filter(hasAvailableLinks);

  return <ClientHome initialEbooks={availableEbooks} />;
}
