'use client';

import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
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
          <motion.a
            href="https://forms.gle/h1H74cbkGqP819BX7"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-linear-to-r from-[#00F0FF] to-[#9D00FF] text-black font-bold rounded-lg transition-all duration-300"
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="https://forms.gle/h1H74cbkGqP819BX7"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-bold rounded-lg hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}