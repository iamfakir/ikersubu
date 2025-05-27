'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './sound-kits.module.css';
import { initScrollEffect } from './scroll-effect';
import { useEffect } from 'react';

export default function SoundKitsPage() {
  useEffect(() => {
    initScrollEffect();
  }, []);
  return (
    <>
      <Navbar />
          <div
            className={`${styles.scrollContainer} flex flex-col items-center justify-center min-h-screen p-8`}
            data-animate="true"
          >
          <div className={`${styles.scrollItems} w-full max-w-2xl`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`${styles.scrollItem} animate-fade-in`}>
              <h2 className="text-3xl font-bold mb-4">Sound Kit {i + 1}</h2>
              <p className="text-lg mb-2">Professional audio samples for your music production</p>
              <div className="mt-4">
                <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
