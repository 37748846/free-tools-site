"use client";

import { useState } from "react";
import Link from "next/link";

export default function WhoisPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    if (!domain) {
      setError("请输入域名");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 使用免费的 WHOIS API
      const response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${domain}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("查询失败，请稍后重试");
    } finally {
      setLoading(false);
    }
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
            WHOIS 查询
          </h1>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              域名
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleQuery()}
              />
              <button
                onClick={handleQuery}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "查询中..." : "查询"}
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
                查询结果
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {result.registrar && (
                  <div>
                    <span className="font-medium text-gray-700">注册商：</span>
                    <span className="text-gray-900">{result.registrar}</span>
                  </div>
                )}
                {result.registrant && (
                  <div>
                    <span className="font-medium text-gray-700">注册人：</span>
                    <span className="text-gray-900">{result.registrant}</span>
                  </div>
                )}
                {result.created_date && (
                  <div>
                    <span className="font-medium text-gray-700">注册日期：</span>
                    <span className="text-gray-900">{result.created_date}</span>
                  </div>
                )}
                {result.expiry_date && (
                  <div>
                    <span className="font-medium text-gray-700">过期日期：</span>
                    <span className="text-gray-900">{result.expiry_date}</span>
                  </div>
                )}
                {result.nameservers && result.nameservers.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">DNS 服务器：</span>
                    <div className="text-gray-900 mt-1">
                      {result.nameservers.map((ns: string, index: number) => (
                        <div key={index}>{ns}</div>
                      ))}
                    </div>
                  </div>
                )}
                {result.status && result.status.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">状态：</span>
                    <div className="text-gray-900 mt-1">
                      {result.status.map((s: string, index: number) => (
                        <div key={index}>{s}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 输入域名，点击"查询"按钮</li>
              <li>• 查询结果包括注册商、注册人、注册日期等信息</li>
              <li>• 部分域名可能无法查询到详细信息</li>
              <li>• 查询结果仅供参考，以官方信息为准</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
