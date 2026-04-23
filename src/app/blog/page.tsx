import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "免费域名和收费域名，哪个更划算？",
      date: "2026-04-23",
      description: "最近博主手机一直推送免费域名广告，今天博主对免费与收费域名看法，以及为什么我认为收费域名更具性价比。",
      category: "域名",
    },
    {
      id: 2,
      title: "如何把文件藏在图片里",
      date: "2026-04-22",
      description: "你有没有想过把一些重要的文件隐藏在一张普通的图片里，让别人看不出来呢？这其实是一种简单而有效的加密方法。",
      category: "技术",
    },
    {
      id: 3,
      title: "为什么推荐 IPv6",
      date: "2026-04-21",
      description: "很多网友还在寻找内网穿透，内网穿透是没有外网地址才需要。现在几乎所有宽带运营商都分配外网ipv6，所以才有了这篇文章。",
      category: "网络",
    },
    {
      id: 4,
      title: "推荐使用 zeabur 部署 GitHub 项目",
      date: "2026-04-20",
      description: "原生中文支持，网址：https://www.zeabur.com/，中文文档：https://docs.zeabur.com/zh-CN，vercel。",
      category: "部署",
    },
    {
      id: 5,
      title: "QtScrcpy，它是一款免费的手机投屏神器",
      date: "2026-04-19",
      description: "你是否有过这样的需求，想要在电脑上操作手机，或者在大屏幕上看手机的内容？",
      category: "工具",
    },
    {
      id: 6,
      title: "使用一键部署 newbing-AI 建立自己的 bingai",
      date: "2026-04-18",
      description: "以下为 bingAI 生产文章。你是否经常为了找到合适的图标而苦恼？你是否想要一套可以自由调整样式和颜色的图标库？",
      category: "AI",
    },
    {
      id: 7,
      title: "使用 netlify 一键部署 newbing-AI",
      date: "2026-04-17",
      description: "为什么不使用 vercel，因为 vercel 免费二级域名被污染，netlify 可以直接使用免费的二级域名访问。",
      category: "部署",
    },
    {
      id: 8,
      title: "一个简单的 Github 图床目录页面",
      date: "2026-04-16",
      description: "实现对 Github 图床目录的浏览，预览，还有点击复制图片的 markdown 链接。",
      category: "工具",
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
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold">
                博客
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              博客
            </h1>
            <p className="text-gray-600">
              分享技术文章和学习心得
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 免费工具站. 基于 Vercel + Cloudflare Workers + D1
          </p>
        </div>
      </footer>
    </div>
  );
}
