import React, { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export default function Tag({ children, onClick, active = false, className = '' }: TagProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors';
  const activeStyles = active
    ? 'bg-primary text-white'
    : 'bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700';
  
  return (
    <span 
      className={`${baseStyles} ${activeStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
} 