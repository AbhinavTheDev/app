import React, { useRef, useState, useEffect } from "react";
import { Upload, Trash2, Recycle, Camera, RefreshCw, FileImage, SwitchCamera } from "lucide-react";
import axios from "axios";

export default function ScanWaste({ onBack }: { onBack: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classification, setClassification] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [inputMode, setInputMode] = useState<'file' | 'camera'>('file');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Backend API URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";

  // Clean up function to stop camera stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload and classify the image
      classifyImage(file);
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      
      // Stop any existing stream first
      stopCameraStream();
      
      // Request camera access with current facing mode
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: facingMode, 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Store stream for cleanup
      streamRef.current = stream;
      
      // Set video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsCameraActive(true);
      setHasCameraPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions and try again.");
      setHasCameraPermission(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to file
    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], "camera-capture.jpg", { type: 'image/jpeg' });
        
        // Set image preview
        setImageUrl(canvas.toDataURL('image/jpeg'));
        
        // Stop camera to save resources
        stopCameraStream();
        setIsCameraActive(false);
        
        // Classify the image
        classifyImage(file);
      }
    }, 'image/jpeg', 0.9);
  };

  const retakePhoto = () => {
    setImageUrl(null);
    setClassification(null);
    setError(null);
    startCamera();
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCameraStream();
      setIsCameraActive(false);
    } else {
      startCamera();
    }
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
    // If camera is already active, restart it with new facing mode
    if (isCameraActive) {
      startCamera();
    }
  };

  const classifyImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setClassification(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${API_URL}/classify-waste-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 15000
        }
      );

      setClassification(response.data.classification);
    } catch (err) {
      console.error("Error classifying image:", err);
      setError("Failed to classify image. Please try again.");
    } finally {
      setIsLoading(false);
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
            <Recycle className="w-6 h-6" />
            Waste Classifier
          </h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Camera View */}
          {isCameraActive && (
            <div className="relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-auto rounded-lg border-2 border-green-400"
              ></video>
              
              <div className="absolute top-2 right-2">
                <button
                  onClick={switchCamera}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-green-600 hover:bg-white"
                  title="Switch camera"
                >
                  <SwitchCamera className="h-5 w-5" />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={captureImage}
                  className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-green-500"
                >
                  <Camera className="w-6 h-6 text-green-600" />
                </button>
                
                <button
                  onClick={toggleCamera}
                  className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}
          
          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden"></canvas>

          {/* Input mode toggle and options - Show only when no image and camera is not active */}
          {!imageUrl && !isCameraActive && (
            <div className="space-y-6">
              {/* Toggle between file and camera modes */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
                    inputMode === 'file' 
                      ? 'bg-white text-green-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setInputMode('file')}
                >
                  <FileImage className="w-4 h-4" />
                  <span className="text-sm font-medium">File</span>
                </button>
                <button
                  className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
                    inputMode === 'camera' 
                      ? 'bg-white text-green-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setInputMode('camera')}
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-sm font-medium">Camera</span>
                </button>
              </div>
              
              {/* File upload option */}
              {inputMode === 'file' && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload waste image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
              
              {/* Camera option */}
              {inputMode === 'camera' && (
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={startCamera}
                    className="w-full py-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center gap-2 hover:border-green-500 transition-colors"
                  >
                    <Camera className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Open camera to take a photo
                    </p>
                  </button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Current camera:</span>
                    <button 
                      onClick={switchCamera}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-green-600 hover:bg-gray-200"
                    >
                      <span>{facingMode === 'environment' ? 'Back camera' : 'Front camera'}</span>
                      <SwitchCamera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Image Preview */}
          {imageUrl && !isCameraActive && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Uploaded waste"
                className="w-full h-auto object-cover rounded-lg border-2 border-dashed border-green-400"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={retakePhoto}
                  className="p-1 bg-green-500 rounded-full text-white hover:bg-green-600"
                  title="Retake photo"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setImageUrl(null);
                    setClassification(null);
                    setError(null);
                  }}
                  className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  title="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Camera Permission Error */}
          {hasCameraPermission === false && (
            <div className="p-4 rounded-lg bg-yellow-100 text-yellow-800">
              <p className="text-center">
                Camera access denied. Please check your browser settings and allow camera access.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center p-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Analyzing waste image...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-800">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Classification Results */}
          {classification && !isLoading && (
            <div
              className={`p-4 rounded-lg ${
                classification.is_recyclable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="text-center font-semibold text-2xl">
                {classification.is_recyclable
                  ? "♻️ Recyclable"
                  : "🚫 Non-recyclable"}
              </p>
              <p className="text-center text-md mt-1 font-medium">
                Detected Material: {classification.predicted_class}
              </p>
              <p className="text-center text-sm text-gray-700">
                Confidence: {Math.round(classification.confidence * 100)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}