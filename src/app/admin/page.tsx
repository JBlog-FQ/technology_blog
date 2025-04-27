'use client';

import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AdminPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
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

  // 处理封面图片上传
  const handleCoverImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      
      if (validTypes.includes(selectedFile.type)) {
        setCoverImage(selectedFile);
        setCoverImagePreview(URL.createObjectURL(selectedFile));
      } else {
        setCoverImage(null);
        setCoverImagePreview('');
        setMessage({ text: '请上传有效的图片格式(.jpg, .png, .webp, .gif)', type: 'error' });
      }
    }
  }, []);

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !slug) {
      setMessage({ text: '请完成所有必填字段', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 创建表单数据
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('excerpt', excerpt);
      formData.append('tags', tags);
      formData.append('author', author);
      
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }
      
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
        setAuthor('');
        setCoverImage(null);
        setCoverImagePreview('');
        
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

  // 移除封面图片
  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 dark:bg-indigo-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">发布新文章</h1>
        </div>
        
        {message.text && (
          <div className={`mx-6 mt-6 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Markdown 文件 <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".md"
                  onChange={handleFileChange}
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-gray-700 dark:file:text-white file:bg-gray-100 dark:file:bg-gray-600 file:rounded-md hover:file:cursor-pointer"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  文章标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL 别名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  pattern="[a-z0-9-]+"
                  title="只能包含小写字母、数字和连字符"
                  required
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  将作为文章的URL，例如: your-blog.com/blog/<strong>{slug || 'your-slug'}</strong>
                </p>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  作者名称
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  placeholder="默认使用站点作者"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  封面图片
                </label>
                <div className={`mt-1 border-2 border-dashed ${coverImagePreview ? 'border-gray-300 dark:border-gray-600' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-4`}>
                  {coverImagePreview ? (
                    <div className="relative">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <Image 
                          src={coverImagePreview} 
                          fill
                          alt="封面预览"
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeCoverImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4 flex text-sm justify-center">
                        <label htmlFor="coverImage" className="relative cursor-pointer rounded-md bg-white dark:bg-gray-700 font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none">
                          <span>上传图片</span>
                          <input 
                            id="coverImage" 
                            name="coverImage" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleCoverImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        支持 PNG, JPG, WEBP, GIF 格式
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  文章摘要
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={4}
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  placeholder="简短描述文章内容，将显示在文章列表中"
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
                  className="block w-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="mr-3"
              href="/blog"
            >
              取消
            </Button>
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
    </div>
  );
} 