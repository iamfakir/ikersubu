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
                          href={mix.streamingLinks.spotify} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#1DB954] hover:text-white transition-colors"
                          aria-label={`Listen to ${mix.title} on Spotify`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 496 512" fill="currentColor">
                            <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
                          </svg>
                        </a>
                        <a 
                          href={mix.streamingLinks.appleMusic} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#FA243C] hover:text-white transition-colors"
                          aria-label={`Listen to ${mix.title} on Apple Music`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 384 512" fill="currentColor">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
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
