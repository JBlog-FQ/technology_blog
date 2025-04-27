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

// 生成slug (用于标题ID)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\- ]/g, '') // 保留中文字符
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// 自定义标记解析扩展
// 解析 ==highlighted text== 为 <mark>highlighted text</mark>
interface HighlightToken {
  type: string;
  raw: string;
  text: string;
}

const highlightExtension = {
  name: 'highlight',
  level: 'inline' as const,
  start(src: string) {
    return src.match(/==/)?.index;
  },
  tokenizer(src: string) {
    const rule = /^==([^=]+)==/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'highlight',
        raw: match[0],
        text: match[1].trim()
      };
    }
    return undefined;
  },
  renderer(token: HighlightToken) {
    return `<mark>${token.text}</mark>`;
  }
};

export const parseMarkdown = (markdownContent: string): string => {
  if (!markdownContent) {
    return '';
  }

  // 注册扩展
  marked.use({ 
    extensions: [highlightExtension],
    renderer: {
      listitem(text, task, checked) {
        if (task) {
          return `<li class="task-list-item">
            <input type="checkbox" class="task-list-item-checkbox" ${checked ? 'checked' : ''} disabled />
            ${text}
          </li>`;
        }
        return false;
      }
    },
    gfm: true,      // 启用GitHub Flavored Markdown
    breaks: true    // 允许回车换行
  });

  // 设置自定义渲染器
  const renderer = new marked.Renderer();
  
  // 自定义标题渲染，添加ID以支持目录锚点
  renderer.heading = (text, level, raw) => {
    const id = slugify(raw);
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  
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
  
  // 增强图片渲染
  renderer.image = (href, title, text) => {
    return `<figure>
      <img src="${href}" alt="${text}" title="${title || text}" loading="lazy" />
      ${title ? `<figcaption>${title}</figcaption>` : ''}
    </figure>`;
  };
  
  // 增强表格渲染，支持对齐方式
  renderer.table = (header, body) => {
    return `<div class="table-container">
      <table>
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
  };
  
  // 启用自动链接
  renderer.link = (href, title, text) => {
    if (href === text && !title) {
      // 自动链接样式
      return `<a href="${href}" class="url-link">${text}</a>`;
    }
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}>${text}</a>`;
  };
  
  // 手动处理==text==标记格式（备用方案）
  const processHighlights = (html: string): string => {
    // 使用正则表达式匹配==text==并替换为<mark>text</mark>
    return html.replace(/==([^=]+)==/g, '<mark>$1</mark>');
  };
  
  // 配置marked选项
  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
    pedantic: false
  });
  
  // 使用marked将Markdown转换为HTML
  let rawHtml = marked(markdownContent) as string;
  
  // 应用高亮处理（以防扩展未能正常工作）
  rawHtml = processHighlights(rawHtml);
  
  // 处理任务列表（为复选框添加样式类）
  rawHtml = rawHtml.replace(/<li>\s*\[\s*\]\s*/g, '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled> ');
  rawHtml = rawHtml.replace(/<li>\s*\[\s*x\s*\]\s*/gi, '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked disabled> ');
  
  // 使用DOMPurify清理HTML，防止XSS攻击，但保留高亮标记
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['mark'],
    ADD_ATTR: ['checked']
  });
  
  return cleanHtml;
}; 