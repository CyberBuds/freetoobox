import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  category: string;
  className?: string;
}

export default function ToolCard({ title, description, icon: Icon, href, category, className }: ToolCardProps) {
  return (
    <Link to={href} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "group relative flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl hover:border-blue-200",
          className
        )}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
          {category}
        </span>
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mb-6 text-sm text-gray-500 line-clamp-2">
          {description}
        </p>
        <div
          className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Use Tool
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}
