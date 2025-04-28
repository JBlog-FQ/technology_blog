'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import TabGroup from '@/components/ui/TabGroup';
import ArticleCard from '@/components/ui/ArticleCard';

interface ShareItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  readTime?: string;
  downloads?: number;
  link: string;
}

const knowledgeShares: ShareItem[] = [
  {
    id: '1',
    title: 'React 18新特性详解',
    description: '深入探讨React 18带来的新特性，包括并发渲染、自动批处理等重要更新。',
    tags: ['React', 'Frontend', 'JavaScript'],
    category: 'Web开发',
    readTime: '10 min',
    link: '/blog/react-18'
  },
  {
    id: '2',
    title: 'TypeScript高级类型指南',
    description: '学习TypeScript中的高级类型用法，提升代码的类型安全性。',
    tags: ['TypeScript', 'Programming'],
    category: '编程语言',
    readTime: '15 min',
    link: '/blog/typescript-advanced'
  }
];

const resourceShares: ShareItem[] = [
  {
    id: '1',
    title: '前端开发工具包',
    description: '精选的前端开发工具集合，包含常用的VSCode插件、Chrome扩展等。',
    tags: ['Tools', 'Frontend'],
    category: '工具资源',
    downloads: 1234,
    link: '/resources/frontend-toolkit'
  },
  {
    id: '2',
    title: 'UI设计资源包',
    description: '高质量UI设计资源，包含图标、插画和设计模板。',
    tags: ['Design', 'UI', 'Resources'],
    category: '设计资源',
    downloads: 856,
    link: '/resources/ui-kit'
  }
];

const tabs = [
  { id: 'knowledge', label: '知识分享', color: 'teal' },
  { id: 'resource', label: '资源分享', color: 'blue' }
];

export default function SharePage() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'resource'>('knowledge');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="分享中心"
        description="分享技术知识与优质资源，共同学习与成长"
      />

      <Section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TabGroup
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as 'knowledge' | 'resource')}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(activeTab === 'knowledge' ? knowledgeShares : resourceShares).map((item) => (
                <ArticleCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  tags={item.tags}
                  link={item.link}
                  metadata={
                    item.readTime
                      ? { label: '阅读时间', value: item.readTime }
                      : item.downloads
                      ? { label: '下载次数', value: `${item.downloads} 下载` }
                      : undefined
                  }
                  actionLabel={activeTab === 'knowledge' ? '阅读详情' : '下载资源'}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
} 