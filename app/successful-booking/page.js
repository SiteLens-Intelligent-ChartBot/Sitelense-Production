"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const phoneNumber = "9692255477";

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 p-4 sm:p-6">
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-300 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="relative z-10 bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-md w-full transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500 animate-checkmark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Booking Successful!
        </h1>
        <p className="text-gray-600 mb-6 sm:mb-8">
          Thank you for your booking. Please contact{' '}
          <span
            onClick={handleCopy}
            className="font-semibold text-green-600 cursor-pointer hover:underline"
            title="Click to copy"
          >
            {phoneNumber}
          </span>{' '}
          for Booking Payments.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-green-800">
            You can view your booking details at homepage. We will contact you shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/" passHref>
            <button className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              View My Bookings
            </button>
          </Link>
          <a href={`tel:${phoneNumber}`} className="w-full sm:w-auto">
            <button className="w-full bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              Call Us
            </button>
          </a>
        </div>
      </div>

      {copied && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50">
          Number {phoneNumber} is copied.
        </div>
      )}

      <style jsx global>{`
        @keyframes checkmark {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        .animate-checkmark path {
          animation: checkmark 0.5s ease-in-out forwards;
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
