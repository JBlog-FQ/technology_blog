import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetadataHelper from "@/components/shared/MetadataHelper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | 个人技术博客',
    default: '个人技术博客',
  },
  description: "分享技术知识、经验和见解的个人博客",
  applicationName: '个人技术博客',
  authors: [{ name: '博主' }],
  generator: 'Next.js',
  keywords: ['技术博客', 'Web开发', 'React', 'Next.js'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MetadataHelper preloadPaths={['/blog', '/']} />
      </body>
    </html>
  );
}
