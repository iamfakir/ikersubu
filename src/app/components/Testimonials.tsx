-'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Independent Artist',
    quote: 'Working with Iker was a game-changer for my latest EP. The attention to detail and professional approach exceeded my expectations.',
    image: '/images/testimonial-1.jpg'
  },
  {
    name: 'Mike Rivers',
    role: 'Band Leader, The River Flows',
    quote: 'The mixing quality we received was outstanding. Iker has a unique ability to enhance the natural sound while maintaining the original vision.',
    image: '/images/testimonial-2.jpg'
  },
  {
    name: 'Elena Martinez',
    role: 'Producer',
    quote: 'Incredible attention to detail and fast turnaround times. The mixes were exactly what we were looking for - clean, punchy, and professional.',
    image: '/images/testimonial-3.jpg'
  },
  {
    name: 'David Chen',
    role: 'Studio Owner',
    quote: 'We regularly work with Iker for our clients\'s projects. The consistency and quality of work is always top-notch.',
    image: '/images/testimonial-4.jpg'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-center mb-16 tracking-tight"
        >
          TESTIMONIALS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 relative"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <svg
                className="absolute top-4 right-4 w-8 h-8 text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;