'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/utils/auth';

export default function AdminProtected({ children }) {
  const router = useRouter();

  useEffect(() => {
    // 在客户端检查权限
    if (!isAdmin()) {
      router.push('/admin/login');
    }
  }, [router]);

  // 不直接返回children，等待权限验证
  return (
    <div>
      {isAdmin() ? children : (
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background transition-theme">
          <div className="text-center">
            <h2 className="text-xl text-text-primary dark:text-text-primary transition-theme mb-2">
              正在验证权限...
            </h2>
          </div>
        </div>
      )}
    </div>
  );
} 