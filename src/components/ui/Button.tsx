import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  className?: string;
  prefetch?: boolean;
}

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent',
  secondary: 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700',
  outline: 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
  ghost: 'bg-transparent text-indigo-600 dark:text-indigo-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  href,
  className = '',
  prefetch,
  ...rest
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={combinedClassName}
        prefetch={prefetch}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={combinedClassName}
      disabled={isLoading}
      {...rest}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 