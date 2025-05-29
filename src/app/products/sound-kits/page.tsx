'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SoundKitsPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-purple-400 animate-pulse mb-2">waiting for spaceship to drop</p>
            <svg className="w-12 h-12 mx-auto mb-4 text-purple-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">Discover Sound Kits</h1>
            <p className="text-xl text-gray-300">Explore a universe of sounds, from trending packs to new arrivals.</p>
          </div>

          <section className="mb-16 flex flex-wrap justify-center gap-8">
            {/* Pack 1 */}
            <div className="relative w-72 h-72 bg-gray-800 rounded-lg shadow-xl overflow-hidden flex items-center justify-center">
              <img src="/assets/images/pack1.svg" alt="Sound Pack 1" className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 1a1 1 0 011 1v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h1V2a1 1 0 011-1zM6 5v10h12V5H6zm3 4a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="absolute bottom-4 text-white text-xl font-bold">Coming Soon</p>
            </div>

            {/* Pack 2 */}
            <div className="relative w-72 h-72 bg-gray-800 rounded-lg shadow-xl overflow-hidden flex items-center justify-center">
              <img src="/assets/images/pack2.svg" alt="Sound Pack 2" className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 1a1 1 0 011 1v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h1V2a1 1 0 011-1zM6 5v10h12V5H6zm3 4a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="absolute bottom-4 text-white text-xl font-bold">Coming Soon</p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">Can't Find What You Need?</h2>
            <p className="text-xl text-blue-100 mb-8">We offer custom sound design services tailored to your unique vision.</p>
            <Link href="/contact">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-200 transition-all duration-300">
                Get Custom Sounds
              </button>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SoundKitsPage;