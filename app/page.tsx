import { EbookList } from "@/components/ebook/EbookList";
import { getAllEbooks } from "@/lib/ebooks";

export default async function Home() {
  const ebooks = await getAllEbooks();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CH</span>
            </div>
            <h1 className="text-xl font-bold">Crescent House Publishing</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browse</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            Discover Your Next Great Read
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our curated collection of e-books spanning fiction, non-fiction, and everything in between.
          </p>
        </div>
      </section>

      {/* E-books Listing */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-2">Our E-books</h3>
          <p className="text-muted-foreground">Browse our complete collection</p>
        </div>
        
        <EbookList initialEbooks={ebooks} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Crescent House Publishing. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
