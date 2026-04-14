import { useState, useEffect } from 'react';
import { TrendingUp, PieChart, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [result, setResult] = useState<{ invested: number; returns: number; total: number } | null>(null);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const i = expectedReturn / 100 / 12;
    const n = timePeriod * 12;

    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const totalReturns = totalValue - totalInvested;

    setResult({
      invested: Math.round(totalInvested),
      returns: Math.round(totalReturns),
      total: Math.round(totalValue)
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  return (
    <ToolPageLayout
      toolId="sip-calculator"
      title="SIP Calculator"
      description="Calculate the future value of your Systematic Investment Plan (SIP)."
      category="Calculators"
      seoContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              What is SIP?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you contribute a fixed amount regularly (monthly, quarterly, etc.). It helps in rupee cost averaging and benefits from the power of compounding over the long term.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Breakdown
            </h3>
            {result && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    Invested
                  </span>
                  <span className="font-medium">{((result.invested / result.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Returns
                  </span>
                  <span className="font-medium">{((result.returns / result.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gray-300" style={{ width: `${(result.invested / result.total) * 100}%` }}></div>
                  <div className="h-full bg-green-500" style={{ width: `${(result.returns / result.total) * 100}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Monthly Investment (₹)</label>
              <span className="text-blue-600 font-bold">₹{monthlyInvestment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Expected Return Rate (p.a %)</label>
              <span className="text-blue-600 font-bold">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Time Period (Years)</label>
              <span className="text-blue-600 font-bold">{timePeriod} Yr</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {result && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-xs text-gray-500 mb-1">Invested Amount</p>
              <p className="text-xl font-bold text-gray-900">₹{result.invested.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center">
              <p className="text-xs text-green-600 mb-1">Est. Returns</p>
              <p className="text-xl font-bold text-green-700">₹{result.returns.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <p className="text-xs text-blue-600 mb-1">Total Value</p>
              <p className="text-xl font-bold text-blue-700">₹{result.total.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
