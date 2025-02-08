import { useState } from 'react';
import { Droplets, Wind, House as HouseIcon, Users,Languages, Scan,ChevronRight, MessageCircle } from 'lucide-react';
import SupportFeedback from './support';
export default function WasteSegregationGuide({ onBack }: { onBack: () => void }) {
    // const [selectedLanguage, setSelectedLanguage] = useState('English');
    
    const wasteCategories = [
      {
        title: 'Wet Waste',
        icon: <Droplets className="w-6 h-6" />,
        color: 'bg-blue-500',
        items: ['Food waste', 'Vegetable peels', 'Tea bags', 'Coffee grounds', 'Meat and bones']
      },
      {
        title: 'Dry Waste',
        icon: <Wind className="w-6 h-6" />,
        color: 'bg-yellow-500',
        items: ['Paper', 'Cardboard', 'Plastic', 'Glass', 'Metal']
      },
      {
        title: 'Domestic Hazardous',
        icon: <HouseIcon className="w-6 h-6" />,
        color: 'bg-red-500',
        items: ['Batteries', 'Cleaning agents', 'Medicines', 'Electronic waste', 'Paint']
      }
    ];
  
    // const languages = ['English', 'हिंदी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ'];
  
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
              <Users className="w-6 h-6" />
              Waste Segregation Guide
            </h2>
            <button className="w-full bg-white/10 text-white rounded-lg mt-3 p-2 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
              <Scan className="w-5 h-5" />
              Scan Waste to Identify Category
            </button>
           
          </div>
  
          <div className="p-4 space-y-4">
          {/* <div className="mt-4 bg-black/10 rounded-lg p-2 flex items-center">
              <Languages className="w-5 h-5 text-black" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="ml-2 bg-transparent text-black border-none outline-none flex-1 appearance-none cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="text-green-800">
                    {lang}
                  </option>
                ))}
              </select>
            </div> */}
           
  
            {wasteCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className={`${category.color} p-4 text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                  {/* <ChevronRight className="w-5 h-5" /> */}
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className=" bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button className="w-full bg-green-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg"
          onClick={() => SupportFeedback}>
            <MessageCircle className="w-5 h-5" />
            Support & Feedback
          </button>
        </div>
        </div>
      </div>
    );
  }