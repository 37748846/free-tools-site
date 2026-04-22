"use client";

import { useState } from "react";
import Link from "next/link";

export default function JsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError("");
    } catch (err) {
      setError(`JSON 格式错误: ${err instanceof Error ? err.message : String(err)}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (err) {
      setError(`JSON 格式错误: ${err instanceof Error ? err.message : String(err)}`);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("已复制到剪贴板");
    } catch (error) {
      alert("复制失败");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleLoadSample = () => {
    const sample = {
      name: "免费工具站",
      version: "1.0.0",
      features: ["Base64", "URL", "JSON"],
      settings: {
        theme: "light",
        language: "zh-CN"
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          JSON 格式化
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            缩进空格数:
          </label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要格式化的 JSON"
            className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleFormat}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            格式化
          </button>
          <button
            onClick={handleMinify}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            压缩
          </button>
          <button
            onClick={handleLoadSample}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            加载示例
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            清空
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输出
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none font-mono text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            复制结果
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 格式化：将 JSON 格式化为易读的格式</li>
          <li>• 压缩：将 JSON 压缩为一行</li>
          <li>• 支持自定义缩进空格数</li>
          <li>• 所有处理在本地完成，数据不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
