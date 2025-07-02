'use client';

import { motion } from 'framer-motion';

export default function AboutMeSection() {
  return (
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
  );
}