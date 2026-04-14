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
      description="Calculate Goods and Services Tax quickly and accurately."
      category="Calculators"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding GST in India</h2>
          <p className="text-gray-600 mb-4">
            The Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multistage, destination-based tax: comprehensive because it has absorbed almost all the indirect taxes except a few state taxes. Multi-staged as it is, the GST is imposed at every step in the production process, but is meant to be refunded to all parties in the various stages of production other than the final consumer and as a destination-based tax, it is collected from point of consumption and not point of origin like previous taxes.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to use the GST Calculator?</h3>
          <p className="text-gray-600 mb-4">
            Our online GST calculator is designed to help you determine either the net or gross price of your product based on a percentage-based GST rate. It's very simple to use:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Enter the initial amount (cost of goods or services).</li>
            <li>Select the applicable GST rate (5%, 12%, 18%, or 28%).</li>
            <li>Choose whether the amount is "GST Exclusive" (tax will be added) or "GST Inclusive" (tax is already included in the price).</li>
            <li>The calculator will instantly show you the Net Amount, GST Amount, and Total Amount.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Why is GST Calculation Important?</h3>
          <p className="text-gray-600 mb-4">
            For business owners, accurate GST calculation is crucial for pricing products correctly and ensuring compliance with tax regulations. It helps in:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Accurate Invoicing:</strong> Ensure your customers are charged the correct tax amount.</li>
            <li><strong>Profit Margin Analysis:</strong> Understand your true costs after removing the tax component.</li>
            <li><strong>Tax Filing:</strong> Simplify the process of calculating your total tax liability for monthly or quarterly filings.</li>
            <li><strong>Transparency:</strong> Provide clear breakdowns to your clients about the tax they are paying.</li>
          </ul>

          <p className="text-gray-600">
            Whether you are a small business owner, a freelancer, or a consumer wanting to verify a bill, our GST calculator provides a quick and reliable way to handle tax calculations on the go.
          </p>
        </>
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
