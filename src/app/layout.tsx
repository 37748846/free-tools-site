import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "免费工具站 - 在线工具集合",
    template: "%s - 免费工具站",
  },
  description: "提供图片处理、编码转换、格式化、站长工具等免费在线工具。支持Base64编码、JSON格式化、二维码生成、WHOIS查询、DNS查询、IP查询等功能。",
  keywords: "在线工具,图片压缩,Base64编码,JSON格式化,二维码生成,WHOIS查询,DNS查询,IP查询,网站速度测试,站长工具,免费工具",
  authors: [{ name: "免费工具站" }],
  creator: "免费工具站",
  publisher: "免费工具站",
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
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://lrbar.com",
    title: "免费工具站 - 在线工具集合",
    description: "提供图片处理、编码转换、格式化、站长工具等免费在线工具",
    siteName: "免费工具站",
  },
  twitter: {
    card: "summary_large_image",
    title: "免费工具站 - 在线工具集合",
    description: "提供图片处理、编码转换、格式化、站长工具等免费在线工具",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-bold text-gray-900">
                  免费工具站
                </h1>
                <nav className="flex space-x-4">
                  <Link href="/" className="text-gray-700 hover:text-gray-900">
                    首页
                  </Link>
                  <Link href="/tools" className="text-gray-700 hover:text-gray-900">
                    工具列表
                  </Link>
                  <Link href="/textbooks" className="text-gray-700 hover:text-gray-900">
                    教材下载
                  </Link>
                  <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                    博客
                  </Link>
                  <Link href="/favorites" className="text-gray-700 hover:text-gray-900">
                    我的收藏
                  </Link>
                  <Link href="/stats" className="text-gray-700 hover:text-gray-900">
                    使用统计
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="bg-white border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-500 text-sm">
                © 2026 免费工具站. 基于 Vercel + Cloudflare Workers + D1
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
