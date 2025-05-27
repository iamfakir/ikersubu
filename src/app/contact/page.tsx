'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Contact() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setServiceType(service);
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [searchParams]);

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
    console.log('Form submitted:', { name, email, message, serviceType });
    
    // Simulate delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setServiceType('');
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
        
        {/* Animated background element following cursor */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] opacity-20 blur-3xl pointer-events-none z-10"
          animate={{
            x: mousePosition.x - 128, // Center the element on the cursor (w-64 is 256px, half is 128px)
            y: mousePosition.y - 128, // Center the element on the cursor
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 25
          }}
        />

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
                    htmlFor="serviceType" 
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                      serviceType ? 'text-xs -top-2 text-[#00F0FF]' : 'text-sm top-3 text-[#A0A0A5]'
                    }`}
                    variants={itemVariants}
                  >
                    What service are you interested in?
                  </motion.label>
                  <motion.select
                    id="serviceType"
                    name="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                    className="input-futuristic pt-4 appearance-none text-[#E0E0FF]"
                    variants={itemVariants}
                  >
                    <option value="" disabled hidden></option>
                    <option value="mix_and_master">Mixing & Mastering</option>
                    <option value="circuitBend">Circuit Bend</option>
                    <option value="pluginsAutomation">Plugins Automation</option>
                    <option value="touchdesigner">Touchdesigner</option>
                    <option value="others">Others</option>
                  </motion.select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#A0A0A5]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
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
                  />
                </div>
                
                <motion.div 
                  className="flex items-center space-x-4"
                  variants={itemVariants}
                >
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500 border-cyan-500" 
                    />
                    <span className="text-[#00F0FF]">Sign up for newsletter</span>
                  </label>
                </motion.div>
                <motion.button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-lg text-lg font-semibold flex items-center justify-center relative overflow-hidden group"
                  disabled={isSubmitting}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
