import { useState } from 'react';
import { FileJson, Copy, Check, Scissors, RefreshCw, Layers, FileCode } from 'lucide-react';
import jsyaml from 'js-yaml';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function YAMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'pretty' | 'json'>('pretty');

  const handleFormat = () => {
    try {
      const data = jsyaml.load(input);
      if (mode === 'json') {
        setOutput(JSON.stringify(data, null, 2));
      } else {
        setOutput(jsyaml.dump(data, { indent: 2, lineWidth: -1 }));
      }
    } catch (error) {
      setOutput(`Error: Invalid YAML syntax.\n${(error as Error).message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolPageLayout
      toolId="yaml-formatter"
      title="YAML Formatter"
      description="Prettify, validate, and convert your YAML data to JSON and back with our powerful online formatter."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">YAML vs JSON</h2>
          <p className="text-gray-600 mb-4">
            YAML (YAML Ain't Markup Language) is a human-readable data serialization standard that is commonly used for configuration files. It is less verbose than JSON and easier for humans to read and write.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Why format YAML?</h3>
          <p className="text-gray-600 mb-4">
            YAML relies heavily on indentation for its structure. A single misplaced space can break your entire configuration. Our formatter ensures your YAML is syntactically correct and perfectly indented.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileCode className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">YAML Settings</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
               <button 
                onClick={() => setMode('pretty')}
                className={`px-4 py-2 text-xs font-bold transition-all ${mode === 'pretty' ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
               >
                Pretty YAML
               </button>
               <button 
                onClick={() => setMode('json')}
                className={`px-4 py-2 text-xs font-bold transition-all ${mode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
               >
                To JSON
               </button>
            </div>
            <button 
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm"
            >
              <Scissors className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input YAML</label>
            <textarea
              className="w-full h-96 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none font-mono text-sm shadow-inner bg-gray-50 leading-relaxed"
              placeholder="name: John Doe\nage: 30\nskills:\n  - React\n  - Node.js"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              onClick={handleFormat}
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
            >
              <RefreshCw className="h-5 w-5" />
              {mode === 'json' ? 'Convert to JSON' : 'Format YAML'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Output</label>
              <button 
                onClick={handleCopy}
                disabled={!output || output.startsWith('Error')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Output</>}
              </button>
            </div>
            <pre className={`w-full h-96 p-4 rounded-xl border border-gray-200 font-mono text-sm overflow-auto shadow-xl ${output.startsWith('Error') ? 'bg-red-50 text-red-600' : 'bg-gray-900 text-blue-400'}`}>
              {output || (mode === 'json' ? '// YAML to JSON output will appear here' : '// Formatted YAML will appear here')}
            </pre>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
