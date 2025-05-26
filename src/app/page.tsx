'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './components/Services';

// Audio wave animation component
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

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Parallax Effect */}
        <motion.section
          ref={heroRef}
          className="relative flex items-center justify-center min-h-screen overflow-hidden"
          style={{
            opacity: heroOpacity,
            scale: heroScale
          }}
        >
          {/* Background gradient with parallax effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] z-0"
            style={{
              backgroundPosition: `${50 + (mousePosition.x * 0.01)}% ${50 + (mousePosition.y * 0.01)}%`
            }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/20 to-transparent mix-blend-overlay z-10"></div>
          
          
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
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl sm:text-2xl text-[#A0A0A5] mt-6 max-w-2xl mx-auto"
              >
                Elevating your sound with cutting-edge audio engineering and creative technology solutions
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-6 mt-12"
            >
              <motion.a
                href="#services"
                className="btn-futuristic group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Services
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              
              <motion.a
                href="/portfolio"
                className="w-full sm:w-auto px-10 py-4 glass border border-[#00F0FF]/30 text-[#00F0FF] rounded-md hover:border-[#00F0FF] transition-all
                  font-medium text-lg flex items-center justify-center gap-2"
                whileHover={{
                  boxShadow: "0 0 15px rgba(0, 240, 255, 0.3)",
                  scale: 1.03
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Portfolio
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
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

        {/* Services Section */}
        <div id="services">
          <Services />
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
