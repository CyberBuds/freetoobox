import { useState } from 'react';
import { Wallet, Info, Briefcase } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function GratuityCalculator() {
  const [basic, setBasic] = useState<number>(50000);
  const [years, setYears] = useState<number>(10);

  const gratuity = (15 * basic * years) / 26;
  const isEligible = years >= 5;

  return (
    <ToolPageLayout
      toolId="gratuity-calculator"
      title="Gratuity Calculator"
      description="Estimate the gratuity amount you are eligible to receive from your employer."
      category="Finance Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Gratuity in India?</h2>
            <p className="text-gray-600">
              Gratuity is a monetary benefit given by an employer to an employee for services rendered to the organization. It is governed by the <strong>Payment of Gratuity Act, 1972</strong>. It is usually paid at the time of retirement, resignation, or termination.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">The Calculation Formula</h3>
            <p className="text-sm text-gray-600 mb-4">For employees covered under the Act, the formula is:</p>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-blue-600 font-mono text-center">
              Gratuity = (15 * Last Drawn Salary * Years of Service) / 26
            </div>
            <ul className="mt-4 text-xs text-gray-500 space-y-1 italic">
              <li>* Last Drawn Salary = Monthly Basic + Dearness Allowance (DA).</li>
              <li>* 26 represents the number of working days in a month.</li>
              <li>* 15 represents 15 days of salary for every year of completed service.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Eligibility & Rules</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Completion of 5 Years:</strong> An employee must have completed at least 5 years of continuous service with the same employer to become eligible.</li>
              <li><strong>Rounding of Service:</strong> If the service period in the final year exceeds 6 months, it is rounded up to the next full year (e.g., 5 years 7 months is treated as 6 years).</li>
              <li><strong>Tax Exemption:</strong> For private-sector employees, gratuity up to ₹20 Lakh is exempt from income tax throughout their lifetime.</li>
              <li><strong>Death or Disablement:</strong> The 5-year eligibility rule is relaxed in case of death or disablement of the employee.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500" /> Last Drawn Monthly Salary (Basic + DA)
              </label>
              <input
                type="number"
                value={basic || ''}
                onChange={(e) => setBasic(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                 Years of Service
              </label>
              <input
                type="number"
                value={years || ''}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. 10"
              />
            </div>
            {!isEligible && (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-xs flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0" /> Note: Eligibility typically requires 5+ years of continuous service.
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 flex flex-col justify-center space-y-6 border border-blue-100">
            <div className="text-center">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Estimated Gratuity Amount</span>
              <div className="text-4xl font-black text-blue-600 mt-2">
                ₹{Math.round(gratuity).toLocaleString('en-IN')}
              </div>
            </div>
            
            <div className="pt-6 border-t border-blue-100 italic text-sm text-blue-800 text-center">
              "This amount is calculated based on the Payment of Gratuity Act, 1972 formula."
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
