"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageCompressPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setOriginalSize(file.size);
      setCompressedImage(null);
      setCompressedSize(0);
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!originalImage) return;

    setIsCompressing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const compressedDataUrl = canvas.toDataURL(format, quality);
      setCompressedImage(compressedDataUrl);

      // 计算压缩后的大小
      const base64Length = compressedDataUrl.length - (compressedDataUrl.indexOf(",") + 1);
      const padding = (compressedDataUrl.length - base64Length) * 0.75;
      const size = Math.floor((base64Length * 0.75) + padding);
      setCompressedSize(size);

      setIsCompressing(false);
    };

    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed.${format.split("/")[1]}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const calculateCompressionRatio = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          图片压缩
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 文件选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择图片
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 压缩设置 */}
        {originalImage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                压缩质量: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输出格式
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png" | "image/webp")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isCompressing ? "压缩中..." : "开始压缩"}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                重置
              </button>
            </div>
          </div>
        )}

        {/* 原图和压缩后对比 */}
        {originalImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 原图 */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">原图</h3>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={originalImage}
                  alt="原图"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-600">
                大小: {formatSize(originalSize)}
              </p>
            </div>

            {/* 压缩后 */}
            {compressedImage && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">压缩后</h3>
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={compressedImage}
                    alt="压缩后"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  大小: {formatSize(compressedSize)}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  压缩率: {calculateCompressionRatio()}%
                </p>
                <button
                  onClick={handleDownload}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  下载压缩后的图片
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 支持 JPG、PNG、WebP 等常见图片格式</li>
          <li>• 可调节压缩质量（10%-100%）</li>
          <li>• 可选择输出格式（JPEG、PNG、WebP）</li>
          <li>• WebP 格式通常有更好的压缩效果</li>
          <li>• 所有处理在本地完成，图片不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
