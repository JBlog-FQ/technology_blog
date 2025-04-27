import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
}: CardProps) {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden';
  const hoverStyles = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  const paddingStyle = paddingStyles[padding];
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddingStyle} ${className}`}>
      {children}
    </div>
  );
} 