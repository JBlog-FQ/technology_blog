'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isAdmin } from '@/utils/auth';

export default function AboutPage() {
  const [isEditable, setIsEditable] = useState(false);
  
  useEffect(() => {
    // 检查用户是否是管理员
    setIsEditable(isAdmin());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* 顶部横幅 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl opacity-20 dark:opacity-30"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            关于我
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            热爱技术、学习和分享的开发者
          </p>
        </div>
      </div>
      
      {/* 个人资料卡片 */}
      <div className="max-w-5xl mx-auto mt-8 relative">
        {/* 编辑按钮 - 移动到卡片右上角 */}
        {isEditable && (
          <div className="absolute -top-4 right-4 z-10">
            <Link 
              href="/admin/login?redirect=/about/edit" 
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              编辑资料
            </Link>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* 左侧资料区域 */}
            <div className="md:w-1/3 bg-gradient-to-b from-teal-500/10 to-teal-600/5 p-8 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-lg mb-6">
                <Image
                  src="/images/avatar.jpg"
                  alt="博主头像"
                  fill
                  className="object-cover"
                />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">路人の博客</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">全栈开发工程师</p>
              
              <div className="w-full mt-8 space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:example@example.com" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    example@example.com
                  </a>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    github.com/yourusername
                  </a>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span>欢迎交流技术话题</span>
                </div>
              </div>
            </div>
            
            {/* 右侧内容区域 */}
            <div className="md:w-2/3 p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  个人介绍
                </h3>
                <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-2">
                  <p>
                    你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。我在软件行业工作已有多年，经历了从传统网站开发到现代JavaScript框架的整个演变过程。
                  </p>
                  <p>
                    通过这个博客，我希望能够分享我在技术领域的所见所闻和经验心得，同时也记录自己的学习和成长历程。
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  技能和专长
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { name: 'React/Next.js', level: 90 },
                    { name: 'JavaScript/TypeScript', level: 85 },
                    { name: 'CSS/Tailwind', level: 80 },
                    { name: 'Node.js', level: 75 },
                    { name: '数据库设计', level: 65 },
                    { name: '性能优化', level: 70 },
                  ].map((skill, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-xs font-medium text-teal-600 dark:text-teal-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 h-1.5 mt-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  爱好与兴趣
                </h3>
                <div className="mt-4 text-gray-600 dark:text-gray-300">
                  <p>
                    除了编码，我还喜欢阅读技术书籍、参加技术交流活动、尝试新技术和工具。在空闲时间，我喜欢徒步旅行、摄影和探索新地方。
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['技术阅读', '徒步旅行', '摄影', '音乐', '开源贡献'].map((hobby, index) => (
                      <span key={index} className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 