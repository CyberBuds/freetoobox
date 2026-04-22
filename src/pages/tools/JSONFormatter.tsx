import { useState } from 'react';
import { FileCode, Play, Trash2, Copy, Minimize, AlignLeft } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function JSONFormatter() {
  const [json, setJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!json.trim()) return;
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const handleMinify = () => {
    try {
      if (!json.trim()) return;
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="json-formatter"
      title="JSON Formatter & Validator"
      description="Prettify, validate, and minify your JSON code instantly for better readability and performance."
      category="Developer Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering JSON Data Management</h2>
            <p className="text-gray-600">
              <strong>JSON (JavaScript Object Notation)</strong> is the standard format for data exchange on the modern web. However, minified JSON from APIs is often impossible for humans to read. Our <strong>JSON Formatter</strong> helps you debug and understand your data structures quickly.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features of our Tool</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-black">•</span>
                <span><strong>Validation:</strong> Automatically checks for syntax errors, missing commas, or trailing brackets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-black">•</span>
                <span><strong>Beautification:</strong> Adds proper indentation and line breaks for human-friendly viewing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-black">•</span>
                <span><strong>Minification:</strong> Removes all whitespace to reduce file size for production use.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-black">•</span>
                <span><strong>Secure Processing:</strong> Your JSON data is processed entirely in your browser—nothing is sent to a server.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">JSON Best Practices</h3>
            <p className="text-gray-600 mb-4">
              When working with JSON, remember these strict rules:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 text-sm">
              <li>Keys and string values MUST use <strong>double quotes</strong> (").</li>
              <li>Trailing commas are strictly forbidden in standard JSON.</li>
              <li>Only valid data types are allowed: String, Number, Object, Array, Boolean, and Null.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="relative mb-6">
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className={`w-full h-80 p-6 rounded-2xl border ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm leading-relaxed`}
            placeholder="Paste your JSON here..."
          />
          <div className="absolute top-4 right-4 flex gap-2">
             <button
                onClick={handleCopy}
                className="p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:text-blue-600 transition-all shadow-sm"
              >
                <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
              </button>
              <button
                onClick={() => { setJson(''); setError(null); }}
                className="p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 transition-all shadow-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-xs font-mono border border-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleFormat}
            className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            <AlignLeft className="h-5 w-5" /> Format / Beautify
          </button>
          <button
            onClick={handleMinify}
            className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
          >
            <Minimize className="h-5 w-5" /> Minify JSON
          </button>
        </div>
      </div>
    </ToolPageLayout>
  );
}
