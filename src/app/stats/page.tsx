"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StatsPage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    // 从 localStorage 读取统计
    const saved = localStorage.getItem("toolStats");
    if (saved) {
      setStats(JSON.parse(saved));
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

  // 按使用次数排序
  const sortedTools = tools
    .map((tool) => ({
      ...tool,
      count: stats[tool.id] || 0,
    }))
    .sort((a, b) => b.count - a.count);

  // 计算总使用次数
  const totalUsage = Object.values(stats).reduce((sum, count) => sum + count, 0);

  // 获取前5个热门工具
  const topTools = sortedTools.slice(0, 5);

  // 按分类统计
  const categoryStats = tools.reduce((acc, tool) => {
    const count = stats[tool.id] || 0;
    acc[tool.category] = (acc[tool.category] || 0) + count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* 总体统计 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                使用统计
              </h1>
              <Link
                href="/tools"
                className="text-blue-600 hover:text-blue-800"
              >
                返回工具列表
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {totalUsage}
                </div>
                <div className="text-gray-700">总使用次数</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {tools.length}
                </div>
                <div className="text-gray-700">工具总数</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {Object.keys(stats).length}
                </div>
                <div className="text-gray-700">已使用工具</div>
              </div>
            </div>
          </div>

          {/* 热门工具 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔥 热门工具
            </h2>
            {topTools.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                暂无使用数据
              </div>
            ) : (
              <div className="space-y-4">
                {topTools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl font-bold text-blue-600">
                          #{index + 1}
                        </div>
                        <div className="text-3xl">{tool.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {tool.count}
                        </div>
                        <div className="text-sm text-gray-600">次使用</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 分类统计 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📊 分类统计
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div
                  key={category}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">
                      {category}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${totalUsage > 0 ? (count / totalUsage) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {totalUsage > 0
                      ? `${((count / totalUsage) * 100).toFixed(1)}%`
                      : "0%"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 所有工具统计 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📈 所有工具统计
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{tool.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {tool.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                          {tool.category}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {tool.count} 次
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
