import { useState, useRef, useEffect } from 'react'
import { Upload, Camera, ArrowRight } from 'lucide-react'

export default function UploadProof({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!capturedImage) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((mediaStream) => {
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
            videoRef.current.play()
          }
        })
        .catch((error) => {
          console.error('Error accessing camera', error)
        })
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [capturedImage])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const width = videoRef.current.videoWidth
      const height = videoRef.current.videoHeight
      const canvas = canvasRef.current
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/png')
        setCapturedImage(dataUrl)
        // Stop the stream once captured
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    }
  }

  const handleRetake = () => {
    setCapturedImage('')
    // useEffect will restart the camera when capturedImage is cleared
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onBack()
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative">
      <div className="max-w-md mx-auto min-h-screen relative pb-16">
      <div className="bg-green-600 p-6 rounded-b-3xl shadow-lg">
        <button
              onClick={onBack}
              className="text-white mb-4 hover:text-green-100"
            >
              ← Back
            </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Upload className="w-6 h-6" />
            Upload Composting Proof</h2>
        </div>
        <div className="p-4 mt-4 flex flex-col items-center">
          {!capturedImage ? (
            <div className="w-full relative">
              <video ref={videoRef} className="w-full rounded-lg shadow-lg" autoPlay playsInline />
              <button
                onClick={handleCapture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="w-full">
              <img src={capturedImage} alt="Captured Proof" className="w-full rounded-lg shadow-lg" />
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleRetake}
                  className="flex-1 bg-yellow-500 text-white rounded-lg py-2 hover:bg-yellow-600 transition-colors"
                >
                  Retake
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Submit proof
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        {submitted && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Proof submitted!
          </div>
        )}
      </div>
    </div>
  )
}