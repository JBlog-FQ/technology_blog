'use client';

import { Suspense } from 'react';
import BlogCard from "@/components/blog/BlogCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getRecentPosts } from "@/lib/blog";
import Image from "next/image";

export const dynamic = 'force-static'; // 强制静态生成以提高性能

// 创建一个加载占位组件
function LoadingPosts() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - 全屏背景图片 */}
      <section className="relative h-screen flex items-center justify-center">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/7.jpg"
            alt="背景图片"
            fill
            className="object-cover"
            priority
          />
          {/* 半透明遮罩，使文字更加清晰 */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6"
          >
            路人の博客
          </h1>
          <div className="flex items-center justify-center mb-8">
            <span className="text-yellow-400 mr-2 text-xl">★</span>
            <p className="text-xl text-white">
              未闻花名，但识花香。再见花时，泪已成行！
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button href="/blog" size="lg">浏览所有文章</Button>
            <Button href="/about" variant="outline" size="lg">了解更多</Button>
          </div>
        </div>
        
        {/* 向下箭头 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            浏览我最近发布的技术文章和分享
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <RecentPostsClient />
        </div>

        <div className="mt-12 text-center">
          <Button href="/blog" variant="ghost">
            查看所有文章
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              博客特色
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              探索这个博客所提供的内容和功能
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card hover padding="lg">
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                技术见解
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                深入探讨前端和后端开发的各种技术，分享实用的编程技巧和解决方案。
              </p>
            </Card>

            <Card hover padding="lg">
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                学习资源
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                提供各种学习资源、教程和工具推荐，帮助读者提升技术能力。
              </p>
            </Card>

            <Card hover padding="lg">
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                经验分享
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                分享个人在技术领域的成长经验、项目实践和职业发展心得。
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// 客户端组件，用于加载最新文章
function RecentPostsClient() {
  return (
    <Suspense fallback={<LoadingPosts />}>
      <RecentPosts />
    </Suspense>
  );
}

// 服务器组件，用于获取最新文章
async function RecentPosts() {
  const recentPosts = await getRecentPosts(3);
  
  return (
    <>
      {recentPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </>
  );
}
