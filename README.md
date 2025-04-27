# 路人の博客

这是一个使用 Next.js、React 和 TailwindCSS 构建的个人技术博客项目。

## 功能特点

- ✨ 响应式设计，适配各种设备
- 📝 博客文章列表和详情页
- 🌓 深色/浅色主题切换
- 📱 移动端友好的导航
- 🖼️ 动态随机背景图
- ✏️ 文字动画效果
- 🔤 优雅的字体（霞鹜文楷）
- 🔍 SEO 友好

## 技术栈

- **前端框架**：Next.js 15.3.1（使用 App Router）
- **UI 库**：React 19.0.0
- **样式**：TailwindCSS 4.0
- **字体**：霞鹜文楷、Geist
- **开发语言**：TypeScript

## 快速开始

1. 克隆项目

```bash
git clone https://github.com/yourusername/technology_blog.git
cd technology_blog
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
technology_blog/
├── public/                # 静态资源
│   └── images/            # 图片资源，包括背景图片
├── src/                   # 源代码
│   ├── app/               # 页面和路由（App Router）
│   │   ├── page.tsx       # 首页
│   │   ├── layout.tsx     # 根布局
│   │   ├── globals.css    # 全局样式
│   │   ├── blog/          # 博客相关页面
│   │   ├── about/         # 关于页面
│   │   └── admin/         # 管理页面
│   ├── components/        # 可复用组件
│   │   ├── blog/          # 博客相关组件
│   │   ├── layout/        # 布局组件（导航栏、页脚等）
│   │   ├── shared/        # 共享组件
│   │   └── ui/            # UI 通用组件（按钮、卡片等）
│   ├── data/              # 博客文章数据
│   ├── lib/               # 工具库
│   ├── types/             # TypeScript 类型定义
│   └── utils/             # 工具函数
├── tailwind.config.js     # Tailwind 配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 主要功能说明

### 动态主题切换
支持深色和浅色主题，会记住用户的偏好设置。

### 响应式导航栏
- 在桌面端显示水平导航
- 在移动端折叠为汉堡菜单
- 高亮显示当前浏览的页面

### 首页特效
- 动态随机背景图
- 文字一个一个缓慢出现
- 流畅的滚动效果

### 自定义字体
使用优雅的霞鹜文楷字体，提升阅读体验。

## 自定义

1. 替换 `public/images` 目录下的图片以更改背景
2. 在 `src/app/globals.css` 中可以选择不同的字体
3. 根据需要修改导航栏和页脚组件

## 贡献

欢迎提交问题和功能请求！

## 许可证

MIT
