import { useState, useEffect } from 'react';
import { Search, Info, Check, Copy, AlertCircle, Sparkles } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function RegexTester() {
  const [regex, setRegex] = useState('([a-z]+)');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('The quick brown fox jumps over the lazy dog.');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (!regex) {
        setMatches([]);
        setError(null);
        return;
      }
      const re = new RegExp(regex, flags);
      const allMatches = Array.from(testText.matchAll(re));
      setMatches(allMatches);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
    }
  }, [regex, flags, testText]);

  const highlightText = () => {
    if (error || !regex || matches.length === 0) return testText;

    let result = [];
    let lastIndex = 0;

    matches.forEach((match, idx) => {
      const index = match.index!;
      const text = match[0];
      
      // Add text before match
      result.push(testText.substring(lastIndex, index));
      
      // Add highlighted match
      result.push(
        <span 
          key={idx} 
          className="bg-blue-200 text-blue-900 rounded-px border-b-2 border-blue-500 font-bold px-0.5"
          title={`Match ${idx + 1}: ${text}`}
        >
          {text}
        </span>
      );
      
      lastIndex = index + text.length;
    });

    // Add remaining text
    result.push(testText.substring(lastIndex));
    return result;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(regex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="regex-tester"
      title="Regex Tester"
      description="Test, validate, and debug your regular expressions in real-time with highlighted matches."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Master Regular Expressions</h2>
          <p className="text-gray-600 mb-4">
            Regular Expressions (Regex) are incredibly powerful for text processing but can be difficult to get right. Our Regex Tester provides instant visual feedback, helping you verify that your pattern matches exactly what you intend.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Common Flags</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>g (Global):</strong> Find all matches rather than stopping after the first.</li>
            <li><strong>i (Case-insensitive):</strong> Ignore case when matching.</li>
            <li><strong>m (Multiline):</strong> ^ and $ match the start/end of each line.</li>
          </ul>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-600" />
                Regular Expression
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg">/</span>
                <input 
                  type="text" 
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className={`w-full pl-8 pr-4 py-4 bg-gray-50 border ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} rounded-xl font-mono text-lg outline-none focus:ring-2 transition-all`}
                  placeholder="[a-z]+"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-lg">/</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Flags</label>
              <input 
                type="text" 
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-xl font-mono text-lg outline-none transition-all text-center"
                placeholder="gim"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-bold">Regex Error:</span> {error}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {copied ? <><Check className="h-4 w-4" /> Copied Regex</> : <><Copy className="h-4 w-4" /> Copy Regex</>}
            </button>
            <div className="px-6 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {matches.length} Matches Found
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-widest">
              Test String
            </label>
            <textarea
              className="w-full h-64 p-6 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm shadow-inner bg-white leading-relaxed"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter text to test against the regex..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-widest">
              Visual Highlights
            </label>
            <div className="w-full h-64 p-6 rounded-3xl border border-gray-200 bg-gray-50 overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap break-all shadow-inner">
              {highlightText()}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Regex Match Groups
          </h3>
          <div className="space-y-3">
            {matches.length > 0 ? (
              matches.map((match, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Match {i + 1}</span>
                    <span className="text-xs text-gray-400 font-mono">Index: {match.index}</span>
                  </div>
                  <div className="font-mono text-gray-800 bg-white p-2 rounded border border-gray-100">{match[0]}</div>
                  {match.length > 1 && (
                    <div className="pl-4 border-l-2 border-gray-200 space-y-2 mt-1">
                      {match.slice(1).map((sub, j) => (
                        <div key={j} className="text-xs font-mono text-gray-500">
                           <span className="font-bold text-gray-400">Group {j + 1}:</span> {sub || 'null'}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 font-medium italic">
                No matches found in the provided text.
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
