'use client';

import { useState, useEffect } from 'react';
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

// 按日期排序获取热门文章
const getPopularPosts = () => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);
};

export default function BlogPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const featuredPosts = blogPosts.slice(0, 3);

  useEffect(() => {
    setPopularPosts(getPopularPosts());

    // 轮播图自动切换
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-theme">
      {/* 顶部横幅 */}
      <div className="bg-primary text-white py-16 px-4 transition-theme">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">博客文章</h1>
          <p className="text-xl max-w-3xl mx-auto">
            分享我的技术见解、经验和学习笔记
          </p>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        
        {/* 轮播图和热门文章板块 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* 轮播图 - 占据左边2/3 */}
          <div className="lg:col-span-2 bg-card-bg dark:bg-card-bg rounded-xl shadow-xl overflow-hidden border border-card-border transition-theme">
            <div className="relative h-80 md:h-96">
              {featuredPosts.map((post, index) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  className={`absolute inset-0 transition-all duration-500 transform ${
                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <Image
                    src={post.coverImage || '/images/default-cover.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-primary/80 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                      精选文章
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                    <p className="text-white/80 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
              
              {/* 轮播控制按钮 */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`导航到幻灯片 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 热门文章榜单 - 占据右边1/3 */}
          <div className="bg-card-bg dark:bg-card-bg rounded-xl shadow-xl p-6 border border-card-border transition-theme">
            <h3 className="text-xl font-bold border-b border-card-border pb-4 mb-4 text-text-primary dark:text-text-primary transition-theme">
              热门文章
            </h3>
            
            <div className="space-y-5">
              {popularPosts.map((post, index) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  className="flex items-start group"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-text-primary dark:text-text-primary group-hover:text-primary transition-theme">
                      {post.title}
                    </h4>
                    <p className="text-sm text-text-muted dark:text-text-muted mt-1 transition-theme">
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* 所有文章 */}
        <div className="pb-16">
          <h2 className="text-2xl font-bold mb-8 text-text-primary dark:text-text-primary transition-theme">
            所有文章
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-text-secondary dark:text-text-secondary transition-theme">
                暂无博客文章，请稍后再来查看。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 