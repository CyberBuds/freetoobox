import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult({ years, months, days });
  };

  return (
    <ToolPageLayout
      toolId="age-calculator"
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days."
      category="Calculators"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why use an Age Calculator?</h2>
          <p className="text-gray-600 mb-4">
            While calculating age might seem simple, doing it manually can be tricky due to the varying number of days in months and the occurrence of leap years. Our online age calculator takes all these factors into account to provide you with a precise result down to the day.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">How the calculation works</h3>
          <p className="text-gray-600 mb-4">
            The calculator determines the interval between your birth date and the current date. It uses the standard Gregorian calendar system. Here's what it considers:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Leap Years:</strong> It automatically accounts for the extra day in February every four years.</li>
            <li><strong>Month Lengths:</strong> It knows which months have 30 days and which have 31.</li>
            <li><strong>Current Time:</strong> It uses your local system time to ensure the "today" reference is accurate.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Common uses for Age Calculation</h3>
          <p className="text-gray-600 mb-4">
            People use our age calculator for various purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Job Applications:</strong> Many government and private sector jobs have specific age criteria.</li>
            <li><strong>Insurance:</strong> Calculating exact age is necessary for determining insurance premiums.</li>
            <li><strong>School Admissions:</strong> Verifying if a child meets the age requirement for a particular grade.</li>
          </ul>

          <p className="text-gray-600">
            Whether you need to fill out a form or just want to celebrate your "half-birthday," our tool is the fastest way to get your exact age.
          </p>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="w-full max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date of Birth</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={calculateAge}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
            >
              Calculate Age
            </button>
          </div>

          {ageResult && (
            <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
                <div className="text-4xl font-black text-blue-600">{ageResult.years}</div>
                <div className="text-sm font-bold text-blue-800 uppercase tracking-widest mt-2">Years</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
                <div className="text-4xl font-black text-blue-600">{ageResult.months}</div>
                <div className="text-sm font-bold text-blue-800 uppercase tracking-widest mt-2">Months</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
                <div className="text-4xl font-black text-blue-600">{ageResult.days}</div>
                <div className="text-sm font-bold text-blue-800 uppercase tracking-widest mt-2">Days</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
