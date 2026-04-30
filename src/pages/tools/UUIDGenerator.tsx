import { useState, useEffect } from 'react';
import { Fingerprint, Copy, Check, RefreshCw, Layers } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  };

  useEffect(() => {
    generateUuids();
  }, []);

  const handleCopy = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="uuid-generator"
      title="UUID Generator"
      description="Generate secure, random UUIDs (v4) for your development, database keys, and unique identifiers instantly."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a UUID v4?</h2>
          <p className="text-gray-600 mb-4">
            A Universally Unique Identifier (UUID) version 4 is a 128-bit number used to uniquely identify information in computer systems. Version 4 is specifically generated using random numbers, making collisions practically impossible.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Why use UUIDs?</h3>
          <p className="text-gray-600 mb-4">
            Unlike auto-incrementing integers, UUIDs can be generated offline without coordination with a central database. They also provide better security as they don't reveal the total number of records or the order of creation.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <Fingerprint className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Generate v4 UUIDs</h3>
              <p className="text-sm text-gray-500">Fast, secure, and unique identifiers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 flex items-center gap-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Quantity:</label>
              <input 
                type="number" 
                min="1" 
                max="100" 
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-20 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-center"
              />
            </div>
            <button 
              onClick={generateUuids}
              className="flex-grow md:flex-grow-0 py-3 px-8 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              <RefreshCw className="h-5 w-5" />
              Regenerate
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generated List</span>
            <button 
              onClick={handleCopyAll}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copiedAll ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
            >
              {copiedAll ? <><Check className="h-4 w-4" /> Copied All!</> : <><Copy className="h-4 w-4" /> Copy All</>}
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-auto pr-2 custom-scrollbar">
            {uuids.map((uuid, index) => (
              <div 
                key={index}
                onClick={() => handleCopy(uuid, index)}
                className="group flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-xl hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <code className="text-blue-400 font-mono text-sm md:text-lg tracking-tight">{uuid}</code>
                <div className={`transition-all ${copiedIndex === index ? 'text-green-500 scale-110' : 'text-gray-600 group-hover:text-blue-400'}`}>
                  {copiedIndex === index ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Version', value: '4 (Random)', description: 'Generated using high-quality entropy' },
            { label: 'Variant', value: 'RFC 4122', description: 'Standard layout for UUIDs' },
            { label: 'Bits', value: '128-bit', description: 'Hexadecimal blocks (8-4-4-4-12)' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
