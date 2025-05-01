'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGraduationCap, FaHandHoldingHeart, FaUsers, FaLightbulb, FaQuoteLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';



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
      year: 2013,
      title: 'Foundation',
      description: 'WeCan was founded by a group of passionate students at NIT Agartala.',
    },
    {
      year: 2015,
      title: 'First Center',
      description: 'Established our first educational center serving 50 children.',
    },
    {
      year: 2017,
      title: 'Expansion',
      description: 'Expandeded centers reaching over 100 children.',
    },
    {
      year: 2018,
      title: 'Ananya Festival',
      description: 'Launched our annual sports-cultural festival for underprivileged children.',
    },
    {
      year: 2023,
      title: 'Milestone Ananya6.0',
      description: 'Biggest Ananya Festival with more than 300 Children partipiated incliding Kendriya Vidyalaya NIT Agartala.',
    },
    {
      year: 2025,
      title: 'Digital Initiative',
      description: 'Started digital literacy programs and launched the WeCan mobile app.',
    }
   
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
            WeCan was founded in 2013 by a group of passionate students at NIT Agartala who recognized the educational disparities in surrounding communities. What began as weekend tutoring sessions for a handful of children has grown into a comprehensive educational support system for underprivileged children across multiple centers.
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
          <ImageCarousel 
            images={[
          "/images/ourstory.jpeg",
          "/images/ourstory1.jpeg",
          "/images/ourstory2.jpeg",
          "/images/ourstory.png",
          "/images/02.jpg",
          "/images/03.jpg",
          "/images/04.jpg",
          "/images/05.jpg",
          "/images/06.jpg",
          "/images/ourstory.jpg",
          "/images/ourstory.jpeg",

          
            ]}
          />
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
            To empower underprivileged children through quality education, mentorship, and skill development, enabling them to break the cycle of poverty.
          </p>
          <p className="mb-4">
            We provide comprehensive development through technology education, computer skills, sports, dance, cultural activities, and arts to ensure holistic growth.
          </p>
          <p>
            We strive to create equal learning opportunities, prepare students for admission to quality institutions like KV NIT Agartala, Ramakrishna Mission, Sainik School, and support them through 10th, 12th grades and competitive exams like JEE.
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
          <p className="mb-4">
            We envision digitally literate communities where children are equipped with both academic knowledge and technical skills to thrive in a technology-driven world.
          </p>
          <p>
            We aspire to create pathways to prestigious educational institutions, cultivating graduates who excel academically while being well-rounded in sports, arts, and cultural activities—becoming confident, skilled individuals who positively transform their communities.
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Messages</h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-10"></div>
          </motion.div>
          
          {/* Testimonials Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Director's Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 p-8 rounded-lg"
        >
          <FaQuoteLeft className="text-4xl text-white/30 mb-4" />
          <p className="text-lg font-light mb-6">
            "I am proud to see the impact WeCan is making in our community. The initiative demonstrates how our institution's values extend beyond academic excellence to social responsibility and community service."
          </p>
          <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src="/images/directorsir.png" alt="Sujoy " width={48} height={48} />
            </div>
            <div className="text-left">
          <p className="font-bold">Prof. S. K. Patra</p>
          <p className="text-white/80">Director, NIT Agartala</p>
            </div>
          </div>
        </motion.div>

        {/* Dean's Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 p-8 rounded-lg"
        >
          <FaQuoteLeft className="text-4xl text-white/30 mb-4" />
          <p className="text-lg font-light mb-6">
            "WeCan exemplifies how student initiatives can create meaningful change. The dedication shown by our students in nurturing young minds from underprivileged backgrounds is truly commendable."
          </p>
          <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src="/images/Johnsir.png" alt="Sujoy " width={48} height={48} />
            </div>
            <div className="text-left">
          <p className="font-bold">Prof. John Deb Barma</p>
          <p className="text-white/80">Dean of Student Welfare, NIT Agartala</p>
            </div>
          </div>
        </motion.div>

        {/* Faculty Coordinator's Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 p-8 rounded-lg"
        >
          <FaQuoteLeft className="text-4xl text-white/30 mb-4" />
          <p className="text-lg font-light mb-6">
            "Working closely with these dedicated students has been inspiring. WeCan not only transforms the lives of children but also develops leadership and compassion within our student volunteers."
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src="/images/facultyCordinator.png" alt="Sujoy " width={48} height={48} />
            </div>
            <div className="text-left">
          <p className="font-bold">Dr. Sujoy Chakraborty</p>
          <p className="text-white/80">Faculty Coordinator, WeCan</p>
            </div>
          </div>
        </motion.div>

        {/* President's Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 p-8 rounded-lg"
        >
          <FaQuoteLeft className="text-4xl text-white/30 mb-4" />
          <p className="text-lg font-light mb-6">
            "WeCan has transformed not just the lives of the children we teach, but also our own. As volunteers, we've gained invaluable leadership skills, developed deeper empathy, and discovered the profound joy that comes from making a positive impact."
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src="/images/amanullah.jpeg" alt="Aman" width={48} height={48} />
            </div>
            <div className="text-left">
          <p className="font-bold">Mohammad Amanullah</p>
          <p className="text-white/80">Former President, WeCan (2024-2025)</p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 