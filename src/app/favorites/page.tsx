"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // 从 localStorage 读取收藏
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const tools = [
    {
      id: "base64",
      name: "Base64 编码/解码",
      description: "在线 Base64 编码和解码工具",
      icon: "🔐",
      category: "编码转换",
    },
    {
      id: "url",
      name: "URL 编码/解码",
      description: "在线 URL 编码和解码工具",
      icon: "🔗",
      category: "编码转换",
    },
    {
      id: "json",
      name: "JSON 格式化",
      description: "在线 JSON 格式化和验证工具",
      icon: "📝",
      category: "格式化",
    },
    {
      id: "timestamp",
      name: "时间戳转换",
      description: "在线时间戳和日期时间转换工具",
      icon: "⏰",
      category: "时间工具",
    },
    {
      id: "color",
      name: "颜色转换",
      description: "HEX、RGB、HSL 颜色格式转换",
      icon: "🎨",
      category: "颜色工具",
    },
    {
      id: "regex",
      name: "正则表达式测试",
      description: "在线正则表达式测试工具",
      icon: "🔍",
      category: "开发工具",
    },
    {
      id: "qrcode",
      name: "二维码生成",
      description: "在线生成二维码工具",
      icon: "📱",
      category: "生成工具",
    },
    {
      id: "image-compress",
      name: "图片压缩",
      description: "在线图片压缩工具",
      icon: "🖼️",
      category: "图片工具",
    },
    {
      id: "image-crop",
      name: "图片裁剪",
      description: "在线图片裁剪工具",
      icon: "✂️",
      category: "图片工具",
    },
    {
      id: "format-convert",
      name: "格式转换",
      description: "PNG、JPG、WebP 格式转换",
      icon: "🔄",
      category: "图片工具",
    },
    {
      id: "whois",
      name: "WHOIS 查询",
      description: "在线 WHOIS 域名查询工具",
      icon: "🔍",
      category: "站长工具",
    },
    {
      id: "dns",
      name: "DNS 查询",
      description: "在线 DNS 记录查询工具",
      icon: "🌐",
      category: "站长工具",
    },
    {
      id: "ip",
      name: "IP 查询",
      description: "在线 IP 地址查询工具",
      icon: "📍",
      category: "站长工具",
    },
    {
      id: "speed-test",
      name: "网站速度测试",
      description: "在线网站速度测试工具",
      icon: "⚡",
      category: "站长工具",
    },
  ];

  const favoriteTools = tools.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              免费工具站
            </Link>
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
              <Link href="/favorites" className="text-blue-600 hover:text-blue-800 font-semibold">
                我的收藏
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            我的收藏
          </h1>

          {favoriteTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⭐</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                还没有收藏的工具
              </h2>
              <p className="text-gray-600 mb-6">
                去工具列表页面，点击工具卡片上的收藏按钮
              </p>
              <Link
                href="/tools"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                浏览工具
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-yellow-400"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {tool.description}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                        ⭐ 已收藏
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
