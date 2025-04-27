'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function BlogPage() {
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  // 获取所有博客文章
  const allPostsMemo = useMemo(() => getAllPosts(), []);

  // 获取所有标签
  const allTagsMemo = useMemo(() => {
    const tags = new Set<string>();
    allPostsMemo.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [allPostsMemo]);

  // 根据搜索词和标签筛选文章
  const filteredPosts = useMemo(() => {
    return allPostsMemo.filter(post => {
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [allPostsMemo, searchTerm, selectedTag]);

  // 获取精选文章
  useEffect(() => {
    const featured = allPostsMemo
      .filter((post: BlogPost) => post.featured)
      .slice(0, 5);
    setFeaturedPosts(featured);
  }, [allPostsMemo]);

  // 获取热门文章
  useEffect(() => {
    // 这里可以通过 API 获取实际的热门文章数据
    // 现在仅使用模拟数据
    const popular = [...allPostsMemo]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
    setPopularPosts(popular);
  }, [allPostsMemo]);

  // 幻灯片自动切换
  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % featuredPosts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  // 处理幻灯片导航
  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  // 处理标签点击
  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
  }, []);

  // 重置筛选器
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedTag(null);
  }, []);

  // 格式化日期
  const formatDate = useCallback((date: string) => {
    return format(new Date(date), 'yyyy年MM月dd日', { locale: zhCN });
  }, []);

  // 计算阅读时间，假设平均阅读速度为每分钟300字
  function calculateReadTime(content: string): number {
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / 300);
    return Math.max(1, readTimeMinutes); // 至少1分钟
  }

  if (allPostsMemo.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">暂无博客文章</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">敬请期待，我们会尽快发布新的内容！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">技术博客</h1>
          <p className="text-xl text-center text-indigo-100 max-w-2xl mx-auto">
            探索最新的技术趋势、教程和深度分析，提升您的开发技能
          </p>
          
          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto mt-10">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-gray-800 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 标签筛选器 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">按标签筛选</h2>
          <div className="flex flex-wrap gap-2">
            {allTagsMemo.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
            {(searchTerm || selectedTag) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors ml-2 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                重置筛选
              </button>
            )}
          </div>
        </div>

        {/* 精选文章轮播 */}
        {!searchTerm && !selectedTag && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              精选文章
            </h2>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`transition-opacity duration-500 ${
                    index === activeSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  style={{ zIndex: index === activeSlide ? 1 : 0 }}
                >
                  <div className="relative aspect-[21/9] w-full">
                    <Image
                      src={post.coverImage || '/images/default-cover.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                      <div className="flex items-center mb-4">
                        {post.author.avatar && (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white mr-3"
                          />
                        )}
                        <div>
                          <p className="font-medium">{post.author.name}</p>
                          <time className="text-sm text-gray-300">{formatDate(post.date)}</time>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm md:text-lg text-gray-200 mb-6 max-w-2xl line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                      >
                        阅读文章
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 轮播导航指示器 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeSlide 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/70'
                    } transition-all duration-300`}
                    aria-label={`转到幻灯片 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 热门文章部分 */}
        {!searchTerm && !selectedTag && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              热门文章
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={post.coverImage || '/images/default-cover.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        <time className="text-gray-300">{formatDate(post.date)}</time>
                        <span className="mx-2">•</span>
                        <span className="text-gray-300">{calculateReadTime(post.content)} 分钟阅读</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 文章列表 */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              {searchTerm || selectedTag ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  搜索结果 ({filteredPosts.length})
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  所有文章
                </>
              )}
            </h2>
            
            {filteredPosts.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                共 {filteredPosts.length} 篇文章
              </div>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">未找到匹配的文章</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">请尝试使用不同的搜索词或标签</p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                重置筛选
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 