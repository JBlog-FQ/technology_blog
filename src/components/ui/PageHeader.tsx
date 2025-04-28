import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="relative py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10 rounded-xl opacity-80 dark:opacity-30"></div>
      <div className="container relative mx-auto px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
} 