import { useState } from 'react';
import { FileCode, Minimize, Copy, Trash2, Zap } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) return;
    
    // Safety check: Basic regex for CSS minification
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')             // Collapse whitespace
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // Remove spaces around characters
      .replace(/\;+}/g, '}')           // Remove trailing semicolons
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
      toolId="css-minifier"
      title="Online CSS Minifier"
      description="Shrink your CSS files automatically by removing comments and unnecessary whitespace."
      category="Developer Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering CSS Optimization</h2>
            <p className="text-gray-600">
              User experience on the web is directly linked to performance. <strong>CSS Minification</strong> is a critical step in a professional web deployment workflow. By stripping away everything the browser doesn't need to interpret your styles, you can shave valuable milliseconds off your First Contentful Paint (FCP).
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits of Lean Stylesheets</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><Zap className="h-4 w-4 text-blue-600" /></div>
                <div>
                   <span className="font-bold text-gray-800">Faster Parsing:</span>
                   <p className="text-xs text-gray-500 font-medium">Browsers parse smaller files faster, allowing the rendering engine to start building the layout sooner.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><Zap className="h-4 w-4 text-blue-600" /></div>
                <div>
                   <span className="font-bold text-gray-800">SEO Superiority:</span>
                   <p className="text-xs text-gray-500 font-medium">Page speed is a known ranking factor. Optimized CSS helps you climb the Google search result pages.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Safe Conversion Logic</h3>
            <p className="text-gray-600 mb-4">
              Our algorithm ensures your CSS remains functional while being as compact as possible:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
              <li>Strips all <code>/* content */</code> comments.</li>
              <li>Removes unnecessary spaces around <code>:</code>, <code>;</code>, <code>{'{'}</code>, and <code>{'}'}</code>.</li>
              <li>Collapses multiple newlines into a single block.</li>
              <li>Optional: Removes trailing semicolons from the last property of a block.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Source CSS</label>
               {stats && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{stats.original} chars</span>}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-80 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-xs"
              placeholder=".button { display: block; border: 1px solid #ccc; }"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider text-blue-600">Compressed Output</label>
               {stats && (
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-50 px-2 py-1 rounded text-blue-600 uppercase font-bold">{stats.minified} chars</span>
                    <span className="text-[10px] bg-green-50 px-2 py-1 rounded text-green-600 uppercase font-bold">Saved {Math.round((1 - stats.minified / stats.original) * 100)}%</span>
                 </div>
               )}
            </div>
            <div className="relative h-80">
              <div className="w-full h-full p-4 rounded-xl border border-gray-100 bg-gray-50 font-mono text-xs overflow-auto break-all">
                {output || <span className="text-gray-300 italic">Compressed CSS will appear here...</span>}
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
