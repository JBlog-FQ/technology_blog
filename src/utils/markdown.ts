import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export const parseMarkdown = (markdownContent: string): string => {
  if (!markdownContent) {
    return '';
  }

  // 配置marked选项
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // 使用marked将Markdown转换为HTML
  const rawHtml = marked(markdownContent) as string;
  
  // 使用DOMPurify清理HTML，防止XSS攻击
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  
  return cleanHtml;
}; 