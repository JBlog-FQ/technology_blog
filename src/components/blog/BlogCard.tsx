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
          className="h-10 w-10 rounded-full"
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
          {post.author.name.charAt(0)}
        </div>
      );
    }
  }, [post.author.avatar, post.author.name]);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {post.coverImage && (
        <div className="flex-shrink-0 relative h-48">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        </div>
      )}
      <div className="flex flex-col justify-between flex-1 p-6 bg-white dark:bg-gray-800">
        <div className="flex-1">
          <div className="flex items-center text-sm">
            <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
              {formattedDate}
            </time>
          </div>
          <Link href={`/blog/${post.slug}`} className="block mt-2" prefetch={false}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:underline">
              {post.title}
            </h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {post.excerpt}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            {authorAvatar}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </p>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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