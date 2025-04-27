import React from 'react';
import Link from 'next/link';

interface TagsListProps {
  tags: string[];
  className?: string;
  linkTags?: boolean;
}

export default function TagsList({ tags, className = '', linkTags = false }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => {
        const tagComponent = (
          <span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          >
            {tag}
          </span>
        );
        
        return linkTags ? (
          <Link key={tag} href={`/blog/tags/${tag}`} className="hover:opacity-80 transition-opacity">
            {tagComponent}
          </Link>
        ) : (
          <React.Fragment key={tag}>
            {tagComponent}
          </React.Fragment>
        );
      })}
    </div>
  );
} 