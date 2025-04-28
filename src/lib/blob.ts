import { PutBlobResult, del, list, put } from '@vercel/blob';

// 上传图片到 Blob Storage
export async function uploadImage(
  file: File,
  filename: string
): Promise<PutBlobResult> {
  try {
    return await put(filename, file, {
      access: 'public',
    });
  } catch (error) {
    console.error('Error uploading image to Vercel Blob:', error);
    throw error;
  }
}

// 删除 Blob Storage 中的文件
export async function deleteBlob(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting blob:', error);
    throw error;
  }
}

// 列出所有 Blob Storage 中的文件
export async function listBlobs(prefix?: string) {
  try {
    return await list({ prefix });
  } catch (error) {
    console.error('Error listing blobs:', error);
    throw error;
  }
} 