'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const companies = [
  {
    name: 'Def Jam',
    logo: '/logos/def-jam.svg',
    url: 'https://www.defjam.com/'
  },
  {
    name: 'Think Music',
    logo: '/logos/think-music.svg',
    url: 'https://www.thinkmusic.in/'
  },
  {
    name: 'Universal Records',
    logo: '/logos/universal-records.svg',
    url: 'https://www.universalmusic.com/'
  },
  {
    name: 'Azadi Records',
    logo: '/logos/azadi-records.svg',
    url: 'https://www.azadirecords.com/'
  },
  {
    name: 'Gully Gang',
    logo: '/logos/gully-gang.svg',
    url: 'https://www.gullygang.in/'
  },
];

export default function LogosSection() {
  // Use a fallback for missing logos
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="py-16 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted By Industry Leaders
          </h2>
          <p className="text-[#A0A0A5] max-w-2xl mx-auto">
            Proud to have collaborated with some of the biggest names in the music industry
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              title={company.name}
            >
              {company.logo ? (
                <div className="relative h-12 w-full">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={48}
                    className="max-h-12 w-auto max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.alt = getInitials(company.name);
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-20 h-12 flex items-center justify-center bg-[#1E243A] rounded-lg text-[#00F0FF] font-bold';
                      fallback.textContent = getInitials(company.name);
                      target.parentNode?.insertBefore(fallback, target);
                    }}
                  />
                </div>
              ) : (
                <div className="w-20 h-12 flex items-center justify-center bg-[#1E243A] rounded-lg text-[#00F0FF] font-bold">
                  {getInitials(company.name)}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
