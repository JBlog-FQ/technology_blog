import Link from 'next/link';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600">
          文章未找到
        </h1>
        <p className="mt-6 text-xl text-gray-500">
          很抱歉，您要查找的博客文章不存在或已被移动。
        </p>
        <div className="mt-10 space-x-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            返回博客列表
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 