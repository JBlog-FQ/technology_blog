import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Prism from 'prismjs';

// 在服务器端引入Prism语言扩展
if (typeof window === 'undefined') {
  // 使用动态导入代替require
  const loadPrismLanguages = async () => {
    await import('prismjs/components/prism-javascript');
    await import('prismjs/components/prism-typescript');
    await import('prismjs/components/prism-jsx');
    await import('prismjs/components/prism-tsx');
    await import('prismjs/components/prism-css');
    await import('prismjs/components/prism-scss');
    await import('prismjs/components/prism-python');
    await import('prismjs/components/prism-java');
    await import('prismjs/components/prism-bash');
    await import('prismjs/components/prism-json');
    await import('prismjs/components/prism-markdown');
    await import('prismjs/components/prism-yaml');
    await import('prismjs/components/prism-go');
    await import('prismjs/components/prism-rust');
    await import('prismjs/components/prism-sql');
    await import('prismjs/components/prism-c');
    await import('prismjs/components/prism-cpp');
  };
  
  // 执行导入
  loadPrismLanguages().catch(console.error);
}

export const parseMarkdown = (markdownContent: string): string => {
  if (!markdownContent) {
    return '';
  }

  // 设置自定义渲染器
  const renderer = new marked.Renderer();
  
  // 自定义代码块渲染，应用Prism.js高亮
  renderer.code = (code, language = 'text') => {
    // 确保语言存在且受支持
    const validLanguage = Prism.languages[language] ? language : 'text';
    
    // 使用Prism高亮代码
    const highlightedCode = Prism.highlight(
      code,
      Prism.languages[validLanguage],
      validLanguage
    );
    
    // 返回带有语言类的高亮HTML
    return `<pre class="language-${validLanguage} code-block"><code class="language-${validLanguage}">${highlightedCode}</code></pre>`;
  };
  
  // 配置marked选项
  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true
  });
  
  // 使用marked将Markdown转换为HTML
  const rawHtml = marked(markdownContent) as string;
  
  // 使用DOMPurify清理HTML，防止XSS攻击
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  
  return cleanHtml;
}; 