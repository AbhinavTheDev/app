import { useState } from 'react';
import { ChevronRight, Search, ShoppingBag, Pen, Bell, Flower } from 'lucide-react';
export default function BuySellMarketplace({ onBack }: { onBack: () => void }) {
    const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
    const [searchQuery, setSearchQuery] = useState('');
  
    const categories = [
      { 
        title: 'Stationery',
        icon: <Pen />,
        items: ['Pen Stand', 'Diary', 'Paper Sheets', 'Notebooks']
      },
      {
        title: 'Home Accessories',
        icon: <Bell />,
        items: ['Decor Bells', 'Photo Frame', 'Napkins', 'Tissue Papers']
      },
      {
        title: 'Eco-friendly Products',
        icon: <Flower />,
        items: ['Tote Bags', 'Wooden Trays', 'Cloth Laptop Bag']
      }
    ];
  
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
              <ShoppingBag className="w-6 h-6" />
              Marketplace
            </h2>
  
            {/* Search Bar */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white/90 backdrop-blur-sm text-green-800 placeholder-green-700/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-green-700/50" />
            </div>
  
            {/* Buy/Sell Tabs */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === 'buy'
                    ? 'bg-white text-green-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                Buy
              </button>
              <a
                href="https://scrapuncle.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors text-center ${
                  activeTab === 'sell'
                    ? 'bg-white text-green-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                Sell
              </a>
            </div>
          </div>
  
          <div className="p-4 space-y-6">
            {/* {activeTab === 'sell' && (
              <button className="w-full bg-green-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg">
                <Plus className="w-5 h-5" />
                Create New Listing
              </button>
            )} */}
  
            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-800">Categories</h3>
                {/* <button className="flex items-center gap-1 text-sm text-green-600">
                  <Filter className="w-4 h-4" />
                  Filter
                </button> */}
              </div>
  
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                          {category.icon}
                        </div>
                        <h4 className="font-medium text-gray-800">{category.title}</h4>
                      </div>
                      <a
                href="https://saahaszerowaste.com/waste-recycled-products/"
                target="_blank"
                rel="noopener noreferrer">
                      <ChevronRight className="w-5 h-5 text-gray-400" /></a>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 bg-white text-sm text-gray-600 rounded-full border border-gray-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }