'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLinkedin, FaTwitter, FaInstagram, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample alumni data (replace with actual data from API)
const alumniData = [
  {
    id: 1,
    name: 'Samarpan Bose',
    graduationYear: 2020,
    batch: '2014-2018',
    position: 'Software Engineer',
    currentOrganization: 'Google',
    bio: 'Passionate about technology and education. Worked with WeCan for 3 years during college.',
    profilePicture: '/images/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 2,
    name: 'Zaid Sekhani',
    graduationYear: 2019,
    batch: '2015-2019',
    position: 'Data Scientist',
    currentOrganization: 'Microsoft',
    bio: 'Former President of WeCan. Led multiple educational initiatives for underprivileged children.',
    profilePicture: '/images/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 3,
    name: 'Amit Kumar',
    graduationYear: 2020,
    batch: '2016-2020',
    position: 'Product Manager',
    currentOrganization: 'Amazon',
    bio: 'Organized multiple fundraising events for WeCan. Passionate about social impact.',
    profilePicture: '/images/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 4,
    name: 'Neha Singh',
    graduationYear: 2017,
    batch: '2013-2017',
    position: 'Marketing Manager',
    currentOrganization: 'Unilever',
    bio: 'Founding member of WeCan. Continues to support educational initiatives for children.',
    profilePicture: '/images/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

export default function Alumni() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData);
  
  const graduationYears = [...new Set(alumniData.map(alumni => alumni.graduationYear))].sort((a, b) => b - a);

  useEffect(() => {
    let filtered = alumniData;
    
    if (searchTerm) {
      filtered = filtered.filter(alumni => 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.currentOrganization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedYear) {
      filtered = filtered.filter(alumni => alumni.graduationYear === selectedYear);
    }
    
    setFilteredAlumni(filtered);
  }, [searchTerm, selectedYear]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
              Connect with former WeCan members who continue to make a difference in their communities and professional lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alumni Directory */}
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
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Alumni Directory</h2>
              
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
                    All
                  </button>
                  {graduationYears.map((year) => (
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
                {filteredAlumni.map((alumni, index) => (
                  <motion.div
                    key={alumni.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-custom group"
                  >
                    <div className="h-64 bg-gray-300 relative">
                      <img
                        src={alumni.profilePicture}
                        alt={`${alumni.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {alumni.socialLinks.linkedin && (
                            <a
                              href={alumni.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${alumni.name}'s LinkedIn profile`}
                            >
                              <FaLinkedin size={24} />
                            </a>
                          )}
                          {alumni.socialLinks.twitter && (
                            <a
                              href={alumni.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${alumni.name}'s Twitter profile`}
                            >
                              <FaTwitter size={24} />
                            </a>
                          )}
                          {alumni.socialLinks.instagram && (
                            <a
                              href={alumni.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${alumni.name}'s Instagram profile`}
                            >
                              <FaInstagram size={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{alumni.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaGraduationCap className="mr-2" />
                        <span>Batch {alumni.batch}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaBriefcase className="mr-2" />
                        <span>{alumni.position} at {alumni.currentOrganization}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{alumni.bio}</p>
                      <Link href={`/alumni/${alumni.id}`} className="text-primary font-medium hover:text-primary/80">
                        View Profile
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No alumni found for the selected criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Alumni Registration */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="bg-primary text-white rounded-lg p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Join Our Alumni Network</h2>
                <p className="mb-6">
                  Are you a former member of WeCan? Register as an alumni to stay connected with the community, share your experiences, and inspire current volunteers.
                </p>
                <Link href="/alumni/register" className="btn bg-white text-primary hover:bg-white/90">
                  Register as Alumni
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="h-64 bg-primary-dark rounded-lg flex items-center justify-center">
                  <p className="text-white/70">Alumni Network Image</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alumni Stories */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Alumni Stories</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Read inspiring stories from our alumni about their journey with WeCan and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">Rahul Sharma</h3>
                  <p className="text-sm text-gray-600">Class of 2018</p>
                </div>
              </div>
              <p className="mb-4">
                "My time with WeCan shaped my perspective on education and social responsibility. The skills I gained as a volunteer have been invaluable in my professional career at Google."
              </p>
              <Link href="/alumni/stories/1" className="text-primary font-medium hover:text-primary/80">
                Read Full Story
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-bold">Priya Patel</h3>
                  <p className="text-sm text-gray-600">Class of 2019</p>
                </div>
              </div>
              <p className="mb-4">
                "Leading WeCan was one of the most rewarding experiences of my college life. It taught me leadership, empathy, and the power of education to transform lives."
              </p>
              <Link href="/alumni/stories/2" className="text-primary font-medium hover:text-primary/80">
                Read Full Story
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Link href="/alumni/stories" className="btn btn-outline">
              View All Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 