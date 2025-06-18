'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Simple3DCarouselProps {
  images: string[];
  className?: string;
}

const Simple3DCarousel = ({ 
  images = [
    '/assets/images/works/optimized/53.webp',
    '/assets/images/works/optimized/54.webp',
    '/assets/images/works/optimized/55.webp',
    '/assets/images/works/optimized/56.webp',
  ],
  className = '' 
}: Simple3DCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const numItems = images.length;
  const radius = 300; // Adjust this to change the size of the carousel
  
  // Calculate positions for each item in the 3D carousel
  const getItemStyle = (index: number) => {
    const angle = (index * (360 / numItems) + currentIndex * (360 / numItems)) * (Math.PI / 180);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const opacity = Math.abs(z) / radius; // Fade out as items move to the back
    
    return {
      transform: `translate3d(calc(50% + ${x}px), 0, ${z}px) rotateY(${index * (360 / numItems) + currentIndex * (360 / numItems)}deg)`,
      opacity: 0.5 + (opacity * 0.5), // Keep some minimum opacity
      zIndex: Math.round(z + radius), // Ensure proper z-ordering
    };
  };

  // Auto-rotate the carousel
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % numItems);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered, numItems]);

  return (
    <div 
      className={`relative w-full h-[500px] perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={carouselRef}
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-1000"
        style={{
          transform: `rotateY(${currentIndex * (360 / numItems)}deg)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute w-64 h-64 transition-all duration-1000 ease-in-out"
            style={{
              ...getItemStyle(index),
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={() => setCurrentIndex(prev => (prev - 1 + numItems) % numItems)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
        aria-label="Previous"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % numItems)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
        aria-label="Next"
      >
        ❯
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex % numItems ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Simple3DCarousel;
