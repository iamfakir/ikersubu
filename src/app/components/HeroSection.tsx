'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AudioWave = () => {
  const bars = 20;
  const barVariants = {
    initial: { scaleY: 0.2 },
    animate: (i: number) => ({
      scaleY: [0.2, 0.8, 0.4, 0.7, 0.2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.05,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="flex items-end justify-center h-16 gap-1 opacity-70 absolute bottom-10 left-1/2 transform -translate-x-1/2">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={barVariants}
          initial="initial"
          animate="animate"
          className="w-1 bg-gradient-to-t from-[#00F0FF] to-[#9D00FF] rounded-full"
          style={{ height: '100%' }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.section
      ref={heroRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        opacity: heroOpacity,
        scale: heroScale
      }}
    >
      {/* Optimized background gradient with reduced motion */}
      <motion.div
        className="absolute inset-0 bg-[#0B0E17] z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, #0B0E17 0%, #1A1F35 100%)`,
          backgroundPosition: isClient ? 
            `${50 + (mousePosition.x * 0.01)}% ${50 + (mousePosition.y * 0.01)}%` : 
            'center center',
          backgroundSize: '200% 200%',
          willChange: 'background-position',
          contain: 'paint',
          opacity: isClient ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      />
      {/* Optimized subtle overlay with reduced blending */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(11, 14, 23, 0.2) 0%, transparent 100%)',
          mixBlendMode: 'overlay',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      
      
      {/* Content */}
      <div className="relative z-20 text-center px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            <motion.span
              className="block text-[#00F0FF]"
            >
              IKER SUBU
            </motion.span>
            <motion.span
              className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2"
            >
              Mixing Engineer | Audio Plugin Developer
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl sm:text-2xl text-[#A0A0A5] mt-6 max-w-2xl mx-auto"
          >
            Expert mixing and mastering services plus innovative audio plugins to enhance your productions. Achieve major-label sound quality.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-6 mt-12"
        >
          <motion.a
            href="https://forms.gle/h1H74cbkGqP819BX7"
            className="btn-futuristic group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Audio wave animation at bottom */}
      <AudioWave />
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
}