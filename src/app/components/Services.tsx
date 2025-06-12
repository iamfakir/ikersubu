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
    title: 'R&B/Hip-Hop Mixing',
    shortDescription: 'Specialized mixing for R&B and Hip-Hop tracks that make your vocals shine and your beats knock.',
    description: (
      <div className="space-y-4">
        <p>As an R&B and Hip-Hop specialist, I bring out the best in your tracks with a focus on:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Crystal clear, present vocals that cut through the mix</li>
          <li>Powerful, controlled low-end that translates on all systems</li>
          <li>Modern, competitive loudness while maintaining dynamics</li>
          <li>Creative vocal effects and ad-lib processing</li>
          <li>808s and bass that bump without muddying the mix</li>
        </ul>
        <p>I've worked with artists across the R&B and Hip-Hop spectrum, from smooth soul to hard-hitting trap. My goal is to make your music sound polished, professional, and ready for streaming platforms.</p>
      </div>
    ),
    delivery: '3-5 business days',
    includes: ['Unlimited revisions', '24-48h delivery option', 'Reference track matching', 'Streaming-optimized masters'],
    popular: true
  },
  {
    icon: <FaCompactDisc className="w-8 h-8 text-[#9D00FF]" />,
    title: 'Vocal Production',
    shortDescription: 'From comping to tuning, get radio-ready vocal tracks that stand out in the mix.',
    description: (
      <div className="space-y-4">
        <p>Vocal production is where the magic happens in R&B and Hip-Hop. My vocal production service includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Professional vocal comping and alignment</li>
          <li>Pitch correction and tuning (subtle or robotic effect if desired)</li>
          <li>De-essing and breath control</li>
          <li>Creative vocal stacking and arrangement</li>
          <li>Ad-lib processing and placement</li>
        </ul>
        <p>I'll work closely with you to ensure the vocals complement your artistic vision while maintaining a professional, polished sound.</p>
      </div>
    ),
    delivery: '2-3 business days',
    includes: ['Unlimited takes', 'Vocal comping', 'Tuning and alignment', 'Mixing preparation']
  },
  {
    icon: <FaHeadphones className="w-8 h-8 text-[#00F0FF]" />,
    title: 'Beat Mixing',
    shortDescription: 'Professional mixing for your instrumentals to compete with major label productions.',
    description: (
      <div className="space-y-4">
        <p>Your beats deserve to hit hard and translate on any system. My beat mixing service includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>808 and bass processing that bumps on any system</li>
          <li>Drum bus processing for maximum impact</li>
          <li>Stereo imaging and width enhancement</li>
          <li>Creative sound design and effects</li>
          <li>Reference track matching</li>
        </ul>
        <p>I'll make sure your beats have the professional polish and competitive edge they need to stand out.</p>
      </div>
    ),
    delivery: '2-4 business days',
    includes: ['Stem mixing', '2 mix revisions', 'Reference track matching', 'Streaming-optimized output']
  },
  {
    icon: <FaTools className="w-8 h-8 text-[#9D00FF]" />,
    title: 'Sound Design',
    shortDescription: 'Custom sound design for your tracks, from 808s to atmospheric textures.',
    description: (
      <div className="space-y-4">
        <p>Elevate your production with custom sound design tailored to your track:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom 808 and bass sound design</li>
          <li>Atmospheric textures and risers</li>
          <li>Drum processing and layering</li>
          <li>Vocal chops and manipulation</li>
          <li>Transition effects and ear candy</li>
        </ul>
        <p>I'll create unique sounds that fit your track perfectly and help it stand out from the crowd.</p>
      </div>
    ),
    delivery: '3-5 business days',
    includes: ['Custom sound design', 'Multiple variations', 'Mixing preparation', '1 revision round']
  },
  {
    icon: <FaCode className="w-8 h-8 text-[#00F0FF]" />,
    title: 'Mentoring',
    shortDescription: '1-on-1 sessions to improve your mixing and production skills.',
    description: (
      <div className="space-y-4">
        <p>Take your mixing and production skills to the next level with personalized 1-on-1 mentoring:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Mixing techniques for R&B and Hip-Hop</li>
          <li>Vocal processing and production</li>
          <li>Beat making and sound selection</li>
          <li>Workflow optimization</li>
          <li>Industry insights and career advice</li>
        </ul>
        <p>Whether you're just starting out or looking to refine your skills, I'll provide the guidance you need to reach your goals.</p>
      </div>
    ),
    delivery: '1-2 hours per session',
    includes: ['Custom lesson plan', 'Project feedback', 'Resource recommendations', 'Follow-up support']
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
    icon: <FaLaptopCode className="w-8 h-8 text-[#9D00FF]" />,
    title: 'Audio Software Development',
    shortDescription: 'Custom audio software and plugin development for specialized needs.',
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
    icon: <FaRobot className="w-8 h-8 text-[#00F0FF]" />,
    title: 'Workflow Automation',
    shortDescription: 'Custom scripts and automation for your music production workflow.',
    description: (
      <div className="space-y-4">
        <p>Streamline your music production with custom automation solutions:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>DAW-specific macro creation</li>
          <li>Batch processing workflows</li>
          <li>File organization and naming conventions</li>
          <li>Template creation and optimization</li>
          <li>Integration with cloud services</li>
        </ul>
        <p>Save hours of repetitive work with custom automation tailored to your specific workflow needs.</p>
      </div>
    ),
    delivery: '1-2 weeks',
    includes: ['Custom scripts', 'Documentation', 'Training', 'Support']
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
