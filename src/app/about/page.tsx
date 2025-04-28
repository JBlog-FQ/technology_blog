'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { isAdmin } from '@/utils/auth';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  github: string;
  bio: string;
  hobbies: string;
  hobbyTags: string[];
  skills: Array<{name: string; percentage: number}>;
}

export default function AboutPage() {
  const [isEditable, setIsEditable] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 检查用户是否是管理员
    setIsEditable(isAdmin());
    
    // 加载个人资料数据
    async function loadProfileData() {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error('加载个人资料数据失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProfileData();
    
    // 添加一个小延迟来触发技能条动画
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* 页面头部 */}
      <PageHeader
        title="关于我"
        description="热爱技术、学习和分享的开发者"
      />
      
      {/* 个人资料卡片 */}
      <Section className="py-12">
        <div className="max-w-5xl mx-auto relative">
        {/* 编辑按钮 - 移动到卡片右上角 */}
        {isEditable && (
          <div className="absolute -top-4 right-4 z-10">
              <a 
              href="/admin/login?redirect=/about/edit" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              编辑资料
              </a>
          </div>
        )}
        
          <Card className="overflow-hidden shadow-2xl dark:shadow-teal-900/5 border border-gray-100 dark:border-gray-800 rounded-2xl">
          <div className="md:flex">
            {/* 左侧资料区域 */}
            <div className="md:w-1/3 bg-gradient-to-b from-teal-500/10 to-teal-600/5 p-8 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-lg mb-6 hover:shadow-teal-500/20 transition-shadow duration-300">
                <Image
                  src="/images/avatar.jpg"
                  alt="博主头像"
                  fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              
                <h2 className="text-2xl font-bold text-text-primary mb-1">{profileData?.name || '路人の博客'}</h2>
                <p className="text-sm font-medium text-text-secondary mb-2 bg-teal-100 dark:bg-teal-800/40 px-3 py-1 rounded-full">{profileData?.title || '全栈开发工程师'}</p>
              
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-text-secondary hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mr-3 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors transform group-hover:scale-110 duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                    </div>
                    <a href={`mailto:${profileData?.email || 'example@example.com'}`} className="hover:text-primary transition-colors">
                      {profileData?.email || 'example@example.com'}
                  </a>
                </div>
                  <div className="flex items-center text-text-secondary hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mr-3 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors transform group-hover:scale-110 duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                    </div>
                    <a href={`https://${profileData?.github || 'github.com/yourusername'}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {profileData?.github || 'github.com/yourusername'}
                  </a>
                </div>
                  <div className="flex items-center text-text-secondary hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mr-3 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors transform group-hover:scale-110 duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                    </div>
                  <span>欢迎交流技术话题</span>
                </div>
              </div>
            </div>
            
            {/* 右侧内容区域 */}
              <div className="md:w-2/3 p-8 md:p-10">
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-text-primary flex items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                    </div>
                  个人介绍
                </h3>
                  <div className="mt-4 text-text-secondary space-y-3 leading-relaxed">
                    {profileData?.bio?.split('\n\n').map((paragraph, index) => (
                      index === 0 ? (
                        <p key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border-l-4 border-teal-400 dark:border-teal-600">
                          {paragraph}
                        </p>
                      ) : (
                        <p key={index}>{paragraph}</p>
                      )
                    )) || (
                      <>
                        <p className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border-l-4 border-teal-400 dark:border-teal-600">
                    你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。我在软件行业工作已有多年，经历了从传统网站开发到现代JavaScript框架的整个演变过程。
                  </p>
                  <p>
                    通过这个博客，我希望能够分享我在技术领域的所见所闻和经验心得，同时也记录自己的学习和成长历程。
                  </p>
                      </>
                    )}
                </div>
              </div>
              
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-text-primary flex items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                    </div>
                  技能和专长
                </h3>
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {profileData?.skills ? (
                      // 将技能分成两列
                      [...Array(2)].map((_, columnIndex) => {
                        const startIndex = columnIndex * Math.ceil(profileData.skills.length / 2);
                        const endIndex = startIndex + Math.ceil(profileData.skills.length / 2);
                        const columnSkills = profileData.skills.slice(startIndex, endIndex);
                        
                        return (
                          <div key={columnIndex} className="space-y-4">
                            {columnSkills.map((skill, index) => (
                              <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{skill.percentage}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-inner"
                                    style={{ width: animateSkills ? `${skill.percentage}%` : '0%' }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="space-y-4">
                  {[
                            { name: 'React/Next.js', percentage: 90 },
                            { name: 'JavaScript/TypeScript', percentage: 85 },
                            { name: 'CSS/Tailwind', percentage: 80 },
                          ].map((skill, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{skill.percentage}%</span>
                              </div>
                              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-inner"
                                  style={{ width: animateSkills ? `${skill.percentage}%` : '0%' }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          {[
                            { name: 'Node.js', percentage: 75 },
                            { name: '数据库设计', percentage: 65 },
                            { name: '性能优化', percentage: 70 },
                  ].map((skill, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{skill.percentage}%</span>
                      </div>
                              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                                  className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-inner"
                                  style={{ width: animateSkills ? `${skill.percentage}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                        </div>
                      </>
                    )}
                </div>
              </div>
              
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-text-primary flex items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                    </div>
                    兴趣爱好
                </h3>
                  <div className="mt-4">
                    <p className="text-text-secondary mb-4">{profileData?.hobbies || '除了编程，我还喜欢...'}</p>
                    <div className="flex flex-wrap gap-2">
                      {(profileData?.hobbyTags || ['阅读', '写作', '摄影', '旅行', '音乐']).map((hobby, index) => (
                        <span
                          key={index}
                          className={cn(
                            "bg-teal-50 dark:bg-teal-900/30",
                            "text-teal-700 dark:text-teal-300",
                            "px-3 py-1 rounded-full text-sm font-medium",
                            "hover:bg-teal-100 dark:hover:bg-teal-800/40",
                            "transition-colors duration-200"
                          )}
                        >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Card>
        </div>
      </Section>
      
      {/* 可以添加更多内容部分 */}
      <Section className="py-8 bg-gray-50 dark:bg-gray-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-text-secondary">感谢您访问我的个人博客！</p>
      </div>
      </Section>
    </div>
  );
} 