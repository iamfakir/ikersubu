'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './components/Services';
import CardCarousel from '../components/CardCarousel/CardCarousel';

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
    <div className="flex items-end justify-center h-16 gap-1 opacity-70">
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
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative flex items-center justify-center min-h-screen overflow-hidden"
          style={{
            opacity: heroOpacity,
            scale: heroScale
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] z-0"
            style={{
              backgroundPosition: `${50 + (mousePosition.x * 0.01)}% ${50 + (mousePosition.y * 0.01)}%`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/20 to-transparent mix-blend-overlay z-10"></div>
          
          <div className="relative z-20 text-center px-4 sm:px-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                <motion.span className="block text-[#00F0FF]">
                  IKER SUBU
                </motion.span>
                <motion.span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2">
                  Professional Audio Engineer & Producer
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg sm:text-xl text-[#A0A0A5] mt-6 max-w-2xl mx-auto"
              >
                Crafting sonic excellence, one mix at a time.
              </motion.p>
            </motion.div>
            
            <div className="mt-12">
              <AudioWave />
            </div>
          </div>
        </motion.section>

        {/* Work Section */}
        <section id="work" className="py-20 px-4 sm:px-8 bg-[#0B0E17]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Recent Work</h2>
              <p className="text-lg sm:text-xl text-[#A0A0A5] max-w-2xl mx-auto">
                Explore some of my latest audio engineering and production projects.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardCarousel />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Services />

        {/* Brand Story Section */}
        <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">My Audio Journey</h2>
              <p className="text-lg sm:text-xl text-[#A0A0A5] max-w-3xl mx-auto">
                From bedroom producer to professional audio engineer, I've dedicated my life to perfecting the art of sound. 
                Every mix tells a story, and I'm here to make yours unforgettable.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
