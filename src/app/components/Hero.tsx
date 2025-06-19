'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CONTACT_FORM_URL } from '../config/links';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Studio mixing console"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            ELEVATE YOUR SOUND
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-light mb-8 max-w-2xl"
          >
            Professional mixing and mastering services for artists who demand excellence
          </motion.p>
          <motion.a
            href={`${CONTACT_FORM_URL}?entry.1234567890=Mix%20and%20Master`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block px-8 py-3 bg-white text-black text-lg font-light tracking-wider hover:bg-opacity-90 transition-all cursor-pointer"
          >
            START YOUR PROJECT
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
