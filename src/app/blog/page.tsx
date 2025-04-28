'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import { blogPosts } from '@/data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';

export default function BlogPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  // 获取所有博客文章
  const allPostsMemo = useMemo(() => blogPosts, []);

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

  if (allPostsMemo.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-6">暂无博客文章</h1>
          <p className="text-lg text-text-secondary mb-8">敬请期待，我们会尽快发布新的内容！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* 页面头部 */}
      <PageHeader 
        title="技术博客" 
        description="探索最新的技术趋势、教程和深度分析，提升您的开发技能"
      >
          {/* 搜索框 */}
        <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-gray-800 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
      </PageHeader>

      <Section>
        {/* 标签筛选器 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-text-primary mb-4">按标签筛选</h2>
          <div className="flex flex-wrap gap-2">
            {allTagsMemo.map(tag => (
              <Tag
                key={tag}
                onClick={() => handleTagClick(tag)}
                active={selectedTag === tag}
              >
                {tag}
              </Tag>
            ))}
            {(searchTerm || selectedTag) && (
              <button
                onClick={resetFilters}
                className="px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors ml-2 flex items-center"
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
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                      <div className="flex space-x-2 mb-3">
                        {post.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-primary/70 px-2 py-1 text-xs font-medium rounded-md">
                            {tag}
                          </span>
                        ))}
                        </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h3>
                      <p className="text-white/80 line-clamp-2 mb-4 md:mb-6">{post.excerpt}</p>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        阅读全文
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 指示器和导航 */}
              <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`切换到幻灯片 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
          </div>

        {/* 如果没有符合条件的文章 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-text-primary mb-2">没有找到符合条件的文章</h3>
            <p className="text-text-secondary mb-6">请尝试不同的搜索词或标签</p>
              <button
                onClick={resetFilters}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
              清除筛选条件
              </button>
            </div>
        )}
      </Section>
    </div>
  );
} 