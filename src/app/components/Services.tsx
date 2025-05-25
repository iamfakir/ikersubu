'use client';

import { useState, ReactNode } from 'react';

interface ServiceItem {
  icon: ReactNode;
  title: string;
  shortDescription: string;
  description: ReactNode;
  includes: string[];
  delivery: string;
}

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}
import { FaMixer, FaCompactDisc, FaHeadphones, FaMusic, FaTimes, FaArrowRight } from 'react-icons/fa';

import { FaCode, FaRobot, FaLaptopCode, FaTools } from 'react-icons/fa';

const services = [
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
    includes: ['Stem mixing', '2 rounds of revisions', 'High-quality WAV file', 'MP3 reference']
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 text-indigo-600">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-6 space-y-6">
            <div className="prose max-w-none">
              {service.description}
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
              <ul className="space-y-2">
                {service.includes.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                Interested in learning more about our {service.title.toLowerCase()} service? 
                Contact us for a personalized consultation and quote.
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started with {service.title}
                <FaArrowRight className="ml-2 -mr-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="services" className="py-20 sm:py-28 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
          Our Services
        </h2>
        <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
          We offer a range of professional audio and creative technology services, including mixing, mastering, custom audioware programming, and more, tailored to elevate your projects.
        </p>
        <div className="mt-10">
          <a
            href="/contact" // Or a future dedicated /services page
            className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            Discover Our Solutions
            <FaArrowRight className="inline ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
      {/* Modal functionality can be kept for a dedicated services page if needed */}
      {/* {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={closeModal}
        />
      )} */}
    </section>
  );
};

export default Services;
