'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function AdminPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // 处理文件上传
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // 检查是否是.md文件
      if (selectedFile.name.endsWith('.md')) {
        setFile(selectedFile);
        setMessage({ text: '', type: '' });
        
        // 从文件名生成slug建议
        const nameWithoutExt = selectedFile.name.replace('.md', '');
        const suggestedSlug = nameWithoutExt
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        setSlug(suggestedSlug);
        
        // 尝试从文件名提取标题
        const suggestedTitle = nameWithoutExt
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
        
        setTitle(suggestedTitle);
      } else {
        setFile(null);
        setMessage({ text: '请上传.md格式的文件', type: 'error' });
      }
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !slug) {
      setMessage({ text: '请完成所有必填字段', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 读取文件内容
      const fileContent = await file.text();
      
      // 创建表单数据
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('excerpt', excerpt);
      formData.append('tags', tags);
      
      // 发送到API
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setMessage({ text: '文章发布成功！', type: 'success' });
        // 重置表单
        setFile(null);
        setTitle('');
        setSlug('');
        setExcerpt('');
        setTags('');
        
        // 可选：重定向到新文章页面
        const data = await response.json();
        setTimeout(() => {
          router.push(`/blog/${data.slug}`);
        }, 2000);
      } else {
        const error = await response.json();
        setMessage({ text: `发布失败: ${error.message}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `发生错误: ${error instanceof Error ? error.message : '未知错误'}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        发布新文章
      </h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Markdown 文件 (必填)
          </label>
          <input
            type="file"
            id="file"
            accept=".md"
            onChange={handleFileChange}
            className="block w-full text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
            required
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            文章标题 (必填)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
            required
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL 别名 (必填)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}
            className="block w-full text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
            pattern="[a-z0-9-]+"
            title="只能包含小写字母、数字和连字符"
            required
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            将作为文章的URL，例如: your-blog.com/blog/<strong>{slug || 'your-slug'}</strong>
          </p>
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            文章摘要
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="block w-full text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
          />
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            标签 (用逗号分隔)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="例如: JavaScript, React, 教程"
            className="block w-full text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
          />
        </div>
        
        <div>
          <Button 
            type="submit" 
            isLoading={isSubmitting}
            disabled={isSubmitting || !file}
          >
            发布文章
          </Button>
        </div>
      </form>
    </div>
  );
} 