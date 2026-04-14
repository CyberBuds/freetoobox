import { useState, useEffect } from 'react';
import { Landmark, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function FDCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(5);
  const [result, setResult] = useState<{ invested: number; returns: number; total: number } | null>(null);

  const calculateFD = () => {
    const P = principal;
    const r = interestRate;
    const t = tenure;

    // A = P(1 + r/100)^t (Compounded annually for simplicity)
    const totalValue = P * Math.pow(1 + r / 100, t);
    const totalReturns = totalValue - P;

    setResult({
      invested: Math.round(P),
      returns: Math.round(totalReturns),
      total: Math.round(totalValue)
    });
  };

  useEffect(() => {
    calculateFD();
  }, [principal, interestRate, tenure]);

  return (
    <ToolPageLayout
      toolId="fd-calculator"
      title="FD Calculator"
      description="Calculate the maturity amount and interest earned on your Fixed Deposit (FD)."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Fixed Deposit (FD)
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            A Fixed Deposit is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date. It is considered one of the safest investment options.
          </p>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Principal Amount (₹)</label>
              <span className="text-blue-600 font-bold">₹{principal.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Rate of Interest (p.a %)</label>
              <span className="text-blue-600 font-bold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Tenure (Years)</label>
              <span className="text-blue-600 font-bold">{tenure} Yr</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
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
