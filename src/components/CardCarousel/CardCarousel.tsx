'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AudioWave from '../AudioWave';
import './CardCarousel.css';
import '../AudioWave.css';

interface WorkItem {
  name: string;
  role: string; // This can represent 'Mix Type' or 'Project Role'
  bio?: string; // This can be 'Project Description' or 'Key Techniques'
  type: 'assisted' | 'mixed';
  imageUrl: string;
}

const workItems: WorkItem[] = [
  {
    name: "Project Alpha",
    role: "Full Mix & Master",
    bio: "A dynamic rock track mix focusing on punch and clarity, mastered for streaming platforms.",
    type: "assisted", // Assuming 'assisted' means you want to show it now
    imageUrl: "/assets/images/works/34.jpg"
  },
  {
    name: "Song Beta",
    role: "Vocal Production & Mix",
    bio: "Pop song featuring layered vocals, FX, and a wide stereo image.",
    type: "assisted",
    imageUrl: "/assets/images/works/35.jpg"
  },
  {
    name: "EP Gamma",
    role: "Stem Mastering",
    bio: "Stem master for an electronic EP, enhancing depth and loudness.",
    type: "assisted",
    imageUrl: "/assets/images/works/36.jpg"
  },
  {
    name: "Album Delta",
    role: "Full Mix",
    bio: "Indie folk album mixed for warmth and natural dynamics.",
    type: "assisted",
    imageUrl: "/assets/images/works/37.jpg"
  },
  {
    name: "Single Epsilon",
    role: "Mixing & Additional Production",
    bio: "Hip-hop single with heavy 808s and crisp high-end.",
    type: "assisted",
    imageUrl: "/assets/images/works/38.jpg"
  },
  {
    name: "Soundtrack Zeta",
    role: "Audio Post-Production & Mix",
    bio: "Mixed for a short film, focusing on dialogue clarity and immersive soundscapes.",
    type: "assisted",
    imageUrl: "/assets/images/works/39.jpg"
  }
];

export default function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null); // Changed from selectedMember
  const [activeTab, setActiveTab] = useState<'assisted' | 'mixed'>('assisted');
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  const filteredItems = workItems.filter(item => item.type === activeTab);

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

  const handleCardClick = (project: WorkItem) => {
    if (!isAnimating) {
      setSelectedProject(selectedProject?.name === project.name ? null : project);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="card-carousel-container">
      <h1 className="portfolio-title">PROJECT SHOWCASE</h1> {/* Changed title */}
      
      <div className="filter-buttons">
        <button 
          onClick={() => setActiveTab('assisted')}
          className={`filter-button ${activeTab === 'assisted' ? 'active' : ''}`}
        >
          Featured Work
        </button>
        <button 
          onClick={() => setActiveTab('mixed')}
          className={`filter-button ${activeTab === 'mixed' ? 'active' : ''}`}
        >
          All Projects (Soon)
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
                        // objectFit="cover" // Redundant with fill and CSS
                      />
                    </div>
                    <div className="card-content">
                      <h3>{cardData.name}</h3>
                      <p>{cardData.role}</p>
                    </div>
                    <AudioWave className="card-wave" />
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
            <h2 className="member-name">{selectedProject.name}</h2>
            <p className="member-role">{selectedProject.role}</p>
            {selectedProject.bio && <p className="member-bio">{selectedProject.bio}</p>}
             {/* Placeholder for more details, e.g., audio player, tech stack */}
            <div className="project-links-placeholder">
                <p><em>Listen / More Info Soon</em></p>
            </div>
          </div>
        </div>
      )}

      {filteredItems.length > 1 && (
        <div className="dots">
          {filteredItems.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => updateCarousel(index)}
              disabled={isAnimating}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
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
