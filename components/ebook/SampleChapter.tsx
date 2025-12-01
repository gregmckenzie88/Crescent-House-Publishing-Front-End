"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SampleChapterProps {
  content: string;
  bookTitle: string;
}

export function SampleChapter({ content, bookTitle }: SampleChapterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 border-t pt-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-6 py-4 text-left transition-colors hover:bg-muted">
          <div>
            <h2 className="text-2xl font-bold">Read Sample First Chapter</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Get a taste of {bookTitle}
            </p>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-muted-foreground transition-transform" />
          ) : (
            <ChevronDown className="h-6 w-6 text-muted-foreground transition-transform" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-6">
          <div className="prose prose-slate dark:prose-invert max-w-none rounded-lg border bg-card p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children, ...props }) => (
                  <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-2xl font-bold mb-3 mt-6" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-xl font-bold mb-2 mt-4" {...props}>
                    {children}
                  </h3>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-7 text-foreground" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="mb-4 ml-6 list-disc" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="mb-4 ml-6 list-decimal" {...props}>
                    {children}
                  </ol>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                code: ({ children, ...props }) => (
                  <code
                    className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                ),
                pre: ({ children, ...props }) => (
                  <pre
                    className="overflow-x-auto rounded-lg bg-muted p-4 mb-4"
                    {...props}
                  >
                    {children}
                  </pre>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

