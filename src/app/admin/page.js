'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtected from '@/components/auth/AdminProtected';
import { adminLogout } from '@/utils/auth';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 这里应该有发布文章的逻辑，例如调用API
    setMessage('文章发布成功!');
    
    // 清空表单
    setTitle('');
    setContent('');
  };

  const handleLogout = () => {
    adminLogout();
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary transition-theme">
          发布文章
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          退出管理员
        </button>
      </div>
      
      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="ide-card p-6 rounded-lg">
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-text-secondary dark:text-text-secondary mb-1 transition-theme"
          >
            文章标题
          </label>
          <input
            id="title"
            type="text"
            className="ide-input w-full px-3 py-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-text-secondary dark:text-text-secondary mb-1 transition-theme"
          >
            文章内容 (Markdown)
          </label>
          <textarea
            id="content"
            rows="15"
            className="ide-input w-full px-3 py-2 rounded-md font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="ide-button-primary py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          发布文章
        </button>
      </form>
    </div>
  );
}

// 包装组件，添加权限保护
export default function ProtectedAdminPage() {
  return (
    <AdminProtected>
      <AdminPage />
    </AdminProtected>
  );
} 