'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface MetadataHelperProps {
  preloadPaths?: string[];
}

/**
 * 一个客户端组件，用于预加载特定路径和优化关键资源
 */
export default function MetadataHelper({ preloadPaths = [] }: MetadataHelperProps) {
  const pathname = usePathname();

  // 预加载关键路径
  useEffect(() => {
    // 获取所有需要预加载的路径
    const pathsToPreload = [...preloadPaths];

    // 根据当前路径添加可能的相关路径
    if (pathname.startsWith('/blog/')) {
      pathsToPreload.push('/blog');
    } else if (pathname === '/blog') {
      // 如果在博客列表页，预加载首页和关于页
      pathsToPreload.push('/', '/about');
    } else if (pathname === '/') {
      // 如果在首页，预加载博客列表页和关于页
      pathsToPreload.push('/blog', '/about');
    }

    // 创建预加载链接
    pathsToPreload.forEach(path => {
      if (path !== pathname) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      }
    });

    return () => {
      // 清理预加载链接
      document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, [pathname, preloadPaths]);

  return null;
} 