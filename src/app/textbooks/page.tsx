import Link from "next/link";

export default function TextbooksPage() {
  const categories = [
    {
      id: "primary",
      name: "小学教材",
      description: "小学1-6年级各科教材",
      icon: "📚",
      subjects: ["语文", "数学", "英语", "科学", "道德与法治"],
    },
    {
      id: "junior",
      name: "初中教材",
      description: "初中7-9年级各科教材",
      icon: "📖",
      subjects: ["语文", "数学", "英语", "物理", "化学", "生物", "历史", "地理", "政治"],
    },
    {
      id: "senior",
      name: "高中教材",
      description: "高中10-12年级各科教材",
      icon: "📕",
      subjects: ["语文", "数学", "英语", "物理", "化学", "生物", "历史", "地理", "政治"],
    },
    {
      id: "university",
      name: "大学教材",
      description: "大学各专业教材",
      icon: "🎓",
      subjects: ["计算机", "数学", "物理", "化学", "经济", "管理", "文学", "法学"],
    },
  ];

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
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            免费教材下载
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            提供小学、初中、高中、大学各科教材PDF下载
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700 mb-2">
              <strong>数据来源：</strong>
              <a
                href="https://github.com/TapXWorld/ChinaTextbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                ChinaTextbook GitHub 仓库
              </a>
            </p>
            <p className="text-sm text-gray-700">
              <strong>Star数：</strong> 70,236+ | <strong>Fork数：</strong> 15,704+
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            教材分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start mb-4">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            下载方式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                方式1：GitHub 下载
              </h3>
              <p className="text-gray-600 mb-4">
                直接从 GitHub 仓库下载完整的教材文件
              </p>
              <a
                href="https://github.com/TapXWorld/ChinaTextbook"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                访问 GitHub 仓库
              </a>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                方式2：Git 克隆
              </h3>
              <p className="text-gray-600 mb-4">
                使用 Git 命令克隆整个仓库到本地
              </p>
              <code className="block bg-gray-800 text-white p-4 rounded-lg text-sm">
                git clone https://github.com/TapXWorld/ChinaTextbook.git
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ⚠️ 使用说明
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 教材文件仅供个人学习使用，请勿用于商业用途</li>
              <li>• 仓库大小约 43.5GB，下载需要较长时间</li>
              <li>• 建议使用 Git 克隆或下载 ZIP 压缩包</li>
              <li>• 如遇到下载问题，请检查网络连接</li>
              <li>• 教材内容来源于 ChinaTextbook 仓库，本站仅提供下载指引</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 免费工具站. 教材数据来源于
            <a
              href="https://github.com/TapXWorld/ChinaTextbook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              ChinaTextbook
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
