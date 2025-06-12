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
    icon: <FaMixer className="w-8 h-8 text-[#00F0FF]" />,
    title: 'Professional Mixing',
    shortDescription: 'Industry-standard mixing that elevates your tracks to compete with professional releases.',
    description: (
      <div className="space-y-4">
        <p><strong>Transform your raw recordings into polished, release-ready tracks.</strong> Drawing from my experience working with high-profile productions, I deliver:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Vocal Clarity:</strong> Clear, present vocals that sit perfectly in the mix</li>
          <li><strong>Impactful Low-End:</strong> Bass and drums that translate powerfully across all playback systems</li>
          <li><strong>Optimized Loudness:</strong> Streaming-ready masters that maintain dynamics and impact</li>
          <li><strong>Genre-Appropriate Balance:</strong> Techniques tailored to the specific needs of your music</li>
          <li><strong>Professional Finish:</strong> Sound quality that captures attention and enhances your artistic vision</li>
        </ul>
        <p><strong>Why choose my mixing?</strong> Your music deserves meticulous attention to detail. I address common challenges such as muddy low-end, vocals that don't blend, and mixes that lack translation across different listening environments.</p>
        <div className="bg-[#1A1F35] p-4 rounded-lg mt-4">
          <h4 className="text-[#00F0FF] font-semibold mb-2">Pricing Tiers:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Essential Mix:</strong> $150 - Professional mix with 2 revisions</li>
            <li><strong>Premium Mix:</strong> $250 - Includes vocal production + unlimited revisions</li>
            <li><strong>Deluxe Package:</strong> $350 - Mix + Master + stems + radio edit</li>
          </ul>
        </div>
      </div>
    ),
    delivery: '3-5 business days',
    includes: ['Professional mixing', 'Streaming optimization', 'Reference matching', 'Revision rounds included'],
    featured: true,
    popular: true
  },
  {
    icon: <FaCompactDisc className="w-8 h-8 text-[#9D00FF]" />,
    title: 'Vocal Production',
    shortDescription: 'Transform raw vocal recordings into polished, professional performances.',
    description: (
      <div className="space-y-4">
        <p><strong>Your vocals are central to your track's impact.</strong> I specialize in vocal production techniques that elevate performances to a professional standard:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Precise Comping:</strong> Seamlessly combine the best takes for a flawless performance</li>
          <li><strong>Accurate Pitch Correction:</strong> Natural and transparent tuning, or creative effects as desired</li>
          <li><strong>Vocal Arrangement:</strong> Crafting rich harmonies and ad-libs to enhance the soundscape</li>
          <li><strong>Refinement:</strong> Cleaning up breaths, sibilance, and other unwanted artifacts</li>
          <li><strong>Creative Processing:</strong> Applying effects and treatments that complement your artistic vision</li>
        </ul>
        <p><strong>My approach:</strong> I focus on bringing out the best in your vocal performance, ensuring it sits perfectly within the mix and captivates your audience.</p>
        <div className="bg-[#1A1F35] p-4 rounded-lg mt-4">
          <h4 className="text-[#00F0FF] font-semibold mb-2">Pricing Options:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Basic Vocal Production:</strong> $100 - Comping, tuning, basic processing</li>
            <li><strong>Full Vocal Production:</strong> $175 - Includes harmonies, ad-libs, creative effects</li>
          </ul>
        </div>
      </div>
    ),
    delivery: '2-3 business days',
    includes: ['Vocal comping', 'Pitch correction', 'Harmony arrangement', 'Mix-ready stems']
  },
  {
    icon: <FaHeadphones className="w-8 h-8 text-[#00F0FF]" />,
    title: 'Beat Mixing',
    shortDescription: 'Make your instrumentals hit hard and translate perfectly across all playback systems.',
    description: (
      <div className="space-y-4">
        <p><strong>Your instrumentals are the backbone of your music.</strong> I ensure your beats have the professional polish that makes them stand out:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Low-End Control:</strong> Deep, controlled bass that hits hard without muddiness</li>
          <li><strong>Drum Punch:</strong> Drums that cut through the mix while maintaining groove and impact</li>
          <li><strong>Spatial Imaging:</strong> Professional stereo width that creates depth and clarity</li>
          <li><strong>Balanced Frequencies:</strong> EQ and compression that ensure every element has its place</li>
          <li><strong>Release-Ready Loudness:</strong> Beats that match commercial standards and translate across platforms</li>
        </ul>
        <p><strong>Ideal for:</strong> Producers, artists, and anyone seeking a professional, impactful mix for their instrumental tracks.</p>
        <div className="bg-[#1A1F35] p-4 rounded-lg mt-4">
          <h4 className="text-[#00F0FF] font-semibold mb-2">Beat Mixing Rates:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Standard Beat Mix:</strong> $75 - Professional mix with 1 revision</li>
            <li><strong>Premium Beat Mix:</strong> $125 - Includes tagged/untagged versions + stems</li>
          </ul>
        </div>
      </div>
    ),
    delivery: '2-4 business days',
    includes: ['Professional mixing', 'Stem delivery', 'Reference matching', 'Commercial loudness']
  },
  {
    icon: <FaTools className="w-8 h-8 text-[#9D00FF]" />,
    title: 'R&B/Hip-Hop Sound Design',
    shortDescription: 'Custom sounds and textures that make your tracks unique and memorable.',
    description: (
      <div className="space-y-4">
        <p><strong>Stand out with signature sounds.</strong> I create custom audio elements that give your R&B and Hip-Hop tracks a unique identity:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Custom 808s:</strong> Unique bass sounds tailored to your track's key and vibe</li>
          <li><strong>Vocal Chops:</strong> Creative vocal manipulation and sampling</li>
          <li><strong>Atmospheric Elements:</strong> Pads, textures, and ambient sounds</li>
          <li><strong>Transition Effects:</strong> Risers, sweeps, and ear candy</li>
          <li><strong>Drum Layering:</strong> Enhanced percussion with custom processing</li>
        </ul>
        <p><strong>Perfect for:</strong> Artists wanting signature sounds, producers building unique beat libraries, or tracks needing that extra creative touch.</p>
        <div className="bg-[#1A1F35] p-4 rounded-lg mt-4">
          <h4 className="text-[#00F0FF] font-semibold mb-2">Sound Design Pricing:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Basic Package:</strong> $50 - 3-5 custom elements</li>
            <li><strong>Full Package:</strong> $100 - 8-10 elements + variations</li>
          </ul>
        </div>
      </div>
    ),
    delivery: '3-5 business days',
    includes: ['Custom sound elements', 'Multiple variations', 'Stems provided', 'Commercial usage rights']
  },
  {
    icon: <FaCode className="w-8 h-8 text-[#00F0FF]" />,
    title: 'R&B/Hip-Hop Mixing Mentorship',
    shortDescription: 'Learn professional mixing techniques specifically for R&B and Hip-Hop from industry experience.',
    description: (
      <div className="space-y-4">
        <p><strong>Master the art of R&B and Hip-Hop mixing.</strong> Learn the techniques I've developed working with major artists:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Vocal Mixing Mastery:</strong> Make vocals sit perfectly in R&B and Hip-Hop mixes</li>
          <li><strong>808 & Bass Techniques:</strong> Get that professional low-end that translates</li>
          <li><strong>Genre-Specific Processing:</strong> EQ, compression, and effects for each style</li>
          <li><strong>Mix Analysis:</strong> Breakdown of commercial tracks and your own projects</li>
          <li><strong>Industry Insights:</strong> Real-world advice from major label experience</li>
        </ul>
        <p><strong>Who this helps:</strong> Producers and engineers wanting to specialize in R&B/Hip-Hop, artists learning to mix their own music, or anyone serious about improving their skills.</p>
        <div className="bg-[#1A1F35] p-4 rounded-lg mt-4">
          <h4 className="text-[#00F0FF] font-semibold mb-2">Mentorship Options:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Single Session:</strong> $75/hour - One-time consultation</li>
            <li><strong>Monthly Package:</strong> $250 - 4 sessions + project feedback</li>
          </ul>
        </div>
      </div>
    ),
    delivery: '1-2 hours per session',
    includes: ['Personalized curriculum', 'Project feedback', 'Resource library', 'Follow-up support']
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
            Audio Services
          </motion.h2>
          <motion.p 
            className="text-xl text-[#A0A0A5] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional mixing and audio services specifically crafted for R&B,POP and Hip-Hop artists. 
            With experience working on projects for various reputable projects.
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
