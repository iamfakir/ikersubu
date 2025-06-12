'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Sample data - replace with your actual mixes
const mixes = [
  {
    id: 1,
    title: 'Midnight Grooves',
    artist: 'Artist Name',
    genre: 'R&B',
    year: '2024',
    audioSrc: '/audio/mix1.mp3',
    coverArt: '/images/mix1-cover.jpg',
    credits: 'Mixed by You | Mastered by [Name]'
  },
  {
    id: 2,
    title: 'Urban Vibes',
    artist: 'Artist Name',
    genre: 'Hip-Hop',
    year: '2024',
    audioSrc: '/audio/mix2.mp3',
    coverArt: '/images/mix2-cover.jpg',
    credits: 'Mixed by You | Produced by [Name]'
  }
];

export default function FeaturedMixes() {
  const [currentMix, setCurrentMix] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (mixId: number) => {
    if (currentMix === mixId) {
      // Toggle play/pause for current mix
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Switch to a new mix
      setCurrentMix(mixId);
      setIsPlaying(true);
      // The play() call will be handled by the useEffect below
    }
  };

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Auto-play when currentMix changes
    if (currentMix !== null) {
      audio.src = mixes.find(mix => mix.id === currentMix)?.audioSrc || '';
      audio.play().catch(error => {
        console.error('Audio playback failed:', error);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentMix]);

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
            Featured R&B / Hip-Hop Mixes
          </h2>
          <p className="text-[#A0A0A5] max-w-2xl mx-auto">
            Listen to my latest mixing work in the R&B and Hip-Hop genres
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
            >
              <div className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] flex items-center justify-center overflow-hidden">
                      {mix.coverArt ? (
                        <img
                          src={mix.coverArt}
                          alt={`${mix.title} cover`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center text-white text-2xl font-bold';
                            fallback.textContent = mix.title.split(' ').map(word => word[0]).join('');
                            target.parentNode?.insertBefore(fallback, target);
                          }}
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {mix.title.split(' ').map(word => word[0]).join('')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => togglePlay(mix.id)}
                      className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg ${
                        currentMix === mix.id && isPlaying ? 'opacity-100' : ''
                      }`}
                      aria-label={currentMix === mix.id && isPlaying ? 'Pause' : 'Play'}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#00F0FF] flex items-center justify-center text-black">
                        {currentMix === mix.id && isPlaying ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </button>
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
                          <span className="text-xs text-[#A0A0A5]">Now Playing</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-[#A0A0A5] mt-3">{mix.credits}</p>
                    
                    <div className="mt-4">
                      <div className="h-1 bg-[#1E243A] rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] transition-all duration-300 ${
                            currentMix === mix.id && isPlaying ? 'w-3/4' : 'w-0'
                          }`}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#A0A0A5] mt-1">
                        <span>{currentMix === mix.id && isPlaying ? '2:45' : '0:00'}</span>
                        <span>3:30</span>
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
      
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
    </section>
  );
}
