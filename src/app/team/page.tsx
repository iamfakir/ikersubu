'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardCarousel from '../../components/CardCarousel/CardCarousel';

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('assisted');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden">
      <Navbar />
      
      <main className="min-h-[calc(100vh-128px)] pt-[8.75rem] pb-10 flex flex-col items-center">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('assisted')}
            className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${activeTab === 'assisted' 
              ? 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Assisted Mixes
          </button>
          <button 
            onClick={() => setActiveTab('mixed')}
            className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${activeTab === 'mixed' 
              ? 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Mixed
          </button>
        </div>

        {/* Card Carousel */}
        <div className="w-full max-w-7xl px-4">
          <CardCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
