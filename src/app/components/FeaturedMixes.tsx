'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFeaturedMixes } from '../data/mixes';

interface Mix {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: string;
  description: string;
  coverArt?: string;
  link: string;
  highlights: string[];
}

const LoadingPlaceholder = () => (
  <div className="py-20 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured Mixes
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="h-64 bg-[#161B2D]/50 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const MixCard = ({ 
  mix, 
  index, 
  isSelected, 
  onClick 
}: { 
  mix: Mix; 
  index: number; 
  isSelected: boolean; 
  onClick: () => void 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`bg-[#161B2D] rounded-xl overflow-hidden transition-all duration-300 ${
      isSelected ? 'ring-2 ring-[#00F0FF]' : 'hover:ring-1 hover:ring-[#00F0FF]/50'
    }`}
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex items-start space-x-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] flex items-center justify-center overflow-hidden">
            {mix.coverArt ? (
              <Image
                src={mix.coverArt}
                alt={`${mix.title} cover`}
                className="w-full h-full object-cover"
                width={96}
                height={96}
                priority={true}
              />
            ) : (
              <span className="text-white text-2xl font-bold">
                {mix.title.split(' ').map((word: string) => word[0]).join('')}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">{mix.title}</h3>
              <p className="text-[#00F0FF]">{mix.artist}</p>
              <div className="flex items-center mt-1 space-x-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#1E243A] text-[#A0A0A5]">
                  {mix.genre}
                </span>
                <span className="text-[#A0A0A5] text-sm">{mix.year}</span>
              </div>
            </div>
            {isSelected && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></div>
                <span className="text-xs text-[#A0A0A5]">Selected</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-[#A0A0A5] mt-3 leading-relaxed">{mix.description}</p>
          
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-white mb-2">Mix Highlights:</h4>
            <ul className="text-xs text-[#A0A0A5] space-y-1">
              {mix.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1 h-1 bg-[#00F0FF] rounded-full mr-2"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <a 
              href={mix.link}
              className="text-xs text-[#00F0FF] hover:text-white transition-colors inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Listen on SoundCloud
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.95 14.6c-.2.2-.5.2-.7 0l-3.5-3.5c-.1-.1-.3-.1-.5 0l-3.5 3.5c-.2.2-.5.2-.7 0s-.2-.5 0-.7l3.5-3.5c.2-.2.2-.5 0-.7l-3.5-3.5c-.2-.2-.2-.5 0-.7s.5-.2.7 0l3.5 3.5c.1.1.3.1.5 0l3.5-3.5c.2-.2.5-.2.7 0s.2.5 0 .7L11.3 10l3.65 3.6c.2.2.2.5 0 .7z" />
              </svg>
            </a>
            
            <button 
              className="text-xs text-[#A0A0A5] hover:text-white transition-colors inline-flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                // Implement view details functionality
              }}
            >
              View Details
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function FeaturedMixes() {
  const [isClient, setIsClient] = useState(false);
  const [currentMix, setCurrentMix] = useState<number | null>(null);
  const [mixes, setMixes] = useState<Mix[]>([]);
  
  useEffect(() => {
    setIsClient(true);
    setMixes(getFeaturedMixes());
  }, []);

  if (!isClient) {
    return <LoadingPlaceholder />;
  }

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Mixes
          </h2>
          <p className="text-[#A0A0A5] max-w-2xl mx-auto">
            Check out my latest mixing work
          </p>
        </motion.div>
        
        {mixes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#A0A0A5]">No featured mixes available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {mixes.map((mix, index) => (
                <MixCard 
                  key={mix.id}
                  mix={mix}
                  index={index}
                  isSelected={currentMix === mix.id}
                  onClick={() => setCurrentMix(currentMix === mix.id ? null : mix.id)}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <a
                href="/portfolio"
                className="inline-flex items-center text-[#00F0FF] hover:text-white transition-colors"
              >
                Explore Full Portfolio
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
