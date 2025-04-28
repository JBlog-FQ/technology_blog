import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/blob';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '没有提供文件' },
        { status: 400 }
      );
    }

    // 检查文件类型是否为图片
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只能上传图片文件' },
        { status: 400 }
      );
    }

    // 为文件生成唯一名称
    const extension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${extension}`;

    // 上传到 Vercel Blob Storage
    const result = await uploadImage(file, fileName);

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '上传失败' },
      { status: 500 }
    );
  }
} 