import { X } from "lucide-react";
export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
    return (
      <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-green-100">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  