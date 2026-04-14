import { useState } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200); // Average 200 wpm

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="word-counter"
      title="Word Counter"
      description="Analyze your text for word count, character count, and more."
      category="SEO Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why use a Word Counter?</h2>
          <p className="text-gray-600 mb-4">
            Whether you are a student writing an essay, a blogger crafting a post, or a professional preparing a report, keeping track of your word count is essential. Many platforms have strict character or word limits that you must adhere to.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Key Features of our Tool</h3>
          <p className="text-gray-600 mb-4">
            Our online word counter goes beyond just counting words. It provides a comprehensive analysis of your text:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Word Count:</strong> The total number of words in your text.</li>
            <li><strong>Character Count:</strong> Total characters, including spaces and punctuation.</li>
            <li><strong>Sentence & Paragraph Count:</strong> Helps you understand the structure and flow of your writing.</li>
            <li><strong>Estimated Reading Time:</strong> Based on an average reading speed of 200 words per minute.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-2">SEO and Word Count</h3>
          <p className="text-gray-600 mb-4">
            In the world of SEO (Search Engine Optimization), word count plays a significant role. While there is no "perfect" length, search engines tend to favor comprehensive content that thoroughly covers a topic.
          </p>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-64 p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 leading-relaxed"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                title="Copy Text"
              >
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setText('')}
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                title="Clear Text"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{words}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Words</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{characters}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Chars</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{sentences}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Sentences</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{paragraphs}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Paragraphs</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{readingTime}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Min Read</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">{charactersNoSpaces}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">No Spaces</div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
