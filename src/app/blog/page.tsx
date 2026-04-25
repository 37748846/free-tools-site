import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// 获取所有文章
function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // 使用 gray-matter 解析 frontmatter
    const { content, data } = parseFrontmatter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      frontmatter: data,
      content,
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

// 简单的 frontmatter 解析器
function parseFrontmatter(content: string) {
  const lines = content.split('\n');
  let frontmatter: any = {};
  let bodyStart = 0;

  if (lines[0] === '---') {
    let i = 1;
    while (i < lines.length && lines[i] !== '---') {
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        frontmatter[key] = value;
      }
      i++;
    }
    bodyStart = i + 1;
  }

  return {
    data: frontmatter,
    content: lines.slice(bodyStart).join('\n').trim(),
  };
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 博客
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            分享技术教程、工具使用指南和实用技巧
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {post.frontmatter.category || '文章'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.frontmatter.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.frontmatter.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.frontmatter.date}</span>
                  <span className="text-blue-600 hover:text-blue-800">
                    阅读更多 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 免费工具站. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
