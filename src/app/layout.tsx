import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-thai-phuoc-dai.vercel.app"),
  title: "Thai Phuoc Dai | Frontend Developer",
  description:
    "Portfolio of Thai Phuoc Dai - Frontend Developer specialized in React, Next.js, Tailwind CSS, and modern web performance.",
  keywords: [
    "Thai Phuoc Dai",
    "Frontend Developer",
    "Next.js Portfolio",
    "React Developer",
    "Tailwind CSS",
  ],
  openGraph: {
    title: "Thai Phuoc Dai | Frontend Developer",
    description:
      "Frontend portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    url: "https://portfolio-thai-phuoc-dai.vercel.app",
    siteName: "Thai Phuoc Dai Portfolio",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Thai Phuoc Dai Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thai Phuoc Dai | Frontend Developer",
    description:
      "Frontend portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    images: ["/og-cover.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
