'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const DripperPage = () => {
  type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';
  
  const priceMap = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    INR: { symbol: '₹', rate: 83.30 }
  };

  const [currency, setCurrency] = useState<Currency>('USD');
  
  const getPrice = (basePrice: number) => {
    const { symbol, rate } = priceMap[currency];
    const convertedPrice = (basePrice * rate).toFixed(currency === 'INR' ? 0 : 2);
    return `${symbol}${convertedPrice}`;
  };

  const images = [
    { 
      src: '/assets/images/Plugin/dripper/Silver.png', 
      alt: 'Silver Knob',
      title: 'Silver Edition',
      basePrice: 5,
      id: 'dripper-silver',
      features: [
        '1073 Drive - Classic analog warmth',
        'Low CPU usage',
        'All major DAW support'
      ]
    },
    { 
      src: '/assets/images/Plugin/dripper/Gold.png', 
      alt: 'Gold Knob',
      title: 'Gold Edition',
      basePrice: 7,
      id: 'dripper-gold',
      features: [
        'All Silver Edition features',
        '1073 Drive - Enhanced analog character',
        'Intelligent Mid/Side control',
        'Advanced harmonic enhancement'
      ]
    },
    { 
      src: '/assets/images/Plugin/dripper/Platinum.png', 
      alt: 'Platinum Knob',
      title: 'Platinum Edition',
      basePrice: 15,
      id: 'dripper-platinum',
      features: [
        "Smooth odd harmonics exciter in tripper mode",
        "All Gold Edition features",
        "Blackbox HG Character Drive",
        "AI-powered tone matching",
        "Priority support & updates",
        "Analog-modeled saturation with three distinct flavors",
        "Zero-latency processing for real-time performance",
        "64-bit floating-point precision",
        "Oversampling up to 16x for pristine audio quality",
        "Custom GUI with resizable interface",
        "Preset management system"
      ]
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editionId = urlParams.get('edition');
    if (editionId) {
      const initialIndex = images.findIndex(img => img.id === editionId);
      if (initialIndex !== -1) {
        setCurrentIndex(initialIndex);
      }
    }
  }, []);

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEmail('');
    setIsSubmitting(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Here you would typically connect to your newsletter service
    console.log('Subscribing email:', email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setShowModal(false);
      setEmail('');
      
      // Reset subscription status after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  const features = [
    "Analog-modeled saturation with three distinct flavors",
    "Zero-latency processing for real-time performance",
    "64-bit floating-point precision",
    "Oversampling up to 16x for pristine audio quality",
    "Custom GUI with resizable interface",
    "Preset management system"
  ];

  const systemRequirements = {
    windows: "Windows 10 or later (64-bit)",
    mac: "macOS 10.15 or later (64-bit)",
    formats: ["VST3", "AU", "AAX"],
    ram: "4 GB RAM minimum",
    cpu: "Intel Core i5 / AMD Ryzen 5 or better"
  };

  useEffect(() => {
    const preloadImages = () => {
      let loadedImages = 0;
      const totalImages = images.length;

      images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.onload = () => {
          loadedImages += 1;
          if (loadedImages === totalImages) {
            setLoading(false);
          }
        };
      });
    };

    preloadImages();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) { // minimum swipe distance
      if (difference > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4 pt-16">
        <div className="w-full max-w-4xl px-4 sm:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg border border-gray-700 bg-gray-800 flex items-center justify-center">
                <AnimatePresence initial={false} custom={currentIndex}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {loading ? (
                      <div className="text-white">Loading image...</div>
                    ) : (
                      <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-contain"
                        onLoad={() => setLoading(false)}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Thumbnail Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'} transition-colors`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">DRIPPER(TRIPPER)</h1>
              <p className="text-xl text-gray-300 mb-4">{images[currentIndex].title}</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#00F0FF] mb-6">
                {getPrice(images[currentIndex].basePrice)}
              </p>

              <div className="mb-6">
                <label htmlFor="currency-select" className="block text-gray-400 text-sm font-medium mb-2">Select Currency:</label>
                <div className="relative inline-block w-full sm:w-auto">
                  <select
                    id="currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="block appearance-none w-full bg-gray-800 border border-gray-700 text-white py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-gray-700 focus:border-[#00F0FF]"
                  >
                    {Object.keys(priceMap).map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                {images[currentIndex].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-[#00F0FF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleSubscribeClick}
                className="w-full sm:w-auto bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-[#00F0FF]/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Dripper Now
              </button>
            </div>
          </div>

          {/* System Requirements Section */}
          <section className="mt-16 py-12 px-4 sm:px-8 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">System Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Operating System:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Windows: {systemRequirements.windows}</li>
                  <li>macOS: {systemRequirements.mac}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Formats:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {systemRequirements.formats.map((format, index) => (
                    <li key={index}>{format}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Hardware:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>RAM: {systemRequirements.ram}</li>
                  <li>CPU: {systemRequirements.cpu}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Full Features Section */}
          <section className="mt-16 py-12 px-4 sm:px-8 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">All Features</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-[#00F0FF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700 max-w-md w-full relative"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Newsletter</h2>
              <p className="text-gray-300 mb-6">Enter your email to get updates on Dripper and other plugins.</p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent mb-4"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#00F0FF]/50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          Subscribed successfully!
        </motion.div>
      )}
      <Footer />
    </>
  );
}

export default DripperPage;