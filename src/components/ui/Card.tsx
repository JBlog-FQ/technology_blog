import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div 
      className={`bg-card-bg dark:bg-card-bg border border-card-border rounded-lg shadow-sm ${
        hover ? 'hover:shadow-md hover:-translate-y-1' : ''
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`p-6 border-b border-card-border ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`p-6 border-t border-card-border ${className}`}>
      {children}
    </div>
  );
} 