'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { getFeaturedMixes } from '../data/mixes';

// Get featured mixes from data file
const mixes = getFeaturedMixes();

export default function FeaturedMixes() {
  const [currentMix, setCurrentMix] = useState<number | null>(null);

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

        <div className="grid md:grid-cols-2 gap-8">
          {mixes.map((mix, index) => (
            <motion.div
              key={mix.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-[#161B2D] rounded-xl overflow-hidden transition-all duration-300 ${
                currentMix === mix.id ? 'ring-2 ring-[#00F0FF]' : 'hover:ring-1 hover:ring-[#00F0FF]/50'
              }`}
              onClick={() => setCurrentMix(currentMix === mix.id ? null : mix.id)}
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
                          onError={() => {
                            console.error(`Failed to load image: ${mix.coverArt}`);
                            // Next.js Image component handles errors automatically
                          }}
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {mix.title.split(' ').map(word => word[0]).join('')}
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
                      {currentMix === mix.id && (
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
                        {mix.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-[#00F0FF] rounded-full mr-2"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-xs text-[#A0A0A5] mt-3">{mix.credits}</p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <a 
                        href={mix.link}
                        className="text-xs text-[#00F0FF] hover:text-white transition-colors inline-flex items-center"
                      >
                        View Full Project Details
                        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      
                      <div className="flex space-x-3">
                        <a 
                          href={mix.streamingLinks.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#FF0000] hover:text-white transition-colors"
                          aria-label={`Watch ${mix.title} on YouTube`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 576 512" fill="currentColor">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                          </svg>
                        </a>
                        <a 
                          href={mix.streamingLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#E1306C] hover:text-white transition-colors"
                          aria-label={`Follow ${mix.title} on Instagram`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 448 512" fill="currentColor">
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
      </div>
    </section>
  );
}
