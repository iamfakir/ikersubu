'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NewReleasesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Initialize images with full paths
    const imagePaths = [
      '/assets/images/works/53.jpg',
      '/assets/images/works/54.jpg',
      '/assets/images/works/55.jpg',
      '/assets/images/works/56.jpg',
    ];
    setImages(imagePaths);
    setImagesLoaded(new Array(imagePaths.length).fill(false));
  }, []);

  const handleImageLoad = (index: number) => {
    console.log(`Image ${index} loaded successfully`);
    setImagesLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image: ${images[index]}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Debug: Log the first image path
  console.log('First image path:', images[0]);

  if (images.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg bg-gray-100">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          aspectRatio: '16/9' // Standard widescreen aspect ratio
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 relative" style={{ aspectRatio: '16/9' }}>
            {!imagesLoaded[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="animate-pulse text-gray-500">Loading...</div>
              </div>
            )}
            <Image
              src={src}
              alt={`New Release ${index + 1}`}
              fill
              className={`object-contain ${!imagesLoaded[index] ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={index === 0}
              onLoadingComplete={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewReleasesCarousel;
