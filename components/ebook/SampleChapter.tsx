"use client";

import { useState, useEffect, useRef } from "react";
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
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const scrollPosRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Restore scroll position when modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Use requestAnimationFrame to ensure layout is computed
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = scrollPosRef.current;
        }
      });
    }
  }, [isOpen]);

  // Reset scroll position when book changes
  useEffect(() => {
    scrollPosRef.current = 0;
  }, [bookTitle]);

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

  // Handle scroll for sticky footer visibility
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      const scrolledToBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      setShowStickyFooter(!scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                {bookTitle}
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
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar"
              onScroll={(e) => {
                scrollPosRef.current = e.currentTarget.scrollTop;
              }}
            >
              <div className="ebook-sample-content max-w-none text-foreground/90">
                <style dangerouslySetInnerHTML={{ __html: `
                  /* Ebook Sample Styles */
                  .ebook-sample-content {
                    font-family: serif; /* Use standard serif for ebook feel */
                    text-align: justify;
                    line-height: 1.5;
                    hyphens: none;
                    -webkit-hyphens: none;
                    -moz-hyphens: none;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                    font-size: 1.25rem; /* 18px base size for readability */
                  }

                  .ebook-sample-content h1,
                  .ebook-sample-content h2,
                  .ebook-sample-content h3,
                  .ebook-sample-content h4,
                  .ebook-sample-content h5,
                  .ebook-sample-content h6 {
                    text-indent: 0;
                    text-align: center;
                    margin-top: 1.6em;
                    margin-bottom: 0.8em;
                    font-weight: bold;
                    page-break-after: avoid;
                    page-break-inside: avoid;
                    -webkit-hyphens: none;
                    hyphens: none;
                    line-height: 135%;
                  }

                  .ebook-sample-content h1 {
                    font-size: 2.0em;
                    line-height: 150%;
                  }

                  .ebook-sample-content h2 {
                    font-size: 1.5em;
                  }

                  .ebook-sample-content h3 {
                    font-size: 1.4em;
                    text-align: left; /* Override center for h3 per original CSS if needed, but 'overrides' said center all. adhering to overrides. */
                    text-align: center; 
                  }
                  
                  /* Original CSS says h3-h6 align left, but overrides say all headings align center. 
                     User said "conform to the style sheet that I have pasted below". 
                     The bottom of the pasted sheet has overrides which select h1..h6 and align center. 
                     I will follow the overrides. */

                  .ebook-sample-content p {
                    text-indent: 1.25em;
                    margin: 0;
                    widows: 2;
                    orphans: 2;
                    text-align: justify;
                  }

                  .ebook-sample-content p.centered {
                    text-indent: 0;
                    margin: 1.0em 0 0 0;
                    text-align: center;
                  }

                  .ebook-sample-content ul,
                  .ebook-sample-content ol {
                    margin: 1em 0 0 2em;
                    text-align: left;
                  }
                  
                  /* Override for lists from bottom of sheet */
                  .ebook-sample-content ul,
                  .ebook-sample-content ol {
                    list-style: none;
                    padding-left: 0;
                    margin-left: 0;
                    text-align: center;
                  }
                  
                  .ebook-sample-content li {
                    text-align: center;
                  }
                  
                  .ebook-sample-content ul li::before,
                  .ebook-sample-content ol li::before {
                    content: none;
                  }

                  .ebook-sample-content img {
                    max-width: 100%;
                  }
                  
                  .ebook-sample-content hr {
                    border: none;
                    height: 0;
                    margin: 2em 0;
                    visibility: hidden;
                  }

                  .ebook-sample-content .italic { font-style: italic; }
                  .ebook-sample-content .bold { font-weight: bold; }
                  
                  /* Helper for ReactMarkdown strong/em */
                  .ebook-sample-content strong { font-weight: bold; }
                  .ebook-sample-content em { font-style: italic; }
                  
                  /* Blockquotes */
                  .ebook-sample-content blockquote {
                    margin: 1em 1.5em 0 1.5em;
                    text-align: left;
                    font-size: 0.9em;
                  }
                `}} />
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Pass through components to strip previous custom styling but keep structure if needed
                    // We rely on CSS for styling now.
                    h1: ({ node, ...props }) => <h1 {...props} />,
                    h2: ({ node, ...props }) => <h2 {...props} />,
                    h3: ({ node, ...props }) => <h3 {...props} />,
                    h4: ({ node, ...props }) => <h4 {...props} />,
                    h5: ({ node, ...props }) => <h5 {...props} />,
                    h6: ({ node, ...props }) => <h6 {...props} />,
                    p: ({ node, ...props }) => <p {...props} />,
                    ul: ({ node, ...props }) => <ul {...props} />,
                    ol: ({ node, ...props }) => <ol {...props} />,
                    li: ({ node, ...props }) => <li {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote {...props} />,
                    hr: ({ node, ...props }) => <hr {...props} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

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
      )}

      {/* Sticky Footer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/20 p-4 transition-transform duration-500 ease-in-out lg:hidden ${
          showStickyFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleOpen}
            className="w-full md:w-auto min-w-[200px] h-12 border-primary/40 text-primary hover:bg-transparent hover:text-primary shadow-lg transition-all uppercase tracking-widest text-xs font-bold"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read First Chapter
          </Button>
        </div>
      </div>
    </div>
  );
}

