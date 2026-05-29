import { useState, useEffect } from 'react';
import { Clock, RefreshCw, Copy, Check, Calendar, Globe } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString());
  const [copied, setCopied] = useState<string | null>(null);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    try {
      const ms = val.length > 11 ? Number(val) : Number(val) * 1000;
      if (!isNaN(ms)) {
        setDateStr(new Date(ms).toISOString());
      }
    } catch (e) {}
  };

  const handleDateChange = (val: string) => {
    setDateStr(val);
    try {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        setTimestamp(Math.floor(d.getTime() / 1000).toString());
      }
    } catch (e) {}
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const setNow = () => {
    const now = Date.now();
    setTimestamp(Math.floor(now / 1000).toString());
    setDateStr(new Date(now).toISOString());
  };

  const formats = [
    { label: 'UTC Date', value: new Date(Number(timestamp) * 1000).toUTCString() },
    { label: 'Local Date', value: new Date(Number(timestamp) * 1000).toLocaleString() },
    { label: 'ISO 8601', value: new Date(Number(timestamp) * 1000).toISOString() },
    { label: 'JSON Date', value: `/Date(${Number(timestamp) * 1000})/` },
    { label: 'RFC 2822', value: new Date(Number(timestamp) * 1000).toUTCString() },
  ];

  return (
    <ToolPageLayout
      toolId="timestamp-converter"
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates for debugging and development. Supports seconds and milliseconds."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unix Time & Development</h2>
          <p className="text-gray-600 mb-4">
            Unix time (also known as Epoch time) is a system for describing a point in time, defined as the number of seconds that have elapsed since 00:00:00 UTC, January 1, 1970.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Seconds vs Milliseconds</h3>
          <p className="text-gray-600 mb-4">
            Programming languages like Python and PHP usually work with seconds (10 digits), while JavaScript and Java work with milliseconds (13 digits). Our tool automatically detects and converts between both formats.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-widest">
                <Clock className="h-4 w-4 text-blue-600" />
                Unix Timestamp
              </label>
              <button 
                onClick={setNow}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Set to Now
              </button>
            </div>
            <input 
              type="text" 
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 rounded-2xl font-mono text-xl outline-none transition-all shadow-inner"
              placeholder="1672531200"
            />
            <p className="text-xs text-gray-400 font-medium italic">Supports both seconds (10 digits) and milliseconds (13 digits).</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-widest">
              <Calendar className="h-4 w-4 text-green-600" />
              ISO Date String
            </label>
            <input 
              type="text" 
              value={dateStr}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 rounded-2xl font-mono text-xl outline-none transition-all shadow-inner"
              placeholder="2023-01-01T00:00:00.000Z"
            />
            <p className="text-xs text-gray-400 font-medium italic">Format: YYYY-MM-DDTHH:MM:SS.SSSZ</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Formatted Representations</h3>
          </div>
          
          <div className="space-y-4">
            {formats.map((f) => (
              <div key={f.label} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/5 hover:border-blue-500/30 transition-all">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{f.label}</span>
                <div className="md:col-span-2 font-mono text-blue-400 break-all">{f.value}</div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleCopy(f.value, f.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${copied === f.label ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                  >
                    {copied === f.label ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === f.label ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
