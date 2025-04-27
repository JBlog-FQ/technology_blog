import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '开始我的博客之旅',
    slug: 'starting-my-blog-journey',
    date: '2023-11-15',
    excerpt: '这是我的第一篇博客文章，分享我开始写博客的原因和期望。',
    content: `
# 开始我的博客之旅

欢迎来到我的博客！这是我写的第一篇文章，标志着我博客之旅的开始。

## 为什么我开始写博客

写作一直是我表达想法和分享知识的方式。通过这个博客，我希望：

- 记录我的学习和成长
- 分享我的技术见解和经验
- 与志同道合的人建立联系
- 提高我的写作和表达能力

## 我会写什么

我计划主要关注以下几个主题：

1. **技术开发** - 编程语言、框架和工具的经验
2. **个人成长** - 学习方法、效率提升和自我管理
3. **项目分享** - 我正在进行的个人项目和实验

## 未来展望

我计划每周发布至少一篇文章，并逐步改进这个博客的功能和设计。

感谢您的阅读，希望您能继续关注我的博客之旅！
    `,
    author: {
      name: '博主',
      avatar: '/images/avatar.jpg'
    },
    tags: ['个人', '博客', '介绍']
  },
  {
    id: '2',
    title: '如何使用Next.js构建个人博客',
    slug: 'how-to-build-personal-blog-with-nextjs',
    date: '2023-11-22',
    excerpt: '分享我使用Next.js、TailwindCSS和TypeScript构建个人博客的经验和技巧。',
    content: `
# 如何使用Next.js构建个人博客

在这篇文章中，我将分享如何使用现代Web技术栈构建一个高性能、SEO友好的个人博客。

## 技术选择

我选择了以下技术：

- **Next.js** - React框架，提供服务器端渲染和静态站点生成
- **TypeScript** - 为JavaScript添加类型安全
- **TailwindCSS** - 实用优先的CSS框架
- **MDX** - 在Markdown中使用JSX组件

## 步骤详解

### 1. 创建Next.js项目

使用create-next-app快速创建项目：

\`\`\`bash
npx create-next-app@latest my-blog --typescript --tailwind --app
\`\`\`

### 2. 创建博客数据结构

定义博客文章的接口和数据存储方式...

### 3. 实现文章列表和详情页面

创建用于展示文章列表和文章详情的组件...

### 4. 添加导航和页脚

实现网站的通用布局元素...

## 总结

通过Next.js构建博客有很多优势，包括出色的性能、良好的开发体验和SEO友好的特性。

如果您有任何问题或建议，请在评论区留言！
    `,
    author: {
      name: '博主',
      avatar: '/images/avatar.jpg'
    },
    tags: ['Next.js', 'React', 'Web开发', '教程']
  },
  {
    id: '3',
    title: '2024年值得学习的编程语言',
    slug: '2024-programming-languages-to-learn',
    date: '2024-01-05',
    excerpt: '探讨2024年最值得投资学习的编程语言，以及它们在行业中的应用前景。',
    content: `
# 2024年值得学习的编程语言

技术领域发展迅速，选择正确的编程语言学习可以为你的职业发展带来巨大优势。

## 1. TypeScript

TypeScript继续保持强劲增长趋势，作为JavaScript的超集，它为Web开发带来了类型安全和更好的工具支持。

## 2. Rust

Rust因其内存安全性和高性能继续获得开发者的喜爱，特别是在系统编程和WebAssembly领域。

## 3. Go

Go语言在云原生开发、微服务和DevOps工具中的应用越来越广泛，其简洁性和并发模型是主要优势。

## 4. Python

Python在数据科学、机器学习和自动化领域的主导地位依然稳固，是初学者和专业人士的理想选择。

## 5. Kotlin

Kotlin在Android开发中已成为首选语言，并逐渐扩展到服务器端和跨平台开发。

## 如何选择适合你的语言

选择编程语言时应考虑以下因素：

- 你的职业目标和行业需求
- 语言的学习曲线和社区支持
- 你现有的技能和知识基础
- 项目类型和技术生态系统

无论你选择哪种语言，持续学习和实践才是提升编程能力的关键。
    `,
    author: {
      name: '博主',
      avatar: '/images/avatar.jpg'
    },
    tags: ['编程语言', '技术趋势', '学习资源']
  }
]; 