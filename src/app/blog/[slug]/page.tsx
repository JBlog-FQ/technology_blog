import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { blogPosts } from '@/data/blogPosts';
import { parseMarkdown } from '@/utils/markdown';
import { getPostBySlug } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';
import { BlogPost } from '@/types/blog';
import { Metadata } from 'next';

// 生成静态路径
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 动态生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
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
function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], count: number = 2): BlogPost[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    // 如果没有标签，返回最新的文章
    return [...allPosts]
      .filter(post => post.slug !== currentPost.slug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
  
  // 按标签匹配度和日期排序
  return [...allPosts]
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      // 计算标签匹配度
      const matchingTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ).length || 0;
      
      return { post, matchingTags };
    })
    .sort((a, b) => {
      // 首先按标签匹配度排序
      if (b.matchingTags !== a.matchingTags) {
        return b.matchingTags - a.matchingTags;
      }
      // 其次按日期排序
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .map(item => item.post)
    .slice(0, count);
}

// 使用服务器组件来渲染页面内容
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
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
  // 获取相关文章
  const relatedPosts = getRelatedPosts(post, blogPosts);
  
  // 将数据传递给客户端组件
  return <BlogPostClient 
    post={post} 
    contentHtml={contentHtml} 
    tableOfContents={tableOfContents}
    formattedDate={formattedDate}
    relatedPosts={relatedPosts}
  />;
} 