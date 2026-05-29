import { useState, useEffect } from 'react';
import { FileCode, Copy, Trash2, Check, Hash } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function TextToSlug() {
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generatedSlug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="text-to-slug"
      title="URL Slug Generator"
      description="Convert any text into a search-engine-friendly SEO slug instantly."
      category="Text Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a URL Slug?</h2>
            <p className="text-gray-600">
              A <strong>URL Slug</strong> is the part of a web address that identifies a specific page in a human-readable format. For example, in the URL <code>example.com/how-to-bake-a-cake</code>, the slug is "how-to-bake-a-cake".
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why are Slugs Important for SEO?</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Keyword Richness:</strong> Including your primary keywords in the slug helps search engines understand the page content.</li>
              <li><strong>User Experience:</strong> A clean slug tells the user exactly what to expect before they even click the link.</li>
              <li><strong>Shareability:</strong> Short, descriptive slugs look professional when shared on social media or messaging apps.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Slug Generation Logic</h3>
            <p className="text-gray-600 mb-4">
              Our tool follows industry best practices for SEO slugs:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2">
              <li>Converts all characters to <strong>lowercase</strong>.</li>
              <li>Replaces spaces and underscores with <strong>hyphens</strong> (-).</li>
              <li>Removes special characters and symbols.</li>
              <li>Trims trailing hyphens for a clean finish.</li>
            </ol>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Input Title / Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700"
              placeholder="e.g. How to Build a Modern Website in 2026"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between gap-4">
            <div className="overflow-hidden">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Generated Slug</span>
              <span className="text-lg font-mono font-bold text-blue-600 break-all">{slug || 'your-slug-here'}</span>
            </div>
            <button
              onClick={handleCopy}
              disabled={!slug}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
