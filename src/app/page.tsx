'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';

// Dynamically import components that are below the fold
const CreditsSection = dynamic(() => import('./components/CreditsSection'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const LogosSection = dynamic(() => import('./components/LogosSection'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const FeaturedMixes = dynamic(() => import('./components/FeaturedMixes'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="min-h-[100px]"></div>,
});

const Services = dynamic(() => import('./components/Services'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const CardCarousel = dynamic(() => import('../components/CardCarousel/CardCarousel'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center"><p>Loading...</p></div>,
  ssr: false,
});

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        {/* Hero Section with Parallax Effect */}
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
              background: `
                linear-gradient(
                  135deg,
                  #0B0E17 0%,
                  #1A1F35 100%
                )
                ${isClient ? 
                  `${50 + (mousePosition.x * 0.01)}% ${50 + (mousePosition.y * 0.01)}%` : 
                  'center center'}
              `,
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
                href="/contact"
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

        {/* About Me Section (Replacing Portfolio) */}
        <section className="py-20 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
              <p className="text-xl text-[#A0A0A5] max-w-3xl mx-auto leading-relaxed">
                Hi, I'm Iker Subu, a professional audio engineer and producer. Since 2022, I've been professionally focused on recording and mixing, and in 2024, I began assisting renowned Engineer x Producer Akash Shravan. I work with talented artists and help them achieve their sonic vision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Credits Section */}
        <CreditsSection />

        {/* Company Logos Section */}
        <LogosSection />

        {/* Featured Mixes Section */}
        <FeaturedMixes />

        {/* Services Section */}
        <div id="services">
          <Services />
        </div>

        {/* Featured Work Carousel Section */}
        <section className="py-20 px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Featured Mixes</h2>
          <CardCarousel />
          <div className="carousel">
            
            <div className="carousel-item">Project 1</div>
            <div className="carousel-item">Project 2</div>
            <div className="carousel-item">Project 3</div>
          </div>
        </section>
        
        {/* Brand Story Section */}
        <section className="py-20 px-8 bg-linear-to-b from-[#0B0E17] to-[#1A1F35]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">My Audio Journey</h2>
              <p className="text-xl text-[#A0A0A5] max-w-3xl mx-auto">
                From bedroom producer to professional audio engineer, I've dedicated my life to perfecting the art of sound. 
                Every mix tells a story, and I'm here to make yours unforgettable.
              </p>
            </motion.div>
            
            {/* Custom SVG Graphics */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#00F0FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Precision</h3>
                <p className="text-[#A0A0A5]">Every frequency matters. I craft each mix with surgical precision.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#9D00FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#9D00FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Creativity</h3>
                <p className="text-[#A0A0A5]">Pushing boundaries to create unique sonic landscapes.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#00F0FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Passion</h3>
                <p className="text-[#A0A0A5]">Music is my life. Your vision becomes my mission.</p>
              </motion.div>
            </div>
            
            {/* Process Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-linear-to-r from-[#00F0FF]/10 to-[#9D00FF]/10 rounded-lg p-8 border border-[#00F0FF]/20"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-8">My Process</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">1</div>
                  <h4 className="text-white font-semibold mb-2">Listen</h4>
                  <p className="text-[#A0A0A5] text-sm">Understanding your vision and musical goals</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#9D00FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                  <h4 className="text-white font-semibold mb-2">Analyze</h4>
                  <p className="text-[#A0A0A5] text-sm">Breaking down the elements and structure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">3</div>
                  <h4 className="text-white font-semibold mb-2">Create</h4>
                  <p className="text-[#A0A0A5] text-sm">Crafting the perfect mix with precision</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#9D00FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                  <h4 className="text-white font-semibold mb-2">Deliver</h4>
                  <p className="text-[#A0A0A5] text-sm">Professional results that exceed expectations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="py-20 px-8 bg-linear-to-t from-[#0B0E17] to-[#1A1F35]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Elevate Your Sound?</h2>
            <p className="text-xl text-[#A0A0A5] mb-8">Let's create something extraordinary together</p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-[#00F0FF] to-[#9D00FF] text-black font-bold rounded-lg transition-all duration-300"
              >
                Start Your Project
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-bold rounded-lg hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

        {/* Brand Story Section */}
        <section className="py-20 px-8 bg-linear-to-b from-[#0B0E17] to-[#1A1F35]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">My Audio Journey</h2>
              <p className="text-xl text-[#A0A0A5] max-w-3xl mx-auto">
                From bedroom producer to professional audio engineer, I've dedicated my life to perfecting the art of sound. 
                Every mix tells a story, and I'm here to make yours unforgettable.
              </p>
            </motion.div>
            
            {/* Custom SVG Graphics */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#00F0FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Precision</h3>
                <p className="text-[#A0A0A5]">Every frequency matters. I craft each mix with surgical precision.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#9D00FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#9D00FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Creativity</h3>
                <p className="text-[#A0A0A5]">Pushing boundaries to create unique sonic landscapes.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-6 bg-linear-to-br from-[#1A1F35] to-[#0B0E17] rounded-lg border border-[#00F0FF]/20"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Passion</h3>
                <p className="text-[#A0A0A5]">Music is my life. Your vision becomes my mission.</p>
              </motion.div>
            </div>
            
            {/* Process Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-linear-to-r from-[#00F0FF]/10 to-[#9D00FF]/10 rounded-lg p-8 border border-[#00F0FF]/20"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-8">My Process</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">1</div>
                  <h4 className="text-white font-semibold mb-2">Listen</h4>
                  <p className="text-[#A0A0A5] text-sm">Understanding your vision and musical goals</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#9D00FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                  <h4 className="text-white font-semibold mb-2">Analyze</h4>
                  <p className="text-[#A0A0A5] text-sm">Breaking down the elements and structure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">3</div>
                  <h4 className="text-white font-semibold mb-2">Create</h4>
                  <p className="text-[#A0A0A5] text-sm">Crafting the perfect mix with precision</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#9D00FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                  <h4 className="text-white font-semibold mb-2">Deliver</h4>
                  <p className="text-[#A0A0A5] text-sm">Professional results that exceed expectations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="py-20 px-8 bg-linear-to-t from-[#0B0E17] to-[#1A1F35]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Elevate Your Sound?</h2>
            <p className="text-xl text-[#A0A0A5] mb-8">Let's create something extraordinary together</p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-[#00F0FF] to-[#9D00FF] text-black font-bold rounded-lg transition-all duration-300"
              >
                Start Your Project
              </motion.button>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-bold rounded-lg hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
