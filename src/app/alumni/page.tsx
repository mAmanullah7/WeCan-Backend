'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaInstagram, FaSearch } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

interface Alumni {
  _id: string;
  name: string;
  email: string;
  graduationYear: number;
  batch: string;
  position: string;
  currentOrganization: string;
  bio: string;
  profilePicture: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function Alumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await fetch('/api/alumni');
      if (!response.ok) {
        throw new Error('Failed to fetch alumni');
      }
      const data = await response.json();
      setAlumni(data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredAlumni = alumni.filter(alumnus =>
    (alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.currentOrganization?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedYear === null || alumnus.graduationYear === selectedYear)
  );

  const years = Array.from(new Set(alumni.map(a => a.graduationYear))).sort((a, b) => b - a);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Alumni</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Meet our distinguished alumni who continue to make a difference in their communities and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Alumni Network</h2>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                {/* Year Filter */}
                <div className="flex space-x-2 overflow-x-auto pb-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedYear === null
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Years
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedYear === year
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alumni Grid */}
            {filteredAlumni.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAlumni.map((alumnus, index) => (
                  <motion.div
                    key={alumnus._id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-custom group"
                  >
                    <div className="h-64 bg-gray-300 relative">
                      <img
                        src={alumnus.profilePicture || '/images/alumni/placeholder.jpg'}
                        alt={`${alumnus.name} - ${alumnus.position}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {alumnus.socialLinks.linkedin && (
                            <a
                              href={alumnus.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${alumnus.name}'s LinkedIn profile`}
                            >
                              <FaLinkedin size={24} />
                            </a>
                          )}
                          {alumnus.email && (
                            <a
                              href={`mailto:${alumnus.email}`}
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`Email ${alumnus.name}`}
                            >
                              <FaEnvelope size={24} />
                            </a>
                          )}
                          {alumnus.socialLinks.instagram && (
                            <a
                              href={alumnus.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${alumnus.name}'s Instagram profile`}
                            >
                              <FaInstagram size={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{alumnus.name}</h3>
                      <p className="text-primary font-medium mb-2">{alumnus.position}</p>
                      <p className="text-gray-600 text-sm mb-4">{alumnus.currentOrganization}</p>
                      <p className="text-gray-700">{alumnus.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No alumni found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Join Alumni Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-primary text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-4">Join Our Alumni Network</h2>
                <p className="mb-6">
                  Stay connected with WeCan and be part of our growing alumni community. Share your experiences, mentor current volunteers, and continue making a difference.
                </p>
                <a href="/alumni/register" className="inline-block">
                  <button className="btn bg-white text-primary hover:bg-white/90">
                    Register as Alumni
                  </button>
                </a>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block"
              >
                <ImageCarousel 
                  images={[
                    "/images/alumni/alumini.png",
                    "/images/alum.jpeg",
                    "/images/alum1.jpeg",
                    "/images/alumni.jpg",
                    "/images/team.jpg"
                  ]}
                  autoplayInterval={4000}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 