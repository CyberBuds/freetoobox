import { useState, useEffect } from 'react';
import { Maximize, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const UNITS: { [key: string]: number } = {
  sqMeter: 1,
  sqKm: 1000000,
  sqFoot: 0.092903,
  sqMile: 2589988.11,
  acre: 4046.86,
  hectare: 10000,
  sqYard: 0.836127,
};

export default function AreaConverter() {
  const [val, setVal] = useState<number>(1);
  const [from, setFrom] = useState('sqMeter');
  const [to, setTo] = useState('sqFoot');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const inSqMeters = val * UNITS[from];
    const converted = inSqMeters / UNITS[to];
    setResult(converted);
  }, [val, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolPageLayout
      toolId="area-converter"
      title="Universal Area Unit Converter"
      description="Convert between Square Meters, Square Feet, Acres, and more with high precision."
      category="Utility Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Precision in Spatial Measurement</h2>
            <p className="text-gray-600">
              Whether you are an architect measuring a floor plan, a farmer calculating crop yields, or a real estate investor evaluating a plot, accurate <strong>Area Conversion</strong> is critical. Our tool supports both Metric and Imperial systems, providing instant results for professional and domestic use.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Common Conversion Factors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white rounded border border-gray-100 italic">1 Acre = ~4,047 Square Meters</div>
              <div className="p-3 bg-white rounded border border-gray-100 italic">1 Hectare = 10,000 Square Meters</div>
              <div className="p-3 bg-white rounded border border-gray-100 italic">1 Square Mile = 640 Acres</div>
              <div className="p-3 bg-white rounded border border-gray-100 italic">1 Square Meter = ~10.76 Square Feet</div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">History of Measurement</h3>
            <p className="text-gray-600">
              Did you know the 'Acre' was originally defined as the amount of land that could be plowed by an ox in one day? Today, these units are standardized globally, ensuring that a 'Square Foot' in New York is the same as a 'Square Foot' in New Delhi. Our converter uses <strong>full-precision floating point math</strong> to ensure your calculations are accurate up to 6 decimal places.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">From</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold bg-white"
                >
                  {Object.keys(UNITS).map(u => <option key={u} value={u}>{u.replace(/([A-Z])/g, ' $1').toLowerCase()}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right block">To</label>
              <div className="flex gap-4">
                 <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold bg-white"
                >
                  {Object.keys(UNITS).map(u => <option key={u} value={u}>{u.replace(/([A-Z])/g, ' $1').toLowerCase()}</option>)}
                </select>
                <div className="w-full p-3 h-12 bg-blue-50 border border-blue-100 rounded-xl font-black text-blue-600 flex items-center justify-end">
                   {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
             <button 
               onClick={swap} 
               className="p-4 bg-gray-50 border border-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
             >
                <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
             </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
