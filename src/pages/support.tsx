import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'

export default function SupportFeedback({ onBack }: { onBack: () => void }) {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.trim()) {
      setSubmitted(true)
      // Show toast and then navigate back after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFeedback('')
        onBack()
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative">
      <div className="max-w-md mx-auto min-h-screen relative pb-16">
        <div className="bg-green-600 p-6 rounded-b-3xl shadow-lg flex items-center">
          <button onClick={onBack} className="text-white hover:text-green-100 mr-4">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Support & Feedback
          </h2>
        </div>
        <div className="p-4 mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your query..."
              className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg"
            >
              Submit Feedback
            </button>
          </form>
        </div>
        {submitted && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Feedback submitted!
          </div>
        )}
      </div>
    </div>
  )
}