"use client";

import { useState } from "react";
import Link from "next/link";

export default function FormatConvertPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<
    Array<{ format: string; dataUrl: string; size: number }>
  >([]);
  const [originalSize, setOriginalSize] = useState(0);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    "image/jpeg",
    "image/webp",
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setOriginalSize(file.size);
      setConvertedImages([]);
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const results: Array<{ format: string; dataUrl: string; size: number }> = [];

      selectedFormats.forEach((format) => {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制图片
        ctx.drawImage(img, 0, 0);

        // 转换格式
        const dataUrl = canvas.toDataURL(format, 0.9);

        // 计算大小
        const base64Length = dataUrl.length - (dataUrl.indexOf(",") + 1);
        const padding = (dataUrl.length - base64Length) * 0.75;
        const size = Math.floor((base64Length * 0.75) + padding);

        results.push({
          format,
          dataUrl,
          size,
        });
      });

      setConvertedImages(results);
    };

    img.src = originalImage;
  };

  const handleDownload = (dataUrl: string, format: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `converted.${format.split("/")[1]}`;
    link.click();
  };

  const handleFormatToggle = (format: string) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setConvertedImages([]);
    setOriginalSize(0);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFormatName = (format: string) => {
    const names: Record<string, string> = {
      "image/jpeg": "JPEG",
      "image/png": "PNG",
      "image/webp": "WebP",
    };
    return names[format] || format;
  };

  const calculateSizeReduction = (original: number, converted: number) => {
    if (original === 0) return 0;
    return Math.round(((original - converted) / original) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          格式转换
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
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 转换设置 */}
        {originalImage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择输出格式
              </label>
              <div className="space-y-2">
                {["image/jpeg", "image/png", "image/webp"].map((format) => (
                  <label key={format} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(format)}
                      onChange={() => handleFormatToggle(format)}
                      className="rounded"
                    />
                    <span className="text-sm">{getFormatName(format)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleConvert}
                disabled={selectedFormats.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                开始转换
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

        {/* 原图预览 */}
        {originalImage && (
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
        )}

        {/* 转换结果 */}
        {convertedImages.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">转换结果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {convertedImages.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img
                    src={item.dataUrl}
                    alt={getFormatName(item.format)}
                    className="w-full h-auto"
                  />
                  <div className="p-3 space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      {getFormatName(item.format)}
                    </p>
                    <p className="text-sm text-gray-600">
                      大小: {formatSize(item.size)}
                    </p>
                    {item.size < originalSize && (
                      <p className="text-sm text-green-600">
                        压缩率: {calculateSizeReduction(originalSize, item.size)}%
                      </p>
                    )}
                    <button
                      onClick={() => handleDownload(item.dataUrl, item.format)}
                      className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      下载
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 支持 PNG、JPG、WebP 之间的格式转换</li>
          <li>• 可同时转换为多种格式</li>
          <li>• WebP 格式通常有更好的压缩效果</li>
          <li>• 转换质量默认为 90%</li>
          <li>• 所有处理在本地完成，图片不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
