import Link from "next/link";

export default function Home() {
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

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));
  const aiCategories = Array.from(new Set(aiTools.map((tool) => tool.category)));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          免费在线工具集合
        </h2>
        <p className="text-lg text-gray-600">
          提供图片处理、编码转换、格式化等免费在线工具
        </p>
      </div>

      {/* AI 工具部分 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          免费AI工具
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{tool.icon}</div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    {tool.description}
                  </p>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded">
                    {tool.category}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 本地工具部分 */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
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
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
