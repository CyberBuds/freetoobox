import { useState } from 'react';
import { TrendingUp, PieChart, Coins } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function EPFCalculator() {
  const [basic, setBasic] = useState<number>(50000);
  const [age, setAge] = useState<number>(25);
  const [retirementAge, setRetirementAge] = useState<number>(58);
  const [currentEPF, setCurrentEPF] = useState<number>(0);
  const [increment, setIncrement] = useState<number>(5);
  const interestRate = 8.25; // 2024-25 expected rate

  const years = retirementAge - age;

  const calculateRetirementCorpus = () => {
    let balance = currentEPF;
    let currentMonthlyBasic = basic;

    for (let i = 0; i < years; i++) {
      // Monthly contributions
      const employeeContrib = currentMonthlyBasic * 0.12;
      const employerEPF = currentMonthlyBasic * 0.0367; // Employer EPF share approx 3.67%
      const totalMonthlyContrib = employeeContrib + employerEPF;
      
      // Annual contribution
      const annualContrib = totalMonthlyContrib * 12;
      
      // Interest calculation (Simplified annual compounding)
      const interest = (balance + annualContrib / 2) * (interestRate / 100);
      balance += annualContrib + interest;
      
      // Basic increment
      currentMonthlyBasic += currentMonthlyBasic * (increment / 100);
    }
    return balance;
  };

  const totalCorpus = calculateRetirementCorpus();

  return (
    <ToolPageLayout
      toolId="epf-calculator"
      title="EPF Calculator (Employee Provident Fund)"
      description="Estimate your retirement corpus by projecting your EPF contributions and interest over time."
      category="Finance Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is EPF?</h2>
            <p className="text-gray-600">
              The <strong>Employee Provident Fund (EPF)</strong> is a popular savings scheme in India tailored for salaried individuals. Managed by the <strong>EPFO</strong>, it serves as a retirement benefit account where both the employee and employer contribute a fixed percentage of the monthly basic salary.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding the Contributions</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Employee's Share:</strong> 12% of (Basic Salary + DA) is deducted and credited to the EPF account.</li>
              <li><strong>Employer's Share:</strong> 12% total. Out of this, 3.67% goes to the EPF account, and 8.33% goes toward the <strong>Employee Pension Scheme (EPS)</strong>.</li>
              <li><strong>Interest Rate:</strong> The interest rate is declared annually by the government. For FY 2023-24, it was set at 8.25%.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Benefits of Long-Term EPF Savings</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Tax Benefit (Section 80C):</strong> Contributions are eligible for deduction under 80C.</li>
              <li><strong>Tax-Free Returns:</strong> The interest earned and the final maturity amount are tax-free if the service exceeds 5 years.</li>
              <li><strong>Compounding Power:</strong> Since EPF is a decades-long commitment, the power of annual compounding can turn small monthly deductions into a multi-crore retirement fund.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Monthly Basic + DA (₹)</label>
                <input
                  type="number"
                  value={basic}
                  onChange={(e) => setBasic(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Current Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Annual Increment (%)</label>
                <input
                  type="number"
                  value={increment}
                  onChange={(e) => setIncrement(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Current EPF Balance (Optional)</label>
              <input
                type="number"
                value={currentEPF || ''}
                onChange={(e) => setCurrentEPF(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="₹0"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 flex flex-col justify-center space-y-6 border border-blue-100">
            <div className="text-center">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Expected Retirement Corpus</span>
              <div className="text-4xl font-black text-blue-600 mt-2">
                ₹{Math.round(totalCorpus).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-100">
              <div className="bg-white/50 p-4 rounded-2xl text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Monthly Contrib</span>
                  <p className="font-bold text-blue-900">₹{(basic * 0.1567).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-white/50 p-4 rounded-2xl text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Total Years Left</span>
                  <p className="font-bold text-blue-900">{years}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
