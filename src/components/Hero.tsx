'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaHandsHelping, FaGraduationCap, FaHeart, FaUsers } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-black text-white overflow-hidden">
      {/* Background overlay with pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="relative h-40 w-40">
                <Image 
                  src="/logo.png" 
                  alt="WeCan Logo" 
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-wecan-blue">Live</span> {" "}
              <span className="text-wecan-yellow">Learn</span> {" "}
              <span className="text-wecan-green">Lead</span> {" "}
              <span className="text-wecan-red">Laugh</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl mx-auto lg:mx-0">
              WeCan is a social welfare club of NIT Agartala, dedicated to creating equal learning opportunities for underprivileged children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/about" className="btn bg-primary text-white hover:bg-primary-dark flex items-center justify-center gap-2">
                Learn More <FaArrowRight />
              </Link>
              <Link href="/donate" className="btn bg-secondary hover:bg-secondary/90 flex items-center justify-center gap-2">
                Donate Now
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 backdrop-blur-sm p-6 rounded-lg">
                <FaHandsHelping className="text-primary text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
                <p className="text-sm text-white/80">Join our team of dedicated volunteers and make a difference in children's lives.</p>
              </div>
              <div className="bg-secondary/10 backdrop-blur-sm p-6 rounded-lg">
                <FaGraduationCap className="text-secondary text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Educate</h3>
                <p className="text-sm text-white/80">Help us provide quality education to underprivileged children.</p>
              </div>
              <div className="bg-accent/10 backdrop-blur-sm p-6 rounded-lg">
                <FaHeart className="text-accent text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Donate</h3>
                <p className="text-sm text-white/80">Your contributions help us reach more children in need.</p>
              </div>
              <div className="bg-danger/10 backdrop-blur-sm p-6 rounded-lg">
                <FaUsers className="text-danger text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-sm text-white/80">Be part of a growing community focused on social welfare.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 