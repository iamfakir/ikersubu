'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const SimpleCarousel = ({ 
  images = [],
  autoPlay = true,
  interval = 5000 
}: SimpleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return <div className="w-full h-64 bg-gray-100 flex items-center justify-center">No images available</div>;
  }

  return (
    <div 
      className="relative w-[800px] h-[400px] mx-auto overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <AnimatePresence mode='wait'>
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
              willChange: 'opacity',
              contain: 'paint',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all z-10"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all z-10"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Progress and Dots Indicator */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 bg-transparent">
        <div className="absolute bottom-8 left-0 right-0 px-8">
          <div className="flex items-center justify-between">
            <div className="text-white text-xl font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            <div className="flex items-center space-x-3">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all ${index === currentIndex ? 'bg-white/0 scale-100' : 'bg-white/0 scale-75 hover:scale-90 hover:bg-white/0'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <motion.div
            className="mt-4 h-1 bg-transparent rounded-full overflow-hidden"
            initial={{ width: '100%' }}
          >
            <motion.div
              className="h-full bg-transparent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: interval / 1000, ease: 'linear', repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCarousel;
