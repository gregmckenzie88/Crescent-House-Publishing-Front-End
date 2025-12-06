import { Analytics } from "@vercel/analytics/react";
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
  title: "Crescent House Publishing",
  description: "Curated Erotica & Romance",
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
      </body>
    </html>
  );
}
