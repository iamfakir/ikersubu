'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import './styles.css';

export interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ 
  slides, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle slide navigation
  const goToSlide = useCallback((index: number) => {
    if (!trackRef.current) return;
    
    // Handle wrap-around for infinite effect
    const newIndex = (index + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  }, [slides.length]);

  // Handle next/previous navigation
  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Update track position when currentIndex changes
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, interval, isPaused, nextSlide]);

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum distance for swipe
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    // Reset touch values
    touchStartX.current = 0;
    touchEndX.current = 0;
    
    // Resume auto-play after a delay
    if (autoPlay) {
      setTimeout(() => setIsPaused(false), interval);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPaused(false);
    }
  };

  if (!slides || slides.length === 0) {
    return <div className="text-center py-8">No slides to display</div>;
  }


  return (
    <div 
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="carousel"
    >
      <button 
        className="carousel__nav prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>
      
      <ul 
        className="carousel__track" 
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <li key={slide.id} className="carousel__slide">
            <div className="relative w-full h-full">
              <Image 
                src={slide.image} 
                alt={slide.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === slide.id}
                className="object-cover"
              />
            </div>
            <div className="slide-content">
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-description">{slide.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <button 
        className="carousel__nav next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>
      
      <div className="carousel__indicators" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel__indicator ${index === currentIndex ? 'current' : ''}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
