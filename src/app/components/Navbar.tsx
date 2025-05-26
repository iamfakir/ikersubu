'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
  submenu?: Array<{
    href: string;
    label: string;
  }>;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Set active link based on current path
    setActiveLink(window.location.pathname);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { 
      href: '/products', 
      label: 'Products',
    },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">IKER SUBU</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group h-full flex items-center"
              >
                <span className={`text-white hover:text-[#00F0FF] transition-colors duration-300 ${
                  activeLink === link.href ? 'text-[#00F0FF]' : ''
                }`}>
                  {link.label}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  activeLink === link.href
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] scale-x-100'
                    : 'bg-[#00F0FF] scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-0'
              }`}></span>
              <span className={`absolute h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-full top-2'
              }`}></span>
              <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
              }`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden glass backdrop-blur-xl bg-opacity-90 overflow-hidden`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 px-4 rounded-md transition-all duration-300 ${
                activeLink === link.href
                  ? 'bg-white/10 text-[#00F0FF]'
                  : 'text-white hover:bg-white/5 hover:text-[#00F0FF]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
