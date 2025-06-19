'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import WaveAnimation from './WaveAnimation';

const Contact = () => {
  const googleFormUrl = 'https://forms.gle/h1H74cbkGqP819BX7';

  const redirectToGoogleForm = () => {
    if (typeof window !== 'undefined') {
      window.location.href = googleFormUrl;
    }
  };


  return (
    <div className="relative min-h-screen bg-gray-900 text-white py-20 px-4">
      <div className="fixed inset-0 w-full h-full -z-10">
        <WaveAnimation />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-center mb-16 tracking-tight"
        >
          CONTACT
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-300">
              To get in touch, please fill out our contact form.
            </p>
            <button
              onClick={redirectToGoogleForm}
              className="w-full bg-black text-white py-3 px-6 hover:bg-opacity-90 transition-colors sm:w-auto"
            >
              OPEN CONTACT FORM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;