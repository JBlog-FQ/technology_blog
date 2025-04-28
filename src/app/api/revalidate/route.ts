import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// POST方法用于API调用
export async function POST(request: NextRequest) {
  try {
    // 从请求体中获取要重新验证的缓存标签
    const { tag = 'blog-posts' } = await request.json();
    
    // 重新验证指定标签的缓存
    revalidateTag(tag);
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      tag
    });
  } catch (error) {
    return NextResponse.json({
      revalidated: false,
      message: "重新验证失败",
      error: error instanceof Error ? error.message : "未知错误"
    }, { status: 500 });
  }
}

// GET方法用于浏览器访问或开发调试
export async function GET(request: NextRequest) {
  try {
    // 从URL参数中获取要重新验证的缓存标签
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag') || 'blog-posts';
    
    // 重新验证指定标签的缓存
    revalidateTag(tag);
    
    // 同时重新验证博客路径
    revalidatePath('/blog');
    revalidatePath('/');
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      tag,
      message: `成功重新验证标签: ${tag}`
    });
  } catch (error) {
    console.error('重新验证失败:', error);
    return NextResponse.json({
      revalidated: false,
      message: "重新验证失败",
      error: error instanceof Error ? error.message : "未知错误"
    }, { status: 500 });
  }
} 