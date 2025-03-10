'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGraduationCap, FaHandHoldingHeart, FaUsers, FaLightbulb, FaQuoteLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const values = [
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: 'Education',
      description: 'We believe education is the most powerful tool to change lives and create opportunities.',
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-primary" />,
      title: 'Compassion',
      description: 'We approach our work with empathy, understanding, and genuine care for those we serve.',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Community',
      description: 'We build strong relationships and work together to create lasting positive change.',
    },
    {
      icon: <FaLightbulb className="text-4xl text-primary" />,
      title: 'Innovation',
      description: 'We constantly seek creative solutions to address educational challenges effectively.',
    },
  ];

  const milestones = [
    {
      year: 2010,
      title: 'Foundation',
      description: 'WeCan was founded by a group of passionate students at NIT Agartala.',
    },
    {
      year: 2013,
      title: 'First Center',
      description: 'Established our first educational center serving 50 children.',
    },
    {
      year: 2015,
      title: 'Expansion',
      description: 'Expanded to three centers reaching over 200 children.',
    },
    {
      year: 2018,
      title: 'Ananya Festival',
      description: 'Launched our annual sports-cultural festival for underprivileged children.',
    },
    {
      year: 2020,
      title: 'Digital Initiative',
      description: 'Started digital literacy programs and launched the WeCan mobile app.',
    },
    {
      year: 2023,
      title: 'Milestone',
      description: 'Reached over 1000 children across multiple centers in Tripura.',
    },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WeCan</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Learn about our journey, mission, and the impact we're making in the lives of underprivileged children through education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-secondary mb-6"></div>
              <p className="mb-4">
                WeCan was founded in 2010 by a group of passionate students at NIT Agartala who recognized the educational disparities in surrounding communities. What began as weekend tutoring sessions for a handful of children has grown into a comprehensive educational support system for underprivileged children across multiple centers.
              </p>
              <p className="mb-4">
                Over the years, we've expanded our reach and impact, developing structured programs that not only focus on academic subjects but also on building confidence, creativity, and essential life skills. Our dedicated volunteers, many of whom are current students or alumni of NIT Agartala, are the backbone of our organization.
              </p>
              <p>
                Today, WeCan continues to grow, innovate, and adapt to meet the evolving needs of the children we serve, always guided by our core belief in the transformative power of education.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-600 font-medium">Our Story Image</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission & Vision</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-custom"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="mb-4">
                To empower underprivileged children through quality education, mentorship, and skill development, enabling them to break the cycle of poverty and build a brighter future for themselves and their communities.
              </p>
              <p>
                We strive to create equal learning opportunities, foster personal growth, and instill confidence in every child we reach, regardless of their socioeconomic background.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-custom"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="mb-4">
                A world where every child has access to quality education and the opportunity to realize their full potential, regardless of their socioeconomic status.
              </p>
              <p>
                We envision communities transformed through education, where children grow up to become confident, skilled, and compassionate individuals who contribute positively to society and inspire others to do the same.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              These core values guide our approach and define who we are as an organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Key milestones in our journey of making a difference.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10">
                    {milestone.year}
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-custom">
                      <h3 className="text-xl font-bold text-primary mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <FaQuoteLeft className="text-5xl text-white/30 mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              "WeCan has transformed not just the lives of the children we teach, but also our own. As volunteers, we've gained invaluable leadership skills, developed deeper empathy, and discovered the profound joy that comes from making a positive impact in someone's life."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div className="text-left">
                <p className="font-bold">Priya Sharma</p>
                <p className="text-white/80">Former President, WeCan (2019-2020)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
} 