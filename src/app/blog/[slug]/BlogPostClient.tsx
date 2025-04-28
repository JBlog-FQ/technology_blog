'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface TocItem {
  level: number;
  id: string;
  text: string;
}

interface BlogPostClientProps {
  post: BlogPost;
  contentHtml: string;
  tableOfContents: TocItem[];
  formattedDate: string;
  relatedPosts?: BlogPost[];
}

export default function BlogPostClient({ post, contentHtml, tableOfContents, formattedDate, relatedPosts = [] }: BlogPostClientProps) {
  // 状态管理
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 检测设备大小
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 切换目录展开/折叠
  const toggleToc = () => {
    setIsTocCollapsed(!isTocCollapsed);
  };

  // 处理图片加载错误
  const handleImageError = () => {
    console.error("封面图片加载失败:", post.coverImage);
    setImageError(true);
  };
  
  // 确定实际使用的封面图片路径
  const coverImageSrc = imageError ? '/images/default-cover.jpg' : (post.coverImage || '/images/default-cover.jpg');
  
  // 调试
  useEffect(() => {
    console.log("客户端组件加载", {
      coverImage: post.coverImage,
      coverImageSrc,
      imageErrorState: imageError
    });
  }, [post.coverImage, coverImageSrc, imageError]);
  
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-theme">
      {/* 顶部导航条和面包屑 */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 pt-4 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-white/90">
            <Link 
              href="/" 
              className="hover:text-white transition-colors"
            >
              首页
            </Link>
            <span className="mx-2">/</span>
            <Link 
              href="/blog" 
              className="hover:text-white transition-colors"
            >
              博客
            </Link>
          </div>
        </div>
      </div>
      
      {/* 标题区域 - 居中独立展示 */}
      <div className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-900 dark:to-purple-900 py-20 relative min-h-[400px] overflow-hidden">
        {/* 封面图片容器 */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={coverImageSrc}
            alt={post.title}
            fill
            sizes="100vw"
            quality={100}
            className="object-cover opacity-50"
            priority={true}
            onError={handleImageError}
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto shadow-text">
            {post.title}
          </h1>
          
          {/* 文章元数据 */}
          <div className="flex flex-wrap items-center justify-center text-sm text-white/90 gap-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author?.name || '博主'}</span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 移动端目录 - 可折叠按钮固定在顶部 */}
      {isMobile && (
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={toggleToc}
              className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <span className="font-medium">目录</span>
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isTocCollapsed ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {!isTocCollapsed && tableOfContents.length > 0 && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow max-h-[50vh] overflow-y-auto">
                <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-600">
                  <AuthorCard post={post} />
                </div>
                <TocContent tableOfContents={tableOfContents} />
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 桌面端侧边栏 */}
            {!isMobile && (
              <aside className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-20 overflow-hidden">
                  {/* 作者信息卡片 - 放在目录上方 */}
                  <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                    <AuthorCard post={post} />
                  </div>
                  
                  {/* 目录区域 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                    <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <button
                        onClick={toggleToc}
                        className="flex justify-between items-center w-full text-lg font-semibold text-gray-900 dark:text-white"
                      >
                        <span>目录</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-200 ${isTocCollapsed ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {!isTocCollapsed && (
                      <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 toc-scrollbar">
                        {tableOfContents.length > 0 ? (
                          <TocContent tableOfContents={tableOfContents} />
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">没有可用的目录</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            )}
            
            {/* 主要内容区域 */}
            <main className="lg:col-span-9 order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* 文章内容 - Typora 风格 */}
                <article className="typora-like-content prose prose-lg dark:prose-invert lg:prose-xl max-w-none p-6 lg:p-8">
                  <div 
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </article>
                
                {/* 文章底部 - 分享和返回按钮 */}
                <div className="px-6 lg:px-8 py-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                  
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    返回博客
                  </Link>
                </div>
              </div>
              
              {/* 相关文章推荐 */}
              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">相关推荐</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.slice(0, 2).map((relatedPost) => (
                      <Link 
                        key={relatedPost.slug} 
                        href={`/blog/${relatedPost.slug}`}
                        className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">{relatedPost.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// 抽出TOC内容组件以复用
function TocContent({ tableOfContents }: { tableOfContents: TocItem[] }) {
  return (
    <nav className="toc-nav">
      <ul className="space-y-1">
        {tableOfContents.map((heading, index) => {
          // 根据标题级别选择对应的缩进类名和样式
          let indentClass = '';
          let textClass = '';
          
          switch(heading.level) {
            case 1:
              textClass = 'font-bold text-gray-900 dark:text-white';
              break;
            case 2:
              indentClass = 'ml-0';
              textClass = 'font-semibold text-gray-800 dark:text-gray-100';
              break;
            case 3:
              indentClass = 'ml-3';
              textClass = 'text-gray-700 dark:text-gray-200';
              break;
            case 4:
              indentClass = 'ml-6';
              textClass = 'text-sm text-gray-600 dark:text-gray-300';
              break;
            case 5:
            case 6:
              indentClass = 'ml-9';
              textClass = 'text-xs text-gray-500 dark:text-gray-400';
              break;
            default:
              indentClass = '';
              textClass = 'text-gray-700 dark:text-gray-300';
          }
          
          return (
            <li key={index} className={`${indentClass}`}>
              <a 
                href={`#${heading.id}`}
                className={`block py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${textClass}`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// 作者卡片组件
function AuthorCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center">
      {post.author?.avatar ? (
        <Image
          src={post.author.avatar}
          alt={post.author?.name || '博主'}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
          {post.author?.name?.charAt(0).toUpperCase() || '博'}
        </div>
      )}
      <div className="ml-3">
        <p className="font-medium text-gray-900 dark:text-white">{post.author?.name || '博主'}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">作者</p>
      </div>
    </div>
  );
} 