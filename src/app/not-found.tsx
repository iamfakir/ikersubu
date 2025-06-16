import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text-6xl font-bold text-[#00F0FF] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <Link 
          href="/" 
          className="px-6 py-2 bg-[#00F0FF] text-black font-medium rounded-md hover:bg-[#00D0E0] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
