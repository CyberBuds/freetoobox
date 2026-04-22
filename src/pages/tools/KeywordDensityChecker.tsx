import { useState } from 'react';
import { Search, Hash, Trash2, LayoutGrid } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [view, setView] = useState<'table' | 'grid'>('table');

  const analyzeKeywords = () => {
    if (!text.trim()) return [];

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2); // Filter small words

    const freq: { [key: string]: number } = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);

    const total = words.length;
    return Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / total) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords
  };

  const keywords = analyzeKeywords();

  return (
    <ToolPageLayout
      toolId="keyword-density-checker"
      title="Keyword Density Checker"
      description="Analyze your content to find most common words and phrases. Optimize your keyword frequency for better SEO."
      category="SEO Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Keyword Density?</h2>
            <p className="text-gray-600">
              <strong>Keyword Density</strong> refers to the percentage of times a keyword or phrase appears on a web page compared to the total number of words on the page. In the context of SEO, it is used as a measure to determine whether a web page is relevant to a specific keyword or keyword phrase.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Is there an "Ideal" Keyword Density?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Search engines have complex algorithms, and there is no single "golden percentage." However, most SEO experts recommend a density of <strong>1-2%</strong> for your primary keyword.
            </p>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
               <p className="text-xs text-orange-800 font-bold">⚠️ Warning: Keyword Stuffing</p>
               <p className="text-[10px] text-orange-700 font-medium">Over-optimizing your content (e.g., 5%+ density) can lead to penalties from Google as it appears unnatural and created "for bots" rather than humans.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">How to Optimize Your Content</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
              <li><strong>Natural Writing:</strong> Focus on creating comprehensive, valuable content first.</li>
              <li><strong>LSI Keywords:</strong> Use related terms and synonyms (Latent Semantic Indexing) instead of repeating the same word.</li>
              <li><strong>Contextual Use:</strong> Place keywords in high-value areas like the first paragraph, H1/H2 tags, and the concluding summary.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
               <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Your Content</label>
               <button onClick={() => setText('')} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
               </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 leading-relaxed"
              placeholder="Paste your article or copy here to analyze density..."
            />
          </div>

          {keywords.length > 0 && (
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                     <Search className="h-5 w-5 text-blue-600" /> Top Keyword Insights
                  </h3>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                     <button onClick={() => setView('table')} className={`p-2 rounded-md ${view === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 font-bold'}`}><Hash className="h-4 w-4" /></button>
                     <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 font-bold'}`}><LayoutGrid className="h-4 w-4" /></button>
                  </div>
               </div>

               {view === 'table' ? (
                 <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                          <tr>
                             <th className="px-6 py-4">Keyword</th>
                             <th className="px-6 py-4">Count</th>
                             <th className="px-6 py-4">Density</th>
                             <th className="px-6 py-4 text-right">Indicator</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {keywords.map((kw, i) => (
                             <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-700">{kw.word}</td>
                                <td className="px-6 py-4 text-gray-500">{kw.count}</td>
                                <td className="px-6 py-4 text-gray-900 font-medium">{kw.percentage}%</td>
                                <td className="px-6 py-4 text-right">
                                   <div className="w-24 bg-gray-100 h-1.5 rounded-full inline-block overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${Number(kw.percentage) > 3 ? 'bg-orange-400' : 'bg-blue-500'}`} 
                                        style={{ width: `${Math.min(Number(kw.percentage) * 10, 100)}%` }} 
                                      />
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {keywords.map((kw, i) => (
                       <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                          <span className="text-lg font-black text-blue-600">{kw.percentage}%</span>
                          <span className="text-xs font-bold text-gray-700 mt-1">{kw.word}</span>
                          <span className="text-[10px] text-gray-400 uppercase mt-1 tracking-wider">{kw.count} times</span>
                       </div>
                    ))}
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
