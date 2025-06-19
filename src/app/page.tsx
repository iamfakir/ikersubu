'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';

// Dynamically import components that are below the fold
const CreditsSection = dynamic(() => import('./components/CreditsSection'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const LogosSection = dynamic(() => import('./components/LogosSection'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const FeaturedMixes = dynamic(() => import('./components/FeaturedMixes'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="min-h-[100px]"></div>,
});

const Services = dynamic(() => import('./components/Services'), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p>Loading...</p></div>,
});

const CardCarousel = dynamic(() => import('../components/CardCarousel/CardCarousel'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center"><p>Loading...</p></div>,
  ssr: false,
});

const HeroSection = dynamic(() => import('./components/HeroSection'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><p>Loading Hero...</p></div>,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <HeroSection />

        {/* About Me Section (Replacing Portfolio) */}
        <section className="py-20 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
              <p className="text-xl text-[#A0A0A5] max-w-3xl mx-auto leading-relaxed">
                Hi, I'm Iker Subu, a professional audio engineer and producer. Since 2022, I've been professionally focused on recording and mixing, and in 2024, I began assisting renowned Engineer x Producer Akash Shravan. I work with talented artists and help them achieve their sonic vision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Credits Section */}
        <CreditsSection />

        {/* Company Logos Section */}
        <LogosSection />

        {/* Featured Mixes Section */}
        <FeaturedMixes />

        {/* Services Section */}
        <div id="services">
          <Services />
        </div>

        {/* Featured Work Carousel Section */}
        <section className="py-20 px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Featured Mixes</h2>
          <CardCarousel />
          <div className="carousel">
            
            <div className="carousel-item">Project 1</div>
            <div className="carousel-item">Project 2</div>
            <div className="carousel-item">Project 3</div>
          </div>
        </section>
        

        
        {/* Enhanced CTA Section */}
        <section className="py-20 px-8 bg-linear-to-t from-[#0B0E17] to-[#1A1F35]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Elevate Your Sound?</h2>
            <p className="text-xl text-[#A0A0A5] mb-8">Let's create something extraordinary together</p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-[#00F0FF] to-[#9D00FF] text-black font-bold rounded-lg transition-all duration-300"
              >
                Start Your Project
              </motion.button>
              <motion.a
                href="https://forms.gle/h1H74cbkGqP819BX7"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-bold rounded-lg hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
