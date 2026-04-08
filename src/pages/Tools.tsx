import { useSearchParams } from 'react-router-dom';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { TOOLS, CATEGORIES } from '@/constants';

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredTools = categoryFilter
    ? TOOLS.filter(t => t.category.toLowerCase().replace(' ', '-') === categoryFilter)
    : TOOLS;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
        <p className="text-lg text-gray-500">Browse our complete collection of free online utilities.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!categoryFilter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSearchParams({ category: cat.name.toLowerCase().replace(' ', '-') })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoryFilter === cat.name.toLowerCase().replace(' ', '-') ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <ToolCard 
              key={tool.id}
              id={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={tool.href}
              category={tool.category}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500">No tools found in this category yet. Check back soon!</p>
          </div>
        )}
      </div>

      <AdPlaceholder className="h-40" label="Tools Page Ad" />
    </div>
  );
}
