import { useState } from 'react';
import { FileCode, Globe, Copy, Trash2, Eye } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function MetaTagGenerator() {
  const [data, setData] = useState({
    title: 'FreeToolsBox - 100% Free Online Tools',
    description: 'Professional-grade calculators, SEO tools, and image utilities.',
    keywords: 'free tools, seo, calculator',
    author: 'FreeToolsBox',
    type: 'website',
    url: 'https://www.freetoolsbox.in',
    image: 'https://www.freetoolsbox.in/og-image.png',
  });
  const [copied, setCopied] = useState(false);

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}">
<meta name="description" content="${data.description}">
<meta name="keywords" content="${data.keywords}">
<meta name="author" content="${data.author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${data.type}">
<meta property="og:url" content="${data.url}">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${data.url}">
<meta property="twitter:title" content="${data.title}">
<meta property="twitter:description" content="${data.description}">
<meta property="twitter:image" content="${data.image}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="meta-tag-generator"
      title="SEO Meta Tag Generator"
      description="Create search-engine-friendly meta tags to improve your website's ranking and social share appearance."
      category="SEO Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Importance of Meta Tags in 2026</h2>
            <p className="text-gray-600">
              While search engine algorithms have evolved, <strong>Meta Tags</strong> remain a foundational element of SEO. They provide hidden information to crawlers about the content of your page. A well-crafted Meta Description doesn't just help you rank; it directly influences your <strong>Click-Through Rate (CTR)</strong> from the search results page.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding the Tags</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-24 shrink-0">Title Tag:</span>
                <p className="text-gray-600">The most important SEO tag. It appears in the browser tab and search results. Keep it between 50-60 characters.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-24 shrink-0">Description:</span>
                <p className="text-gray-600">A brief summary of the page. Google often uses this as a snippet in results. Aim for 150-160 characters.</p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-24 shrink-0">Open Graph:</span>
                <p className="text-gray-600">Controls how your link looks when shared on Facebook, LinkedIn, and WhatsApp.</p>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Sharing Previews</h3>
            <p className="text-gray-600">
              By providing an <code>og:image</code>, you ensure that your website doesn't look like a plain text link when shared. A professional preview image can increase social engagement by over 300%. Our tool helps you generate the Twitter and Facebook tags automatically.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Globe className="h-4 w-4" /> Global Meta Settings
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Site Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({...data, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. FreeToolsBox - Online SEO Tools"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Site Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData({...data, description: e.target.value})}
                  className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Summarize your page content..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Keywords</label>
                  <input
                    type="text"
                    value={data.keywords}
                    onChange={(e) => setData({...data, keywords: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="seo, tools, free"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={data.author}
                    onChange={(e) => setData({...data, author: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Admin"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Eye className="h-4 w-4" /> Social Graph Settings
              </h3>
               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Page URL</label>
                  <input
                    type="text"
                    value={data.url}
                    onChange={(e) => setData({...data, url: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={data.image}
                    onChange={(e) => setData({...data, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://example.com/og.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Generated HTML</label>
               <div className="flex gap-2">
                 <button onClick={handleCopy} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                    <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                  </button>
                  <button onClick={() => setData({title: '', description: '', keywords: '', author: '', type: 'website', url: '', image: ''})} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
               </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 h-[400px] overflow-auto border-4 border-gray-800">
               <pre className="text-xs text-blue-400 font-mono leading-relaxed whitespace-pre-wrap">
                 {metaHtml}
               </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
