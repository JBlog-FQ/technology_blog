import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetadataHelper from "@/components/shared/MetadataHelper";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import PrismHighlight from '@/components/common/PrismHighlight';

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
    default: '技术博客',
    template: '%s | 技术博客',
  },
  description: '分享开发技术、编程经验和个人见解的技术博客',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
};

const GeistSansClass = GeistSans.className;
const GeistMonoClass = GeistMono.className;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${GeistSansClass} ${GeistMonoClass} scroll-smooth`} suppressHydrationWarning>
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
      <body className="transition-theme">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MetadataHelper preloadPaths={['/blog', '/']} />
            <PrismHighlight />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
