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
      image: '/',
      bio: 'Passionate about education and technology. Leading WeCan to reach more underprivileged children.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/mamanullah7/',
        email: 'ullahaman072003@gmail.com',
        instagram: 'https://instagram.com/m.amanullah7',
      },
    },
    {
      id: 2,
      name: 'Puchakayala Mounika',
      position: 'Vice President',
      department: 'Electronics and instrumentation engineering ',
      image: '/images/monica.jpg',
      bio: 'Dedicated to creating equal educational opportunities for all children.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/puchakayala-mownnica-215398269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        email: 'puchakayalamounika51@gmail.com',
        instagram: 'https://instagram.com/moondaise_19',
      },
    },
    {
      id: 3,
      name: 'Amir Alam',
      position: 'Vice President',
      department: 'Computer Science & Engineering',
      image: '/images/amirxn.jpeg',
      bio: 'Believes in the power of education to transform lives and communities.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/amir-alam-a58b28257/',
        email: 'amiralam8109@gmail.com',
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
        email: '',
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
      position: 'Alumni Relationship Coordinator',
      department: 'Computer Science & Engineering',
      image: '/images/keerthi2.jpeg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/',
        email: 'srigayatrikattamuri@gmail.com',
        instagram: 'https://instagram.com/keerthipriya_1712',
      },
    },
    {
      id: 8,
      name: 'Shreyam Kumar',
      position: 'Assistant General Secretary',
      department: 'IIIT CSE',
      image: '/images/shreyam.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/shreyam-kumar-754b2b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        email: 'kumarshreyam677@gmail.com',
        instagram: 'https://www.instagram.com/shre_yam012?igsh=MXB5djhmdWszdDZqZw==',
      },
    },
    {
      id: 9,
      name: 'Sudesh Singh',
      position: 'Assistant General Secretary',
      department: 'Biotechnology and Biochemical',
      image: '/images/sudesh.jpeg',
      socialLinks: {
        linkedin: 'http://linkedin.com/in/sudesh-singh-8099722a7',
        email: 'sudeshsingh42023@gmail.com',
        instagram: 'https://www.instagram.com/invites/contact/?igsh=h9vscaes0577&utm_content=cgiw83j',
      },
    },
    {
      id: 10,
      name: 'Rohan Anand',
      position: 'Curriculum Lead',
      department: 'Mechanical Engineering',
      image: '/images/rohan.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/rohan-anand-68a619302?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        email: 'rohananand409@gmail.com',
        instagram: 'https://www.instagram.com/rohan_06_05/',
      },
    },
    {
      id: 11,
      name: 'Manish',
      position: 'Management Lead',
      department: 'Electrical Engineering',
      image: '/images/manish.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/manish-1bb2b12b8',
        email: 'yadav31manish@gmail.com',
        instagram: 'https://www.instagram.com/yadavmanish031/',
      },
    },
    {
      id: 12,
      name: 'Srijita Das',
      position: 'Welfare Lead and Fundraising Coordinator',
      department: 'BSMS Chemistry',
      image: '/images/srijita.jpeg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/srijita-das-792b52299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        email: 'srijitadas568@gmail.com',
        instagram: 'https://www.instagram.com/srijita_das_08/profilecard/?igsh=MW4wb21ud25lbTlxeQ==',
      },
    },
    {
      id: 13,
      name: 'Chandan Kumar',
      position: 'Auditor',
      department: 'Electronics and Communication Engineering',
      image: '/images/chandan.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/chandan-kumar-75535629a',
        email: 'ck20181308@gmail.com',
        instagram: 'https://www.instagram.com/chandan_3638',
      },
    },
    {
      id: 14,
      name: 'Buddhadeb Das',
      position: 'Technical Lead & Social Media Lead',
      department: 'Production Engineering',
      image: '/images/budhdeb.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/buddhadeb-das-bagdi-80ab36255/',
        email: 'dasbuddhadeb809@gmail.com',
        instagram: 'https://www.instagram.com/buddha_deb_das_/',
      },
    },
    {
      id: 15,
      name: 'Ankita Paul',
      position: 'Social Media Lead',
      department: 'Electrical Engineering',
      image: '/images/ankita.jpg',
      socialLinks: {
        linkedin: 'www.linkedin.com/in/ankita-paul-8b9222297',
        email: 'paulankita378@gmail.com',
        instagram: 'https://www.instagram.com/ankita..?igsh=Y3NvN2xncDBqd3Vj',
      },
    },
    {
      id: 16,
      name: 'Aryan Raj',
      position: 'Volunteer',
      department: 'Production Engineering',
      image: '/images/aryan.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/aryan-raj-30443225b',
        email: 'ar493726@gmail.com',
        instagram: 'https://www.instagram.com/amphonerd?igsh=MWloNWs0bWV2OGhycg==',
      },
    },
    {
      id: 17,
      name: 'B Sushmitha',
      position: 'Volunteer',
      department: 'Electronics and Communication Engineering',
      image: '/images/sushmita.jpg',
      socialLinks: {
        linkedin: '',
        email: 'bsushmitha6106@gmail.com',
        instagram: '',
      },
    },
    {
      id: 18,
      name: 'Abdur Raheem Chowdhary',
      position: 'Proudly Volunteer',
      department: 'Engineering Physics',
      image: '/images/raheem.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/abdur-raheem-chowdhary',
        email: 'abdurraheemchowdhary@gmail.com',
        instagram: '',
      },
    },
    {
      id: 19,
      name: 'Ashmita Saha',
      position: 'Content Writer and Volunteer',
      department: 'Civil Engineering',
      image: '/images/ashmita.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ashmita-saha-7a3476286',
        email: 'iamashmitasaha@gmail.com',
        instagram: 'https://www.instagram.com/_.candeella._/profilecard/?igsh=bzFpd3RmcGRuN25h',
      },
    },
    {
      id: 20,
      name: 'Mohammad Sakib',
      position: 'Volunteer',
      department: 'Electrical Engineering',
      image: '/images/sakib.heic',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/mohammad-sakib-085972318',
        email: 'mohammadsakib00978@gmail.com',
        instagram: '',
      },
    },
    {
      id: 21,
      name: 'Rishi Ranjan Singh',
      position: 'Volunteer',
      department: 'CSE',
      image: '/images/rishi.png',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/rishi-ranjan-singh-a1899b314',
        email: 'rishiranjansingh2303@gmail.com',
        instagram: 'https://instagram.com/rishiranjansingh_',
      },
    },
    {
      id: 22,
      name: 'Saptadeep Deb',
      position: 'Volunteer',
      department: 'BSMS Physics',
      image: '/images/Saptadeep.jpg',
      socialLinks: {
        linkedin: '',
        email: 'debsaptadeep4@gmail.com',
        instagram: 'https://www.instagram.com/deb_saptadeep1517?igsh=MTA4NjRzbW80eWJ4ZQ==',
      },
    },
    {
      id: 23,
      name: 'Piyush Ranjan',
      position: 'Volunteer',
      department: 'Chemical Engineering',
      image: '/images/piyush.jpg',
      socialLinks: {
        linkedin: '',
        email: 'ranjanpiyush0700@gmail.com',
        instagram: '',
      },
    },
    {
      id: 24,
      name: 'Anwesha Pal',
      position: 'Volunteer',
      department: 'Electronics and Communication Engineering',
      image: '/images/anwesha.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/anwesha-pal-13698a25a',
        email: 'anweshapal615@gmail.com',
        instagram: 'https://www.instagram.com/anweeeeeesha?igsh=emFieWR6dmVrbmJ3',
      },
    },
    {
      id: 25,
      name: 'A.S. Sampath Raj',
      position: 'Volunteer',
      department: 'Electrical Engineering',
      image: '/images/sampath.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/sampath-arey-8bb830287',
        email: 'sampatharey27@gmail.com',
        instagram: 'https://www.instagram.com/invites/contact/?igsh=6xflsu7s3qyw&utm_content=mnph0sg',
      },
    },
    {
      id: 26,
      name: 'Anjali Gupta',
      position: 'Volunteer',
      department: 'Civil Engineering',
      image: '/images/anjali.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/anjali-gupta-207073306',
        email: 'guptanjali0904@gmail.com',
        instagram: 'https://www.instagram.com/anjjali_09?igsh=MTJwNGloenVjNWpuZg==',
      },
    },
    {
      id: 27,
      name: 'Satyendra',
      position: 'Volunteer',
      department: 'Production Engineering',
      image: '/images/satyendra.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/satyendra-shankar-241481362',
        email: 'satyendrashankar2005@gmail.com',
        instagram: 'https://www.instagram.com/_.satya_indra._?igsh=aTE3YmpvajRlY241',
      },
    },
    {
      id: 28,
      name: 'Puja Das',
      position: 'Volunteer',
      department: 'CSE',
      image: '/images/puja.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/puja-das-baa44a235',
        email: 'pujadas080907@gmail.com',
        instagram: 'https://www.instagram.com/__pujadas._?igsh=MTk2MTdraHhwc2swcQ==',
      },
    },
    {
      id: 29,
      name: 'Prajna Bal',
      position: 'Volunteer',
      department: 'Engineering Physics',
      image: '/images/prajna.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/prajna-bal-93a793231',
        email: 'prajnabal2006@gmail.com',
        instagram: 'https://www.instagram.com/prajna_2103?igsh=MTV5MGNqdGF5dHliZA==',
      },
    },
    {
      id: 30,
      name: 'Prasmit Anand',
      position: 'Volunteer',
      department: 'Mechanical Engineering',
      image: '/images/prasmit.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/prasmit-anand',
        email: 'prasmitanand@gmail.com',
        instagram: 'https://www.instagram.com/prasmit17a?igsh=MWRrcnRod3JtbTJqcw==',
      },
    },
    {
      id: 31,
      name: 'Khushi Kumari',
      position: 'Volunteer',
      department: 'Production',
      image: '/images/khusi.jpg',
      socialLinks: {
        linkedin: '',
        email: 'khushisujata5@gmail.com',
        instagram: '',
      },
    },
    {
      id: 32,
      name: 'Suraj Kumar',
      position: 'Volunteer',
      department: 'CSE',
      image: '/images/lucky.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/suraj-kumar-567b47315',
        email: 'codingfather24@gmail.com',
        instagram: '',
      },
    },
    {
      id: 33,
      name: 'Shivam Kumar',
      position: 'Volunteer',
      department: 'Electrical Engineering',
      image: '/images/shivam.jpeg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/shivam-kumar-09530b29a',
        email: 'shivamkumar6097@gmail.com',
        instagram: 'https://instagram.com/Shivam_01112',
      },
    },
    {
      id: 34,
      name: 'Shravan Kumar',
      position: 'General Secretary',
      department: 'Production Engineering',
      image: '/images/placeholder.jpg',
      socialLinks: {
        linkedin: '',
        email: '',
        instagram: '',
      },
    },
    {
      id: 35,
      name: 'Aadarsh Munna',
      position: 'Public Relation Lead',
      department: 'Computer Science & Engineering',
      image: '/images/placeholder.jpg',
      socialLinks: {
        linkedin: '',
        email: '',
        instagram: '',
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