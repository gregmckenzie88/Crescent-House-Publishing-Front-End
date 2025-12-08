import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Outfit, Marcellus } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crescenthousepublishing.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Crescent House Publishing | Curated Erotica & Romance",
    template: "%s | Crescent House Publishing",
  },
  description: "Discover curated erotica and romance novels at Crescent House Publishing. Featuring spicy romance books, adult romance novels, and steamy ebooks for every reader.",
  keywords: [
    "romance ebooks",
    "erotic romance books",
    "adult romance novels",
    "spicy romance books",
    "steamy romance ebooks",
    "romance books online",
    "erotic fiction",
  ],
  openGraph: {
    title: "Crescent House Publishing",
    description: "Curated Erotica & Romance",
    url: "https://crescenthousepublishing.com",
    siteName: "Crescent House Publishing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crescent House Publishing",
    description: "Curated Erotica & Romance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${marcellus.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
