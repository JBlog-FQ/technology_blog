import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetadataHelper from "@/components/shared/MetadataHelper";
import { GeistSans, GeistMono } from 'geist/font';
import PrismHighlight from '@/components/PrismHighlight';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  title: '技术博客',
  description: '分享前端和全栈技术文章、教程和最佳实践',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // 获取保存的主题或使用系统偏好
              var savedTheme = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = savedTheme || (prefersDark ? 'dark' : 'light');
              
              // 应用暗色模式类名
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `
        }} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col bg-background dark:bg-background text-foreground dark:text-foreground transition-theme`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MetadataHelper preloadPaths={['/blog', '/']} />
        <PrismHighlight />
      </body>
    </html>
  );
}
