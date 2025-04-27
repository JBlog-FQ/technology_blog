import { BlogPost } from '@/types/blog';

// Define blog posts with truncated content
export const blogPosts: BlogPost[] = [
  {
    "id": "4962c8bd-d7a5-4563-806f-5c0fdf7ce860",
    "title": "MySQL",
    "slug": "mysql",
    "date": "2025-04-27",
    "excerpt": "mysql",
    "content": "# MySQL\n\n## 数据库范式了解吗？\n\n- **1NF（第一范式）：**属性不可分\n- **2NF（第二范式）：**每个非主属性完全依赖于键码\n- **3NF（第三范式）：**非主属性不传递函数依赖于键码\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "MySQL"
    ]
  },
  {
    "id": "e57c2bee-722c-479c-9315-3ba1b1021443",
    "title": "SpringBoot面试",
    "slug": "springboot",
    "date": "2025-04-27",
    "excerpt": "Spring Boot面试题",
    "content": "## SpringBoot面试突击班\n\n## 什么是SpringBoot？\n\nSpring Boot 是由 Pivotal 团队提供的基于 Spring 的全新框架，旨在简化 Spring 应用的初始搭建和开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。 约定大于（优于）配置\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Java，SpringBoot"
    ]
  },
  {
    "id": "1",
    "title": "开始我的博客之旅",
    "slug": "starting-my-blog-journey",
    "date": "2023-11-15",
    "excerpt": "这是我的第一篇博客文章，分享我开始写博客的原因和期望。",
    "content": "\n# 开始我的博客之旅\n\n欢迎来到我的博客！这是我写的第一篇文章，标志着我博客之旅的开始。\n\n## 为什么我开始写博客\n\n写作一直是我表达想法和分享知识的方式。通过这个博客，我希望：\n\n- 记录我的学习和成长\n- 分享我的技术见解和经验\n- 与志同道合的人建立联系\n- 提高我的写作和表达能力\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "个人",
      "博客",
      "介绍"
    ]
  },
  {
    "id": "2",
    "title": "如何使用Next.js构建个人博客",
    "slug": "how-to-build-personal-blog-with-nextjs",
    "date": "2023-11-22",
    "excerpt": "分享我使用Next.js、TailwindCSS和TypeScript构建个人博客的经验和技巧。",
    "content": "\n# 如何使用Next.js构建个人博客\n\n在这篇文章中，我将分享如何使用现代Web技术栈构建一个高性能、SEO友好的个人博客。\n\n## 技术选择\n\n我选择了以下技术：\n\n- **Next.js** - React框架，提供服务器端渲染和静态站点生成\n- **TypeScript** - 为JavaScript添加类型安全\n- **TailwindCSS** - 实用优先的CSS框架\n- **MDX** - 在Markdown中使用JSX组件\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "Next.js",
      "React",
      "Web开发",
      "教程"
    ]
  },
  {
    "id": "3",
    "title": "2024年值得学习的编程语言",
    "slug": "2024-programming-languages-to-learn",
    "date": "2024-01-05",
    "excerpt": "探讨2024年最值得投资学习的编程语言，以及它们在行业中的应用前景。",
    "content": "\n# 2024年值得学习的编程语言\n\n技术领域发展迅速，选择正确的编程语言学习可以为你的职业发展带来巨大优势。\n\n## 1. TypeScript\n\nTypeScript继续保持强劲增长趋势，作为JavaScript的超集，它为Web开发带来了类型安全和更好的工具支持。\n\n## 2. Rust\n\nRust因其内存安全性和高性能继续获得开发者的喜爱，特别是在系统编程和WebAssembly领域。\n\n<!-- 内容已省略 -->",
    "author": {
      "name": "博主",
      "avatar": "/images/avatar.jpg"
    },
    "tags": [
      "编程语言",
      "技术趋势",
      "学习资源"
    ]
  }
];

export const getAllPosts = (): BlogPost[] => {
  return blogPosts;
}; 