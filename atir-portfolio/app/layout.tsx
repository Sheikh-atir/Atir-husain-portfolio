import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Atir Husain — Video Editor | Podcast & Short-form Specialist",
  description:
    "Professional video editor specializing in podcast editing, short-form reels, motion graphics, and cinematic storytelling. Currently at Oregano Brandworks, Mumbai.",
  keywords: [
    "video editor",
    "podcast editor",
    "short form content",
    "motion graphics",
    "Atir Husain",
    "Mumbai video editor",
    "reels editor",
    "YouTube editor",
  ],
  authors: [{ name: "Atir Husain" }],
  creator: "Atir Husain",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://atirhusain.com",
    title: "Atir Husain — Video Editor",
    description:
      "Crafting stories through motion. Podcast Editor • Short-form Specialist • Motion Graphics Editor",
    siteName: "Atir Husain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atir Husain — Video Editor",
    description: "Crafting stories through motion.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect for YouTube embeds */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Netlify CDN — video files are served from here */}
        <link rel="preconnect" href="https://atirhusain.netlify.app" crossOrigin="anonymous" />
        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="/assets/hero-image.png"
          fetchPriority="high"
        />
        {/* Preload first reel video (20MB — smallest, loads fast) */}
        <link
          rel="preload"
          as="video"
          href="/assets/dr-shipra.mp4"
          type="video/mp4"
        />
      </head>
      <body className="bg-background text-white antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
