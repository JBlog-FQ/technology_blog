import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化日期为"yyyy年MM月dd日"格式
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy年MM月dd日', { locale: zhCN });
}

/**
 * 格式化日期为"yyyy-MM-dd"格式
 */
export function formatDateISO(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}

/**
 * 格式化阅读时间
 */
export function formatReadingTime(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} 分钟阅读`;
}

/**
 * 截断文本并添加省略号
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
} 