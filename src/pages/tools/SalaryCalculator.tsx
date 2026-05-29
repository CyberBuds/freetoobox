import { useState } from 'react';
import { Wallet, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [payPeriod, setPayPeriod] = useState<'annual' | 'monthly'>('annual');
  const [result, setResult] = useState<{
    monthly: number;
    annual: number;
    weekly: number;
    daily: number;
    hourly: number;
  } | null>(null);

  const calculate = () => {
    const gross = parseFloat(grossSalary);
    if (isNaN(gross)) return;

    const annual = payPeriod === 'annual' ? gross : gross * 12;
    const monthly = annual / 12;
    const weekly = annual / 52;
    const daily = annual / 260; // Assuming 260 working days
    const hourly = daily / 8; // Assuming 8 hour work day

    setResult({ monthly, annual, weekly, daily, hourly });
  };

  return (
    <ToolPageLayout
      toolId="salary-calculator"
      title="Salary Calculator"
      description="Convert your salary between hourly, daily, weekly, monthly, and annual rates."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Assumptions
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 52 weeks per year.</li>
            <li>• 5 working days per week (260 days/year).</li>
            <li>• 8 working hours per day.</li>
            <li>• Calculations are based on gross salary before taxes.</li>
          </ul>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-8">
          <div className="flex gap-2 p-1 bg-gray-50 rounded-xl">
            <button
              onClick={() => { setPayPeriod('annual'); setResult(null); }}
              className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                payPeriod === 'annual' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual Salary
            </button>
            <button
              onClick={() => { setPayPeriod('monthly'); setResult(null); }}
              className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                payPeriod === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly Salary
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter {payPeriod === 'annual' ? 'Annual' : 'Monthly'} Gross Salary (₹)
            </label>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Calculate Breakdown
          </button>
        </div>

        {result && (
          <div className="mt-10 space-y-3">
            {[
              { label: 'Annual', value: result.annual },
              { label: 'Monthly', value: result.monthly },
              { label: 'Weekly', value: result.weekly },
              { label: 'Daily', value: result.daily },
              { label: 'Hourly', value: result.hourly },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                <span className="text-gray-600 font-bold group-hover:text-blue-600">{item.label}</span>
                <span className="text-gray-900 font-black text-xl group-hover:text-blue-900">₹{item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
