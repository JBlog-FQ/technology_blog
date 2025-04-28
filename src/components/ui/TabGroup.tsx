import { cn } from '@/lib/utils';

interface TabGroupProps {
  tabs: {
    id: string;
    label: string;
    color?: string;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabGroup({ tabs, activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const colorClass = tab.color || 'teal';
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-6 py-2 rounded-full font-medium transition-all duration-200',
              isActive
                ? `bg-${colorClass}-500 text-white shadow-lg shadow-${colorClass}-500/20`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
} 