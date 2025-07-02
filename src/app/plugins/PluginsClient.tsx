'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Plugin {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
  comingSoon: boolean;
  features: string[];
}

interface PluginsClientProps {
  plugins: Plugin[];
}

export default function PluginsClient({ plugins }: PluginsClientProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] to-[#0F172A] pb-12">
        {/* Hero Section */}
        <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            IKER SUBU Audio Plugins
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Professional audio tools for music production and sound design
          </p>
        </header>

        {/* Plugins Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plugins.map((plugin) => (
              <div 
                key={plugin.id}
                className="bg-[#0F172A]/50 backdrop-blur-xs rounded-xl overflow-hidden border border-gray-800 hover:border-[#00F0FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00F0FF]/10"
              >
                <Link href={`${plugin.url}?edition=${plugin.id}`} className="block">
                  <div className="relative h-64 bg-gray-900">
                    <Image
                      src={plugin.image}
                      alt={`${plugin.title} plugin interface`}
                      fill
                      className="object-contain"
                    />
                    {plugin.comingSoon && (
                      <div className="absolute top-4 right-4 bg-[#00F0FF] text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex flex-col space-y-2 mb-3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-white leading-tight">{plugin.title}</h2>
                      <span className="text-xs text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                        {plugin.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">{plugin.description}</p>
                  </div>
                  
                  <ul className="space-y-1.5 mb-5">
                    {plugin.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-xs">
                        <svg className="w-3 h-3 mt-0.5 mr-2 flex-shrink-0 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plugin.url}
                    className="inline-block w-full text-center bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white font-medium py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                  >
                    {plugin.comingSoon ? 'Notify Me' : 'Learn More'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated with New Plugins
          </h2>
          <p className="text-gray-300 text-sm mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for updates on new releases, exclusive offers, and production tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white font-medium rounded-md hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
