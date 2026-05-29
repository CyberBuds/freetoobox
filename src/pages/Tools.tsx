import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import SEO from '@/components/SEO';
import { TOOLS, CATEGORIES } from '@/constants';
import { Search } from 'lucide-react';

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = !categoryFilter || tool.category.toLowerCase().replace(' ', '-') === categoryFilter;
      const matchesSearch = !searchQuery || 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (categoryFilter) params.category = categoryFilter;
    if (localSearch) params.q = localSearch;
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Explore All Tools - FreeToolsBox"
        description="Browse our complete collection of 50+ free online tools. From unit converters to professional financial calculators, we have it all."
      />
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-lg text-gray-500">Browse our complete collection of free online utilities.</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => {
            const params: Record<string, string> = {};
            if (searchQuery) params.q = searchQuery;
            setSearchParams(params);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!categoryFilter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => {
              const params: Record<string, string> = { category: cat.name.toLowerCase().replace(' ', '-') };
              if (searchQuery) params.q = searchQuery;
              setSearchParams(params);
            }}
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
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100 flex flex-col items-center gap-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <Search className="h-8 w-8 text-gray-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">No tools found</p>
              <p className="text-gray-500 mt-1">
                {searchQuery 
                  ? `We couldn't find any tools matching "${searchQuery}".`
                  : "No tools found in this category yet."}
              </p>
              <button 
                onClick={() => {
                  setLocalSearch('');
                  setSearchParams({});
                }}
                className="mt-6 text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      <AdPlaceholder className="h-40" label="Tools Page Ad" />
    </div>
  );
}
