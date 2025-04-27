'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminLogin } from '@/utils/auth';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (adminLogin(password)) {
      // 登录成功后跳转到重定向URL或默认的管理页面
      router.push(redirectUrl);
    } else {
      setError('密码不正确');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          路人の博客
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          管理员验证
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {redirectUrl.includes('/about/edit') 
            ? '请输入管理员密码以编辑个人资料' 
            : '请输入管理员密码以进入发布页面'}
        </p>
      </div>
      
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              管理员密码
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
              />
            </div>
          </div>
          
          {error && (
            <div className="p-2 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
              确认身份并继续
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                或者
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              href={redirectUrl.includes('/about/edit') ? '/about' : '/blog'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
            >
              {redirectUrl.includes('/about/edit') ? '返回关于页面' : '返回博客'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 