'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './CardCarousel.css';

import { getPortfolioItems, getPortfolioItemsWithOrder, PortfolioItem } from '@/app/data/portfolio';

// Use the PortfolioItem interface from the portfolio.ts file
// Get portfolio items from the new data file
const workItems: PortfolioItem[] = getPortfolioItems();

export default function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState<'assisted' | 'mixed' | 'production' | 'recording'>('assisted');
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Filter projects based on active tab
  const filteredItems = workItems.filter(item => {
    if (activeTab === 'assisted') {
      return item.type === 'assisted';
    } else if (activeTab === 'mixed') {
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

  const updateCarousel = (direction: 'next' | 'prev' | number) => {
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
  };

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
    const items = filteredItems;
    if (items.length === 0) return [];

    const visibleCardsData = [];
    
    for (let i = -2; i <= 2; i++) {
      const cardIndex = (currentIndex + i + items.length) % items.length;
      const cardData = items[cardIndex];
      
      visibleCardsData.push({
        ...cardData,
        originalIndex: cardIndex, // Keep track of original index for selection
        position: i,
        key: `${cardData.name}-${cardIndex}-${currentIndex}` // More unique key
      });
    }
    
    return visibleCardsData;
  };

  const handleCardClick = (project: PortfolioItem) => {
    if (!isAnimating) {
      setSelectedProject(selectedProject?.name === project.name ? null : project);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  // Use the sorted filtered items for the visible cards
  const visibleCards = getVisibleCards();

  return (
    <div className="card-carousel-container">
      <h1 className="portfolio-title">Portfolio</h1>
      
      <div className="filter-buttons">
        <button 
          onClick={() => setActiveTab('assisted')}
          className={`filter-button ${activeTab === 'assisted' ? 'active' : ''}`}
        >
          Assisted Mixes
        </button>
        <button 
          onClick={() => setActiveTab('mixed')}
          className={`filter-button ${activeTab === 'mixed' ? 'active' : ''}`}
        >
          Mix/Master
        </button>
        <button 
          onClick={() => setActiveTab('production')}
          className={`filter-button ${activeTab === 'production' ? 'active' : ''}`}
        >
          Production
        </button>
        <button 
          onClick={() => setActiveTab('recording')}
          className={`filter-button ${activeTab === 'recording' ? 'active' : ''}`}
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
                      <Image
                        src={cardData.imageUrl} 
                        alt={cardData.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="card-image"
                        priority={cardData.position === 0} // Prioritize center image
                      />
                    </div>
                    <div className="card-content">
                      <h3>{cardData.name}</h3>
                      <p className="role">{cardData.role}</p>
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
          <p>No projects in "{activeTab === 'assisted' ? 'Featured Work' : 'All Projects'}" yet. Stay tuned!</p>
        </div>
      )}

      {selectedProject && (
        <div className="member-details-overlay" onClick={handleOverlayClick}>
          <div className="member-details-card">
            <button className="close-button" onClick={() => setSelectedProject(null)}>×</button>
            <h2 className="project-name">{selectedProject.name}</h2>
            <p className="project-role">{selectedProject.role}</p>
            <p className="project-client">Client: {selectedProject.client}</p>
            <p className="project-genre">Genre: {selectedProject.genre}</p>
            <p className="project-year">Year: {selectedProject.year}</p>
            <div className="project-description">
              <h4>Project Details:</h4>
              <p>{selectedProject.description}</p>
            </div>
            <div className="project-techniques">
              <h4>Techniques Used:</h4>
              <ul>
                {selectedProject.techniques.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
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
