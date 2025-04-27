import { BlogPost } from '@/types/blog';
import { blogPosts } from '@/data/blogPosts';
import { unstable_cache } from 'next/cache';

// 使用Next.js缓存API来缓存博客文章数据
export const getAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    // 在实际应用中，这里可能是从数据库或API获取数据
    return blogPosts;
  },
  ['all-blog-posts'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | undefined> => {
    // 在实际应用中，这里可能是从数据库或API获取数据
    return blogPosts.find((post) => post.slug === slug);
  },
  ['blog-post-by-slug'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

export const getRecentPosts = unstable_cache(
  async (count = 3): Promise<BlogPost[]> => {
    // 获取最新的文章
    return [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },
  ['recent-blog-posts'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

// 客户端可用的版本，不使用缓存
export function getRecentPostsClient(count = 3): Promise<BlogPost[]> {
  return Promise.resolve(
    [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count)
  );
}

export const getPostsByTag = unstable_cache(
  async (tag: string): Promise<BlogPost[]> => {
    return blogPosts.filter((post) => post.tags?.includes(tag));
  },
  ['blog-posts-by-tag'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

// 获取所有标签
export const getAllTags = unstable_cache(
  async (): Promise<string[]> => {
    const tags = blogPosts.reduce((allTags: string[], post) => {
      const postTags = post.tags || [];
      return [...allTags, ...postTags];
    }, []);
    
    // 去重
    return Array.from(new Set(tags));
  },
  ['all-blog-tags'],
  { revalidate: 3600, tags: ['blog-posts'] }
); 