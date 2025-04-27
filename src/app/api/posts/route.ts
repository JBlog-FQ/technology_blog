import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { BlogPost } from '@/types/blog';
import { blogPosts } from '@/data/blogPosts';

export async function POST(request: NextRequest) {
  try {
    // 获取表单数据
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const tagsString = formData.get('tags') as string;
    const author = formData.get('author') as string;
    const coverImage = formData.get('coverImage') as File | null;
    
    // 验证必填字段
    if (!file || !title || !slug) {
      return NextResponse.json(
        { message: '缺少必要的字段' },
        { status: 400 }
      );
    }
    
    // 检查slug是否已存在
    const slugExists = blogPosts.some(post => post.slug === slug);
    if (slugExists) {
      return NextResponse.json(
        { message: `URL别名 "${slug}" 已存在，请使用其他名称` },
        { status: 400 }
      );
    }
    
    // 解析标签
    const tags = tagsString
      ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];
    
    // 创建内容目录（如果不存在）
    const contentDir = path.join(process.cwd(), 'content');
    if (!existsSync(contentDir)) {
      await mkdir(contentDir, { recursive: true });
    }
    
    // 读取文件内容
    const buffer = Buffer.from(await file.arrayBuffer());
    const content = buffer.toString('utf-8');
    
    // 保存文件到content目录
    const fileName = `${slug}.md`;
    const filePath = path.join(contentDir, fileName);
    await writeFile(filePath, content);
    
    // 处理封面图片（如果有）
    let coverImagePath = '';
    if (coverImage) {
      // 创建图片目录（如果不存在）
      const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
      if (!existsSync(imagesDir)) {
        await mkdir(imagesDir, { recursive: true });
      }
      
      // 获取文件扩展名
      const fileExt = coverImage.name.split('.').pop()?.toLowerCase() || 'jpg';
      
      // 生成唯一的图片文件名
      const imageFileName = `${slug}-cover.${fileExt}`;
      const imagePath = path.join(imagesDir, imageFileName);
      
      // 保存图片
      const imageBuffer = Buffer.from(await coverImage.arrayBuffer());
      await writeFile(imagePath, imageBuffer);
      
      // 设置图片路径（相对于public目录）
      coverImagePath = `/images/blog/${imageFileName}`;
    }
    
    // 创建新文章对象
    const newPost: BlogPost = {
      id: uuidv4(),
      title,
      slug,
      date: new Date().toISOString().split('T')[0], // 当前日期，格式：YYYY-MM-DD
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      author: {
        name: author || '博主', // 可以从用户会话或配置中获取
        avatar: '/images/avatar.jpg'
      },
      tags
    };
    
    // 如果有封面图片，添加到文章对象
    if (coverImagePath) {
      newPost.coverImage = coverImagePath;
    }
    
    // 更新blogPosts数组（临时方案，实际应该持久化到数据库或文件）
    // 注意：这种方法在服务器重启后会丢失更改，仅用于演示
    blogPosts.unshift(newPost);
    
    // 持久化保存更新后的博客文章列表
    // 这个方法在生产环境中需要替换为适当的数据库操作
    try {
      const blogPostsPath = path.join(process.cwd(), 'src', 'data', 'blogPosts.ts');
      const blogPostsContent = await readFile(blogPostsPath, 'utf-8');
      
      // 使用正则表达式定位和替换blogPosts数组
      const updatedContent = blogPostsContent.replace(
        /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
        `export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};`
      );
      
      await writeFile(blogPostsPath, updatedContent);
    } catch (error) {
      console.error('保存博客文章列表失败:', error);
      // 即使保存失败，我们仍然继续，因为内存中的博客文章列表已经更新
    }
    
    return NextResponse.json(
      { 
        message: '文章发布成功', 
        slug: newPost.slug,
        post: newPost
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('文章发布失败:', error);
    return NextResponse.json(
      { message: '服务器错误，无法发布文章' },
      { status: 500 }
    );
  }
} 