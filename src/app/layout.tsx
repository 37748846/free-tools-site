import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "免费工具站 - 在线工具集合",
  description: "提供图片处理、编码转换、格式化等免费在线工具",
  keywords: "在线工具,图片压缩,Base64编码,JSON格式化,二维码生成",
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
