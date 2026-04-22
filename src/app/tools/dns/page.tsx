"use client";

import { useState } from "react";
import Link from "next/link";

export default function DnsPage() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const recordTypes = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "SOA"];

  const handleQuery = async () => {
    if (!domain) {
      setError("请输入域名");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 使用 Google DNS API
      const response = await fetch(
        `https://dns.google/resolve?name=${domain}&type=${recordType}`
      );
      const data = await response.json();

      if (data.Status !== 0) {
        setError("查询失败，请检查域名是否正确");
      } else if (!data.Answer) {
        setError("未找到相关记录");
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
            DNS 查询
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
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {recordTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
          {result && result.Answer && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                查询结果
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        名称
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        类型
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        TTL
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        值
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.Answer.map((record: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-3 text-gray-900">{record.name}</td>
                        <td className="py-2 px-3 text-gray-900">{record.type}</td>
                        <td className="py-2 px-3 text-gray-900">{record.TTL}</td>
                        <td className="py-2 px-3 text-gray-900">{record.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 输入域名，选择记录类型，点击"查询"按钮</li>
              <li>• 支持的记录类型：A、AAAA、CNAME、MX、NS、TXT、SOA</li>
              <li>• 查询结果包括记录名称、类型、TTL 和值</li>
              <li>• 使用 Google DNS API 进行查询</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
