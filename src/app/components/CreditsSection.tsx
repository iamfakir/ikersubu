'use client';

import { motion } from 'framer-motion';

const credits = [
  {
    project: 'Squid Game Soundtrack',
    artist: 'Netflix Original Series',
    role: 'Assistant Engineer',
    year: '2021',
    label: 'Netflix'
  },
  {
    project: 'Testing Album',
    artist: 'A$AP Rocky',
    role: 'Assistant Engineer', 
    year: '2018',
    label: 'A$AP Worldwide/Polo Grounds/RCA'
  },
  {
    project: '[Placeholder Project]',
    artist: '[Major R&B Artist]',
    role: 'Mixing Engineer',
    year: '2023',
    label: '[Major Label]'
  },
  {
    project: '[Placeholder Album]',
    artist: '[Hip-Hop Artist]',
    role: 'Assistant Engineer',
    year: '2022',
    label: '[Record Label]'
  }
];

export default function CreditsSection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#0B0E17] to-[#1A1F35]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Engineer Credits
          </h2>
          <p className="text-[#A0A0A5] max-w-2xl mx-auto">
            Selected high-profile projects I've contributed to as an Assistant Engineer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {credits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#161B2D] rounded-xl p-6 hover:bg-[#1E243A] transition-colors duration-300"
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{credit.project}</h3>
                  <p className="text-[#00F0FF] text-lg">{credit.artist}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-[#A0A0A5]">
                      <span className="text-white">Role:</span> {credit.role}
                    </p>
                    <p className="text-[#A0A0A5]">
                      <span className="text-white">Label:</span> {credit.label}
                    </p>
                    <p className="text-[#A0A0A5]">
                      <span className="text-white">Year:</span> {credit.year}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center text-[#00F0FF] hover:text-white transition-colors"
          >
            View Full Portfolio
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
