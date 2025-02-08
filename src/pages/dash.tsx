import { Home } from 'lucide-react';
import { useState } from 'react';
import Toast from '../components/toaster';
 export default function HouseholdDashboard({ onBack }: { onBack: () => void }) {
    const [address, setAddress] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [showToast, setShowToast] = useState(false);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (address && houseNo) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-md mx-auto min-h-screen relative pb-16">
          <div className="bg-green-600 p-6 rounded-b-3xl shadow-lg">
            <button
              onClick={onBack}
              className="text-white mb-4 hover:text-green-100"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Home className="w-6 h-6" />
              Household Dashboard
            </h2>
          </div>
  
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-800">
                House Number
              </label>
              <input
                type="text"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                placeholder="Enter House Number"
                required
              />
            </div>
  
            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-800">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                placeholder="Enter Complete Address"
                rows={4}
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition-colors shadow-lg"
            >
              Save Details
            </button>
          </form>
  
          {showToast && (
            <Toast
              message="Address details saved successfully!"
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      </div>
    );
  }