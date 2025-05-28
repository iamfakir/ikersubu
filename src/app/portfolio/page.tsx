'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardCarousel from '../../components/CardCarousel/CardCarousel';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('assisted');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] text-white overflow-x-hidden">
      <Navbar />
      
      <main className="min-h-[calc(100vh-128px)] pt-[8.75rem] pb-10 flex flex-col items-center">
        {/* Card Carousel */}
        <div className="w-full">
          <CardCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
