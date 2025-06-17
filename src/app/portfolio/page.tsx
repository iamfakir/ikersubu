'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

const CardCarousel = dynamic(() => import('../../components/CardCarousel/CardCarousel'), {
  ssr: false,
});

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('assistedMixes');

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0E17] to-[#1A1F35] text-white overflow-x-hidden">
      <Navbar />
      
      <main className="min-h-[calc(100vh-128px)] pt-35 pb-10 flex flex-col items-center">
        {/* Tab Navigation */}
        {/* Removed the duplicate navigation buttons */}

        {/* Card Carousel */}
        <div className="w-full">
          <CardCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
