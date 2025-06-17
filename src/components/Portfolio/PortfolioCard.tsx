'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

interface PortfolioCardProps {
  project: {
    id: number;
    name: string;
    role: string;
    type: 'assisted' | 'mixed' | 'production' | 'recording';
    year: number;
    genre: string;
    client: string;
    description: string;
    techniques: string[];
    imageUrl: string;
    audioUrl?: string;
    beforeAudioUrl?: string;
    afterAudioUrl?: string;
  };
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
  showComparison: boolean;
  onToggleComparison: () => void;
}

export default function PortfolioCard({
  project,
  isPlaying,
  isMuted,
  onPlayToggle,
  onMuteToggle,
  showComparison,
  onToggleComparison,
}: PortfolioCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const beforeAudioRef = useRef<HTMLAudioElement>(null);
  const afterAudioRef = useRef<HTMLAudioElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  // Handle mute state
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
    if (beforeAudioRef.current) beforeAudioRef.current.muted = isMuted;
    if (afterAudioRef.current) afterAudioRef.current.muted = isMuted;
  }, [isMuted]);

  // Get project type info
  const getTypeInfo = () => {
    switch (project.type) {
      case 'assisted':
        return { label: 'Assisted Mix', color: 'from-purple-500 to-pink-500' };
      case 'mixed':
        return { label: 'Mixed & Mastered', color: 'from-cyan-400 to-blue-500' };
      case 'production':
        return { label: 'Production', color: 'from-green-500 to-emerald-500' };
      case 'recording':
        return { label: 'Recording', color: 'from-amber-500 to-orange-500' };
      default:
        return { label: 'Project', color: 'from-gray-500 to-gray-700' };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Thumbnail */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        
        {/* Project Image */}
        <div className="absolute inset-0">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Play/Pause Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayToggle();
            }}
            className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xs transition-all ${
              isPlaying
                ? 'bg-cyan-600/90 text-white'
                : 'bg-black/70 text-white hover:bg-cyan-600/90 hover:scale-110'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} className="ml-1" />}
          </button>
        </div>

        {/* Audio Elements */}
        <audio
          ref={audioRef}
          src={project.audioUrl || '/audio/placeholder.mp3'}
          preload="none"
          loop
        />
        <audio
          ref={beforeAudioRef}
          src={project.beforeAudioUrl || '/audio/placeholder-before.mp3'}
          preload="none"
        />
        <audio
          ref={afterAudioRef}
          src={project.afterAudioUrl || '/audio/placeholder-after.mp3'}
          preload="none"
        />

        {/* Project Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeInfo.color} text-white`}>
            {typeInfo.label}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <p className="text-cyan-400 text-sm">{project.client}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMuteToggle();
              }}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-gray-800 text-cyan-300 text-xs rounded-full">
            {project.genre}
          </span>
          {project.techniques.slice(0, 2).map((tech, i) => (
            <span key={i} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
              {tech}
            </span>
          ))}
          {project.techniques.length > 2 && (
            <span className="px-2.5 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full">
              +{project.techniques.length - 2}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-800/50">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{project.year}</span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleComparison();
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
              disabled={!project.beforeAudioUrl && !project.afterAudioUrl}
            >
              {showComparison ? 'Hide Comparison' : 'Before/After'}
              <FiArrowRight className={`ml-1 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Before/After Comparison */}
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
                  {project.beforeAudioUrl && (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">BEFORE MIX</div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500/50 w-3/4" />
                      </div>
                    </div>
                  )}
                  
                  {project.afterAudioUrl && (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">AFTER MIX</div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500/50 w-full" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
