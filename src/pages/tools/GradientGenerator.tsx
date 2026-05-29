import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Layers } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [degree, setDegree] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState(false);

  const gradient = type === 'linear' 
    ? `linear-gradient(${degree}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${color1};\nbackground: ${gradient};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandom = () => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomHex());
    setColor2(randomHex());
    setDegree(Math.floor(Math.random() * 360));
  };

  return (
    <ToolPageLayout
      toolId="gradient-generator"
      title="Gradient Generator"
      description="Design beautiful linear and radial CSS gradients for your websites and apps with real-time preview."
      category="Design Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional CSS Gradients</h2>
          <p className="text-gray-600 mb-4">
            Gradients are a powerful way to add depth and visual interest to your web designs. Our Gradient Generator provides an intuitive interface to mix colors, adjust angles, and generate cross-browser compatible CSS code.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Linear vs Radial Gradients</h3>
          <p className="text-gray-600 mb-4">
            <strong>Linear Gradients</strong> move in a straight line (up, down, left, right, or at an angle). They are great for backgrounds and buttons. <strong>Radial Gradients</strong> emerge from a single point and spread outwards in a circular or elliptical shape, creating a spotlight effect.
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                Settings
              </h3>
              <button 
                onClick={generateRandom}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Randomize
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color 1</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="h-12 w-full rounded-lg cursor-pointer border-none p-0"
                  />
                  <input 
                    type="text" 
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-24 text-center text-sm font-mono p-2 border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color 2</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="h-12 w-full rounded-lg cursor-pointer border-none p-0"
                  />
                  <input 
                    type="text" 
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-24 text-center text-sm font-mono p-2 border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Angle ({degree}°)</label>
                <input 
                  type="number" 
                  value={degree}
                  onChange={(e) => setDegree(Number(e.target.value))}
                  className="w-16 text-center text-sm p-1 border border-gray-200 rounded-md"
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={degree}
                onChange={(e) => setDegree(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                disabled={type === 'radial'}
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setType('linear')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${type === 'linear' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                Linear
              </button>
              <button 
                onClick={() => setType('radial')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${type === 'radial' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                Radial
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">CSS Output</span>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              >
                {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy CSS</>}
              </button>
            </div>
            <pre className="text-sm font-mono text-blue-400 overflow-x-auto p-4 bg-black/30 rounded-xl">
              {cssCode}
            </pre>
          </div>
        </div>

        <div className="flex flex-col h-full space-y-6">
          <div 
            className="flex-grow min-h-[400px] rounded-3xl shadow-lg border border-white/20 transition-all duration-500 overflow-hidden relative"
            style={{ background: gradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-xl border border-white/10">
                Live Preview
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
              'linear-gradient(45deg, #FFE000, #799F0C)',
              'linear-gradient(to right, #00C9FF, #92FE9D)',
              'linear-gradient(180deg, #FAD961, #F76B1C)'
            ].map((p, i) => (
              <button 
                key={i}
                className="aspect-square rounded-xl border-2 border-white shadow-sm transform hover:scale-105 transition-all"
                style={{ background: p }}
                onClick={() => {
                  // Basic extraction for presets - improved regex or manual logic needed for full accuracy
                  const matches = p.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
                  if (matches && matches.length >= 2) {
                    setColor1(matches[0]);
                    setColor2(matches[1]);
                    setType('linear');
                    const degMatch = p.match(/(\d+)deg/);
                    if (degMatch) setDegree(Number(degMatch[1]));
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
