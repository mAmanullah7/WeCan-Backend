'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaInstagram, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

// Define types for team members
type SocialLinks = {
  linkedin: string;
  email: string;
  instagram: string;
};

type TeamMember = {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  bio?: string;
  socialLinks: SocialLinks;
};

type TeamMembersByYear = {
  [key: number]: TeamMember[];
};

// Sample data for volunteers (replace with actual data from API)
const years = [2025, 2024, 2023, 2022, 2021, 2020];

const teamMembers: TeamMembersByYear = {
  2025: [
    {
      id: 1,
      name: 'Mohammad Amanullah',
      position: 'President',
      department: 'Chemical Engineering',
      image: '/images/Amanullah4.jpg',
      bio: 'Passionate about education and technology. Leading WeCan to reach more underprivileged children.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/mamanullah7/',
        email: 'ullahaman072003@gmail.com',
        instagram: 'https://instagram.com/m.amanullah7',
      },
    },
    {
      id: 2,
      name: 'Monica ',
      position: 'Vice President',
      department: 'Electrical Engineering',
      image: '/images/placeholder.jpg',
      bio: 'Dedicated to creating equal educational opportunities for all children.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        email: 'example@gmail.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 3,
      name: 'Amir Alam',
      position: 'Vice President',
      department: 'Computer Science & Engineering',
      image: '/images/amir.png',
      bio: 'Believes in the power of education to transform lives and communities.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/amir-alam-a58b28257/',
        email:     'amiralam8109@gmail.com',
        instagram: 'https://www.instagram.com/amirahmad491/',
      },
    },
    {
      id: 4,
      name: 'Tushar Tanish',
      position: 'Finance Lead',
      department: 'Computer Science & Engineering',
      image: '/images/tushar.jpg',
      bio: 'Committed to managing resources efficiently to maximize our impact.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/tushar-tanish-03934826a/',
        email: 'tushartanish10@gmail.com',
        instagram: 'https://www.instagram.com/tushartanish1_/',
      },
    },
    {
      id: 5,
      name: 'Tania Dhul',
      position: '3rd Year Coordinator',
      department: 'Electronics Engineering',
      image: '/images/placeholder.jpg',
      bio: 'Organizing impactful events that bring joy and learning to children.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        email: 'example@gmail.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 6,
      name: 'Kattamuri Sri Gayatri',
      position: 'General Secretary',
      department: 'Computer Science & Engineering',
      image: '/images/gayatri.jpg',
      bio: 'Building partnerships to expand our reach and impact in the community.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/sri-gayatri-kattamuri-a2418731b',
        email: 'srigayatrikattamuri@gmail.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 7,
      name: 'Keerthi Priya',
      position: 'General Secretary',
      department: 'Computer Science & Engineering',
      image: '/images/.jpg',
      // bio: 'Building partnerships to expand our reach and impact in the community.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/',
        email: 'srigayatrikattamuri@gmail.com',
        instagram: 'https://instagram.com',
      },
    },
  ],
  // 2022: [
  //   {
  //     id: 7,
  //     name: 'Arjun Mehta',
  //     position: 'President',
  //     department: 'Computer Science',
  //     image: '/images/placeholder.jpg',
  //     bio: 'Led WeCan through a year of significant growth and impact.',
  //     socialLinks: {
  //       linkedin: 'https://linkedin.com',
  //       email: 'example@gmail.com',
  //       instagram: 'https://instagram.com',
  //     },
  //   },
  //   {
  //     id: 8,
  //     name: 'Sneha Joshi',
  //     position: 'Vice President',
  //     department: 'Electrical Engineering',
  //     image: '/images/placeholder.jpg',
  //     bio: 'Focused on developing innovative teaching methodologies for our centers.',
  //     socialLinks: {
  //       linkedin: 'https://linkedin.com',
  //       email: 'example@gmail.com',
  //       instagram: 'https://instagram.com',
  //     },
  //   },
  //   // Add more team members for 2022
  // ],
  // Add data for other years
  2021: [],
  2020: [],
  2019: [],
  2018: [],
};

export default function Volunteers() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleApplyClick = () => {
    router.push('/volunteers/register');
  };

  const filteredTeamMembers = teamMembers[selectedYear]?.filter((member: TeamMember) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Volunteers</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Meet the dedicated team of volunteers who make our mission possible. These passionate individuals are the backbone of WeCan.
            </p>
            <div className="mt-8">
              <button
                onClick={handleApplyClick}
                className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Apply to Volunteers
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Our Team</h2>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search volunteers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                {/* Year Filter */}
                <div className="flex space-x-2 overflow-x-auto pb-2 w-full sm:w-auto">
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

            {/* Team Members Grid */}
            {filteredTeamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTeamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-custom group"
                  >
                    <div className="h-64 bg-gray-300 relative">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.position}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {member.socialLinks.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${member.name}'s LinkedIn profile`}
                            >
                              <FaLinkedin size={24} />
                            </a>
                          )}
                          {member.socialLinks.email && (
                            <a
                              href={`mailto:${member.socialLinks.email}`}
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <FaEnvelope size={24} />
                            </a>
                          )}
                          {member.socialLinks.instagram && (
                            <a
                              href={member.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${member.name}'s Instagram profile`}
                            >
                              <FaInstagram size={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.position}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                      <p className="text-gray-700">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No team members found for the selected criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
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
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="mb-6">
                  Become a part of our mission to empower underprivileged children through education. As a volunteer, you'll not only make a difference in children's lives but also develop valuable skills and create lasting memories.
                </p>
                <button 
                  onClick={handleApplyClick}
                  className="btn bg-white text-primary hover:bg-white/90"
                >
                  Apply to Volunteer
                </button>
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
                    "/images/wecanteam.jpeg",
                    "/images/ChildrenReading.png",
                    "/images/cultural1.jpeg"
                  ]}
                  autoplayInterval={4000}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Benefits Section */}
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
            <h2 className="text-3xl font-bold mb-4">Benefits of Volunteering</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Volunteering with WeCan is a rewarding experience that offers numerous benefits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Personal Growth</h3>
              <p>
                Develop leadership, communication, and problem-solving skills while making a meaningful impact in children's lives.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Community Connection</h3>
              <p>
                Build relationships with like-minded individuals and become part of a community dedicated to positive change.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Lasting Impact</h3>
              <p>
                Create a lasting positive impact on children's lives and contribute to building a better, more educated society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 