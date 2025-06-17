'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check online status when component mounts
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0E17] to-[#1A1F35] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1E2538] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isOnline ? 'You\'re back online!' : 'You\'re offline'}
        </h1>
        
        <div className="mb-8 text-center">
          {isOnline ? (
            <p className="text-green-400">Your connection has been restored.</p>
          ) : (
            <p className="text-gray-300">
              It looks like you've lost your internet connection. Some features may be unavailable until you're back online.
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            The following pages may be available offline if you've visited them before:
          </p>
          
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-[#00F0FF] hover:underline block p-2 bg-[#2A3349] rounded-sm">
                Home Page
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[#00F0FF] hover:underline block p-2 bg-[#2A3349] rounded-sm">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-[#00F0FF] hover:underline block p-2 bg-[#2A3349] rounded-sm">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
        
        {!isOnline && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#9D00FF] hover:bg-[#7B00CC] text-white rounded-sm transition duration-300"
            >
              Try Again
            </button>
          </div>
        )}
        
        {isOnline && (
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="px-4 py-2 bg-[#9D00FF] hover:bg-[#7B00CC] text-white rounded-sm transition duration-300 inline-block"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}