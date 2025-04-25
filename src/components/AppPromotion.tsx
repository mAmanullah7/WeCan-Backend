'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGooglePlay, FaApple, FaMobile, FaBell, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const AppPromotion = () => {
  const features = [
    {
      icon: <FaBell className="text-3xl text-primary" />,
      title: 'Event Notifications',
      description: 'Get notified about upcoming events, volunteer opportunities, and important announcements.',
    },
    {
      icon: <FaUsers className="text-3xl text-primary" />,
      title: 'Volunteer Management',
      description: 'Easily sign up for volunteer shifts and track your volunteer hours, schedules & attendance.',
    },
    {
      icon: <FaCalendarAlt className="text-3xl text-primary" />,
      title: 'Event Calendar',
      description: 'Access a complete calendar of WeCan events and activities, Student learning historty managment.',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <FaMobile className="text-3xl text-secondary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">WeCan Mobile App</h2>
            </div>
            <p className="text-lg mb-8">
              Stay connected with WeCan and make a bigger impact with our mobile app. 
              Download now to access exclusive features and stay updated on all our activities.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="mt-1 mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#" className="btn bg-black text-white hover:bg-black/90 flex items-center justify-center gap-2">
                <FaApple className="text-xl" /> App Store 
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.nita.wecan" className="btn bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2">
                <FaGooglePlay className="text-xl" /> Google Play
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs mx-auto">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-secondary/20 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary/20 rounded-full -z-10"></div>
              <div className="bg-gray-200 w-[250px] aspect-[9/19.5] rounded-3xl shadow-xl overflow-hidden mx-auto">
                <img 
                  src="/images/app.png" 
                  alt="WeCan Mobile App Screenshot" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion; 