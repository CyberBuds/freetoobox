import { useState } from 'react';
import { Calculator, Landmark, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState<number>(1000000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  const calculateTax = () => {
    if (regime === 'new') {
      // New Tax Regime (FY 2024-25 / AY 2025-26)
      // Standard Deduction: 75,000
      let taxableIncome = Math.max(0, income - 75000);
      
      // Slab breakdown
      // 0-3L: NIL
      // 3-7L: 5% (on 4L) = 20,000
      // 7-10L: 10% (on 3L) = 30,000
      // 10-12L: 15% (on 2L) = 30,000
      // 12-15L: 20% (on 3L) = 60,000
      // >15L: 30%
      
      let tax = 0;
      if (taxableIncome > 1500000) {
        tax += (taxableIncome - 1500000) * 0.3;
        taxableIncome = 1500000;
      }
      if (taxableIncome > 1200000) {
        tax += (taxableIncome - 1200000) * 0.2;
        taxableIncome = 1200000;
      }
      if (taxableIncome > 1000000) {
        tax += (taxableIncome - 1000000) * 0.15;
        taxableIncome = 1000000;
      }
      if (taxableIncome > 700000) {
        tax += (taxableIncome - 700000) * 0.1;
        taxableIncome = 700000;
      }
      if (taxableIncome > 300000) {
        tax += (taxableIncome - 300000) * 0.05;
      }

      // Rebate u/s 87A: Taxable Income up to 7L (without standard deduction)
      // Actually in new regime, if income up to 7L (net 7L before std), tax is NIL.
      // But specifically, if taxable income <= 7,00,000 -> Tax is Nil.
      if (income - 75000 <= 700000) tax = 0;

      return { tax: tax, finalIncome: income - (tax * 1.04), cess: tax * 0.04 };
    } else {
      // Old Regime (Simplified - assuming 80C of 1.5L)
      let taxableIncome = Math.max(0, income - 50000 - 150000); // Standard + 80C
      let tax = 0;
      if (taxableIncome > 1000000) {
        tax += (taxableIncome - 1000000) * 0.3;
        taxableIncome = 1000000;
      }
      if (taxableIncome > 500000) {
        tax += (taxableIncome - 500000) * 0.2;
        taxableIncome = 500000;
      }
      if (taxableIncome > 250000) {
        tax += (taxableIncome - 250000) * 0.05;
      }
      
      if (income <= 500000) tax = 0;

      return { tax: tax, finalIncome: income - (tax * 1.04), cess: tax * 0.04 };
    }
  };

  const { tax, finalIncome, cess } = calculateTax();

  return (
    <ToolPageLayout
      toolId="income-tax-calculator"
      title="Income Tax Calculator (India) FY 2024-25"
      description="Estimate your Income Tax liability under both New and Old tax regimes with the latest budget updates."
      category="Finance Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigating Indian Income Tax (FY 2024-25)</h2>
            <p className="text-gray-600">
              Income tax is a direct tax paid to the government on the income earned by individuals and businesses. In India, tax calculation has become dynamic with the introduction of the <strong>New Tax Regime</strong>. Our calculator is updated with the latest <strong>Finance Act 2024</strong> changes, including the increased standard deduction.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">New Tax Regime Slabs (AY 2025-26)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between p-2 border-b border-gray-200"><span>Up to ₹3 Lakh</span> <span className="font-bold">Nil</span></div>
              <div className="flex justify-between p-2 border-b border-gray-200"><span>₹3L - ₹7 Lakh</span> <span className="font-bold">5%</span></div>
              <div className="flex justify-between p-2 border-b border-gray-200"><span>₹7L - ₹10 Lakh</span> <span className="font-bold">10%</span></div>
              <div className="flex justify-between p-2 border-b border-gray-200"><span>₹10L - ₹12 Lakh</span> <span className="font-bold">15%</span></div>
              <div className="flex justify-between p-2 border-b border-gray-200"><span>₹12L - ₹15 Lakh</span> <span className="font-bold">20%</span></div>
              <div className="flex justify-between p-2 border-b border-gray-200"><span>Above ₹15 Lakh</span> <span className="font-bold">30%</span></div>
            </div>
            <p className="mt-4 text-xs text-blue-600 font-bold flex items-center gap-1">
              <Info className="h-3 w-3" /> Standard Deduction of ₹75,000 is available in the New Regime for salaried individuals.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">New vs Old Regime: Which is better?</h3>
            <p className="text-gray-600 mb-4">
              The <strong>New Regime</strong> offers lower tax rates but removes most exemptions (HRA, 80C, 80D). The <strong>Old Regime</strong> is beneficial if you have significant investments in PF, LIC, Home Loans, and Health Insurance. As a rule of thumb, if your total deductions are less than ₹3.75 Lakhs, the New Regime usually wins.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase">Gross Annual Income (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase">Select Tax Regime</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRegime('new')}
                  className={`py-4 rounded-xl border font-bold transition-all ${regime === 'new' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'}`}
                >
                  New Regime
                </button>
                <button
                  onClick={() => setRegime('old')}
                  className={`py-4 rounded-xl border font-bold transition-all ${regime === 'old' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'}`}
                >
                  Old Regime
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 space-y-6 flex flex-col justify-center border border-gray-100">
            <div className="text-center pb-6 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Payable Tax</span>
              <div className="text-4xl font-black text-blue-600 mt-2">
                ₹{(tax + cess).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Base Tax</span>
                <span className="font-bold text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Health & Education Cess (4%)</span>
                <span className="font-bold text-gray-900">₹{cess.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-700 font-bold">In-Hand After Tax</span>
                <span className="text-xl font-black text-gray-900 text-right">₹{Math.round(finalIncome).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
