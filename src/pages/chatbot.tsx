import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ArrowDown } from "lucide-react";
import axios from "axios";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function WasteChatbot({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm your waste management assistant. Ask me anything about recycling, composting, or waste disposal.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Backend API URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";

  // Add this at the top of your component (before useEffect hooks)
  const isGreeting = (text: string): boolean => {
    const greetingPatterns = [
      /\b(hi|hello|hey|greetings|howdy)\b/i,
      /\bgood\s+(morning|afternoon|evening|day)\b/i,
      /\b(what's up|sup|yo|hiya)\b/i,
      /^(hi|hello|hey)[\s\W]*$/i  // Just "hi", "hello", etc. with possible punctuation
    ];
    
    return greetingPatterns.some(pattern => pattern.test(text.toLowerCase()));
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if we should show the scroll button
  useEffect(() => {
    const checkScroll = () => {
      if (!chatContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isAtBottom);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Special case for greeting messages - handle locally without API call
      if (isGreeting(inputMessage)) {
        const greetingResponses = [
          "Hello! How can I help you with waste management today?",
          "Hi there! Ask me anything about recycling or waste disposal.",
          "Hey! What waste management questions do you have today?",
          "Greetings! I'm here to help with your waste management questions."
        ];
        
        const randomGreeting = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
        
        const botMessage: Message = {
          id: messages.length + 1,
          text: randomGreeting,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }
      
      // For non-greeting messages, make the API call
      const response = await axios.post(`${API_URL}/waste-management-advice`, {
        userInput: inputMessage
      });

      // Simplified to directly use the response field
      const botMessage: Message = {
        id: messages.length + 1,
        text: response.data.response || "I don't have specific information about that. Could you ask something else?",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      const errorMessage: Message = {
        id: messages.length + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Parse markdown formatting for display
  const renderMarkdown = (text: string) => {
    // Convert **text** to bold
    const boldText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *text* to italic
    const italicText = boldText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert newlines to <br> tags
    const htmlText = italicText.replace(/\n/g, '<br>');
    
    return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-green-600 p-6 rounded-b-3xl shadow-lg">
          <button
            onClick={onBack}
            className="text-white mb-4 hover:text-green-100"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Waste Management Assistant
          </h2>
        </div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.isUser ? (
                    <p>{message.text}</p>
                  ) : (
                    renderMarkdown(message.text)
                  )}
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-green-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none max-w-[85%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-4 bg-green-600 text-white rounded-full p-2 shadow-lg hover:bg-green-700"
          >
            <ArrowDown size={20} />
          </button>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-2">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask about waste management..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
          {/* <div className="mt-1 text-xs text-gray-500 text-center">
            Try asking questions like "How do I recycle batteries?" or "Is styrofoam recyclable?"
          </div> */}
        </div>
      </div>
    </div>
  );
}