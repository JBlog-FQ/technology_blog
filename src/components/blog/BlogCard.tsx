import { BlogPost } from '@/types/blog';
import ArticleCard from '@/components/ui/ArticleCard';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <ArticleCard
      title={post.title}
      description={post.excerpt}
      category={post.category || '技术博客'}
      tags={post.tags || []}
      link={`/blog/${post.slug}`}
      metadata={
        post.readingTime
          ? { label: '阅读时间', value: `${post.readingTime} min` }
          : undefined
      }
      actionLabel="阅读全文"
    />
  );
} 