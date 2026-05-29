import { useState, useEffect } from 'react';
import { Landmark, RefreshCw, MapPin } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const INDIAN_UNITS: { [key: string]: number } = {
  sqMeter: 1,
  bigha: 2529.28, // Standard (UP/North India)
  kanal: 505.857,
  marla: 25.292,
  guntha: 101.17,
  biswa: 126.46,
  acre: 4046.86,
  hectare: 10000,
};

export default function LandUnitConverter() {
  const [val, setVal] = useState<number>(1);
  const [from, setFrom] = useState('bigha');
  const [to, setTo] = useState('sqMeter');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const inSqMeters = val * INDIAN_UNITS[from];
    const converted = inSqMeters / INDIAN_UNITS[to];
    setResult(converted);
  }, [val, from, to]);

  return (
    <ToolPageLayout
      toolId="land-unit-converter"
      title="Indian Land Unit Converter"
      description="Convert between Bigha, Kanal, Marla, Guntha, and standard units like Acres or Hectares."
      category="Finance Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigating the Diversity of Indian Land Measurement</h2>
            <p className="text-gray-600">
              In India, land measurement units vary significantly from one state to another. While <strong>Acres</strong> and <strong>Hectares</strong> are standard globally, regional units like <strong>Bigha</strong>, <strong>Biszwa</strong>, <strong>Kanal</strong>, and <strong>Marla</strong> are used for local property registrations.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Regional Identification</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> North India: Bigha, Biswa, Kanal, Marla</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> South India: Ground, Cent, Ankanam</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> West India: Bigha, Guntha</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> East India: Chatak, Decimal, Katha</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Note on "Bigha" Variations</h3>
            <p className="text-gray-600 text-sm italic">
              * Important: The size of a 'Bigha' is not standardized across India. In Uttar Pradesh, it's roughly 2,529 sq meters, while in Rajasthan or parts of Himachal, it can be significantly smaller or larger. Our tool uses the <strong>Standard/UP Bigha</strong> (common in revenue records) as the default reference.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Input Value</label>
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
                  {Object.keys(INDIAN_UNITS).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right block">Convert To</label>
              <div className="flex gap-4">
                 <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold bg-white"
                >
                  {Object.keys(INDIAN_UNITS).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <div className="w-full p-3 h-12 bg-blue-50 border border-blue-100 rounded-xl font-black text-blue-600 flex items-center justify-end">
                   {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </div>
              </div>
            </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
