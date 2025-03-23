import React, { useRef, useState } from "react";
import { Upload, Trash2, Recycle } from "lucide-react";
import axios from "axios";

export default function ScanWaste({ onBack }: { onBack: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classification, setClassification] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Backend API URL
  const API_URL = "/api";

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
          {/* Image Upload Section */}
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

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Uploaded waste"
                className="w-full h-58 object-cover rounded-lg border-2 border-dashed border-green-400"
              />
              <button
                onClick={() => {
                  setImageUrl(null);
                  setClassification(null);
                  setError(null);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
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