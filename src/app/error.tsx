'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text-6xl font-bold text-[#00F0FF] mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">An unexpected error occurred. Our team has been notified.</p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => reset()} 
            className="px-6 py-2 bg-[#00F0FF] text-black font-medium rounded-md hover:bg-[#00D0E0] transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
