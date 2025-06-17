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
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black p-4 pt-16">
        <div className="w-full max-w-4xl px-4 sm:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="relative">
              <div 
                className="relative aspect-square w-full max-w-md mx-auto bg-gray-800/30 rounded-xl p-6"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-center mt-4 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        currentIndex === index ? 'bg-white' : 'bg-gray-500/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700/80 text-white p-2 rounded-full focus:outline-hidden transition-colors"
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700/80 text-white p-2 rounded-full focus:outline-hidden transition-colors"
                  aria-label="Next image"
                >
                  &gt;
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="text-white">
              <div className="space-y-6 text-center md:text-left">
                <div className="pt-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">DRIPPER(TRIPPER)</h1>
                  <p className="text-xl text-blue-400 font-medium mb-4">{images[currentIndex].title}</p>
                  <div className="mb-6">
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                      <p className="text-3xl font-bold text-white">
                        {getPrice(images[currentIndex].basePrice)}
                      </p>
                      <div className="relative">
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value as Currency)}
                          className="appearance-none bg-gray-800 text-white text-sm rounded-md px-3 py-1.5 pr-8 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-gray-700 transition-colors"
                          aria-label="Select currency"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="INR">INR</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center md:text-left mt-1">
                      Prices in {currency}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Unleash warm saturation or aggressive distortion with DRIPPER. Its intuitive drive knob and subtle soft clipping sculpt your sound, adding character and loudness effortlessly.
                </p>
                
                <div className="pt-4">
                  <button 
                    onClick={handleSubscribeClick}
                    disabled={isSubscribed}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 border-2 ${isSubscribed ? 'border-green-500 text-green-500' : 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400'} font-medium py-3 px-6 rounded-full transition-all duration-300 focus:outline-hidden`}
                  >
                    {isSubscribed ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        Notify Me When Available
                      </>
                    )}
                  </button>
                  {isSubscribed && (
                    <p className="mt-2 text-sm text-green-400 text-center">
                      Thanks! We'll notify you when it's ready.
                    </p>
                  )}

                  {/* Email Subscription Modal */}
                  {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-white">Get Notified</h3>
                          <button 
                            onClick={handleModalClose}
                            className="text-gray-400 hover:text-white"
                            disabled={isSubmitting}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-300 mb-6">Enter your email to be notified when {images[currentIndex].title} is available.</p>
                        <form onSubmit={handleEmailSubmit}>
                          <div className="mb-4">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="contact@ikersubu.com"
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={handleModalClose}
                              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                              disabled={isSubmitting}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={!email.trim() || isSubmitting}
                              className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors ${(!email.trim() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {isSubmitting ? 'Submitting...' : 'Notify Me'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Features</h3>
                  <ul className="space-y-2 text-left">
                    {images[currentIndex].features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">🖥</span>
                        <div>
                          <p className="font-medium text-white">Windows</p>
                          <p className="text-sm text-gray-300">{systemRequirements.windows}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">🍎</span>
                        <div>
                          <p className="font-medium text-white">macOS</p>
                          <p className="text-sm text-gray-300">{systemRequirements.mac}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">🎚</span>
                        <div>
                          <p className="font-medium text-white">Formats</p>
                          <p className="text-sm text-gray-300">{systemRequirements.formats.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">💾</span>
                        <div>
                          <p className="font-medium text-white">RAM</p>
                          <p className="text-sm text-gray-300">{systemRequirements.ram}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-400 mr-2">⚡</span>
                        <div>
                          <p className="font-medium text-white">CPU</p>
                          <p className="text-sm text-gray-300">{systemRequirements.cpu}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
              <p className="text-gray-300 mb-6">Get the latest updates, exclusive offers, and new product announcements directly to your inbox.</p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className={`w-full py-3 rounded-md text-lg font-semibold transition duration-300
                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default DripperPage;