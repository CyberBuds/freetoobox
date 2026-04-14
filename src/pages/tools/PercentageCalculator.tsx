import { useState } from 'react';
import { Percent, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState<'percentage_of' | 'is_what_percentage' | 'percentage_increase'>('percentage_of');

  const calculate = () => {
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    if (isNaN(n1) || isNaN(n2)) return;

    if (type === 'percentage_of') {
      setResult((n1 / 100) * n2);
    } else if (type === 'is_what_percentage') {
      setResult((n1 / n2) * 100);
    } else if (type === 'percentage_increase') {
      setResult(((n2 - n1) / n1) * 100);
    }
  };

  return (
    <ToolPageLayout
      toolId="percentage-calculator"
      title="Percentage Calculator"
      description="Calculate percentages, percentage increases, and more instantly."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            How to use
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• <strong>X% of Y:</strong> Find the value of a certain percentage of a total.</li>
            <li>• <strong>X is what % of Y:</strong> Find what percentage one number is of another.</li>
            <li>• <strong>X to Y % Change:</strong> Find the percentage increase or decrease between two values.</li>
          </ul>
        </div>
      }
    >
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex gap-2 mb-6 p-1 bg-gray-50 rounded-xl">
          {(['percentage_of', 'is_what_percentage', 'percentage_increase'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); setResult(null); }}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                type === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'percentage_of' ? 'X% of Y' : t === 'is_what_percentage' ? 'X is what % of Y' : 'X to Y % Change'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'percentage_of' ? 'Percentage (%)' : type === 'is_what_percentage' ? 'Value X' : 'Old Value (X)'}
            </label>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'percentage_of' ? 'Total Value (Y)' : type === 'is_what_percentage' ? 'Total Value (Y)' : 'New Value (Y)'}
            </label>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 500"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Percent className="h-5 w-5" />
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <p className="text-blue-600 font-medium mb-1">Result</p>
            <p className="text-4xl font-bold text-blue-900">
              {type === 'percentage_of' ? result.toLocaleString() : result.toFixed(2) + '%'}
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
