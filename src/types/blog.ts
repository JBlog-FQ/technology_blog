export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  featured?: boolean;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

export interface Tag {
  name: string;
  count: number;
} 