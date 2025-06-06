'use client';

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMixer, 
  FaCompactDisc, 
  FaHeadphones, 
  FaTimes, 
  FaArrowRight,
  FaCode, 
  FaRobot, 
  FaLaptopCode, 
  FaTools 
} from 'react-icons/fa';

interface ServiceItem {
  icon: ReactNode;
  title: string;
  shortDescription: string;
  description: ReactNode;
  includes: string[];
  delivery: string;
  featured?: boolean;
  popular?: boolean;
}

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const services: ServiceItem[] = [
  {
    icon: <FaMixer className="w-8 h-8 text-indigo-600" />,
    title: 'Mixing',
    shortDescription: 'Professional mixing services to bring clarity, depth, and balance to your tracks.',
    description: (
      <div className="space-y-4">
        <p>My professional mixing service transforms your raw recordings into polished, radio-ready tracks. Using industry-standard tools and techniques, I focus on:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Balancing levels and panning for optimal stereo imaging</li>
          <li>EQ and compression to enhance clarity and punch</li>
          <li>Creative effects and automation to bring your vision to life</li>
          <li>Vocal tuning and alignment for perfect performances</li>
          <li>Reference track matching to meet industry standards</li>
        </ul>
        <p>I work with all genres and provide 2 rounds of revisions to ensure your complete satisfaction.</p>
      </div>
    ),
    delivery: '3-5 business days',
    includes: ['Stem mixing', '2 rounds of revisions', 'High-quality WAV file', 'MP3 reference'],
    popular: true
  },
  {
    icon: <FaCompactDisc className="w-8 h-8 text-indigo-600" />,
    title: 'Mastering',
    shortDescription: 'Final polish and loudness optimization to make your music sound professional on all platforms.',
    description: (
      <div className="space-y-4">
        <p>Professional mastering ensures your music sounds its best across all playback systems and streaming platforms. My mastering service includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Loudness optimization for streaming platforms (-14 LUFS)</li>
          <li>Stereo enhancement and width control</li>
          <li>EQ balancing for translation across all systems</li>
          <li>Harmonic excitement and stereo imaging</li>
          <li>Format-specific optimization for CD, streaming, and vinyl</li>
        </ul>
        <p>I provide multiple format options and a detailed report of the processing applied.</p>
      </div>
    ),
    delivery: '1-2 business days',
    includes: ['Loudness optimized master', 'Format-specific versions', 'ISRC code assignment', 'Cover art optimization']
  },
  {
    icon: <FaTools className="w-8 h-8 text-indigo-600" />,
    title: 'Circuit Bending',
    shortDescription: 'Custom hardware modifications and creative sound design through circuit manipulation.',
    description: (
      <div className="space-y-4">
        <p>Transform ordinary electronic devices into unique musical instruments through circuit bending:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom modifications of electronic devices</li>
          <li>Creation of unique sound generators</li>
          <li>Installation of control interfaces</li>
          <li>Documentation of modifications</li>
          <li>Basic usage training</li>
        </ul>
        <p>Each circuit bent device is unique and comes with personalized support to help you explore its capabilities.</p>
      </div>
    ),
    delivery: '2-4 weeks',
    includes: ['Custom modifications', 'Testing and calibration', 'User manual', 'Support session']
  },
  {
    icon: <FaCode className="w-8 h-8 text-indigo-600" />,
    title: 'Programming Audioware',
    shortDescription: 'Custom audio software development and DSP programming for unique sound processing needs.',
    description: (
      <div className="space-y-4">
        <p>Specialized audio software development services including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom VST/AU plugin development</li>
          <li>Max/MSP patch creation</li>
          <li>Pure Data programming</li>
          <li>SuperCollider development</li>
          <li>Real-time audio processing solutions</li>
        </ul>
        <p>Create unique tools for your specific audio processing needs with professional programming expertise.</p>
      </div>
    ),
    delivery: 'Project-based timeline',
    includes: ['Source code', 'Documentation', 'Installation support', 'Bug fixes']
  },
  {
    icon: <FaRobot className="w-8 h-8 text-indigo-600" />,
    title: 'Automation',
    shortDescription: 'Streamline your audio workflow with custom automation solutions and scripts.',
    description: (
      <div className="space-y-4">
        <p>Enhance your productivity with automated audio processing solutions:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom DAW automation scripts</li>
          <li>Batch processing workflows</li>
          <li>Audio file management systems</li>
          <li>Metadata automation</li>
          <li>Integration with existing tools</li>
        </ul>
        <p>Save time and maintain consistency with tailored automation solutions for your audio workflow.</p>
      </div>
    ),
    delivery: '1-3 weeks',
    includes: ['Custom scripts', 'Documentation', 'Integration support', 'Maintenance guide']
  },
  {
    icon: <FaLaptopCode className="w-8 h-8 text-indigo-600" />,
    title: 'TouchDesigner',
    shortDescription: 'Create immersive audiovisual experiences and interactive installations.',
    description: (
      <div className="space-y-4">
        <p>Professional TouchDesigner development for audiovisual projects:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Real-time audio visualization</li>
          <li>Interactive installations</li>
          <li>Custom operator development</li>
          <li>Performance optimization</li>
          <li>Integration with audio hardware</li>
        </ul>
        <p>Bring your audiovisual concepts to life with professional TouchDesigner development.</p>
      </div>
    ),
    delivery: 'Project-based timeline',
    includes: ['Project files', 'Documentation', 'Performance optimization', 'Installation support']
  }
];

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-[#0B0E17] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#00F0FF]/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-8 space-y-6 text-[#E0E0FF]">
              <div className="prose prose-invert max-w-none">
                {service.description}
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-white text-lg mb-4 flex items-center">
                  <span className="h-px w-8 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] mr-3"></span>
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {service.includes.map((item: string, i: number) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <svg className="h-5 w-5 text-[#00F0FF] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#E0E0FF]">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="p-5 bg-gradient-to-r from-[#00F0FF]/10 to-[#9D00FF]/10 rounded-xl border border-[#00F0FF]/20">
                <p className="text-[#E0E0FF]">
                  Ready to take your sound to the next level? Let's discuss how I can help with your {service.title.toLowerCase()} needs.
                </p>
                <div className="mt-4">
                  <span className="text-xs text-[#A0A0A5]">Average delivery time: {service.delivery}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#1A1F35]">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00D1E0] hover:to-[#8A00E0] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00F0FF]/20"
                >
                  Get Started with {service.title}
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#00F0FF] bg-[#00F0FF]/10 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional Audio Engineering
          </motion.h2>
          <motion.p 
            className="text-xl text-[#A0A0A5] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevate your sound with our comprehensive suite of professional audio services
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={`relative bg-[#1A1F35] rounded-2xl border border-[#2D3748] overflow-hidden transition-all duration-300 ${
                expandedCard === index ? 'shadow-2xl' : 'hover:shadow-xl hover:border-[#00F0FF]/30'
              }`}
              custom={index}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true, margin: "-100px" }}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#9D00FF] text-white mb-6">
                  {React.cloneElement(service.icon as React.ReactElement, { className: 'w-8 h-8' })}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedCard === index ? 'max-h-96' : 'max-h-20'
                }`}>
                  <p className="text-[#A0A0A5] mb-4">
                    {service.shortDescription}
                  </p>
                  
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-[#00F0FF] uppercase tracking-wider">Includes:</h4>
                    <ul className="space-y-2">
                      {service.includes.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-[#00F0FF] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#E0E0FF] text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {expandedCard === index && service.includes.length > 3 && (
                      <ul className="space-y-2">
                        {service.includes.slice(3).map((item, i) => (
                          <li key={i + 3} className="flex items-start">
                            <svg className="h-5 w-5 text-[#00F0FF] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[#E0E0FF] text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="pt-3 mt-4 border-t border-[#2D3748]">
                      <p className="text-sm text-[#A0A0A5]">
                        <span className="font-medium">Delivery:</span> {service.delivery}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00D1E0] hover:to-[#8A00E6] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00F0FF]/20"
                  >
                    Get Started
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-sm font-medium text-[#A0A0A5] hover:text-[#00F0FF] flex items-center"
                  >
                    {expandedCard === index ? 'Show Less' : 'Read More'}
                    <svg 
                      className={`w-4 h-4 ml-1 transition-transform ${expandedCard === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg text-[#A0A0A5] mb-6">Looking for a custom solution? Let's discuss your project.</p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full text-white bg-transparent border-2 border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F0FF]/20"
          >
            Contact Us
            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </motion.div>
      </div>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};

export default Services;
