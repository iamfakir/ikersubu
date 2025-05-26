'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PluginsPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1 
  className="text-4xl font-light mb-4 text-center"
  initial={{ opacity: 0, color: '#ffffff' }}
  animate={{ opacity: 1, color: '#00F0FF' }}
  transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
>
  Coming soon... Namma Thaan
</motion.h1>
          <p className="text-xl">Our custom plugins will be available soon</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full max-w-md aspect-square"
        >
          <Image 
            src="/assets/images/billa.jpg" 
            alt="Coming soon" 
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      </div>
      <Footer />
    </>
  );
}