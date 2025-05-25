'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Portfolio() {
  interface Project {
    src: string;
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Generate list of all images from 1.jpg to 57.jpg and reverse them
    const projectData: Project[] = Array.from({ length: 57 }, (_, i) => ({
      src: `/assets/images/works/${i + 1}.jpg`,
      // Placeholder links - replace with actual links
      spotify: `https://spotify.com/project${i + 1}`,
      appleMusic: `https://apple.com/project${i + 1}`,
      youtubeMusic: `https://youtube.com/project${i + 1}`,
    })).reverse();
    setProjects(projectData);
    setLoading(false);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-4 bg-[#1A1F35] rounded w-48 mb-8"></div>
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 w-64 bg-[#1A1F35] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] to-[#1A1F35] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/20 to-transparent mix-blend-overlay z-10"></div>
        
        <motion.div
          className="relative z-20 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-primary animate-gradient mb-4">
              Portfolio
            </h1>
            <p className="mt-3 text-xl text-[#A0A0A5] max-w-2xl mx-auto">
              Explore a selection of our recent audio engineering and production projects
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`card-futuristic overflow-hidden group cursor-pointer`}
                variants={itemVariants}
                whileHover={expandedIndex === index ? {} : { // Disable hover effect when expanded
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => toggleExpand(index)}
              >
                <div className={`w-full relative overflow-hidden ${expandedIndex === index ? 'aspect-w-16 aspect-h-9 h-auto' : 'aspect-w-16 aspect-h-9 h-64'}`}>
                  <Image
                    src={project.src}
                    alt={`Portfolio item ${index + 1}`}
                    fill
                    className={`object-cover transition-transform duration-700 ${expandedIndex === index ? '' : 'group-hover:scale-110'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 4}
                  />
                  {expandedIndex !== index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium text-white">Project {index + 1}</h3>
                    <p className="text-[#A0A0A5] text-sm mt-1">Audio Engineering & Production</p>
                    {expandedIndex === index && ( // Show links and collapse button when expanded
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="space-y-2">
                          {project.spotify && (
                            <a href={project.spotify} target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:underline block">Spotify</a>
                          )}
                          {project.appleMusic && (
                            <a href={project.appleMusic} target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:underline block">Apple Music</a>
                          )}
                          {project.youtubeMusic && (
                            <a href={project.youtubeMusic} target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:underline block">YouTube Music</a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
