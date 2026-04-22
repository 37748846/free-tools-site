"use client";

import { useState } from "react";
import Link from "next/link";

export default function ColorPage() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHsl(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    }
  };

  const handleRgbChange = (value: string) => {
    setRgb(value);
    const match = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      setHex(rgbToHex(r, g, b));
      const hsl = rgbToHsl(r, g, b);
      setHsl(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    }
  };

  const handleHslChange = (value: string) => {
    setHsl(value);
    const match = value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      const rgb = hslToRgb(h, s, l);
      setRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("已复制到剪贴板");
    } catch (error) {
      alert("复制失败");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          颜色转换
        </h2>
        <Link
          href="/tools"
          className="text-blue-600 hover:text-blue-800"
        >
          返回工具列表
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* 颜色预览 */}
        <div className="flex items-center space-x-4">
          <div
            className="w-24 h-24 rounded-lg border-2 border-gray-300"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1 space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">HEX:</span> {hex}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">RGB:</span> {rgb}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">HSL:</span> {hsl}
            </p>
          </div>
        </div>

        {/* HEX 输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            HEX
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleCopy(hex)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              复制
            </button>
          </div>
        </div>

        {/* RGB 输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RGB
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={rgb}
              onChange={(e) => handleRgbChange(e.target.value)}
              placeholder="rgb(0, 0, 0)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleCopy(rgb)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              复制
            </button>
          </div>
        </div>

        {/* HSL 输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            HSL
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={hsl}
              onChange={(e) => handleHslChange(e.target.value)}
              placeholder="hsl(0, 0%, 0%)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleCopy(hsl)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              复制
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• HEX：十六进制颜色格式，例如 #FF0000</li>
          <li>• RGB：红绿蓝颜色格式，例如 rgb(255, 0, 0)</li>
          <li>• HSL：色相饱和度亮度格式，例如 hsl(0, 100%, 50%)</li>
          <li>• 输入任意一种格式，自动转换为其他格式</li>
          <li>• 所有处理在本地完成，数据不会上传到服务器</li>
        </ul>
      </div>
    </div>
  );
}
