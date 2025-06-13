'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  project: string;
  content: string;
  rating: number;
  service: 'mixing' | 'mastering' | 'production' | 'vocal';
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Artist',
    project: 'Midnight Echoes',
    content: 'Iker transformed my tracks with his incredible mixing skills. The clarity and punch he brought to my music was exactly what I was looking for. Highly recommended!',
    rating: 5,
    service: 'mixing',
    image: '/images/avatar-1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Producer',
    project: 'Urban Beats Vol. 3',
    content: 'The mastering work was exceptional. Iker has an incredible ear for detail and made my tracks sound radio-ready. Will definitely be working with him again!',
    rating: 5,
    service: 'mastering',
    image: '/images/avatar-2.jpg'
  },
  {
    id: 3,
    name: 'Mike Chen',
    role: 'Artist',
    project: 'City Lights',
    content: 'Iker\'s production skills are next level. He took my ideas and turned them into something beyond my expectations. The beats are fire!',
    rating: 5,
    service: 'production',
    image: '/images/avatar-3.jpg'
  },
  {
    id: 4,
    name: 'Jasmine Lee',
    role: 'Singer-Songwriter',
    project: 'Whisper in the Dark',
    content: 'The vocal production was absolutely stunning. Iker knew exactly how to make my voice shine while maintaining the emotion of the song.',
    rating: 5,
    service: 'vocal',
    image: '/images/avatar-4.jpg'
  },
];

const serviceColors = {
  mixing: 'from-purple-600 to-blue-500',
  mastering: 'from-amber-500 to-pink-500',
  production: 'from-emerald-500 to-teal-400',
  vocal: 'from-rose-500 to-pink-500',
};

const serviceLabels = {
  mixing: 'Mixing',
  mastering: 'Mastering',
  production: 'Production',
  vocal: 'Vocal Production',
};

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.service === activeFilter);

  const currentTestimonial = filteredTestimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what artists and producers say about working with me.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'all' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Testimonials
          </button>
          {Object.entries(serviceLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === key 
                  ? `bg-gradient-to-r ${serviceColors[key as keyof typeof serviceColors]} text-white` 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Testimonial */}
        {filteredTestimonials.length > 0 ? (
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gray-900/50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            
            <div className="relative z-10">
              <FaQuoteLeft className="text-gray-700 text-4xl mb-6" />
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {currentTestimonial.content}
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
                    {currentTestimonial.image ? (
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold">
                        {currentTestimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{currentTestimonial.name}</h4>
                    <p className="text-gray-400">{currentTestimonial.role}</p>
                    <p className="text-sm text-cyan-400">{currentTestimonial.project}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-4">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-cyan-400">
                    {serviceLabels[currentTestimonial.service as keyof typeof serviceLabels]}
                  </span>
                </div>
              </div>
              
              <FaQuoteRight className="absolute bottom-8 right-8 text-gray-700 text-4xl" />
            </div>
            
            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-6 flex space-x-3">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-cyan-500 w-8' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No testimonials found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
