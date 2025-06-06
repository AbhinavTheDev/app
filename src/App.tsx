import { Routes, Route } from 'react-router-dom'
import HouseholdDashboard from './pages/dash.tsx'
import WasteSegregationGuide from './pages/guide.tsx'
import RewardsPage from './pages/reward.tsx'
import CollectionSchedule from './pages/schedule.tsx'
import BuySellMarketplace from './pages/buySell.tsx'
import Compost from './pages/scanner.tsx'
import SupportFeedback from './pages/support.tsx'
import HomePage from './pages/home.tsx'
import ScanWaste from './pages/scanWaste.tsx'
import WasteChatbot from './pages/chatbot.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/household" element={<HouseholdDashboard onBack={() => window.history.back()} />} />
      <Route path="/waste-guide" element={<WasteSegregationGuide onBack={() => window.history.back()} />} />
      <Route path="/scan" element={<ScanWaste onBack={() => window.history.back()} />} />
      <Route path="/chatbot" element={<WasteChatbot onBack={() => window.history.back()} />} />
      <Route path="/rewards" element={<RewardsPage onBack={() => window.history.back()} />} />
      <Route path="/schedule" element={<CollectionSchedule onBack={() => window.history.back()} />} />
      <Route path="/compost" element={<Compost onBack={() => window.history.back()} />} />
      <Route path="/buy-sell" element={<BuySellMarketplace onBack={() => window.history.back()} />} />
      <Route path="/support" element={<SupportFeedback onBack={() => window.history.back()} />} />
    </Routes>
  )
}