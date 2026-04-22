import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            免费工具站
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            提供图片处理、编码转换、格式化等免费在线工具
            <br />
            所有处理在本地完成，数据不会上传到服务器
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/tools"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始使用
            </Link>
            <a
              href="https://github.com/37748846/free-tools-site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            为什么选择我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                数据安全
              </h3>
              <p className="text-gray-600">
                所有处理在本地完成，数据不会上传到服务器
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                快速高效
              </h3>
              <p className="text-gray-600">
                基于现代浏览器技术，处理速度快
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                完全免费
              </h3>
              <p className="text-gray-600">
                所有工具永久免费，无需注册
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            热门工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/tools/image-compress"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                图片压缩
              </h3>
              <p className="text-gray-600">
                在线图片压缩工具，支持 JPG、PNG、WebP 格式
              </p>
            </Link>
            <Link
              href="/tools/base64"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Base64 编码/解码
              </h3>
              <p className="text-gray-600">
                在线 Base64 编码和解码工具
              </p>
            </Link>
            <Link
              href="/tools/json"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                JSON 格式化
              </h3>
              <p className="text-gray-600">
                在线 JSON 格式化和验证工具
              </p>
            </Link>
            <Link
              href="/tools/qrcode"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                二维码生成
              </h3>
              <p className="text-gray-600">
                在线生成二维码工具
              </p>
            </Link>
            <Link
              href="/tools/timestamp"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                时间戳转换
              </h3>
              <p className="text-gray-600">
                在线时间戳和日期时间转换工具
              </p>
            </Link>
            <Link
              href="/tools/color"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                颜色转换
              </h3>
              <p className="text-gray-600">
                HEX、RGB、HSL 颜色格式转换
              </p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              查看所有工具 →
            </Link>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            免费AI工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ChatGPT
              </h3>
              <p className="text-gray-600">
                OpenAI 的 AI 聊天助手
              </p>
            </a>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Claude
              </h3>
              <p className="text-gray-600">
                Anthropic 的 AI 助手
              </p>
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gemini
              </h3>
              <p className="text-gray-600">
                Google 的 AI 助手
              </p>
            </a>
            <a
              href="https://www.deepseek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🔎</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                DeepSeek
              </h3>
              <p className="text-gray-600">
                国产 AI 搜索引擎
              </p>
            </a>
            <a
              href="https://www.perplexity.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Perplexity
              </h3>
              <p className="text-gray-600">
                AI 驱动的搜索引擎
              </p>
            </a>
            <a
              href="https://huggingface.co"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🤗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hugging Face
              </h3>
              <p className="text-gray-600">
                开源 AI 模型平台
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            立即开始使用
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            无需注册，完全免费，立即体验
          </p>
          <Link
            href="/tools"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始使用
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">关于我们</h3>
              <p className="text-gray-400">
                免费工具站提供图片处理、编码转换、格式化等免费在线工具
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tools" className="text-gray-400 hover:text-white">
                    工具列表
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/37748846/free-tools-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <p className="text-gray-400">
                如有问题或建议，欢迎通过 GitHub 联系我们
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 免费工具站. 基于 Vercel + Cloudflare Workers + D1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
