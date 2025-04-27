import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { blogPosts } from '@/data/blogPosts';
import { parseMarkdown } from '@/utils/markdown';
import { getPostBySlug } from '@/lib/blog';

// 使用更简单的参数结构，避免与PageProps约束冲突
type PageParams = {
  slug: string;
};

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find((post) => post.slug === slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }
  
  return {
    title: `${post.title} | 路人の博客`,
    description: post.excerpt,
  };
}

// 生成静态路径
export async function generateStaticParams(): Promise<PageParams[]> {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 使用服务器组件来渲染页面内容
export default async function BlogPostPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // 在服务器端解析Markdown (Next.js的服务器组件)
  const contentHtml = parseMarkdown(post.content);
  // 在服务器端格式化日期
  const formattedDate = format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN });
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* 顶部标题区域 - 使用渐变背景 */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-gray-900 text-white pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-indigo-100 hover:text-white mb-6 transition-colors"
            prefetch={true}
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回文章列表
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-indigo-100">
            <div className="flex items-center mr-4 mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>
                {formattedDate}
              </time>
            </div>
            
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="flex items-center">
                {post.author.avatar ? (
                  <Image
                    className="h-5 w-5 rounded-full mr-1"
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    loading="eager"
                  />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-indigo-400 flex items-center justify-center text-indigo-800 mr-1">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-700 text-indigo-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 文章内容卡片 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {post.coverImage && (
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              />
            </div>
          )}
          
          <div className="p-6 sm:p-8 md:p-10">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                         prose-headings:text-gray-900 dark:prose-headings:text-white
                         prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                         prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 dark:prose-strong:text-white
                         prose-img:rounded-md prose-img:my-8
                         prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 
                         prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                         prose-code:text-indigo-600 dark:prose-code:text-indigo-400
                         prose-pre:bg-gray-100 dark:prose-pre:bg-gray-700 prose-pre:rounded-md prose-pre:p-4"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            
            {/* 文章底部 */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">分享文章</h3>
                  <div className="flex mt-2 space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">更多文章</h3>
                  <div className="mt-2">
                    <Link 
                      href="/blog" 
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      浏览所有文章
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 