"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegexPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result: string[] = [];

      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(text)) !== null) {
          result.push(match[0]);
          if (!flags.includes("g")) break;
        }
      } else {
        const match = regex.exec(text);
        if (match) {
          result.push(match[0]);
        }
      }

      setMatches(result);
      setError("");
    } catch (err) {
      setError(`正则表达式错误: ${err instanceof Error ? err.message : String(err)}`);
      setMatches([]);
    }
  };

  const handleLoadSample = () => {
    setPattern("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
    setFlags("g");
    setText("联系我们：support@example.com 或 sales@example.com");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(matches.join("\n"));
      alert("已复制到剪贴板");
    } catch (error) {
      alert("复制失败");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          正则表达式测试
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 正则表达式输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            正则表达式
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="例如: \\b\\w+@\\w+\\.\\w+\\b"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <button
              onClick={handleLoadSample}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              示例
            </button>
          </div>
        </div>

        {/* 标志位 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            标志位
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.includes("g")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFlags(flags + "g");
                  } else {
                    setFlags(flags.replace("g", ""));
                  }
                }}
                className="rounded"
              />
              <span className="text-sm">g (全局)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.includes("i")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFlags(flags + "i");
                  } else {
                    setFlags(flags.replace("i", ""));
                  }
                }}
                className="rounded"
              />
              <span className="text-sm">i (忽略大小写)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={flags.includes("m")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFlags(flags + "m");
                  } else {
                    setFlags(flags.replace("m", ""));
                  }
                }}
                className="rounded"
              />
              <span className="text-sm">m (多行)</span>
            </label>
          </div>
        </div>

        {/* 测试文本 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            测试文本
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入要测试的文本"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        {/* 测试按钮 */}
        <button
          onClick={handleTest}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          测试
        </button>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* 匹配结果 */}
        {matches.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              匹配结果 ({matches.length} 个)
            </label>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-2 bg-green-50 border border-green-200 rounded"
                >
                  <code className="text-sm">{match}</code>
                </div>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              复制所有结果
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 输入正则表达式和测试文本进行匹配测试</li>
          <li>• g: 全局匹配，查找所有匹配项</li>
          <li>• i: 忽略大小写</li>
          <li>• m: 多行模式，^ 和 $ 匹配每行的开始和结束</li>
          <li>• 所有处理在本地完成，数据不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
