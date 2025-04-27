# 个人技术博客

这是一个使用 Next.js、React 和 TailwindCSS 构建的个人技术博客项目。

## 功能特点

- 响应式设计，适配各种设备
- 博客文章列表和详情页
- Markdown 内容渲染
- 深色模式支持
- SEO 友好

## 技术栈

- **前端框架**：Next.js 15.3.1（使用 App Router）
- **UI 库**：React 19.0.0
- **样式**：TailwindCSS 4.0
- **Markdown 解析**：marked
- **内容安全**：isomorphic-dompurify
- **日期格式化**：date-fns
- **开发语言**：TypeScript

## 快速开始

1. 克隆项目

```bash
git clone https://github.com/yourusername/personal_blog.git
cd personal_blog
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 在浏览器中访问 `http://localhost:3000`

## 项目结构

```
personal_blog/
├── public/            # 静态资源
├── src/               # 源代码
│   ├── app/           # 页面和路由
│   ├── components/    # 可复用组件
│   ├── data/          # 博客文章数据
│   ├── types/         # TypeScript 类型定义
│   └── utils/         # 工具函数
├── package.json       # 项目依赖
└── README.md          # 项目说明
```

## 部署

项目可以轻松部署到 Vercel 平台：

```bash
npm run build
```

## 自定义

1. 修改 `src/data/blogPosts.ts` 添加你自己的博客文章
2. 在 `public/images` 目录下放置你的图片
3. 根据需要修改导航栏和页脚组件

## 许可证

MIT
