import { useState } from 'react';
import { Landmark, Home, Wallet } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function HRACalculator() {
  const [basic, setBasic] = useState<number>(500000);
  const [hraReceived, setHraReceived] = useState<number>(200000);
  const [rentPaid, setRentPaid] = useState<number>(180000);
  const [isMetro, setIsMetro] = useState<boolean>(true);

  const calculateExemption = () => {
    // Basic + DA (assuming DA is included in basic for simplicity or user knows to add it)
    const annualBasic = basic;
    const annualHRA = hraReceived;
    const annualRent = rentPaid;

    const condition1 = annualHRA;
    const condition2 = Math.max(0, annualRent - (0.1 * annualBasic));
    const condition3 = isMetro ? (0.5 * annualBasic) : (0.4 * annualBasic);

    const exempt = Math.min(condition1, condition2, condition3);
    const taxable = Math.max(0, annualHRA - exempt);

    return { exempt, taxable };
  };

  const { exempt, taxable } = calculateExemption();

  return (
    <ToolPageLayout
      toolId="hra-calculator"
      title="HRA Exemption Calculator"
      description="Calculate your tax-exempt House Rent Allowance (HRA) and save on income tax."
      category="Finance Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding HRA Tax Exemption</h2>
            <p className="text-gray-600">
              House Rent Allowance (HRA) is a core component of many salary structures in India. Under <strong>Section 10(13A)</strong> of the Income Tax Act, salaried individuals living in rented accommodations can claim an exemption on HRA, reducing their overall taxable income.
            </p>
          </section>

          <section className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">How HRA Exemption is Calculated</h3>
            <p className="text-sm text-gray-600 mb-4">The Income Tax department considers the <strong>minimum</strong> of the following three amounts as exempt from tax:</p>
            <ol className="list-decimal pl-6 text-sm text-gray-700 space-y-2">
              <li>Actual HRA component received from your employer.</li>
              <li>Actual rent paid minus 10% of your total basic salary (+ DA).</li>
              <li>50% of your basic salary if you live in a metro city (40% for non-metro).</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Important Rules for HRA Claims</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Rent Receipts:</strong> Always keep monthly rent receipts signed by your landlord as proof.</li>
              <li><strong>PAN of Landlord:</strong> If your annual rent exceeds ₹1,00,000, you must provide your landlord's PAN to your employer.</li>
              <li><strong>Parental Housing:</strong> You can pay rent to your parents and claim HRA, provided the house is owned by them and you actually transfer the money.</li>
              <li><strong>Sharing Accommodation:</strong> If you share a flat, you can claim HRA based on your share of the total rent paid.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Annual Basic Salary + DA (₹)</label>
              <input
                type="number"
                value={basic || ''}
                onChange={(e) => setBasic(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. 600000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Annual HRA Received (₹)</label>
              <input
                type="number"
                value={hraReceived || ''}
                onChange={(e) => setHraReceived(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. 240000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Total Rent Paid Annually (₹)</label>
              <input
                type="number"
                value={rentPaid || ''}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                placeholder="e.g. 180000"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase">Residence Location</label>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                 <button
                  onClick={() => setIsMetro(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isMetro ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                >
                  Metro City
                </button>
                <button
                  onClick={() => setIsMetro(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isMetro ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                >
                  Non-Metro
                </button>
              </div>
              <p className="text-[10px] text-gray-400 italic">Metro cities: Delhi, Mumbai, Kolkata, Chennai.</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 flex flex-col justify-center space-y-6 border border-green-100">
            <div className="text-center pb-6 border-b border-green-200">
              <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Tax Exempt HRA</span>
              <div className="text-4xl font-black text-green-600 mt-2">
                ₹{exempt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-green-800 font-medium">HRA Received</span>
                <span className="font-bold text-gray-900">₹{hraReceived.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-700 font-medium italic">Taxable HRA Component</span>
                <span className="font-bold text-red-600">₹{taxable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
