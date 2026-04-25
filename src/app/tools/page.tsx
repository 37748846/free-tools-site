"use client";

import { useState } from "react";
import Link from "next/link";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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
  ];

  const aiTools = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "OpenAI 的 AI 聊天助手",
      icon: "🤖",
      category: "AI 聊天",
      url: "https://chat.openai.com",
      external: true,
    },
    {
      id: "claude",
      name: "Claude",
      description: "Anthropic 的 AI 助手",
      icon: "🧠",
      category: "AI 聊天",
      url: "https://claude.ai",
      external: true,
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "Google 的 AI 助手",
      icon: "✨",
      category: "AI 聊天",
      url: "https://gemini.google.com",
      external: true,
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      description: "国产 AI 搜索引擎",
      icon: "🔎",
      category: "AI 搜索",
      url: "https://www.deepseek.com",
      external: true,
    },
    {
      id: "perplexity",
      name: "Perplexity",
      description: "AI 驱动的搜索引擎",
      icon: "🔍",
      category: "AI 搜索",
      url: "https://www.perplexity.ai",
      external: true,
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "开源 AI 模型平台",
      icon: "🤗",
      category: "AI 模型",
      url: "https://huggingface.co",
      external: true,
    },
  ];

  // 过滤工具
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAiTools = aiTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 切换暗色模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <div className={`space-y-6 ${darkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          工具列表
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? '☀️ 亮色' : '🌙 暗色'}
          </button>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            返回首页
          </Link>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          placeholder="搜索工具..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap justify-center gap-4">
          <a
            href="#ai-tools"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🤖 AI工具
          </a>
          <a
            href="#webmaster-tools"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🔧 站长工具
          </a>
          <a
            href="#local-tools"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🛠️ 本地工具
          </a>
        </nav>
      </div>

      {/* AI 工具部分 */}
      <div id="ai-tools" className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          免费AI工具
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAiTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{tool.icon}</div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-900 rounded">
                      {tool.category}
                    </span>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded">
                      外部链接
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 站长工具部分 */}
      <div id="webmaster-tools" className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <span className="mr-2">🔧</span>
          站长工具
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools
            .filter((tool) => tool.category === "站长工具")
            .map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">{tool.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {tool.description}
                    </p>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium text-orange-800 dark:text-orange-200 bg-orange-100 dark:bg-orange-900 rounded">
                      {tool.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* 本地工具部分 */}
      <div id="local-tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{tool.icon}</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {tool.description}
                </p>
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded">
                  {tool.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
