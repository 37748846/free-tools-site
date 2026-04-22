"use client";

import { useState } from "react";
import Link from "next/link";

export default function IpPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    if (!ip) {
      setError("请输入IP地址");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 使用免费的 IP API
      const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
      const data = await response.json();

      if (data.status === "fail") {
        setError(data.message || "查询失败");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("查询失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleGetMyIp = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
      await handleQuery();
    } catch (err) {
      setError("获取IP失败");
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
            IP 查询
          </h1>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP 地址
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="8.8.8.8"
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
              <button
                onClick={handleGetMyIp}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                获取我的IP
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
                <div>
                  <span className="font-medium text-gray-700">IP 地址：</span>
                  <span className="text-gray-900">{result.query}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">国家：</span>
                  <span className="text-gray-900">{result.country}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">地区：</span>
                  <span className="text-gray-900">{result.regionName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">城市：</span>
                  <span className="text-gray-900">{result.city}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ISP：</span>
                  <span className="text-gray-900">{result.isp}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">组织：</span>
                  <span className="text-gray-900">{result.org}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">时区：</span>
                  <span className="text-gray-900">{result.timezone}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">经纬度：</span>
                  <span className="text-gray-900">
                    {result.lat}, {result.lon}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Usage Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 输入IP地址，点击"查询"按钮</li>
              <li>• 点击"获取我的IP"可以查看当前设备的IP信息</li>
              <li>• 查询结果包括国家、地区、城市、ISP等信息</li>
              <li>• 查询结果仅供参考，以官方信息为准</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
