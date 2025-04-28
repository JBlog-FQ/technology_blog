import { NextResponse } from 'next/server';
import { deleteBlob } from '@/lib/blob';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: '未提供URL' },
        { status: 400 }
      );
    }

    await deleteBlob(url);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
    );
  }
} 