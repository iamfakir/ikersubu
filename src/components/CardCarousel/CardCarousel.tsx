'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './CardCarousel.css';

const teamMembers = [
  { name: "Emily Kim", role: "Founder" },
  { name: "Michael Steward", role: "Creative Director" },
  { name: "Emma Rodriguez", role: "Lead Developer" },
  { name: "Julia Gimmel", role: "UX Designer" },
  { name: "Lisa Anderson", role: "Marketing Manager" },
  { name: "James Wilson", role: "Product Manager" }
];

const imageUrls = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export default function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const numCards = teamMembers.length;
    const normalizedIndex = ((newIndex % numCards) + numCards) % numCards;
    setCurrentIndex(normalizedIndex);

    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swipe left - go to next
        updateCarousel(currentIndex + 1);
      } else {
        // Swipe right - go to previous
        updateCarousel(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
    // Initialize carousel
    updateCarousel(0);
  }, []);

  return (
    <div className="card-carousel-container">
      <h1 className="about-title">OUR TEAM</h1>
      
      <div 
        ref={carouselRef}
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button 
          className="nav-arrow left" 
          onClick={() => updateCarousel(currentIndex - 1)}
          aria-label="Previous"
        >
          ‹
        </button>
        
        <div className="carousel-track">
          {teamMembers.map((_, index) => {
            const offset = ((index - currentIndex + teamMembers.length) % teamMembers.length);
            let positionClass = 'hidden';
            
            if (offset === 0) positionClass = 'center';
            else if (offset === 1) positionClass = 'right-1';
            else if (offset === 2) positionClass = 'right-2';
            else if (offset === teamMembers.length - 1) positionClass = 'left-1';
            else if (offset === teamMembers.length - 2) positionClass = 'left-2';
            
            return (
              <div 
                key={index}
                className={`card ${positionClass}`}
                data-index={index}
              >
                <Image 
                  src={imageUrls[index]} 
                  alt={`Team Member ${index + 1}`}
                  width={300}
                  height={400}
                  className="card-image"
                  priority={index < 3} // Load first 3 images with priority
                />
              </div>
            );
          })}
        </div>
        
        <button 
          className="nav-arrow right" 
          onClick={() => updateCarousel(currentIndex + 1)}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="member-info">
        <h2 className="member-name">{teamMembers[currentIndex]?.name}</h2>
        <p className="member-role">{teamMembers[currentIndex]?.role}</p>
      </div>

      <div className="dots">
        {teamMembers.map((_, index) => (
          <button 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => updateCarousel(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
