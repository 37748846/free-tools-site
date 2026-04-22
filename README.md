# 免费工具站

基于 Vercel + Cloudflare Workers + D1 的免费工具站项目

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **托管**: Vercel
- **API**: Cloudflare Workers
- **数据库**: Cloudflare D1

## 项目目标

- 月流量: 10万-50万
- 月收入: ¥500-3000
- 成本: 仅域名费用（¥50-100/年）

## 核心功能

### 工具站
- 图片压缩工具
- 图片裁剪工具
- 格式转换工具
- Base64 编码/解码工具
- JSON 格式化工具
- URL 编码/解码工具
- 二维码生成工具
- 颜色转换工具
- 正则表达式测试工具
- 时间戳转换工具

### API 服务
- 图片处理 API
- 二维码生成 API
- 文本处理 API
- 数据查询 API
- 验证码生成 API

## 开发计划

详见 [TASKS.md](./TASKS.md)

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 部署

```bash
# 部署到 Vercel
vercel --prod
```

## 许可证

MIT
