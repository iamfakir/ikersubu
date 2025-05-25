'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Track {
  title: string;
  artist: string;
  genre: string;
  beforeMix: string;
  afterMix: string;
  image: string;
}

const tracks: Track[] = [
  {
    title: 'Summer Nights',
    artist: 'The Dreamers',
    genre: 'Pop Rock',
    beforeMix: '/audio/summer-nights-before.mp3',
    afterMix: '/audio/summer-nights-after.mp3',
    image: '/images/portfolio-1.jpg'
  },
  {
    title: 'Deep Blue',
    artist: 'Ocean Waves',
    genre: 'Electronic',
    beforeMix: '/audio/deep-blue-before.mp3',
    afterMix: '/audio/deep-blue-after.mp3',
    image: '/images/portfolio-2.jpg'
  },
  {
    title: 'Urban Soul',
    artist: 'City Lights',
    genre: 'R&B',
    beforeMix: '/audio/urban-soul-before.mp3',
    afterMix: '/audio/urban-soul-after.mp3',
    image: '/images/portfolio-3.jpg'
  }
];

const Portfolio = () => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBefore, setIsBefore] = useState(true);

  const handlePlayPause = (track: Track) => {
    if (activeTrack?.title === track.title) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  const toggleBeforeAfter = () => {
    setIsBefore(!isBefore);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-center mb-16 tracking-tight"
        >
          PORTFOLIO
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square mb-4 overflow-hidden">
                <img
                  src={track.image}
                  alt={track.title}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => handlePlayPause(track)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isPlaying && activeTrack?.title === track.title ? (
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-medium mb-2">{track.title}</h3>
              <p className="text-gray-600 mb-2">{track.artist}</p>
              <p className="text-sm text-gray-500 mb-4">{track.genre}</p>
              {activeTrack?.title === track.title && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={toggleBeforeAfter}
                    className={`text-sm font-medium ${isBefore ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    {isBefore ? 'Before Mix' : 'After Mix'}
                  </button>
                  <div className="h-1 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;