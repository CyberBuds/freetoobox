import { useState } from 'react';
import { RefreshCw, Copy, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transform = (type: string) => {
    switch (type) {
      case 'upper': setText(text.toUpperCase()); break;
      case 'lower': setText(text.toLowerCase()); break;
      case 'sentence': 
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
        break;
      case 'title':
        setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0)).toUpperCase() + text.substr(1).toLowerCase());
        // Simple title case
        setText(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
        break;
      case 'camel':
        setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()));
        break;
      case 'pascal':
        const camel = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        setText(camel.charAt(0).toUpperCase() + camel.slice(1));
        break;
      case 'snake':
        setText(text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
        break;
      case 'slug':
        setText(text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''));
        break;
      default: break;
    }
  };

  return (
    <ToolPageLayout
      toolId="case-converter"
      title="Online Case Converter"
      description="Change your text between UPPERCASE, lowercase, Title Case, and more instantly."
      category="Text Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use a Case Converter?</h2>
            <p className="text-gray-600">
              Have you ever typed a whole paragraph with CAPS LOCK on by accident? Or perhaps you need to convert a product name into a <strong>URL-friendly slug</strong> or <strong>camelCase variable</strong> for coding? Our Online Case Converter is designed to handle these repetitive tasks in one click.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Common Case Types Explained</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <span className="font-bold text-blue-600">UPPERCASE:</span>
                <p className="text-xs text-gray-500">CONVERTS EVERY LETTER TO CAPITALS. Useful for emphasis or warnings.</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <span className="font-bold text-blue-600">Title Case:</span>
                <p className="text-xs text-gray-500">Capitalizes The First Letter Of Each Word. Preferred for headings and titles.</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <span className="font-bold text-blue-600">camelCase:</span>
                <p className="text-xs text-gray-500">noSpacesWithCapitalStartingSecondWord. Standard for JavaScript variables.</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm border border-gray-100">
                <span className="font-bold text-blue-600">Snake_Case:</span>
                <p className="text-xs text-gray-500">words_separated_by_underscores. Common in Python and database naming.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Save Time & Effort</h3>
            <p className="text-gray-600">
              Manually rewriting text just to change its case is a waste of productive time. Whether you're a developer, a content creator, or a student, our tool removes the friction from text formatting. Plus, with our "Slug" option, you can prepare text for SEO-friendly URLs instantly.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="mb-6 h-64 relative">
             <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-full p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 leading-relaxed font-mono text-sm"
              placeholder="Enter your text here..."
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                title="Copy text"
              >
                <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
              </button>
              <button
                onClick={() => setText('')}
                className="p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                title="Clear text"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'UPPERCASE', id: 'upper' },
              { label: 'lowercase', id: 'lower' },
              { label: 'Sentence case', id: 'sentence' },
              { label: 'Title Case', id: 'title' },
              { label: 'camelCase', id: 'camel' },
              { label: 'PascalCase', id: 'pascal' },
              { label: 'snake_case', id: 'snake' },
              { label: 'slug-case', id: 'slug' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => transform(btn.id)}
                className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-3 w-3" /> {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
