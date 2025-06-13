'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkItem {
  href: string;
  label: string;
  submenu?: NavLinkItem[];
}

interface NavLink extends NavLinkItem {
  submenu?: NavLinkItem[];
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth < 768) { // Mobile
      setOpenSubmenu(openSubmenu === label ? null : label);
    }
  };

  const handleMouseEnter = (label: string) => {
    if (window.innerWidth >= 768) { // Desktop
      setOpenSubmenu(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Desktop
      setOpenSubmenu(null);
    }
  };
  
  const closeAllMenus = () => {
    setOpenSubmenu(null);
    setIsMobileMenuOpen(false);
  };

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { 
      label: 'Products',
      href: '#',
      submenu: [
        { href: '/products/microlicensing', label: 'Microlicensing' },
        { href: '/products/sound-kits', label: 'Sound Kits' },
        { href: '/plugins', label: 'Plugins' }
      ]
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
              <div 
                key={link.label} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.submenu ? (
                  <>
                    <button
                      onClick={(e) => toggleSubmenu(e, link.label)}
                      className={`flex items-center text-white hover:text-[#00F0FF] transition-colors duration-300 ${
                        openSubmenu === link.label ? 'text-[#00F0FF]' : ''
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`ml-1 w-4 h-4 transform transition-transform ${
                          openSubmenu === link.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openSubmenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 top-full mt-2 w-56 rounded-md shadow-lg bg-[#0B0E17] ring-1 ring-black ring-opacity-5 z-50"
                        >
                          <div className="py-1">
                            {link.submenu.map((item) => (
                              <div key={item.href} className="relative group">
                                {item.submenu ? (
                                  <>
                                    <button
                                      onClick={(e) => toggleSubmenu(e, item.label || '')}
                                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#1A1F35] hover:text-[#00F0FF] transition-colors duration-200 flex justify-between items-center"
                                    >
                                      {item.label}
                                      <svg className="w-4 h-4 ml-2 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                    <AnimatePresence>
                                      {openSubmenu === item.label && (
                                        <motion.div
                                          initial={{ opacity: 0, x: 10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 10 }}
                                          className="absolute left-full top-0 ml-1 w-56 rounded-md shadow-lg bg-[#0B0E17] ring-1 ring-black ring-opacity-5 z-50"
                                        >
                                          <div className="py-1">
                                            {item.submenu.map((subItem) => (
                                              <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-sm text-white hover:bg-[#1A1F35] hover:text-[#00F0FF] transition-colors duration-200"
                                                onClick={() => setOpenSubmenu(null)}
                                              >
                                                {subItem.label}
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className="block px-4 py-2 text-sm text-white hover:bg-[#1A1F35] hover:text-[#00F0FF] transition-colors duration-200"
                                    onClick={() => setOpenSubmenu(null)}
                                  >
                                    {item.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
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
                )}
              </div>
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
            <div key={link.label}>
              {link.submenu ? (
                <div className="mb-2">
                  <button
                    onClick={(e) => toggleSubmenu(e, link.label)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-md transition-all duration-300 ${
                      openSubmenu === link.label ? 'bg-white/10 text-[#00F0FF]' : 'text-white hover:bg-white/5 hover:text-[#00F0FF]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        openSubmenu === link.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openSubmenu === link.label && (
                    <div className="pl-4 mt-1 space-y-1">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-2 px-4 text-sm rounded-md transition-all duration-300 text-gray-300 hover:bg-white/5 hover:text-[#00F0FF]"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setOpenSubmenu(null);

                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`block py-3 px-4 rounded-md transition-all duration-300 ${
                    activeLink === link.href
                      ? 'bg-white/10 text-[#00F0FF]'
                      : 'text-white hover:bg-white/5 hover:text-[#00F0FF]'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setOpenSubmenu(null);
                  }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
