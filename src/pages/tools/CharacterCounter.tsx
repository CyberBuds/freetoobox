import { useState } from 'react';
import { Hash, Copy, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = {
    characters: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n+/).length : 0,
    lines: text.trim() ? text.split('\n').length : 0,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="character-counter"
      title="Character Counter"
      description="Analyze your text with precision. Count characters, words, sentences, and more in real-time."
      category="Text Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use a Real-Time Character Counter?</h2>
            <p className="text-gray-600">
              Whether you are drafting a tweet, writing a meta description for SEO, or preparing a professional essay, character limits are everywhere. Our <strong>Real-Time Character Counter</strong> helps you stay within those limits while providing deep insights into your writing structure.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Metrics Explained</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex flex-col">
                <span className="font-bold text-blue-600">Characters (with spaces):</span>
                <span className="text-sm text-gray-500">The total count of every single stroke including spaces and punctuation.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-blue-600">Words:</span>
                <span className="text-sm text-gray-500">The total number of individual words detected in your text.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-blue-600">Sentences:</span>
                <span className="text-sm text-gray-500">Calculated based on standard punctuation marks (. ! ?).</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-blue-600">Paragraphs:</span>
                <span className="text-sm text-gray-500">Identified by line breaks and double returns.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Common Character Limits in 2026</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 italic">
                    <th className="p-2 border border-gray-200">Platform</th>
                    <th className="p-2 border border-gray-200">Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border border-gray-200">Twitter (X) Post</td><td className="p-2 border border-gray-200">280 Characters</td></tr>
                  <tr><td className="p-2 border border-gray-200">SEO Title Tag</td><td className="p-2 border border-gray-200">50-60 Characters</td></tr>
                  <tr><td className="p-2 border border-gray-200">Meta Description</td><td className="p-2 border border-gray-200">150-160 Characters</td></tr>
                  <tr><td className="p-2 border border-gray-200">SMS (Single)</td><td className="p-2 border border-gray-200">160 Characters</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Characters', value: stats.characters },
              { label: 'Words', value: stats.words },
              { label: 'Sentences', value: stats.sentences },
              { label: 'No Spaces', value: stats.charsNoSpaces },
              { label: 'Paragraphs', value: stats.paragraphs },
              { label: 'Lines', value: stats.lines },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 shadow-sm">
                <span className="block text-2xl font-black text-blue-600">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 leading-relaxed font-mono text-sm"
              placeholder="Start typing or paste your content here..."
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
        </div>
      </div>
    </ToolPageLayout>
  );
}
