import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(10);

  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenure * 12;
  
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  const totalPayment = emi * numberOfMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <ToolPageLayout
      toolId="emi-calculator"
      title="EMI Calculator"
      description="Plan your home, car, or personal loans better with our easy-to-use EMI calculator."
      category="Calculators"
      seoContent={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering Your Finances with an EMI Calculator</h2>
            <p className="text-gray-600 mb-4">
              An <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month so that over a specified number of years, the loan is paid off in full.
            </p>
            <p className="text-gray-600">
              Whether you are taking a home loan to buy your dream house, a car loan for a new vehicle, or a personal loan for a wedding or medical emergency, understanding your monthly outflow is the first step toward responsible debt management.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-3">The EMI Mathematical Formula</h3>
            <p className="text-blue-800 mb-4">Most banks and financial institutions use the 'Reducing Balance' method. The formula is:</p>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-blue-700 font-mono text-center overflow-x-auto">
              EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
            </div>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-800">
              <li><strong>P:</strong> Principal Loan Amount</li>
              <li><strong>R:</strong> Monthly Interest Rate (Annual Rate / 12 / 100)</li>
              <li><strong>N:</strong> Number of Monthly Installments</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Factors That Influence Your EMI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-blue-600 mb-1">Principal Amount</h4>
                <p className="text-xs text-gray-500">The core amount you borrow. A higher principal directly leads to a higher monthly EMI.</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-blue-600 mb-1">Interest Rate</h4>
                <p className="text-xs text-gray-500">The percentage charged by the lender. Even a 0.5% difference can save you thousands over time.</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-blue-600 mb-1">Loan Tenure</h4>
                <p className="text-xs text-gray-500">The duration of the loan. Longer tenures reduce EMI but increase the total interest paid.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Top 3 Tips for Reducing Loan Costs</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-3">
              <li><strong>Make Partial Pre-payments:</strong> Even a small annual pre-payment toward your principal can significantly reduce your tenure and total interest.</li>
              <li><strong>Choose Shorter Tenures if Possible:</strong> While a 30-year home loan has lower EMIs, a 15-year loan will save you a massive amount in interest.</li>
              <li><strong>Shop Around for Rates:</strong> Always compare the Effective Interest Rate (including processing fees) across different banks using our calculator.</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Why FreeToolsBox.in?</h3>
            <p className="text-gray-600">
              Our EMI calculator is designed for speed and clarity. We provide a visual breakdown of your principal vs. interest components, helping you visualize your debt repayment journey. And as always, your financial data stays private and local to your device.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                <span className="text-sm font-bold text-blue-600">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <span className="text-sm font-bold text-blue-600">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                <span className="text-sm font-bold text-blue-600">{tenure} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center space-y-6 border border-gray-100">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Monthly EMI</span>
              <div className="text-4xl font-black text-blue-600 mt-2">
                ₹{Math.round(emi).toLocaleString('en-IN')}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Principal Amount</span>
                <span className="font-bold text-gray-900">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Interest</span>
                <span className="font-bold text-gray-900">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-700 font-bold">Total Payment</span>
                <span className="font-black text-gray-900">₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
