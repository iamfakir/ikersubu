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
      <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] to-[#0F172A]">
        {/* Hero Section */}
        <header className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Audio Plugins
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional audio tools for music producers and sound designers
          </p>
        </header>

        {/* Plugins Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plugins.map((plugin) => (
              <div 
                key={plugin.id}
                className="bg-[#0F172A]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#00F0FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00F0FF]/10"
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
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2"> {/* Adjusted for mobile stacking */}
                    <h2 className="text-2xl font-bold text-white mb-2 sm:mb-0">{plugin.title}</h2> {/* Added margin bottom on mobile */}
                    <span className="text-sm text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full">
                      {plugin.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{plugin.description}</p>
                  
                  <ul className="space-y-1 mb-6">
                    {plugin.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-400 text-sm"> {/* Changed to items-start */}
                        <svg className="w-4 h-4 mr-2 text-[#00F0FF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* Added flex-shrink-0 */}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to be the first to know about new plugins?
          </h2>
          <p className="text-gray-300 mb-8">
            Join our newsletter to get updates on new releases, exclusive offers, and production tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
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
