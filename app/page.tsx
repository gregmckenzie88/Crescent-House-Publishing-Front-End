import { EbookList } from "@/components/ebook/EbookList";
import { getAllEbooks } from "@/lib/ebooks";

export default async function Home() {
  const ebooks = await getAllEbooks();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col items-center justify-center mb-8 gap-4">
               <span className="text-primary font-display font-bold text-sm md:text-base uppercase tracking-[0.25em]">Crescent House Publishing</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Love, Lust, and <br />
              Everything Between.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed font-serif italic">
              Stories that ignite the imagination and stir the soul.
            </p>
          </div>
        </div>
      </section>

      {/* E-books Listing */}
      <section className="container mx-auto px-4 py-16 md:py-24 border-t border-border/30">
        <div className="mb-16 text-center">
          <h3 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">The Collection</h3>
          <div className="w-24 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
        
        <EbookList initialEbooks={ebooks} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-lg font-serif font-bold text-foreground">Crescent House Publishing</span>
              <p className="text-sm text-muted-foreground">
                © 2025 All rights reserved.
              </p>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground uppercase tracking-wider">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
