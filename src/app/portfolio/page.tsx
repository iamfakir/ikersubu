'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Portfolio() {
  interface Project {
    src: string;
    category: string;
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Initialize with multiple Assistant mix projects using existing images
    const projectData: Project[] = [
      // Assistant mix category projects
      {
        src: '/assets/images/works/11.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      {
        src: '/assets/images/works/12.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      {
        src: '/assets/images/works/15.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      {
        src: '/assets/images/works/20.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      {
        src: '/assets/images/works/21.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      {
        src: '/assets/images/works/22.jpg',
        category: 'Assistant mix',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      // Production category (no images)
      {
        src: '', // No image for this category
        category: 'Production',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      },
      // Mixes category (no images)
      {
        src: '', // No image for this category
        category: 'Mixes',
        spotify: '',
        appleMusic: '',
        youtubeMusic: ''
      }
    ];
    
    setProjects(projectData);
    setLoading(false);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
            className="mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#00F0FF] mb-4">
                PORTFOLIO
              </h1>
              <p className="mt-3 text-xl text-[#E0E0FF] max-w-2xl mx-auto">
                EXPLORE A SELECTION OF OUR RECENT AUDIO ENGINEERING AND PRODUCTION PROJECTS
              </p>
            </div>
            <div className="flex justify-start mt-8">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-[#1A1F35] text-[#E0E0FF] rounded-lg border border-[#00F0FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
              >
                <option value="All">All Projects</option>
                <option value="Assistant mix">Assistant Mix</option>
                <option value="Production">Production</option>
                <option value="Mixes">Mixes</option>
              </select>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.length === 0 && selectedCategory !== 'All' && (
              <p className="text-center text-[#E0E0FF] text-xl col-span-full">No projects found for this category yet.</p>
            )}
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className={`card-futuristic overflow-hidden group cursor-pointer`}
                variants={itemVariants}
                whileHover={expandedIndex === index ? {} : {
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => toggleExpand(index)}
              >
                <div className={`w-full relative overflow-hidden ${expandedIndex === index ? 'aspect-w-16 aspect-h-9 h-auto' : 'aspect-w-16 aspect-h-9 h-64'}`}>
                  {project.src ? (
                    <>
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-sm">Loading: {project.src.split('/').pop()}</span>
                      </div>
                      <Image
                        src={project.src}
                        alt={`Portfolio item ${index + 1}`}
                        fill
                        className={`object-cover transition-transform duration-700 ${expandedIndex === index ? '' : 'group-hover:scale-110'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 4}
                        onLoadingComplete={() => console.log('Image loaded successfully:', project.src)}
                        onError={(e) => {
                          console.error('Image failed to load:', {
                            src: project.src,
                            error: e,
                            timestamp: new Date().toISOString()
                          });
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-[#1A1F35] flex items-center justify-center">
                      <span className="text-[#E0E0FF] text-sm">No image available</span>
                    </div>
                  )}
                  {expandedIndex !== index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium text-white">{project.category}</h3>
                    <p className="text-[#A0A0A5] text-sm mt-1">Audio Engineering & Production</p>
                    {expandedIndex === index && (
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
