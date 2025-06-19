'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { CONTACT_FORM_URL } from '../config/links';

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Optimized background with reduced gradient complexity */}
      <div 
        className="absolute inset-0 bg-[#0B0E17] z-0"
        style={{
          background: 'linear-gradient(to bottom, #0B0E17 0%, #0F1320 100%)',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      
      {/* Optimized decorative elements with reduced repaints */}
      <div 
        className="absolute bottom-0 left-0 w-full h-px z-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.3) 50%, transparent 100%)',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-px z-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(157, 0, 255, 0.2) 50%, transparent 100%)',
          willChange: 'opacity',
          contain: 'paint',
        }}
      />
      
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white font-display bg-clip-text text-transparent bg-gradient-primary">About Us</h3>
            <p className="text-[#A0A0A5] text-sm leading-relaxed">
              Professional audio mixing and mastering services for artists who demand excellence. Elevating your sound with cutting-edge audio engineering and creative technology solutions.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white font-display bg-clip-text text-transparent bg-gradient-primary">Quick Links</h3>
            <ul className="space-y-3">
              {([
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { 
                  href: CONTACT_FORM_URL, 
                  label: "Contact",
                  external: true 
                }
              ] as FooterLink[]).map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A0A0A5] hover:text-[#00F0FF] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-xs opacity-60">→</span>
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#A0A0A5] hover:text-[#00F0FF] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-xs opacity-60">→</span>
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white font-display bg-clip-text text-transparent bg-gradient-primary">Contact Us</h3>
            <address className="not-italic text-[#A0A0A5] text-sm space-y-3">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Chennai, 600087
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@ikersubu.com
              </p>
            </address>
          </motion.div>
          
          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 text-white font-display bg-clip-text text-transparent bg-gradient-primary">Connect With Me</h3>
            <div className="flex space-x-4">
              {[
                { href: "https://instagram.com/ikersubu", icon: <FaInstagram className="w-5 h-5" />, label: "Instagram", hoverColor: "hover:text-pink-500 hover:shadow-glow-pink" },
                { href: "https://open.spotify.com/artist/ikersubu", icon: <FaSpotify className="w-5 h-5" />, label: "Spotify", hoverColor: "hover:text-green-500 hover:shadow-glow-green" },
                { href: "https://music.apple.com/artist/ikersubu", icon: <FaApple className="w-5 h-5" />, label: "Apple Music", hoverColor: "hover:text-white hover:shadow-glow-white" },
                { href: "https://youtube.com/ikersubu", icon: <FaYoutube className="w-5 h-5" />, label: "YouTube", hoverColor: "hover:text-red-500 hover:shadow-glow-red" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[#A0A0A5] ${social.hoverColor} transition-all duration-300 p-2 rounded-full bg-[#1A1F35]/50 border border-[#ffffff10] flex items-center justify-center`}
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div
          className="mt-16 pt-8 text-center text-[#A0A0A5]/70 text-sm border-t border-[#ffffff10]"
          variants={itemVariants}
        >
          <p className="flex items-center justify-center">
            <span className="text-[#00F0FF] mr-2">©</span>
            {currentYear} IKER SUBU. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
