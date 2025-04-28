export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  featured?: boolean;
  category?: string;
  readingTime?: number;
}

export interface Tag {
  name: string;
  count: number;
} 