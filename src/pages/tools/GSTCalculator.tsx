import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(0);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);

  const gstAmount = isInclusive 
    ? amount - (amount * (100 / (100 + gstRate)))
    : (amount * gstRate) / 100;

  const totalAmount = isInclusive ? amount : amount + gstAmount;
  const netAmount = isInclusive ? amount - gstAmount : amount;

  return (
    <ToolPageLayout
      toolId="gst-calculator"
      title="GST Calculator (India)"
      description="Calculate Goods and Services Tax quickly and accurately for Indian businesses and consumers."
      category="Calculators"
      seoContent={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deep Dive into Goods and Services Tax (GST)</h2>
            <p className="text-gray-600 mb-4">
              The Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multistage, destination-based tax: comprehensive because it has absorbed almost all the indirect taxes except a few state taxes. Multi-staged as it is, the GST is imposed at every step in the production process, but is meant to be refunded to all parties in the various stages of production other than the final consumer.
            </p>
            <p className="text-gray-600">
              As a destination-based tax, it is collected from the point of consumption and not the point of origin like previous taxes (VAT, Excise Duty, Service Tax). This shift has significantly streamlined the Indian tax structure and reduced the "cascading effect" of taxes.
            </p>
          </section>
          
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">The Mathematical Formula Behind GST</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700">For GST Exclusive Amount:</p>
                <code className="block bg-white p-3 rounded border border-gray-200 text-blue-600 font-mono">
                  GST Amount = (Original Cost * GST%) / 100
                  <br />
                  Net Price = Original Cost + GST Amount
                </code>
              </div>
              <div>
                <p className="font-semibold text-gray-700">For GST Inclusive Amount:</p>
                <code className="block bg-white p-3 rounded border border-gray-200 text-blue-600 font-mono">
                  GST Amount = Total Price - (Total Price * (100 / (100 + GST%)))
                  <br />
                  Net Price = Total Price - GST Amount
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Understanding GST Tax Slabs in India</h3>
            <p className="text-gray-600 mb-4">
              The Indian government has categorized over 1300 goods and 500 services under four primary tax slabs:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <span className="font-bold text-blue-600">5% Slab:</span>
                <p className="text-sm text-gray-500">Essential items like sugar, spices, tea, coffee, and life-saving drugs.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <span className="font-bold text-blue-600">12% Slab:</span>
                <p className="text-sm text-gray-500">Standard items like butter, cheese, ghee, computers, and processed food.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <span className="font-bold text-blue-600">18% Slab:</span>
                <p className="text-sm text-gray-500">The most common slab covering services like telecom, IT, and branded products.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <span className="font-bold text-blue-600">28% Slab:</span>
                <p className="text-sm text-gray-500">Luxury and demerit goods like high-end cars, tobacco, and carbonated drinks.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Why Use Our GST Calculator?</h3>
            <p className="text-gray-600 mb-4">
              Accuracy in tax calculation is the backbone of any healthy business. Here is how FreeToolsBox.in adds value:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>Zero Mistakes:</strong> Eliminate manual mathematical errors that lead to invoicing disputes.</li>
              <li><strong>Instant Results:</strong> No need to remember complex formulas or use dedicated accounting software for quick quotes.</li>
              <li><strong>Transparent Breakdown:</strong> Clearly see the breakdown of Net Amount vs Tax Amount for better customer communication.</li>
              <li><strong>Client-Side Security:</strong> Unlike other tools, we don't 'track' your business turnover or invoice amounts. Your data stays in your browser.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Pro Tip for Business Owners:</h3>
            <p className="text-blue-800 italic">
              "Always verify if the price quoted by a vendor is GST inclusive or exclusive before processing payments. Use this calculator to reverse-calculate the base price for more effective negotiation."
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2 rounded-lg border text-sm font-semibold transition-all ${gstRate === rate ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <button
                onClick={() => setIsInclusive(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isInclusive ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
              >
                Exclusive
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isInclusive ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
              >
                Inclusive
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 flex flex-col justify-center space-y-6">
            <div className="flex justify-between items-center border-b border-blue-100 pb-4">
              <span className="text-blue-700 font-medium">Net Amount</span>
              <span className="text-xl font-bold text-blue-900">₹{netAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center border-b border-blue-100 pb-4">
              <span className="text-blue-700 font-medium">GST Amount ({gstRate}%)</span>
              <span className="text-xl font-bold text-blue-900">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-blue-800 font-bold text-lg">Total Amount</span>
              <span className="text-3xl font-black text-blue-600">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
