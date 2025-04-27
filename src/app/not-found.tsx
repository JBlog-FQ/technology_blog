import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          页面未找到
        </h2>
        <p className="mt-6 text-base text-gray-500 dark:text-gray-400">
          很抱歉，您要查找的页面不存在或已被移动。
        </p>
        <div className="mt-10">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 