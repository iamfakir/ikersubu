'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Recording Artist",
    content: "Working with Iker was a game-changer for my album. The mixing quality elevated my music to a professional level I didn't think was possible with my recordings.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Music Producer",
    content: "The attention to detail and technical expertise is unmatched. Every project I've sent has come back sounding incredible, with a quick turnaround time.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Indie Artist",
    content: "As an independent artist, finding affordable yet professional mixing was challenging until I found Iker. The quality rivals major studio productions at a fraction of the cost.",
    rating: 5
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Film Composer",
    content: "The custom TouchDesigner work for my live performances created an immersive audiovisual experience that truly elevated my show. Highly recommended for anyone looking to stand out.",
    rating: 5
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Sound Designer",
    content: "The circuit bending workshop opened up a whole new world of sonic possibilities for my projects. Iker's knowledge and teaching style made complex concepts accessible.",
    rating: 4
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-[#FFD700]' : 'text-gray-400'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/20 to-transparent mix-blend-overlay z-10"></div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00F0FF] opacity-5 blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#9D00FF] opacity-5 blur-3xl"
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
        
        <div className="relative z-20 py-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-primary animate-gradient mb-6">
                Client Testimonials
              </h1>
              <p className="mt-3 text-xl text-[#A0A0A5] max-w-2xl mx-auto">
                Hear what our clients have to say about their experience working with us
              </p>
            </motion.div>
            
            <motion.div 
              className="card-futuristic overflow-hidden p-8 sm:p-10 relative"
              variants={itemVariants}
            >
              {/* Quote icon */}
              <div className="absolute top-6 left-6 text-[#00F0FF]/20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <div className="relative">
                <motion.div
                  key={activeIndex}
                  custom={activeIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="text-center px-4 sm:px-8"
                >
                  <p className="text-xl sm:text-2xl text-white leading-relaxed mb-8 italic">
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                    <p className="text-[#00F0FF]">{testimonials[activeIndex].role}</p>
                  </div>
                </motion.div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between mt-12">
                  <motion.button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full glass border border-[#ffffff20] text-white hover:border-[#00F0FF] transition-colors"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === activeIndex ? 'bg-[#00F0FF]' : 'bg-[#ffffff30]'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full glass border border-[#ffffff20] text-white hover:border-[#00F0FF] transition-colors"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="text-center mt-12" variants={itemVariants}>
              <Link
                href="/"
                className="inline-flex items-center text-[#00F0FF] hover:text-[#9D00FF] transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
