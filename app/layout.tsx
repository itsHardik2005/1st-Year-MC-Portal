import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "1ST YEAR MC // NEO-BRUTALIST STUDY PORTAL",
  description: "Raw, high-security study portal for first-year college students featuring dynamic email watermarking, unlisted YouTube video lectures, and auto-expiring signed PDF vaults.",
  keywords: ["1st Year College", "Study Portal", "Supabase Auth", "Neo-Brutalism", "PDF Watermark", "Signed URLs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} overflow-x-hidden`}>
      <body className="font-sans antialiased bg-[#fefce8] text-black min-h-screen flex flex-col justify-between selection:bg-pink-500 selection:text-white border-x-2 sm:border-x-4 border-black overflow-x-hidden">
        <Suspense fallback={<div className="h-20 w-full border-b-4 border-black bg-yellow-400" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
