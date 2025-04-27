import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { BlogPost } from '@/types/blog';
import { useMemo, memo } from 'react';

interface BlogCardProps {
  post: BlogPost;
}

// 使用React.memo优化组件，避免不必要的重渲染
const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  // 使用useMemo缓存格式化后的日期，避免重复计算
  const formattedDate = useMemo(() => {
    return format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN });
  }, [post.date]);

  // 使用useMemo优化作者头像渲染
  const authorAvatar = useMemo(() => {
    if (post.author.avatar) {
      return (
        <Image
          className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm border-2 border-white">
          {post.author.name.charAt(0)}
        </div>
      );
    }
  }, [post.author.avatar, post.author.name]);

  // 封面图片的占位符
  const defaultCoverImage = '/images/default-cover.jpg';

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.coverImage || defaultCoverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-0 left-0 mt-4 ml-4">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white shadow-md"
              >
                {post.tags[0]}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="flex flex-col justify-between flex-1 p-6 dark:border-t dark:border-gray-700">
        <div className="flex-1">
          <div className="flex items-center text-sm mb-2">
            <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
          </div>
          
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-indigo-600 transition-colors" prefetch={false}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {authorAvatar}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {post.author.name}
              </p>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            阅读全文
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {post.tags && post.tags.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(1).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});

export default BlogCard; 