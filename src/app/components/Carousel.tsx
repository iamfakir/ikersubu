'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  year: number;
}

const Carousel = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Sample work cards - replace with your actual work
  const works: WorkCard[] = [
    {
      id: 1,
      title: 'Album Mix & Master',
      description: 'Full album production with modern mixing and mastering techniques',
      imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'Mixing & Mastering',
      year: 2024
    },
    {
      id: 2,
      title: 'Single Release',
      description: 'Radio-ready single production with full post-processing',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'Production',
      year: 2024
    },
    {
      id: 3,
      title: 'Soundtrack',
      description: 'Original score and sound design for short film',
      imageUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'Composition',
      year: 2023
    },
    {
      id: 4,
      title: 'EP Production',
      description: 'Concept EP with cohesive sound design and mixing',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'Production',
      year: 2023
    },
    {
      id: 5,
      title: 'Vocal Production',
      description: 'Professional vocal recording and processing',
      imageUrl: 'https://images.unsplash.com/photo-1514525252781-0bda08b0ffb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      category: 'Vocal Production',
      year: 2024
    }
  ];

  const visibleCards = 3; // Number of cards to show at once
  const totalWorks = works.length;

  // Card navigation functions
  const nextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalWorks - visibleCards + 1));
  }, [totalWorks]);

  const prevCard = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalWorks - visibleCards : prevIndex - 1
    );
  }, [totalWorks]);

  // Auto-rotate cards every 5 seconds if not hovered or being dragged
  useEffect(() => {
    if (!isHovered && !isDragging) {
      const timer = setTimeout(() => {
        nextCard();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isHovered, isDragging, nextCard]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const diff = dragStartX - touch.clientX;
    
    // If swipe distance is significant, change slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
      setIsDragging(false);
    }
  }, [dragStartX, isDragging, nextCard, prevCard]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Get the current set of cards to display
  const visibleWorks = works.slice(currentIndex, currentIndex + visibleCards);
  
  // If we don't have enough cards to fill the view, add some from the beginning
  if (visibleWorks.length < visibleCards) {
    visibleWorks.push(...works.slice(0, visibleCards - visibleWorks.length));
  }
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Recent Work
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore my latest projects and creative works
        </motion.p>
        
        <div 
          className="relative w-full max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="My recent work"
        >
          {/* Navigation Arrows */}
          <AnimatePresence>
            {(isHovered || window.innerWidth < 768) && (
              <>
                <motion.button
                  onClick={prevCard}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-gray-900 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Previous work"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronLeft size={24} />
                </motion.button>
                
                <motion.button
                  onClick={nextCard}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-gray-900 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Next work"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiChevronRight size={24} />
                </motion.button>
              </>
            )}
          </AnimatePresence>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-12">
            <AnimatePresence mode="wait" initial={false}>
              {visibleWorks.map((work, index) => (
                <motion.div 
                  key={`${work.id}-${currentIndex}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={work.imageUrl}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded-full">
                          {work.category}
                        </span>
                        <span className="text-white/80 text-sm">
                          {work.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{work.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 flex-1">{work.description}</p>
                    <button 
                      className="mt-auto inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group/button"
                      aria-label={`View details for ${work.title}`}
                    >
                      <span className="group-hover/button:underline">View Project</span>
                      <FiExternalLink className="ml-2 transition-transform group-hover/button:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalWorks - visibleCards + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to work ${index + 1} of ${totalWorks - visibleCards + 1}`}
                aria-current={index === currentIndex ? 'step' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
