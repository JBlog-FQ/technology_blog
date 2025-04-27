'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';

// 基础样式
import 'prismjs/themes/prism.css';
// 导入额外的样式主题 (可选择适合你网站的主题)
import 'prismjs/themes/prism-okaidia.css'; // 暗色主题

export default function PrismHighlight() {
  useEffect(() => {
    // 客户端加载语言扩展
    const loadLanguages = async () => {
      // 基本语言
      await import('prismjs/components/prism-javascript');
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-jsx');
      await import('prismjs/components/prism-tsx');
      await import('prismjs/components/prism-css');
      await import('prismjs/components/prism-scss');
      await import('prismjs/components/prism-python');
      await import('prismjs/components/prism-java');
      await import('prismjs/components/prism-bash');
      await import('prismjs/components/prism-json');
      await import('prismjs/components/prism-markdown');
      
      // 可以根据需要添加更多语言
      
      // 手动高亮页面上的所有代码块
      Prism.highlightAll();
    };
    
    loadLanguages().catch(console.error);
    
    // 添加主题切换时重新高亮的监听器
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          // 检测到暗色模式切换时重新应用高亮
          setTimeout(() => Prism.highlightAll(), 50);
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // 这个组件不渲染任何内容
  return null;
} 