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
      description="Plan your loans better with our easy-to-use EMI calculator."
      category="Calculators"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an EMI?</h2>
          <p className="text-gray-600 mb-4">
            EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. Equated monthly installments are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Components of an EMI</h3>
          <p className="text-gray-600 mb-4">
            An EMI consists of two main parts:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Principal Amount:</strong> This is the actual amount you borrowed from the bank or financial institution.</li>
            <li><strong>Interest Component:</strong> This is the cost of borrowing the money, calculated based on the interest rate provided by the lender.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-2">How to use the EMI Calculator?</h3>
          <p className="text-gray-600 mb-4">
            Our EMI calculator is a handy tool that helps you calculate the monthly amount you will need to pay for your loan. To use it:
          </p>
          <ol className="list-decimal pl-6 text-gray-600 mb-6 space-y-2">
            <li>Adjust the <strong>Loan Amount</strong> slider to the amount you wish to borrow.</li>
            <li>Set the <strong>Interest Rate</strong> offered by your bank.</li>
            <li>Choose the <strong>Loan Tenure</strong> (the number of years you want to take to repay the loan).</li>
            <li>The calculator will instantly show your monthly EMI, total interest payable, and the total amount you will pay back.</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Benefits of using an EMI Calculator</h3>
          <p className="text-gray-600 mb-4">
            Using an EMI calculator before taking a loan is highly recommended for several reasons:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Financial Planning:</strong> It helps you understand if you can afford the monthly payments within your current budget.</li>
            <li><strong>Comparison:</strong> You can easily compare different loan offers by changing the interest rates and tenures.</li>
            <li><strong>No Manual Errors:</strong> Manual calculations can be complex and prone to errors. Our tool ensures 100% accuracy.</li>
          </ul>
        </>
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
