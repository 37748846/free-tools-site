import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 获取所有文章的 slug
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// 获取单个文章
function getPostBySlug(slug: string) {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // 使用 gray-matter 解析 frontmatter
    const { content, data } = parseFrontmatter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    return null;
  }
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← 返回博客列表
          </Link>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {post.frontmatter.category || '文章'}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.frontmatter.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {post.frontmatter.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>📅 {post.frontmatter.date}</span>
            {post.frontmatter.author && <span>👤 {post.frontmatter.author}</span>}
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8 prose prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 免费工具站. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
