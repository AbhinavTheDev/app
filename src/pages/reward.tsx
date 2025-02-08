import { useState } from 'react';
import { ArrowRight, Coins, Gift, Trophy } from 'lucide-react';
import Toast from '../components/toaster';
export default function RewardsPage({ onBack }: { onBack: () => void }) {
    const [currentCoins, setCurrentCoins] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const rewardCards = [
      {
        title: 'Amazon Voucher',
        coins: 5000,
        image: 'https://static.toiimg.com/thumb/msid-107302170,width-1280,height-420,resizemode-4/107302170.jpg',
        description: 'Get 50% off voucher on any purchase'
      },
      {
        title: 'Flipkart Voucher',
        coins: 7500,
        image: 'https://images.yourstory.com/cs/2/220356402d6d11e9aa979329348d4c3e/Flipkart-1582211499554.jpg?fm=png&auto=format&blur=500',
        description: 'Get 50% off voucher on any purchase'
      },
      {
        title: 'Myntra Voucher',
        coins: 7500,
        image: 'http://perficient.com/-/media/images/insights/research/case-study-logos/myntra_logo-min.ashx?h=320&iar=0&w=500&hash=6ABE517E5CDA2D1710DF42786417FE33',
        description: 'Get 50% off voucher on any purchase'
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
              <Trophy className="w-6 h-6" />
              Rewards & Incentives
            </h2>
          </div>
  
          <div className="p-4 space-y-6">
            {/* ReGen Coins Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  ReGen Coins
                </h3>
                <span className="text-2xl font-bold">{currentCoins}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Month Earned</span>
                  <span>+0 coins</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  {/* <div className="h-full bg-white w-3/4 rounded-full"></div> */}
                </div>
                <p className="text-xs text-white/80">
                  Earn more coins by segregating waste and maintaining cleanliness
                </p>
              </div>
            </div>
  
            {/* Redeem Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Redeem Your Coins
              </h3>
  
              <div className="grid gap-4">
                {rewardCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">{card.title}</h4>
                        <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                          <Coins className="w-4 h-4" />
                          {card.coins}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                      <button className="w-full bg-green-600 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                      onClick={() => {
                        if (currentCoins >= card.coins) {
                          setCurrentCoins(currentCoins - card.coins);
                          alert('Redeemed Successfully');
                        } else if (currentCoins < card.coins) {
                          setShowToast(true);
                        }
                      }}>
                        Redeem Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showToast && (
        <Toast
          message="Insufficient Coins!"
          onClose={() => setShowToast(false)}
        />
      )}
        </div>
      </div>
     
    );
  }
       
