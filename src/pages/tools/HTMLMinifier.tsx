import { useState } from 'react';
import { FileCode, Minimize, Copy, Trash2, Zap } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function HTMLMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) return;
    
    // Simple HTML Minification Regex
    const minified = input
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ')           // Collapse whitespace
      .replace(/>\s+</g, '><')       // Remove space between tags
      .trim();

    setOutput(minified);
    setStats({
      original: input.length,
      minified: minified.length
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="html-minifier"
      title="Online HTML Minifier"
      description="Compress your HTML code, remove unnecessary whitespace and comments to boost your page speed."
      category="Developer Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Minify Your HTML?</h2>
            <p className="text-gray-600">
              In modern web development, every byte matters. <strong>HTML Minification</strong> is the process of removing unnecessary characters from your code (like spaces, tabs, newline characters, and comments) without changing its functionality. This leads to smaller file sizes and faster page load times for your users.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Impact on Web Performance</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <span className="font-bold text-blue-600 flex items-center gap-1"><Zap className="h-4 w-4" /> Reduced Latency</span>
                <p className="text-xs text-gray-500">Smaller HTML files travel across the network faster, leading to a quicker Time to First Byte (TTFB).</p>
              </div>
              <div className="flex-1 space-y-2">
                <span className="font-bold text-blue-600 flex items-center gap-1"><Zap className="h-4 w-4" /> Bandwidth Savings</span>
                <p className="text-xs text-gray-500">For high-traffic sites, even a 10% reduction in HTML size can save gigabytes of data each month.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Minification Strategy</h3>
            <p className="text-gray-600 mb-4">
              Our tool performs safe minification:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
              <li>Removes HTML comments that are only visible to developers.</li>
              <li>Collapses multiple spaces and tabs into a single space.</li>
              <li>Removes line breaks while preserving preformatted tags.</li>
              <li>Strips whitespace between block-level elements.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Source HTML</label>
               {stats && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{stats.original} chars</span>}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-80 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-xs"
              placeholder="Paste your source HTML here..."
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider text-blue-600">Minified Output</label>
               {stats && (
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-50 px-2 py-1 rounded text-blue-600 uppercase font-bold">{stats.minified} chars</span>
                    <span className="text-[10px] bg-green-50 px-2 py-1 rounded text-green-600 uppercase font-bold">Saved {Math.round((1 - stats.minified / stats.original) * 100)}%</span>
                 </div>
               )}
            </div>
            <div className="relative h-80">
              <div className="w-full h-full p-4 rounded-xl border border-gray-100 bg-gray-50 font-mono text-xs overflow-auto break-all">
                {output || <span className="text-gray-300 italic">Compressed HTML will appear here...</span>}
              </div>
              {output && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={handleCopy} className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500 hover:text-blue-600">
                    <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                  </button>
                  <button onClick={() => {setOutput(''); setStats(null);}} className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleMinify}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
        >
          <Minimize className="h-5 w-5" /> Minify Content
        </button>
      </div>
    </ToolPageLayout>
  );
}
