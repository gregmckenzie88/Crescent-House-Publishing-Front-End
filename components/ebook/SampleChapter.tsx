"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";

interface SampleChapterProps {
  content: string;
  bookTitle: string;
  amazonLink?: string | null;
}

export function SampleChapter({ content, bookTitle, amazonLink }: SampleChapterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    track("open_sample_chapter", { book: bookTitle });
    setIsOpen(true);
  };

  const handleAmazonClick = () => {
    track("click_buy_link", { 
      provider: "Amazon", 
      book: bookTitle,
      location: "sample_modal" 
    });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleOpen}
          className="h-14 px-8 border-primary/40 text-primary hover:bg-transparent hover:text-primary transition-all uppercase tracking-widest text-sm font-medium"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Read First Chapter
        </Button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300 p-4 md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-card border border-border/40 shadow-2xl rounded-lg flex flex-col max-h-full relative overflow-hidden animate-in zoom-in-95 duration-300 slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Reading Sample
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="rounded-full h-8 w-8 hover:bg-primary/10 hover:text-primary"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
              <div className="prose prose-invert prose-lg max-w-none font-serif leading-loose text-foreground/90 prose-headings:font-display prose-headings:font-medium prose-p:text-lg prose-p:leading-8 prose-blockquote:border-primary/50 prose-blockquote:text-primary/80 prose-blockquote:italic">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children, ...props }) => (
                      <div className="text-center mb-12 mt-4">
                        <span className="block text-xs uppercase tracking-[0.3em] text-primary mb-3 font-sans font-medium">
                          {bookTitle}
                        </span>
                        <h1 className="text-3xl md:text-4xl mb-4" {...props}>
                          {children}
                        </h1>
                        <div className="w-12 h-0.5 bg-primary/30 mx-auto rounded-full" />
                      </div>
                    ),
                    h2: ({ children, ...props }) => (
                      <h2 className="text-2xl mt-12 mb-6 text-center italic" {...props}>
                        {children}
                      </h2>
                    ),
                    h4: ({ children, ...props }) => (
                      <div className="my-10 text-center text-primary/40 text-xl font-medium tracking-widest">
                        {children}
                      </div>
                    ),
                    p: ({ children, ...props }) => (
                      <p className="mb-6 text-[1.05rem] md:text-[1.125rem] leading-[1.8]" {...props}>
                        {children}
                      </p>
                    ),
                    strong: ({ children, ...props }) => (
                      <strong className="font-bold text-primary" {...props}>
                        {children}
                      </strong>
                    ),
                    hr: ({ ...props }) => (
                      <div className="my-10 text-center text-primary/40 text-xl">
                        ***
                      </div>
                    )
                  }}
                >
                  {content}
                </ReactMarkdown>
                
                <div className="text-center mt-16 pt-8 border-t border-border/20">
                  <p className="text-base text-muted-foreground italic mb-6 font-serif">
                    Enjoyed the preview?
                  </p>
                  {amazonLink ? (
                    <Button 
                      asChild
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-transparent hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs h-10 px-6 font-sans"
                    >
                      <a 
                        href={amazonLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleAmazonClick}
                      >
                        View on Amazon
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="border-primary/30 text-primary hover:bg-transparent hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs h-10 px-6 font-sans"
                    >
                      Close Preview
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

