'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ContactContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  const googleFormUrl = 'https://forms.gle/h1H74cbkGqP819BX7';

  useEffect(() => {
    setHasMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  const redirectToGoogleForm = () => {
    if (typeof window !== 'undefined') {
      window.location.href = googleFormUrl;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.main 
      className="grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Optimized background elements */}
      <div 
        className="absolute inset-0 bg-[#0B0E17] z-0"
        style={{
          background: 'linear-gradient(135deg, #0B0E17 0%, #1A1F35 100%)',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(11, 14, 23, 0.2) 0%, transparent 100%)',
          mixBlendMode: 'overlay',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      
      {/* Animated background element following cursor */}
      {hasMounted && (
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] opacity-20 blur-3xl pointer-events-none z-10"
          animate={{
            x: mousePosition.x - 128, // Center the element on the cursor (w-64 is 256px, half is 128px)
            y: mousePosition.y - 128, // Center the element on the cursor
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 25
          }}
        />
      )}

      {/* Existing Animated background circles */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00F0FF] opacity-5 blur-3xl z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#9D00FF] opacity-5 blur-3xl z-10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.05, 0.08]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="w-full max-w-xl space-y-10 z-20 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#00F0FF] mb-6">
            Get in Touch
          </h1>
          <p className="mt-2 text-lg text-[#A0A0A5] max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Send us a message and let's create something amazing together.
          </p>
        </motion.div>
        
        <motion.div 
          className="card-futuristic relative overflow-hidden p-8 text-center"
          variants={itemVariants}
        >
          <p className="text-lg text-[#A0A0A5] mb-6">
            To get in touch or discuss a project, please use our contact form.
          </p>
          <button
            onClick={redirectToGoogleForm}
            className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00D1E0] hover:to-[#8A00E0] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00F0FF]/20"
          >
            OPEN CONTACT FORM
            <svg className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}