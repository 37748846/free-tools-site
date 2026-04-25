"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            在线工具站
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              首页
            </Link>
            <Link href="/tools" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              在线工具
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              博客
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="切换暗色模式"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
