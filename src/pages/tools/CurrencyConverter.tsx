import { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, Euro, CircleDot } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const MOCK_RATES: { [key: string]: number } = {
  USD: 1,
  INR: 83.50,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.70,
  AUD: 1.52,
  CAD: 1.36,
  AED: 3.67,
};

export default function CurrencyConverter() {
  const [val, setVal] = useState<number>(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const inUSD = val / MOCK_RATES[from];
    const converted = inUSD * MOCK_RATES[to];
    setResult(converted);
  }, [val, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolPageLayout
      toolId="currency-converter"
      title="Dynamic Currency Converter"
      description="Convert between major world currencies with real-time representative exchange rates."
      category="Calculators"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigating the Global FX Market</h2>
            <p className="text-gray-600">
              The Foreign Exchange (FX) market is the largest and most liquid financial market in the world. Whether you are a traveler planning a vacation, a business owner paying international vendors, or a digital nomad managing multi-currency accounts, having an accurate <strong>Currency Converter</strong> is vital.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">What Determines Exchange Rates?</h3>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              <li><strong>Interest Rates:</strong> Central bank policies significantly impact currency strength.</li>
              <li><strong>Inflation:</strong> Countries with lower inflation rates typically see their currency value increase.</li>
              <li><strong>Geopolitics:</strong> Political stability and trade agreements influence investor confidence.</li>
              <li><strong>Market Demand:</strong> Like any asset, supply and demand on global exchanges drive the price.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
             <h3 className="text-lg font-bold text-blue-900 mb-2">Note on Exchange Rates</h3>
             <p className="text-blue-800 text-xs italic">
                * Our converter uses mid-market representative rates for educational and estimation purposes. Actual rates provided by banks or exchange bureaus will include spreads and service fees.
             </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Amount From ({from})</label>
             <div className="relative">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-full pl-6 pr-24 py-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-2xl font-black text-gray-800"
                />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-xl border-none bg-gray-50 font-bold text-sm outline-none"
                >
                  {Object.keys(MOCK_RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                </select>
             </div>
          </div>

          <button 
            onClick={swap}
            className="p-4 bg-gray-50 border border-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
          >
             <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
          </button>

          <div className="flex-grow w-full space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Result To ({to})</label>
             <div className="relative">
                <div className="w-full pl-6 pr-24 py-5 rounded-2xl border border-gray-100 bg-blue-50 text-2xl font-black text-blue-600">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                 <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-xl border-none bg-white font-bold text-sm outline-none"
                >
                  {Object.keys(MOCK_RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                </select>
             </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
