import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  metadata?: {
    label: string;
    value: string;
  };
  actionLabel?: string;
}

export default function ArticleCard({
  title,
  description,
  category,
  tags,
  link,
  metadata,
  actionLabel = '阅读详情'
}: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300">
            {category}
          </span>
          {metadata && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metadata.value}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={link}
          className={cn(
            "inline-flex items-center justify-center w-full px-4 py-2",
            "bg-gradient-to-r from-teal-500 to-blue-500",
            "text-white font-medium rounded-lg",
            "hover:from-teal-600 hover:to-blue-600",
            "transform transition-all duration-200",
            "hover:scale-[1.02] hover:shadow-md"
          )}
        >
          {actionLabel}
        </a>
      </div>
    </motion.div>
  );
} 