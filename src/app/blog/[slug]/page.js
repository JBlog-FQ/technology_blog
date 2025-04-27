import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { blogPosts } from '@/data/blogPosts';
import { parseMarkdown } from '@/utils/markdown';
import { getPostBySlug } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';

// 生成静态路径
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 动态生成元数据
export async function generateMetadata({ params }) {
  // 确保params是完全解析的
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const post = blogPosts.find((post) => post.slug === slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }
  
  return {
    title: `${post.title} | 路人の博客`,
    description: post.excerpt,
  };
}

// 辅助函数：从HTML内容中提取标题生成目录
function extractToc(htmlContent) {
  // 从内容中匹配所有的 h1-h6 标签
  const headingRegex = /<h([1-6]).*?id="(.*?)".*?>(.*?)<\/h\1>/g;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // 去除HTML标签以获取纯文本
    const text = match[3].replace(/<[^>]*>/g, '');
    
    toc.push({ level, id, text });
  }

  return toc;
}

// 使用服务器组件来渲染页面内容
export default async function BlogPostPage({ params }) {
  // 确保params是完全解析的
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // 在服务器端解析Markdown
  const contentHtml = parseMarkdown(post.content);
  // 从HTML内容中提取目录结构
  const tableOfContents = extractToc(contentHtml);
  // 在服务器端格式化日期
  const formattedDate = format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN });
  
  // 将数据传递给客户端组件
  return <BlogPostClient 
    post={post} 
    contentHtml={contentHtml} 
    tableOfContents={tableOfContents}
    formattedDate={formattedDate}
  />;
} 