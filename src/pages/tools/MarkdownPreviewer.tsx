import { useState } from 'react';
import { Eye, Copy, Check, Scissors, FileText, ChevronRight, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ToolPageLayout from '@/components/ToolPageLayout';

const DEFAULT_MARKDOWN = `# Markdown Previewer
## Features
- Real-time **Live Preview**
- Supports [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Clean, responsive UI

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, FreeToolsBox!");
}
\`\`\`

> "Markdown is the language of documentation."
`;

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="markdown-previewer"
      title="Markdown Previewer"
      description="Write Markdown code and preview the rendered output in real-time with beautiful styling and multi-device support."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Markdown?</h2>
          <p className="text-gray-600 mb-4">
            Markdown is a lightweight markup language that allows you to format text using simple, plain-text syntax. It is widely used for README files, forum posts, and documentation because it's easy for humans to read and machines to parse.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Rendering</h3>
          <p className="text-gray-600 mb-4">
            Our previewer uses standard Markdown rules to render your text into HTML instantly. This helps you catch formatting errors before you commit your code to GitHub or publish your blog post.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Markdown Editor</h3>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setMarkdown('')}
              className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <Scissors className="h-3 w-3" />
              Clear
            </button>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Markdown</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Input Editor</span>
              <span className="text-xs text-gray-300 font-mono italic">.md</span>
            </div>
            <textarea
              className="flex-grow w-full p-8 rounded-3xl border-2 border-gray-100 focus:border-indigo-500 outline-none font-mono text-sm shadow-xl bg-white resize-none leading-relaxed transition-all"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
            />
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Preview</span>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-green-700 font-bold uppercase">Live</span>
              </div>
            </div>
            <div className="flex-grow w-full p-8 rounded-3xl border border-gray-200 bg-white shadow-xl overflow-auto custom-scrollbar">
              <div className="markdown-body">
                <ReactMarkdown>
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <Info className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900">Styling Note</h4>
            <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
              We apply standard GitHub-style typography to your preview. Use triple backticks (\` \` \`) for code blocks and single backticks (\`) for inline code. Check out the example provided in the starter text for more advanced syntax tips.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
