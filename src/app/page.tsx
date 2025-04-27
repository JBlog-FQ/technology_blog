'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from 'react';

export const dynamic = 'force-static';

export default function Home() {
  const [bgImage, setBgImage] = useState("/images/1.jpg");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "⭐️未闻花名，但识花香。再见花时，泪已成行！⭐️";
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // 文字动画效果
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150); // 每个字符显示的时间间隔
    
    return () => clearInterval(timer);
  }, []);
  
  // 随机背景图
  useEffect(() => {
    const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomIndex = Math.floor(Math.random() * imageNumbers.length);
    const randomImage = `/images/${imageNumbers[randomIndex]}.jpg`;
    setBgImage(randomImage);
  }, []);

  // 处理下拉箭头点击
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen transition-theme">
      {/* Hero Section - 全屏背景图片 */}
      <section ref={sectionRef} className="relative h-[90vh] flex items-center justify-center transition-theme">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="背景图片"
            fill
            className="object-cover"
            priority
          />
          {/* 半透明遮罩，使文字更加清晰 */}
          <div className="absolute inset-0 bg-black/30 transition-theme"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="flex items-center justify-center mb-8">
            <p className="text-xl text-white min-h-[1.75rem] transition-theme">
              {displayedText}
              <span className="animate-blink">|</span>
            </p>
          </div>
        </div>
        
        {/* 向下箭头 - 确保在视口内可见 */}
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20 transition-theme"
          onClick={handleScrollDown}
        >
          <div className="bg-white/30 dark:bg-black/30 p-3 rounded-full backdrop-blur-sm transition-theme">
            <svg className="w-6 h-6 text-white transition-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>
      
      {/* 添加一个额外的部分让箭头有地方可以滚动到 */}
      <section className="h-screen flex items-center justify-center bg-card-bg transition-theme">
        <div className="ide-card p-8 m-4 rounded-lg max-w-2xl transition-theme">
          <h2 className="text-3xl font-bold mb-4 text-text-primary transition-theme">内容区域</h2>
          <p className="text-lg text-text-secondary transition-theme">这里可以放置更多的内容</p>
          <div className="mt-6 ide-code-block">
            <pre className="font-mono text-sm transition-theme">
              {`// 代码示例
function helloWorld() {
  console.log("欢迎访问路人の博客!");
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
