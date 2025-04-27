/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import { BlogPost } from '@/types/blog';

// Define dummy functions for client-side
const isServer = typeof window === 'undefined';

// Type declarations for the modules
interface MatterResult {
  data: any;
  content: string;
}

// Only declare these variables in module scope
let fs: any;
let path: any;
let matter: any;
let uuid: any;

// Only import fs modules on server-side
if (isServer) {
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
  uuid = require('uuid');
}

export function getAllPostSlugs() {
  if (!isServer) return [];
  
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const fileNames: string[] = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName: string) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      };
    });
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!isServer) return null;
  
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the frontmatter
    const { data, content }: MatterResult = matter(fileContents);
    
    // Ensure all required fields exist
    const post: BlogPost = {
      id: data.id || uuid.v4(),
      title: data.title || 'Untitled',
      slug: slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      excerpt: data.excerpt || '',
      content: content,
      author: {
        name: data.author?.name || '博主',
        avatar: data.author?.avatar || '/images/avatar.jpg'
      },
      tags: data.tags || [],
      featured: data.featured || false,
      coverImage: data.coverImage || null
    };
    
    return post;
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  if (!isServer) return [];
  
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    // Ensure the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found at ${postsDirectory}`);
      return [];
    }
    
    const fileNames: string[] = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter((fileName: string) => fileName.endsWith('.md'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.md$/, '');
        const post = getPostBySlug(slug);
        return post;
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((post1: BlogPost, post2: BlogPost) => {
        return new Date(post2.date).getTime() - new Date(post1.date).getTime();
      });
    
    return allPosts;
  } catch (error) {
    console.error('Error loading all posts:', error);
    return [];
  }
} 