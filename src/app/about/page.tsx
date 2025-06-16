'use client';

import Image from 'next/image';


import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '100+', label: 'Projects Completed' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '25+', label: 'Artists Worked With' },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Crafting Exceptional Sound
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Hi, I'm Iker Subu, a professional audio engineer and producer. Since 2022, I've been professionally focused on recording and mixing, and in 2024, I began assisting renowned producer Akash Shravan. I work with talented artists and help them achieve their sonic vision.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:opacity-90 transition-all"
                >
                  Get in Touch
                </a>
                <a
                  href="/portfolio"
                  className="px-6 py-3 border border-gray-700 text-white rounded-full font-medium hover:bg-gray-800/50 transition-all"
                >
                  View My Work
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/iker-profile.jpg"
                alt="Iker Subu - Audio Engineer"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold">Iker Subu</h3>
                <p className="text-cyan-400">Audio Engineer & Producer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Sound?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's work together to bring your music to life with professional mixing and mastering services tailored to your unique sound.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:opacity-90 transition-all text-lg"
              >
                Get Started
              </a>
              <a
                href="/portfolio"
                className="px-8 py-4 border border-gray-600 text-white rounded-full font-medium hover:bg-gray-800/50 transition-all text-lg"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
