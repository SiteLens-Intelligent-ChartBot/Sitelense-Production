'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { API_BASE_URL } from "../app/api/config/api"; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); // 👈 Added loading state
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setLoading(true); // 👈 Show typing dots while waiting

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.answer, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, something went wrong. Please try again later.',
          sender: 'bot',
        },
      ]);
    } finally {
      setLoading(false); // 👈 Stop showing typing dots
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-[#f45b69] text-white rounded-full w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 focus:outline-none"
      >
        <Image src="/bot.svg" alt="Chat bot icon" width={35} height={35} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed inset-x-2 bottom-20 sm:inset-auto sm:bottom-[6.5rem] sm:right-0 
            w-[95%] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl 
            flex flex-col 
            h-[80vh] sm:h-[70vh] 
            transition-all duration-300 ease-in-out
          "
        >
          {/* Header */}
          <div className="bg-[#f45b69] text-white p-4 rounded-t-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center">
              <Image src="/bot.svg" alt="Chat bot icon" width={28} height={28} />
              <h3 className="text-base sm:text-lg font-semibold ml-2 sm:ml-3">
                Chat with our Bot
              </h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white text-2xl leading-none hover:text-gray-200"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-5 overflow-y-auto bg-gray-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-xs shadow-md text-sm sm:text-base ${
                    message.sender === 'user'
                      ? 'bg-[#f45b69] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator (Three Dots Animation) */}
            {loading && (
              <div className="flex justify-start my-2">
                <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex items-center bg-white rounded-b-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
              className="flex-1 border text-black border-gray-300 rounded-full px-4 py-2 sm:px-6 sm:py-3 
                         text-sm sm:text-base focus:outline-none focus:border-pink-500 transition-colors duration-300 disabled:opacity-70"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="ml-2 sm:ml-3 bg-[#f45b69] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 
                         flex items-center justify-center transform hover:scale-110 transition-transform duration-300 focus:outline-none disabled:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
