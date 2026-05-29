import { useState } from 'react';
import { Wallet, Navigation, Fuel } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function PetrolCostCalculator() {
  const [distance, setDistance] = useState<number>(100);
  const [mileage, setMileage] = useState<number>(15);
  const [fuelPrice, setFuelPrice] = useState<number>(100);

  const fuelNeeded = distance / mileage;
  const totalCost = fuelNeeded * fuelPrice;

  return (
    <ToolPageLayout
      toolId="petrol-cost-calculator"
      title="Petrol & Fuel Cost Calculator"
      description="Estimate the cost of your trip and fuel consumption based on distance and vehicle mileage."
      category="Utility Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Your Trip with Precision</h2>
            <p className="text-gray-600">
              With fuel prices fluctuating daily, planning a long drive requires careful budgeting. Our <strong>Fuel Cost Calculator</strong> helps you estimate exactly how much you'll spend on petrol or diesel for any journey.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">How to Calculate Fuel Consumption</h3>
            <p className="text-sm text-gray-600 mb-4">The math behind your trip is simple:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Fuel Needed (Liters):</strong> Distance ÷ Vehicle Mileage (Efficiency)</li>
              <li><strong>Total Cost:</strong> Fuel Needed × Current Fuel Price</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tips to Improve Vehicle Mileage</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Maintain Tire Pressure:</strong> Low pressure increases rolling resistance and consumes more fuel.</li>
              <li><strong>Steady Speed:</strong> Harsh acceleration and frequent braking can reduce efficiency by up to 30%.</li>
              <li><strong>Reduce Load:</strong> Remove unnecessary weight from your trunk to improve the power-to-weight ratio.</li>
              <li><strong>Regular Service:</strong> Clogged air filters and old spark plugs can hurt your engine's efficiency significantly.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-blue-500" /> Distance to Travel (km)
              </label>
              <input
                type="number"
                value={distance || ''}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. 500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Fuel className="h-4 w-4 text-green-500" /> Vehicle Mileage (km/L)
              </label>
              <input
                type="number"
                value={mileage || ''}
                onChange={(e) => setMileage(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. 15"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-orange-500" /> Fuel Price (Per Liter)
              </label>
              <input
                type="number"
                value={fuelPrice || ''}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. 100"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 flex flex-col justify-center space-y-6 border border-blue-100">
            <div className="text-center">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Estimated Total Cost</span>
              <div className="text-4xl font-black text-blue-600 mt-2">
                ₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-blue-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-700 font-medium italic">Fuel Needed</span>
                <span className="text-blue-900 font-bold">{fuelNeeded.toFixed(2)} Liters</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-700 font-medium italic">Cost per KM</span>
                <span className="text-blue-900 font-bold">₹{(totalCost / distance).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
