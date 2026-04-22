import { useState } from 'react';
import { RefreshCw, Copy, Trash2, ShieldCheck } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
    } catch (e) {
      setError('Encoding failed: ' + (e as Error).message);
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError(null);
    } catch (e) {
      setError('Decoding failed: Invalid Base64 string');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="base64-tool"
      title="Base64 Encoder & Decoder"
      description="Safely encode and decode strings to and from Base64 format with full UTF-8 support."
      category="Developer Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Base64 Encoding</h2>
            <p className="text-gray-600">
              <strong>Base64</strong> is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is most commonly used in the context of email (via MIME) and web development to embed image data directly into CSS or HTML files.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">When to use Base64?</h3>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li><strong>Data URLs:</strong> Embedding small images (like icons) directly into your code to reduce HTTP requests.</li>
              <li><strong>Secure Transmission:</strong> Transferring binary data over protocols that are designed for text only.</li>
              <li><strong>Obfuscation:</strong> Hiding recognizable strings from casual eyes (Note: Base64 is NOT encryption).</li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Safety & Privacy
            </h3>
            <p className="text-blue-800 text-sm italic">
              "Your information is handled securely within your browser. We do not transmit your input or decoded results to our servers, making it safe for handling most insensitive developer strings."
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Input Text / Base64</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              placeholder="Enter text to encode or Base64 to decode..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEncode}
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Encode to Base64
            </button>
            <button
              onClick={handleDecode}
              className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-gray-200"
            >
              Decode to Text
            </button>
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Result</label>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                  </button>
                  <button onClick={() => {setInput(''); setOutput(''); setError(null);}} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
             </div>
             <div className={`p-4 rounded-xl border min-h-[160px] font-mono text-sm break-all ${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                {error || output || <span className="text-gray-300 italic">Result will appear here...</span>}
             </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
