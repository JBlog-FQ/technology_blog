import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: '博客文章 | 个人技术博客',
  description: '浏览所有博客文章和技术分享',
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          博客文章
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
          分享我的技术见解、经验和学习笔记
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            暂无博客文章，请稍后再来查看。
          </p>
        </div>
      )}
    </div>
  );
} 