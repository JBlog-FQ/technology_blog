// 为Next.js页面组件提供类型扩展
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

declare module 'next' {
  // 修复PageProps类型问题
  interface PageProps {
    params: Params;
    searchParams?: Record<string, string | string[]>;
  }

  // 确保可以直接传递params对象
  export interface GetStaticPropsContext {
    params?: Params;
    preview?: boolean;
    previewData?: unknown;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
  }
} 