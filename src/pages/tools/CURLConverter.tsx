import { useState } from 'react';
import { Terminal, Copy, Check, Scissors, Code, Zap } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function CURLConverter() {
  const [curl, setCurl] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [target, setTarget] = useState<'fetch' | 'axios' | 'fetch-react'>('fetch');

  const parseCurl = () => {
    if (!curl) return;

    try {
      // Basic CURL parser logic
      const urlMatch = curl.match(/'([^']+)'|"([^"]+)"|([https|http][^\s]+)/);
      const url = urlMatch ? (urlMatch[1] || urlMatch[2] || urlMatch[3]) : 'https://api.example.com';
      
      const methodMatch = curl.match(/-X\s+([A-Z]+)|--request\s+([A-Z]+)/);
      const method = methodMatch ? (methodMatch[1] || methodMatch[2]) : 'GET';
      
      const headers: Record<string, string> = {};
      const headerMatches = curl.matchAll(/-H\s+'([^']+)'|-H\s+"([^"]+)"|--header\s+'([^']+)'|--header\s+"([^"]+)"/g);
      for (const match of headerMatches) {
        const headerStr = match[1] || match[2] || match[3] || match[4];
        const [key, ...value] = headerStr.split(':');
        if (key && value) headers[key.trim()] = value.join(':').trim();
      }

      const dataMatch = curl.match(/-d\s+'([^']+)'|-d\s+"([^"]+)"|--data\s+'([^']+)'|--data\s+"([^"]+)"/);
      const data = dataMatch ? (dataMatch[1] || dataMatch[2] || dataMatch[3] || dataMatch[4]) : null;

      let code = '';
      if (target === 'fetch') {
        code = `fetch("${url}", {\n  method: "${method}",\n  headers: ${JSON.stringify(headers, null, 4)},\n${data ? `  body: JSON.stringify(${data})\n` : ''}})\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));`;
      } else if (target === 'axios') {
        code = `import axios from 'axios';\n\naxios({\n  method: "${method}",\n  url: "${url}",\n  headers: ${JSON.stringify(headers, null, 4)},\n${data ? `  data: ${data}\n` : ''}})\n.then(response => {\n  console.log(response.data);\n})\n.catch(error => {\n  console.log(error);\n});`;
      } else {
        code = `// React useEffect implementation\nuseEffect(() => {\n  const fetchData = async () => {\n    try {\n      const response = await fetch("${url}", {\n        method: "${method}",\n        headers: ${JSON.stringify(headers, null, 10).slice(0, -1)}        },\n${data ? `        body: JSON.stringify(${data})\n` : ''}      });\n      const json = await response.json();\n      console.log(json);\n    } catch (error) {\n      console.error("Error fetching data:", error);\n    }\n  };\n  fetchData();\n}, []);`;
      }

      setOutput(code);
    } catch (e) {
      setOutput('// Error parsing CURL command. \n// Please ensure it is a valid format (e.g., curl "url" -X POST)');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="curl-converter"
      title="CURL Converter"
      description="Convert CURL commands into ready-to-use JavaScript Fetch, Axios, or React code snippets instantly."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">From CLI to Code</h2>
          <p className="text-gray-600 mb-4">
            CURL is the standard for testing APIs in the terminal. When it's time to integrate those tests into your application, manual conversion is tedious and error-prone. Our tool automates this process for modern JavaScript environments.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Supported Formats</h3>
          <p className="text-gray-600 mb-4">
            We support standard browser Fetch API, the popular Axios library, and a boilerplate for React's useEffect hook. This covers most modern frontend and backend Node.js development needs.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-gray-700" />
              CURL Command
            </h3>
            <button 
              onClick={() => setCurl('')}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Scissors className="h-4 w-4" />
            </button>
          </div>
          <textarea
            className="w-full h-40 p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm shadow-inner bg-gray-50 leading-relaxed"
            placeholder="curl 'https://api.example.com/v1/users' -H 'Authorization: Bearer my-token' -X POST"
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['fetch', 'axios', 'fetch-react'] as const).map((t) => (
              <button 
                key={t}
                onClick={() => setTarget(t)}
                className={`py-3 rounded-xl font-bold transition-all border-2 ${target === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'}`}
              >
                {t === 'fetch' ? 'Browser Fetch' : t === 'axios' ? 'Axios Library' : 'React Hook'}
              </button>
            ))}
          </div>
          <button 
            onClick={parseCurl}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Zap className="h-5 w-5" />
            Convert to Code
          </button>
        </div>

        {output && (
          <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">JavaScript Result</span>
              </div>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied Code!' : 'Copy Snippet'}
              </button>
            </div>
            <pre className="w-full max-h-[500px] overflow-auto p-6 rounded-2xl bg-black/50 font-mono text-sm leading-relaxed text-blue-300 custom-scrollbar border border-white/5">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
