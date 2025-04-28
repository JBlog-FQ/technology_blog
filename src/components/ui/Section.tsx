import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Section({ children, title, description, className = '' }: SectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-4 flex items-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-text-secondary dark:text-text-secondary mb-6 max-w-3xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
} 