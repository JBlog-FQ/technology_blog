'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/utils/auth';

interface Skill {
  name: string;
  level: number;
}

interface ProfileData {
  name: string;
  title: string;
  email: string;
  github: string;
  bio: string;
  hobbies: string;
  hobbyTags: string[] | string;
  skills: Array<{name: string; percentage?: number; level?: number}>;
}

interface FormData {
  name: string;
  title: string;
  email: string;
  github: string;
  bio: string;
  hobbies: string;
  hobbyTags: string;
  skills: Skill[];
}

export default function EditAboutPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // 表单数据
  const [formData, setFormData] = useState<FormData>({
    name: '路人の博客',
    title: '全栈开发工程师',
    email: 'example@example.com',
    github: 'github.com/yourusername',
    bio: '你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。我在软件行业工作已有多年，经历了从传统网站开发到现代JavaScript框架的整个演变过程。\n\n通过这个博客，我希望能够分享我在技术领域的所见所闻和经验心得，同时也记录自己的学习和成长历程。',
    hobbies: '除了编码，我还喜欢阅读技术书籍、参加技术交流活动、尝试新技术和工具。在空闲时间，我喜欢徒步旅行、摄影和探索新地方。',
    hobbyTags: '技术阅读,徒步旅行,摄影,音乐,开源贡献',
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'CSS/Tailwind', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: '数据库设计', level: 65 },
      { name: '性能优化', level: 70 },
    ]
  });

  useEffect(() => {
    // 检查用户是否是管理员
    const admin = isAdmin();
    setIsAuthorized(admin);
    
    if (!admin) {
      // 如果不是管理员，重定向到登录页面
      router.push('/admin/login');
      return;
    }
    
    // 加载个人资料数据
    async function loadProfileData() {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json() as ProfileData;
          setFormData({
            ...data,
            hobbyTags: Array.isArray(data.hobbyTags) ? data.hobbyTags.join(',') : data.hobbyTags,
            skills: data.skills.map((skill: {name: string; percentage?: number; level?: number}) => ({
              name: skill.name,
              level: skill.percentage || skill.level || 0
            }))
          });
        }
      } catch (error) {
        console.error('加载个人资料数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProfileData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: field === 'level' ? parseInt(value) : value
      };
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // 准备数据
      const profileData = {
        ...formData,
        hobbyTags: formData.hobbyTags.split(',').map(tag => tag.trim()).filter(Boolean),
        skills: formData.skills.map(skill => ({
          name: skill.name,
          percentage: skill.level
        }))
      };
      
      // 发送到API保存
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (response.ok) {
        alert('个人信息已成功更新！');
    // 更新后返回关于页面
    router.push('/about');
      } else {
        const errorData = await response.json();
        alert(`保存失败: ${errorData.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('保存个人资料失败:', error);
      alert('保存失败，请稍后再试!');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">验证权限中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // 将由useEffect中的重定向处理
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">编辑个人信息</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">更新您的个人资料和技能信息</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* 基本信息 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    基本信息
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        显示名称
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        职业/头衔
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        邮箱
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub
                      </label>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                {/* 个人介绍 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    个人介绍
                  </h2>
                  
                  <textarea
                    name="bio"
                    rows={5}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                {/* 技能和专长 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    技能和专长
                  </h2>
                  
                  <div className="space-y-4">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="技能名称"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                            className="w-full accent-teal-600"
                          />
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded-md text-sm">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 爱好与兴趣 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    爱好与兴趣
                  </h2>
                  
                  <div className="space-y-4">
                    <textarea
                      name="hobbies"
                      rows={3}
                      value={formData.hobbies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        兴趣标签（用逗号分隔）
                      </label>
                      <input
                        type="text"
                        name="hobbyTags"
                        value={formData.hobbyTags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.hobbyTags.split(',').map((tag, index) => (
                          tag.trim() && (
                            <span key={index} className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">
                              {tag.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 提交按钮 */}
              <div className="flex justify-end space-x-4 mt-8">
                <Link
                  href="/about"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 border border-transparent text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSaving && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSaving ? '保存中...' : '保存修改'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 