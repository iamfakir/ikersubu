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
        <h1>500</h1>
        <h2>Something went wrong!</h2>
        <p>An unexpected error occurred. Please try again later.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => reset()} className={styles.button}>
            Try Again
          </button>
          <Link href="/" className={styles.button} style={{ textAlign: 'center' }}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
