'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, FormEvent, useRef } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Form submitted:', { name, email, message });
    
    // Simulate delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/20 to-transparent mix-blend-overlay z-10"></div>
        
        {/* Animated background circles */}
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
        
        {/* Content */}
        <motion.div 
          className="w-full max-w-xl space-y-10 z-20 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-primary animate-gradient mb-6">
              Get in Touch
            </h1>
            <p className="mt-2 text-lg text-[#A0A0A5] max-w-lg mx-auto">
              Have a project in mind or want to collaborate? Send us a message and let's create something amazing together.
            </p>
          </motion.div>
          
          <motion.div 
            className="card-futuristic relative overflow-hidden"
            variants={itemVariants}
          >
            {isSubmitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-[#A0A0A5]">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <motion.label 
                    htmlFor="name" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      name ? 'text-xs -top-2 text-[#00F0FF]' : 'text-sm top-3 text-[#A0A0A5]'
                    }`}
                    variants={itemVariants}
                  >
                    Full Name
                  </motion.label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-futuristic pt-4"
                    variants={itemVariants}
                  />
                </div>
                
                <div className="relative">
                  <motion.label 
                    htmlFor="email" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      email ? 'text-xs -top-2 text-[#00F0FF]' : 'text-sm top-3 text-[#A0A0A5]'
                    }`}
                    variants={itemVariants}
                  >
                    Email Address
                  </motion.label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-futuristic pt-4"
                    variants={itemVariants}
                  />
                </div>
                
                <div className="relative">
                  <motion.label 
                    htmlFor="message" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      message ? 'text-xs -top-2 text-[#00F0FF]' : 'text-sm top-3 text-[#A0A0A5]'
                    }`}
                    variants={itemVariants}
                  >
                    Message
                  </motion.label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="input-futuristic pt-4"
                    variants={itemVariants}
                  ></motion.textarea>
                </div>
                
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-futuristic w-full relative overflow-hidden group"
                  >
                    <span className={`transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      Send Message
                    </span>
                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
          
          <motion.div className="text-center" variants={itemVariants}>
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
      </motion.main>
      <Footer />
    </div>
  );
}
