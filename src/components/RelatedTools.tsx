import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { TOOLS } from '@/constants';
import ToolCard from './ToolCard';

interface RelatedToolsProps {
  currentToolId: string;
  category: string;
}

export default function RelatedTools({ currentToolId, category }: RelatedToolsProps) {
  // Find tools in the same category, excluding the current one
  const related = TOOLS.filter(
    (tool) => tool.category === category && tool.id !== currentToolId
  ).slice(0, 3);

  // If not enough in the same category, fill with others
  if (related.length < 3) {
    const others = TOOLS.filter(
      (tool) => tool.id !== currentToolId && !related.find((r) => r.id === tool.id)
    ).slice(0, 3 - related.length);
    related.push(...others);
  }

  return (
    <section className="mt-16 border-t border-gray-100 pt-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Related Tools</h2>
        </div>
        <Link to="/tools" className="text-sm font-bold text-blue-600 hover:underline">
          View All Tools
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((tool) => (
          <ToolCard 
            key={tool.id}
            id={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            href={tool.href}
            category={tool.category}
          />
        ))}
      </div>
    </section>
  );
}
