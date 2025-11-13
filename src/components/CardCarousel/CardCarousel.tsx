'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import './CardCarousel.css';

import { getPortfolioItems, PortfolioItem } from '@/app/data/portfolio';

// Fallback image for when an image fails to load
const FALLBACK_IMAGE = '/assets/images/placeholder.jpg'; // Make sure this exists in your public folder

// Get portfolio items from the data file
const workItems: PortfolioItem[] = getPortfolioItems();

export default function CardCarousel() {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState<'mixed' | 'production' | 'recording'>('mixed');
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Filter projects based on active tab with null checks
  const filteredItems = workItems.filter(item => {
    if (!item) return false;
    
    if (activeTab === 'mixed') {
      return item.type === 'mixed';
    } else if (activeTab === 'production') {
      return item.type === 'production';
    } else if (activeTab === 'recording') {
      return item.type === 'recording';
    }
    return false;
  });
  
  // Sort the filtered items by order property if available
  const sortedFilteredItems = [...filteredItems].sort((a, b) => {
    const orderA = a.order || Number.MAX_SAFE_INTEGER;
    const orderB = b.order || Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });

  const updateCarousel = useCallback((direction: 'next' | 'prev' | number) => {
    if (isAnimating) return;
    
    setSelectedProject(null);
    setIsAnimating(true);

    let newIndex;
    if (typeof direction === 'number') {
      newIndex = direction;
    } else {
      newIndex = direction === 'next' ? 
        (currentIndex + 1) % filteredItems.length :
        (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }

    setCurrentIndex(newIndex);

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    transitionTimeout.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, currentIndex, filteredItems.length]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedProject(null); // Clear selection when tab changes
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [activeTab]);

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
        updateCarousel('next');
      } else {
        updateCarousel('prev');
      }
    }
  };

  const getVisibleCards = () => {
    const cards: Array<PortfolioItem & { position: number; key: string }> = [];
    
    if (sortedFilteredItems.length === 0) return [];
    
    // Helper function to create a safe card with fallbacks
    const createSafeCard = (item: PortfolioItem, position: number, index: number): PortfolioItem & { position: number; key: string } => {
      return {
        ...item,
        id: item.id || index,
        name: item.name || 'Untitled Project',
        role: item.type === 'assisted' ? '' : (item.role || ''),
        client: item.client || 'Client not specified',
        genre: item.genre || 'Genre not specified',
        imageUrl: item.imageUrl || FALLBACK_IMAGE,
        position,
        key: `${item.id}-${index}-${position}`
      };
    };
    
    // Always include the current item
    const currentItem = sortedFilteredItems[currentIndex];
    if (currentItem) {
      cards.push(createSafeCard(currentItem, 0, currentIndex));
    }
    
    // Add next items
    for (let i = 1; i <= 2; i++) {
      const nextIndex = (currentIndex + i) % sortedFilteredItems.length;
      const nextItem = sortedFilteredItems[nextIndex];
      if (nextItem) {
        cards.push(createSafeCard(nextItem, i, nextIndex));
      }
    }
    
    // Add previous items
    for (let i = 1; i <= 2; i++) {
      const prevIndex = (currentIndex - i + sortedFilteredItems.length) % sortedFilteredItems.length;
      const prevItem = sortedFilteredItems[prevIndex];
      if (prevItem) {
        cards.unshift(createSafeCard(prevItem, -i, prevIndex));
      }
    }
    
    return cards;
  };

  const handleCardClick = useCallback((project: PortfolioItem) => {
    if (!isAnimating) {
      setSelectedProject(prev => prev?.name === project.name ? null : project);
    }
  }, [isAnimating]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  // Memoize the visible cards to prevent unnecessary re-renders
  const visibleCards = useMemo(() => getVisibleCards(), [sortedFilteredItems, currentIndex]);

  // Don't render anything on the server
  if (!isClient) {
    return (
      <div className="card-carousel-container">
        <div className="loading-placeholder" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="card-carousel-container">
      <h1 className="portfolio-title">Portfolio</h1>
      
      <div className="filter-buttons">
        <button 
          onClick={() => setActiveTab('mixed')}
          className={`filter-button ${activeTab === 'mixed' ? 'active' : ''}`}
          aria-pressed={activeTab === 'mixed'}
        >
          Mix/Master
        </button>
        <button 
          onClick={() => setActiveTab('production')}
          className={`filter-button ${activeTab === 'production' ? 'active' : ''}`}
          aria-pressed={activeTab === 'production'}
        >
          Production
        </button>
        <button 
          onClick={() => setActiveTab('recording')}
          className={`filter-button ${activeTab === 'recording' ? 'active' : ''}`}
          aria-pressed={activeTab === 'recording'}
        >
          Recording
        </button>
      </div>

      {filteredItems.length > 0 ? (
        <div 
          ref={carouselRef}
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            className="nav-arrow left" 
            onClick={() => updateCarousel('prev')}
            aria-label="Previous Project"
            disabled={isAnimating || filteredItems.length <= 1}
          >
            ‹
          </button>
          
          <div className="carousel-track">
            {visibleCards.map((cardData) => {
              let positionClass = 'hidden';
              
              if (cardData.position === 0) positionClass = 'center';
              else if (cardData.position === 1) positionClass = 'right-1';
              else if (cardData.position === 2) positionClass = 'right-2';
              else if (cardData.position === -1) positionClass = 'left-1';
              else if (cardData.position === -2) positionClass = 'left-2';
                            
              return (
                <div 
                  key={cardData.key}
                  className={`card ${positionClass}`}
                  onClick={() => positionClass === 'center' && handleCardClick(cardData)}
                  aria-hidden={positionClass === 'hidden' || cardData.position !== 0}
                  tabIndex={cardData.position === 0 ? 0 : -1}
                >
                  <div className="card-inner">
                    <div className="image-container">
                      <div className="image-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={cardData.imageUrl} 
                          alt={cardData.name || 'Project image'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="card-image"
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          priority={cardData.position === 0}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop
                            target.src = FALLBACK_IMAGE;
                          }}
                          unoptimized={process.env.NODE_ENV !== 'production'}
                        />
                      </div>
                    </div>
                    <div className="card-content">
                      <h3>{cardData.name}</h3>
                      {cardData.role && <p className="role">{cardData.role}</p>}
                      <p className="client">{cardData.client}</p>
                      <p className="genre">{cardData.genre}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            className="nav-arrow right" 
            onClick={() => updateCarousel('next')}
            aria-label="Next Project"
            disabled={isAnimating || filteredItems.length <= 1}
          >
            ›
          </button>
        </div>
      ) : (
        <div className="empty-state">
          <p>{activeTab === 'mixed' ? 'No projects in Mix/Master category.' : `No projects in ${activeTab} category yet. Stay tuned!`}</p>
        </div>
      )}

      {selectedProject && (
        <div className="member-details-overlay" onClick={handleOverlayClick}>
          <div className="member-details-card">
            <button className="close-button" onClick={() => setSelectedProject(null)}>×</button>
            <h2 className="project-name">{selectedProject.name}</h2>
            {selectedProject.role && <p className="project-role">{selectedProject.role}</p>}
            <p className="project-client">Client: {selectedProject.client}</p>
            <p className="project-genre">Genre: {selectedProject.genre}</p>
            <p className="project-year">Year: {selectedProject.year}</p>
            <div className="project-description">
              <h4>Project Details:</h4>
              <p>{selectedProject.description}</p>
            </div>
            {/* Techniques Used section removed as requested */}
          </div>
        </div>
      )}

      {/* Placeholder for Animated Stats */}
      <div className="animated-stats-placeholder">
        {/* Example Structure: */}
        {/* <div className="stat-item"><span>500+</span> Tracks Mixed</div> */}
        {/* <div className="stat-item"><span>10+</span> Years Experience</div> */}
        {/* <div className="stat-item"><span>99%</span> Client Satisfaction</div> */}
        <p>Animated stats coming soon!</p>
      </div>
    </div>
  );
}
