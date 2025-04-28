'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from 'react';
import Card, { CardContent } from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function Home() {
  const [bgImage, setBgImage] = useState("/images/1.jpg");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "⭐️未闻花名，但识花香。再见花时，泪已成行！⭐️";
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textAnimationRef = useRef<NodeJS.Timeout | undefined>();
  const isVisibleRef = useRef(true);
  const indexRef = useRef(0);

  // 重置动画
  const resetAnimation = () => {
    if (textAnimationRef.current) {
      clearInterval(textAnimationRef.current);
    }
    setDisplayedText("");
    indexRef.current = 0;
  };

  // 开始动画
  const startAnimation = () => {
    resetAnimation();
    
    textAnimationRef.current = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setDisplayedText(fullText.substring(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setTimeout(() => {
          indexRef.current = 0;
          setDisplayedText("");
          startAnimation();
        }, 2000);
        if (textAnimationRef.current) {
          clearInterval(textAnimationRef.current);
        }
      }
    }, 150);
  };

  // 处理下拉箭头点击
  const handleScrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 检查可见性并控制动画
  useEffect(() => {
    const checkVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible !== isVisibleRef.current) {
          isVisibleRef.current = isVisible;
          if (isVisible) {
            startAnimation();
      } else {
            resetAnimation();
      }
        }
      }
    };

    startAnimation();
    window.addEventListener('scroll', checkVisibility);
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      resetAnimation();
    };
  }, [fullText]);
  
  // 随机背景图
  useEffect(() => {
    const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomIndex = Math.floor(Math.random() * imageNumbers.length);
    const randomImage = `/images/${imageNumbers[randomIndex]}.jpg`;
    setBgImage(randomImage);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Hero Section */}
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="背景图片"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center mb-8">
            <p className="text-2xl md:text-3xl text-white font-medium tracking-wider">
              {displayedText}
              <span className="animate-blink">|</span>
            </p>
        </div>
        
          {/* 向下箭头 - 移动到文字下方 */}
        <div 
            className="mt-12 inline-block animate-bounce cursor-pointer"
          onClick={handleScrollDown}
        >
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
            </div>
        </div>
        </div>
      </section>

      {/* 内容区域 */}
      <div ref={contentRef} className="bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/50">
        {/* 简介部分 */}
        <Section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              欢迎来到我的博客
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              这里是我分享技术见解、学习心得和个人成长的空间。让我们一起探索编程的奥秘，分享知识的力量。
            </p>
          </div>

          {/* 特色内容卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-primary">技术探索</h3>
                <p className="text-text-secondary mb-4">深入探讨前沿技术，分享实践经验和解决方案。</p>
                <Link href="/blog" className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                  浏览文章
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>

            <Card className="transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-primary">知识分享</h3>
                <p className="text-text-secondary mb-4">整理学习笔记，分享编程心得和实用技巧。</p>
                <Link href="/share" className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                  查看分享
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>

            <Card className="transform hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-primary">项目展示</h3>
                <p className="text-text-secondary mb-4">展示个人项目和开源贡献，分享开发经验。</p>
                <Link href="/about" className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                  了解更多
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* 代码展示部分 */}
        <Section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-background">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">代码示例</span>
              </div>
              <div className="p-6">
                <pre className="text-sm font-mono bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">{`// 生活的意义
function exploreLife() {
  while (true) {
    learn();
    share();
    grow();
    // 保持热爱，奔赴山海
    keepPassion();
  }
}`}</code>
            </pre>
              </div>
            </div>
          </div>
        </Section>
        </div>
    </div>
  );
}
