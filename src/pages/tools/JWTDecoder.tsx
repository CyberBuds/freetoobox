import { useState, useEffect } from 'react';
import { ShieldCheck, Info, Copy, Check, Scissors, AlertCircle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<'header' | 'payload' | null>(null);

  useEffect(() => {
    if (!token) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. A token must have 3 parts separated by dots.');
      }

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setHeader(null);
      setPayload(null);
    }
  }, [token]);

  const handleCopy = (data: any, section: 'header' | 'payload') => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <ToolPageLayout
      toolId="jwt-decoder"
      title="JWT Decoder"
      description="Decode JSON Web Tokens (JWT) to view their header, payload, and signature data securely."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Secure & Client-Side JWT Decoding</h2>
          <p className="text-gray-600 mb-4">
            JSON Web Tokens (JWT) are a core part of modern web authentication. Our tool allows you to peek inside your tokens to verify claims, expiration times, and algorithm details.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
          <p className="text-gray-600 mb-4">
            Standard JWT decoding happens entirely in your browser. We never send your tokens to any server, ensuring your sensitive authentication data stays private and secure.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-widest">
              Encoded Token (Paste here)
            </label>
            <button 
              onClick={() => setToken('')}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Scissors className="h-4 w-4" />
            </button>
          </div>
          <textarea
            className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-xs shadow-inner bg-gray-50 leading-relaxed break-all"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-pulse">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Header</span>
              {header && (
                <button 
                  onClick={() => handleCopy(header, 'header')}
                  className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
                >
                  {copiedSection === 'header' ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy JSON</>}
                </button>
              )}
            </div>
            <pre className="w-full h-80 p-6 rounded-3xl border border-gray-200 bg-gray-900 text-pink-400 font-mono text-sm shadow-xl overflow-auto">
              {header ? JSON.stringify(header, null, 2) : '// Header data will appear here'}
            </pre>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Payload</span>
              {payload && (
                <button 
                  onClick={() => handleCopy(payload, 'payload')}
                  className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
                >
                  {copiedSection === 'payload' ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy JSON</>}
                </button>
              )}
            </div>
            <pre className="w-full h-80 p-6 rounded-3xl border border-gray-200 bg-gray-900 text-blue-300 font-mono text-sm shadow-xl overflow-auto">
              {payload ? JSON.stringify(payload, null, 2) : '// Payload claims will appear here'}
            </pre>
          </div>
        </div>

        {payload && (
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Claim Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payload.exp && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50/50">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Expiration Time (exp)</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {new Date(payload.exp * 1000).toLocaleString()}
                  </div>
                  <div className={`text-[10px] mt-1 font-bold ${payload.exp * 1000 > Date.now() ? 'text-green-500' : 'text-red-500'}`}>
                    {payload.exp * 1000 > Date.now() ? 'Token is active' : 'Token has expired'}
                  </div>
                </div>
              )}
              {payload.iat && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50/50">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Issued At (iat)</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {new Date(payload.iat * 1000).toLocaleString()}
                  </div>
                </div>
              )}
              {payload.sub && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50/50">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Subject (sub)</div>
                  <div className="text-sm font-mono font-bold text-blue-600 break-all">{payload.sub}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
