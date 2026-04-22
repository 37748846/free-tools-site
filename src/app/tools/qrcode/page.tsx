"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default function QrcodePage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
  };

  const handleCopy = async () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    try {
      await navigator.clipboard.writeText(svgString);
      alert("已复制 SVG 到剪贴板");
    } catch (error) {
      alert("复制失败");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          二维码生成
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入文本或 URL
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入要生成二维码的内容"
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 设置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              尺寸
            </label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={128}>128 x 128</option>
              <option value={256}>256 x 256</option>
              <option value={512}>512 x 512</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              容错级别
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              前景色
            </label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              背景色
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 预览 */}
        {text && (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <QRCodeSVG
                ref={svgRef}
                value={text}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                下载 PNG
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                复制 SVG
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 输入文本或 URL 生成二维码</li>
          <li>• 支持自定义尺寸、颜色和容错级别</li>
          <li>• 容错级别：L(7%)、M(15%)、Q(25%)、H(30%)</li>
          <li>• 可下载为 PNG 或复制 SVG 格式</li>
          <li>• 所有处理在本地完成，数据不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
