"use client";

import { useState } from "react";
import Link from "next/link";

export default function SpeedTestPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTest = async () => {
    if (!url) {
      setError("请输入网址");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const startTime = performance.now();

    try {
      // 使用 fetch 测试网站响应时间
      const response = await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
      });

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      setResult({
        url,
        responseTime,
        status: response.status || "OK",
        timestamp: new Date().toLocaleString("zh-CN"),
      });
    } catch (err) {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      // 即使失败也显示响应时间
      setResult({
        url,
        responseTime,
        status: "Error",
        timestamp: new Date().toLocaleString("zh-CN"),
      });
    } finally {
      setLoading(false);
    }
  };

  const getSpeedLevel = (time: number) => {
    if (time < 200) return { text: "极快", color: "text-green-600" };
    if (time < 500) return { text: "快", color: "text-blue-600" };
    if (time < 1000) return { text: "一般", color: "text-yellow-600" };
    if (time < 2000) return { text: "慢", color: "text-orange-600" };
    return { text: "很慢", color: "text-red-600" };
  };

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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            网站速度测试
          </h1>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              网址
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleTest()}
              />
              <button
                onClick={handleTest}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "测试中..." : "测试"}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Result Section */}
          {result && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                测试结果
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="font-medium text-gray-700">网址：</span>
                  <span className="text-gray-900">{result.url}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">响应时间：</span>
                  <span className="text-gray-900">{result.responseTime} ms</span>
                  <span
                    className={`ml-2 ${getSpeedLevel(result.responseTime).color}`}
                  >
                    ({getSpeedLevel(result.responseTime).text})
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">状态：</span>
                  <span
                    className={
                      result.status === "OK"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {result.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">测试时间：</span>
                  <span className="text-gray-900">{result.timestamp}</span>
                </div>
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 输入网址，点击"测试"按钮</li>
              <li>• 测试结果包括响应时间、状态等信息</li>
              <li>• 响应时间越短，网站速度越快</li>
              <li>• 测试结果仅供参考，实际速度可能因网络环境而异</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
