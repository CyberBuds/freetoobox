import { useState } from 'react';
import { Activity, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h)) return;

    let bmi = 0;
    if (unit === 'metric') {
      // weight in kg, height in cm
      bmi = w / ((h / 100) * (h / 100));
    } else {
      // weight in lbs, height in inches
      bmi = (w / (h * h)) * 703;
    }

    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600 bg-blue-50 border-blue-100';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
      color = 'text-green-600 bg-green-50 border-green-100';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      color = 'text-yellow-600 bg-yellow-50 border-yellow-100';
    } else {
      category = 'Obese';
      color = 'text-red-600 bg-red-50 border-red-100';
    }

    setResult({ bmi, category, color });
  };

  return (
    <ToolPageLayout
      toolId="bmi-calculator"
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to check your health status."
      category="Calculators"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            BMI Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-600 font-bold">{'<'} 18.5</p>
              <p className="text-[10px] text-blue-500">Underweight</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <p className="text-xs text-green-600 font-bold">18.5 - 24.9</p>
              <p className="text-[10px] text-green-500">Normal</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl">
              <p className="text-xs text-yellow-600 font-bold">25 - 29.9</p>
              <p className="text-[10px] text-yellow-500">Overweight</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <p className="text-xs text-red-600 font-bold">30+</p>
              <p className="text-[10px] text-red-500">Obese</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex gap-2 mb-8 p-1 bg-gray-50 rounded-xl">
          <button
            onClick={() => { setUnit('metric'); setResult(null); }}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
              unit === 'metric' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => { setUnit('imperial'); setResult(null); }}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
              unit === 'imperial' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Imperial (lb/in)
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 69'}
            />
          </div>
          <button
            onClick={calculateBMI}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
          >
            <Activity className="h-5 w-5" />
            Calculate BMI
          </button>
        </div>

        {result && (
          <div className={`mt-10 p-10 rounded-2xl border text-center ${result.color}`}>
            <p className="text-sm font-bold mb-1 uppercase tracking-widest opacity-70">Your BMI</p>
            <p className="text-6xl font-black mb-2">{result.bmi.toFixed(1)}</p>
            <p className="text-2xl font-bold">{result.category}</p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
