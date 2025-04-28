import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { blogPosts } from '@/data/blogPosts';
import { parseMarkdown } from '@/utils/markdown';
import BlogPostClient from './BlogPostClient';
import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';

// 禁用所有页面缓存，确保每次访问都获取最新数据
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 生成静态路径
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug) as string;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

// 辅助函数：从HTML内容中提取标题生成目录
function extractToc(htmlContent: string) {
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

// 获取相关文章
function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3) {
  // 如果没有标签，返回最新的几篇文章（排除当前文章）
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return allPosts
      .filter(post => post.id !== currentPost.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
  
  // 根据标签相似性排序文章
  return allPosts
    .filter(post => post.id !== currentPost.id) // 排除当前文章
    .map(post => {
      const commonTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ).length || 0;
      
      return { post, commonTags };
    })
    .sort((a, b) => {
      if (b.commonTags !== a.commonTags) {
        return b.commonTags - a.commonTags; // 首先按共同标签数量排序
      }
      // 如果共同标签数量相同，按日期排序
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(item => item.post);
}

// 从文件系统读取完整博客内容
async function readFullPostContent(slug: string): Promise<string | null> {
  try {
    const contentPath = path.join(process.cwd(), 'content', `${slug}.md`);
    if (fs.existsSync(contentPath)) {
      const content = fs.readFileSync(contentPath, 'utf-8');
      return content;
    }
    return null;
  } catch (error) {
    console.error(`读取文章内容失败: ${slug}`, error);
    return null;
  }
}

// 使用服务器组件来渲染页面内容
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = await Promise.resolve(params.slug) as string;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // 确保封面图像路径正确
  const enhancedPost = {
    ...post,
    coverImage: post.coverImage && !post.coverImage.startsWith('/') ? 
      `/${post.coverImage}` : post.coverImage
  };

  // 从文件系统读取完整内容
  const fullContent = await readFullPostContent(slug);
  const contentToUse = fullContent || post.content;
  
  // 在服务器端解析Markdown
  const contentHtml = parseMarkdown(contentToUse);
  // 从HTML内容中提取目录结构
  const tableOfContents = extractToc(contentHtml);
  // 在服务器端格式化日期
  const formattedDate = format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN });
  // 获取相关文章
  const relatedPosts = getRelatedPosts(post, blogPosts);
  
  // 将数据传递给客户端组件
  return <BlogPostClient 
    post={enhancedPost}
    contentHtml={contentHtml} 
    tableOfContents={tableOfContents}
    formattedDate={formattedDate}
    relatedPosts={relatedPosts}
  />;
} 