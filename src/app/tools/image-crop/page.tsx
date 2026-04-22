"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ImageCropPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setCroppedImage(null);

      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        // 初始化裁剪区域为图片中心
        const size = Math.min(img.width, img.height) * 0.8;
        setCropArea({
          x: (img.width - size) / 2,
          y: (img.height - size) / 2,
          width: size,
          height: size,
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!originalImage) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 检查是否点击在裁剪区域内
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !originalImage) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;

    // 限制裁剪区域在图片范围内
    const newX = Math.max(0, Math.min(x, imageSize.width - cropArea.width));
    const newY = Math.max(0, Math.min(y, imageSize.height - cropArea.height));

    setCropArea({ ...cropArea, x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 创建新的 canvas 用于裁剪
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    if (!cropCtx) return;

    cropCanvas.width = cropArea.width;
    cropCanvas.height = cropArea.height;

    // 绘制裁剪后的图片
    const img = new Image();
    img.onload = () => {
      cropCtx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      setCroppedImage(cropCanvas.toDataURL("image/png"));
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!croppedImage) return;

    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "cropped.png";
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setCropArea({ x: 0, y: 0, width: 200, height: 200 });
    setImageSize({ width: 0, height: 0 });
  };

  useEffect(() => {
    const drawCanvas = () => {
      if (!canvasRef.current || !originalImage) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 设置 canvas 大小
      canvas.width = imageSize.width;
      canvas.height = imageSize.height;

      // 绘制原图
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // 绘制裁剪区域
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // 绘制半透明遮罩
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 清除裁剪区域的遮罩
        ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height
        );
      };
      img.src = originalImage;
    };

    drawCanvas();
  }, [originalImage, cropArea, imageSize]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          图片裁剪
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

        {/* 裁剪区域 */}
        {originalImage && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-auto cursor-move"
                style={{ maxWidth: "100%" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  裁剪宽度
                </label>
                <input
                  type="number"
                  value={Math.round(cropArea.width)}
                  onChange={(e) =>
                    setCropArea({ ...cropArea, width: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  裁剪高度
                </label>
                <input
                  type="number"
                  value={Math.round(cropArea.height)}
                  onChange={(e) =>
                    setCropArea({ ...cropArea, height: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                裁剪
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

        {/* 裁剪结果 */}
        {croppedImage && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">裁剪结果</h3>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={croppedImage}
                alt="裁剪后"
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={handleDownload}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              下载裁剪后的图片
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 上传图片后，拖动虚线框选择裁剪区域</li>
          <li>• 可手动输入裁剪宽度和高度</li>
          <li>• 点击&ldquo;裁剪&rdquo;按钮生成裁剪后的图片</li>
          <li>• 支持下载 PNG 格式的裁剪图片</li>
          <li>• 所有处理在本地完成，图片不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
