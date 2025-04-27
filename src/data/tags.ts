import { blogPosts } from './blogPosts';
import { Tag } from '@/types/blog';

export const getAllTags = (): Tag[] => {
  // 创建一个集合存储所有标签
  const tagsSet = new Set<string>();
  
  // 收集所有博客文章中的标签
  blogPosts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagsSet.add(tag);
      });
    }
  });
  
  // 将标签集合转换为数组并格式化为Tag对象
  return Array.from(tagsSet).map(tagName => {
    // 计算包含该标签的文章数量
    const count = blogPosts.filter(post => 
      post.tags && post.tags.includes(tagName)
    ).length;
    
    return {
      name: tagName,
      count
    };
  });
}; 