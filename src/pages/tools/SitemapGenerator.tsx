import { useState } from 'react';
import { FileStack, Copy, Trash2, Download, Plus, X } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function SitemapGenerator() {
  const [urls, setUrls] = useState<string[]>(['https://example.com/']);
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    if (currentUrl && currentUrl.startsWith('http')) {
      setUrls([...urls, currentUrl]);
      setCurrentUrl('');
    }
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.80</priority>
  </url>`).join('\n')}
</urlset>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      toolId="sitemap-generator"
      title="XML Sitemap Generator"
      description="Create a professional XML sitemap to help search engines like Google index your website more effectively."
      category="SEO Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Importance of an XML Sitemap</h2>
            <p className="text-gray-600">
              An <strong>XML Sitemap</strong> is a file where you provide information about the pages, videos, and other files on your site, and the relationships between them. Search engines like Google read this file to more intelligently crawl your site. A sitemap tells search engines which pages and files you think are important in your site, and also provides valuable information about these files.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Google's Recommendation</h3>
            <p className="text-sm text-gray-600 italic">
              "If your site's pages are properly linked, our web crawlers can usually discover most of your site. Even so, a sitemap can improve the crawling of larger or more complex sites, or more specialized files."
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">When Do You Need a Sitemap?</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
              <li><strong>New Websites:</strong> If your site is new and has few external links, a sitemap is the fastest way to get indexed.</li>
              <li><strong>Large Websites:</strong> For sites with thousands of pages, a sitemap ensures that Google's crawlers don't miss anything.</li>
              <li><strong>Rich Media:</strong> If you have a lot of video or image content that you want to appear in search results.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Add Page URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/page-1"
                  onKeyPress={(e) => e.key === 'Enter' && addUrl()}
                />
                <button
                  onClick={addUrl}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto pr-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL List ({urls.length})</label>
              {urls.map((url, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 group">
                  <span className="text-xs font-medium text-gray-700 truncate mr-4">{url}</span>
                  <button onClick={() => removeUrl(idx)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                   <FileStack className="h-4 w-4" /> XML Preview
                </label>
                <div className="flex gap-2">
                   <button onClick={handleCopy} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                      <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                    </button>
                    <button onClick={handleDownload} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-green-600 transition-colors" title="Download sitemap.xml">
                      <Download className="h-4 w-4" />
                    </button>
                    <button onClick={() => setUrls([])} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                </div>
             </div>
             <div className="bg-gray-900 rounded-2xl p-6 h-[400px] border-4 border-gray-800 text-xs font-mono text-green-400 overflow-auto whitespace-pre leading-relaxed">
                {sitemapXml}
             </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
