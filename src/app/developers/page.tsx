'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGithub, FaSearch } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

// Define types for developers
type SocialLinks = {
  linkedin: string;
  email: string;
  github: string;
};

type Developer = {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  socialLinks: SocialLinks;
};

type DevelopersByTeam = {
  [key: string]: Developer[];
};

// Sample data for developers (replace with actual data)
const teams = ['Web Development', 'App Development'];

const developers: DevelopersByTeam = {
  'Web Development': [
    {
      id: 1,
      name: 'Mohammad Amanullah',
      role: 'Lead Developer',
      department: 'Chemical Engineering',
      image: '/images/amanullah.jpg',
      bio: 'Former WeCan President & Full-stack developer passionate about creating impactful web applications.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/mamanullah7/',
        email: 'ullahaman072003@gmail.com',
        github: 'https://github.com/mamanullah7',
      },
    },
    {
      id: 2,
      name: 'Amir Alam',
      role: 'Frontend Developer',
      department: 'Computer Science & Engineering',
      image: '/images/amirxn.jpeg',
      bio: 'Former WeCan Vice-President & Frontend developer with expertise in React and Next.js.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/amir-alam-a58b28257/',
        email: 'amiralam8109@gmail.com',
        github: 'https://github.com/amiralam198',
      },
    },
    {
      id: 3,
      name: 'Talib Hussain ',
      role: 'Frontend Developer',
      department: 'Computer Science & Engineering',
      image: '/images/talib.jpeg',
      bio: 'Former WeCan Volunteer & Frontend developer with expertise in React and Next.js.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/hussainstalib/',
        email: 'hussaintalib12386@gmail.com',
        github: 'https://github.com/talib007-56'  ,
      },
    },
  ],
  'App Development': [
    {
      id: 3,
      name: 'Suraj Verma',
      role: 'Mentor',
      department: 'Civil Engineering',
      image: '/images/suraj.jpeg',
      bio: 'Former Developers & Coders Club Mobile App Developemt Lead & Mobile app developer specializing in Kotlin and GoLang.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/thesurajsite/',
        email: 'thesurajsite@gmail.com',
        github: 'https://github.com/thesurajsite',
      },
    },
    {
      id: 4,
      name: 'Ankita Paul',
      role: 'Lead Developer',
      department: 'Electrical Engineering',
      image: '/images/ankita.jpg',
      bio: 'Former Developers & Coders Club Mobile App Developemt Member, WeCan Social Media Lead & Mobile app developer specializing in Flutter.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ankita-paul-8b9222297/',
        email: 'paulankita378@gmail.com',
        github: 'https://github.com/ankitapaul74',
      },
    },
    {
      id: 5,
      name: 'Keerthi Priya',
      role: 'WeCan Page Maintaine',
      department: 'Computer Science & Engineering',
      image: '/images/keerthi2.jpeg',
      bio: 'Former WeCan Alumni Relations Coordinator and a passionate CS with a strong foundation in software development and community engagement.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/keerthi-priya-katta-17439830b/',
        email: 'keerthipriya1201@gmail.com',
        github: 'https://github.com/Keerthi1712k',
      },
    },
  ],
};

export default function Developers() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredDevelopers = developers[selectedTeam]?.filter((developer: Developer) =>
    developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.department.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Developers</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Meet the talented developers behind WeCan's web and mobile applications. These skilled individuals bring our vision to life through technology.
            </p>
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
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Development Teams</h2>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search developers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                {/* Team Filter */}
                <div className="flex space-x-2 overflow-x-auto pb-2 w-full sm:w-auto">
                  {teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedTeam === team
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Developers Grid */}
            {filteredDevelopers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDevelopers.map((developer, index) => (
                  <motion.div
                    key={developer.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-custom group"
                  >
                    <div className="h-64 bg-gray-300 relative">
                      <img
                        src={developer.image}
                        alt={`${developer.name} - ${developer.role}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {developer.socialLinks.linkedin && (
                            <a
                              href={developer.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${developer.name}'s LinkedIn profile`}
                            >
                              <FaLinkedin size={24} />
                            </a>
                          )}
                          {developer.socialLinks.email && (
                            <a
                              href={`mailto:${developer.socialLinks.email}`}
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`Email ${developer.name}`}
                            >
                              <FaEnvelope size={24} />
                            </a>
                          )}
                          {developer.socialLinks.github && (
                            <a
                              href={developer.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary transition-colors"
                              aria-label={`${developer.name}'s GitHub profile`}
                            >
                              <FaGithub size={24} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{developer.name}</h3>
                      <p className="text-primary font-medium mb-2">{developer.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{developer.department}</p>
                      <p className="text-gray-700">{developer.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No developers found for the selected team.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Check out our open-source projects and contribute to our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Web Application</h3>
              <p className="mb-4">
                The official WeCan website built with Next.js, TypeScript, and Tailwind CSS.
              </p>
              <div className="space-y-4">
                <a
                  href="https://github.com/WeCanNita25/WeCan-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  <FaGithub className="mr-2" />
                  View on GitHub
                </a>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Contribution Guidelines:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Fork the repository</li>
                    <li>Create a new branch for your feature</li>
                    <li>Make your changes and commit them</li>
                    <li>Push to your fork and create a Pull Request</li>
                    <li>Ensure your PR follows our coding standards</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Mobile Application</h3>
              <p className="mb-4">
                The WeCan mobile app built with Flutter for Android.
              </p>
              <div className="space-y-4">
                <a
                  href="https://github.com/WeCanNita25/WeCanAndroid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  <FaGithub className="mr-2" />
                  View on GitHub
                </a>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Contribution Guidelines:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Fork the repository</li>
                    <li>Create a new branch for your feature</li>
                    <li>Make your changes and commit them</li>
                    <li>Push to your fork and create a Pull Request</li>
                    <li>Ensure your PR follows our coding standards</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Organization GitHub Link */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">WeCan Organization</h3>
            <p className="mb-6">
              Visit our GitHub organization to explore all our projects and get involved.
            </p>
            <a
              href="https://github.com/WeCanNita25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              <FaGithub className="mr-2" size={24} />
              Visit WeCan Organization
            </a>
          </motion.div>

          {/* Pull Request Guidelines */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-background p-8 rounded-lg shadow-custom"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Pull Request Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Before Creating a PR:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Ensure your code follows our style guide</li>
                  <li>Write clear commit messages</li>
                  <li>Update documentation if necessary</li>
                  <li>Test your changes thoroughly</li>
                  <li>Resolve any merge conflicts</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">PR Requirements:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Clear description of changes</li>
                  <li>Reference to related issues</li>
                  <li>Screenshots for UI changes</li>
                  <li>Passing all tests</li>
                  <li>Code review approval</li>
                </ul>
              </div>
            </div>
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
                <h2 className="text-3xl font-bold mb-4">Join Our Development Team</h2>
                <p className="mb-6">
                  Are you passionate about technology and want to make a difference? Join our development team and help us build innovative solutions for education.
                </p>
                <a href="mailto:developer.wecan.nita@gmail.com" className="inline-block">
                  <button className="btn bg-white text-primary hover:bg-white/90">
                    Contact Us
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
                    "/images/Amanullah4.jpg",
                    "/images/amirxn.jpeg",
                    "/images/talib.jpeg",
                    "/images/suraj.jpeg",
                    "/images/ankita.jpg",
                    "/images/keerthi2.jpeg"
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