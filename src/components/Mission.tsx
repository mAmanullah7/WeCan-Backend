'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaHandHoldingHeart, FaUsers, FaLightbulb } from 'react-icons/fa';

const Mission = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: 'Quality Education',
      description: 'We provide quality education in essential subjects like English, math, and science to underprivileged children.',
      color: 'bg-primary/10',
      border: 'border-l-4 border-primary',
    },
    {
      icon: <FaLightbulb className="text-4xl text-secondary" />,
      title: 'Skill Development',
      description: 'We focus on developing important life skills that build confidence and encourage personal growth.',
      color: 'bg-secondary/10',
      border: 'border-l-4 border-secondary',
    },
    {
      icon: <FaUsers className="text-4xl text-accent" />,
      title: 'Community Building',
      description: 'We build strong communities by fostering education and personal growth among underprivileged children.',
      color: 'bg-accent/10',
      border: 'border-l-4 border-accent',
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-danger" />,
      title: 'Empowerment',
      description: 'We empower young minds to dream bigger, reach higher, and create a brighter future for themselves.',
      color: 'bg-danger/10',
      border: 'border-l-4 border-danger',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg">
            At WeCan, we believe in the power of education to change lives and uplift communities. 
            Our mission is to create equal learning opportunities for underprivileged children and 
            empower them to build a better future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              variants={fadeIn}
              className={`${feature.color} ${feature.border} p-6 rounded-lg shadow-custom text-center hover:shadow-lg transition-shadow`}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeIn}
          className="mt-16 bg-black text-white p-8 md:p-12 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-wecan-blue">Live</span> {" "}
                <span className="text-wecan-yellow">Learn</span> {" "}
                <span className="text-wecan-green">Lead</span> {" "}
                <span className="text-wecan-red">Laugh</span>
              </h3>
              <p className="mb-6">
                Together, WeCan change lives, shape futures, and bring hope to where it's needed most. 
                Your support can help us reach more children and make a bigger impact.
              </p>
              <a href="/contact" >
              <button className="btn bg-primary text-white hover:bg-primary-dark">
                Get Involved
              </button>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm">Children Supported</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm">Active Volunteers</div>
                </div>
                <div className="bg-accent/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">10+</div>
                  <div className="text-sm">Educational Programs</div>
                </div>
                <div className="bg-danger/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-danger mb-2">12+</div>
                  <div className="text-sm">Years of Impact</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission; 