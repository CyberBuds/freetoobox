import { useState, useEffect } from 'react';
import { Calculator, Landmark, Calendar, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(10);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculateLoan = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureType === 'years' ? loanTenure * 12 : loanTenure;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  return (
    <ToolPageLayout
      toolId="loan-calculator"
      title="Loan Calculator"
      description="Calculate your monthly EMI, total interest, and total repayment amount."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            EMI Calculation Formula
          </h3>
          <p className="text-sm text-gray-600 font-mono bg-gray-50 p-4 rounded-xl">
            EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Where P is Principal, R is monthly interest rate, and N is number of monthly installments.
          </p>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
            <div className="relative">
              <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a)</label>
              <div className="relative">
                <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-medium outline-none"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="p-8 bg-blue-600 rounded-2xl text-white text-center shadow-lg shadow-blue-100">
              <p className="text-blue-100 text-sm mb-1 uppercase tracking-wider font-bold">Monthly EMI</p>
              <p className="text-5xl font-black">₹{result.emi.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-widest">Total Interest</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.totalInterest.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-widest">Total Payment</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.totalPayment.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
