import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [result, setResult] = useState<{ amount: number; percentage: number; isProfit: boolean } | null>(null);

  const calculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    if (isNaN(cp) || isNaN(sp)) return;

    const diff = sp - cp;
    const percentage = (Math.abs(diff) / cp) * 100;

    setResult({
      amount: Math.abs(diff),
      percentage: percentage,
      isProfit: diff >= 0
    });
  };

  return (
    <ToolPageLayout
      toolId="profit-loss-calculator"
      title="Profit & Loss Calculator"
      description="Quickly calculate profit or loss amount and percentage for your business."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Formula Used
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Profit:</strong> Selling Price - Cost Price (if SP {'>'} CP)</p>
            <p>• <strong>Loss:</strong> Cost Price - Selling Price (if CP {'>'} SP)</p>
            <p>• <strong>Percentage:</strong> (Profit or Loss / Cost Price) x 100</p>
          </div>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price (CP)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (SP)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className={`mt-10 p-8 rounded-2xl border text-center ${
            result.isProfit ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
          }`}>
            <div className="flex justify-center mb-4">
              {result.isProfit ? (
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <TrendingUp className="h-8 w-8" />
                </div>
              ) : (
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <TrendingDown className="h-8 w-8" />
                </div>
              )}
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${result.isProfit ? 'text-green-700' : 'text-red-700'}`}>
              {result.isProfit ? 'Profit' : 'Loss'} of ₹{result.amount.toLocaleString()}
            </h3>
            <p className={`text-xl font-medium ${result.isProfit ? 'text-green-600' : 'text-red-600'}`}>
              {result.percentage.toFixed(2)}% {result.isProfit ? 'Gain' : 'Loss'}
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
