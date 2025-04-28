/**
 * 检查字符串是否为空
 */
export function isEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证URL格式
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证密码强度
 * 至少8位，包含大小写字母、数字和特殊字符
 */
export function isStrongPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
}

/**
 * 校验文件大小
 * @param fileSize 文件大小（字节）
 * @param maxSize 最大大小（MB）
 */
export function isValidFileSize(fileSize: number, maxSize: number): boolean {
  const maxBytes = maxSize * 1024 * 1024;
  return fileSize <= maxBytes;
}

/**
 * 验证文件类型
 */
export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  const fileExt = fileName.split('.').pop()?.toLowerCase() || '';
  return allowedTypes.includes(fileExt);
} 