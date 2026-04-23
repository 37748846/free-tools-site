"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [datetime, setDatetime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("zh-CN"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimestampToDatetime = () => {
    try {
      const ts = parseInt(timestamp, 10);
      if (isNaN(ts)) {
        alert("请输入有效的时间戳");
        return;
      }

      const date = new Date(ts * 1000);
      setDatetime(date.toLocaleString("zh-CN"));
    } catch {
      alert("转换失败");
    }
  };

  const handleDatetimeToTimestamp = () => {
    try {
      const date = new Date(datetime);
      if (isNaN(date.getTime())) {
        alert("请输入有效的日期时间");
        return;
      }

      const ts = Math.floor(date.getTime() / 1000);
      setTimestamp(ts.toString());
    } catch {
      alert("转换失败");
    }
  };

  const handleCopyTimestamp = async () => {
    try {
      await navigator.clipboard.writeText(timestamp);
      alert("已复制时间戳");
    } catch {
      alert("复制失败");
    }
  };

  const handleCopyDatetime = async () => {
    try {
      await navigator.clipboard.writeText(datetime);
      alert("已复制日期时间");
    } catch {
      alert("复制失败");
    }
  };

  const handleSetCurrentTimestamp = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
  };

  const handleSetCurrentDatetime = () => {
    setDatetime(new Date().toLocaleString("zh-CN"));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          时间戳转换
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          当前时间: <span className="font-semibold">{currentTime}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 时间戳转日期时间 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            时间戳 → 日期时间
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时间戳（秒）
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="例如: 1713792000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSetCurrentTimestamp}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                当前
              </button>
            </div>
          </div>
          <button
            onClick={handleTimestampToDatetime}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            转换
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日期时间
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={datetime}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
              <button
                onClick={handleCopyDatetime}
                disabled={!datetime}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                复制
              </button>
            </div>
          </div>
        </div>

        <hr />

        {/* 日期时间转时间戳 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            日期时间 → 时间戳
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日期时间
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                placeholder="例如: 2024-04-22 12:00:00"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSetCurrentDatetime}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                当前
              </button>
            </div>
          </div>
          <button
            onClick={handleDatetimeToTimestamp}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            转换
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时间戳（秒）
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={timestamp}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
              <button
                onClick={handleCopyTimestamp}
                disabled={!timestamp}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                复制
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 时间戳：从 1970-01-01 00:00:00 UTC 开始的秒数</li>
          <li>• 支持秒级时间戳（10位数字）</li>
          <li>• 日期时间格式：YYYY-MM-DD HH:mm:ss</li>
          <li>• 所有处理在本地完成，数据不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
