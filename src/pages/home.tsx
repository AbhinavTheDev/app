import { useNavigate } from 'react-router-dom'
import {
  Home,
  QrCode,
  Users,
  Truck,
  Trophy,
  Upload,
  ShoppingBag,
  MessageCircle,
  Leaf,
} from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  const sections = [
    { title: 'Household Dashboard', route: '/household', icon: <Home className="w-6 h-6" /> },
    { title: 'Waste Segregation Guide', route: '/waste-guide', icon: <Users className="w-6 h-6" /> },
    { title: 'Rewards & Incentives', route: '/rewards', icon: <Trophy className="w-6 h-6" /> },
    { title: 'Waste Collection Schedule', route: '/schedule', icon: <Truck className="w-6 h-6" /> },
    { title: 'Upload Composting Proof', route: '/uploadProof', icon: <Upload className="w-6 h-6" /> },
    { title: 'Buy/Sell', route: '/buy-sell', icon: <ShoppingBag className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto min-h-screen relative pb-16">
        <div
          className="relative pt-12 pb-6 px-6 bg-gradient-to-br from-green-500 to-green-600 rounded-b-3xl shadow-lg"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600')`,
            backgroundBlend: 'soft-light',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backdropFilter: 'blur(50px)',
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <span>Regen</span>
              <span className="text-green-300">Earth</span>
              <Leaf className="w-6 h-6 text-green-300" />
            </h1>
            <button className="mt-4 w-full bg-white/90 backdrop-blur-sm rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-green-700 font-medium shadow-lg hover:bg-white transition-colors">
              <QrCode className="w-5 h-5" />
              Scan Waste
            </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <button
              key={index}
              className="p-4 bg-green-50 rounded-xl flex flex-col items-center text-center gap-3 hover:bg-green-100 transition-colors shadow-sm"
              onClick={() => navigate(section.route)}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                {section.icon}
              </div>
              <span className="text-sm font-medium text-green-800">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="fixed flex items-center justify-center bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button
            onClick={() => navigate('/support')}
            className="w-[420px] bg-green-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Support & Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

