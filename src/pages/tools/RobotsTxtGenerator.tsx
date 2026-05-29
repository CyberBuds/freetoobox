import { useState } from 'react';
import { FileText, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function RobotsTxtGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [allowAdmin, setAllowAdmin] = useState(false);
  const [copied, setCopied] = useState(false);

  const robotsContent = `User-agent: *
Allow: /
${allowAdmin ? '' : 'Disallow: /admin/\nDisallow: /wp-admin/'}
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="robots-txt-generator"
      title="Robots.txt File Generator"
      description="Create a custom robots.txt file to guide search engine spiders on how to crawl your website."
      category="SEO Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Robots.txt File?</h2>
            <p className="text-gray-600">
              A <strong>Robots.txt</strong> file is a simple text file placed in your website's root directory. It is part of the <strong>Robots Exclusion Protocol (REP)</strong>, which is used by websites to communicate with web crawlers and other web robots. It tells the robots which parts of the site they should crawl and which they should ignore.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Directives Explained</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>User-agent: *</strong> This tells all search engine bots (Google, Bing, Yahoo) to follow the rules that follow.</li>
              <li><strong>Disallow: /</strong> This tells robots not to crawl any part of your site (Use with caution!).</li>
              <li><strong>Allow: /</strong> This gives bots permission to crawl your entire site.</li>
              <li><strong>Sitemap:</strong> Providing your sitemap URL helps bots find and index your pages much faster.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Why is it Critical for SEO?</h3>
            <p className="text-gray-600">
              A poorly configured robots.txt file can accidentally block Google from indexing your entire site, making you invisible in search results. Conversely, a well-tuned file can prevent "Crawl Waste" by telling bots to ignore low-value pages like <code>/search</code>, <code>/cart</code>, or private admin directories.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Sitemap URL (Optional)</label>
              <input
                type="text"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://example.com/sitemap.xml"
              />
            </div>

            <div className="space-y-4">
               <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Default Crawl Settings</label>
               <div className="space-y-3">
                 <label className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowAdmin}
                      onChange={(e) => setAllowAdmin(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Allow Crawling of Admin Folders</span>
                 </label>
                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-xs text-blue-800 font-medium italic">Standard "Allow: /" directive is automatically added for general crawling.</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                   <FileText className="h-4 w-4" /> Final Robots.txt Output
                </label>
                <div className="flex gap-2">
                   <button onClick={handleCopy} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                      <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                    </button>
                    <button onClick={() => {setSitemapUrl(''); setAllowAdmin(false);}} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                </div>
             </div>
             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-[200px] font-mono text-sm leading-relaxed text-gray-700 whitespace-pre">
                {robotsContent}
             </div>
             <p className="text-[10px] text-gray-400 italic text-center">
               * Save this content as a <strong>robots.txt</strong> file and upload it to your website's root directory.
             </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
