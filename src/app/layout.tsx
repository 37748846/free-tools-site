import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "免费工具站 - 在线工具集合",
    template: "%s - 免费工具站",
  },
  description: "提供图片处理、编码转换、格式化等免费在线工具。支持Base64编码、JSON格式化、二维码生成等功能。",
  keywords: "在线工具,图片压缩,Base64编码,JSON格式化,二维码生成,免费工具",
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
    description: "提供图片处理、编码转换、格式化等免费在线工具",
    siteName: "免费工具站",
  },
  twitter: {
    card: "summary_large_image",
    title: "免费工具站 - 在线工具集合",
    description: "提供图片处理、编码转换、格式化等免费在线工具",
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
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
