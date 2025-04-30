'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTrophy, FaMusic, FaRunning, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Activity {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  images: string[];
  activities: Activity[];
}

interface Events {
  [key: number]: Event;
}

// Sample data for events (replace with actual data from API)
const years = [2023];

const events: Events = {
  2023: {
    title: 'Ananya 2023: Celebrating Dreams',
    date: 'September 16-18, 2023',
    location: 'NIT Agartala Campus',
    description: 'Ananya 2023 was our biggest festival yet, featuring a wide range of cultural performances, sports competitions, and educational activities for underprivileged children. Over 500 children from various centers participated in this three-day extravaganza.',
    highlights: [
      'Cultural performances by children',
      'Sports competitions including cricket, football, and athletics',
      'Art and craft exhibition',
      'Science fair with interactive exhibits',
      'Prize distribution ceremony with special guests',
    ],
    images: [
      '/images/placeholder.jpg',
      '/images/amanullah.jpeg',
      '/images/placeholder.jpg',
      '/images/placeholder.jpg',
      '/images/placeholder.jpg',
    ],
    activities: [
      {
        title: 'Cultural Performances',
        description: 'Children showcased their talents through dance, music, and theatrical performances.',
        icon: <FaMusic className="text-4xl text-primary" />,
      },
      {
        title: 'Sports Competitions',
        description: 'Various sports events including cricket, football, and athletics were organized.',
        icon: <FaRunning className="text-4xl text-primary" />,
      },
      {
        title: 'Art Exhibition',
        description: 'Children displayed their artistic creations in a special exhibition.',
        icon: <FaTrophy className="text-4xl text-primary" />,
      },
    ],
  },
//   2022: {
//     title: 'Ananya 2022: Igniting Potential',
//     date: 'November 18-20, 2022',
//     location: 'NIT Agartala Campus',
//     description: 'Ananya 2022 focused on discovering and nurturing the hidden talents of children. The festival included various competitions, workshops, and fun activities designed to boost confidence and creativity.',
//     highlights: [
//       'Talent hunt competition',
//       'Sports day with multiple events',
//       'Creative writing workshop',
//       'Dance and music performances',
//       'Educational games and activities',
//     ],
//     images: [
//       '/images/placeholder.jpg',
//       '/images/placeholder.jpg',
//       '/images/placeholder.jpg',
//     ],
//     activities: [
//       {
//         title: 'Talent Hunt',
//         description: 'A platform for children to showcase their unique talents and abilities.',
//         icon: <FaMusic className="text-4xl text-primary" />,
//       },
//       {
//         title: 'Sports Day',
//         description: 'A day filled with various sports activities and competitions.',
//         icon: <FaRunning className="text-4xl text-primary" />,
//       },
//       {
//         title: 'Creative Workshops',
//         description: 'Interactive workshops to enhance creativity and learning.',
//         icon: <FaTrophy className="text-4xl text-primary" />,
//       },
//     ],
//   },
//   // Add data for other years
//   2021: {
//     title: 'Ananya 2021: Virtual Celebration',
//     date: 'November 20-21, 2021',
//     location: 'Online Event',
//     description: 'Due to the pandemic, Ananya 2021 was held virtually, but the spirit remained unchanged. Children participated in online competitions, virtual performances, and interactive sessions.',
//     highlights: [],
//     images: [],
//     activities: [],
//   },
//   2020: {
//     title: 'Ananya 2020',
//     date: 'Cancelled due to COVID-19 pandemic',
//     location: 'N/A',
//     description: 'Unfortunately, Ananya 2020 had to be cancelled due to the COVID-19 pandemic and associated restrictions.',
//     highlights: [],
//     images: [],
//     activities: [],
//   },
//   2019: {
//     title: 'Ananya 2019: Unleashing Creativity',
//     date: 'November 15-17, 2019',
//     location: 'NIT Agartala Campus',
//     description: 'Ananya 2019 was a celebration of creativity and talent, featuring various cultural and sports events.',
//     highlights: [],
//     images: [],
//     activities: [],
//   },
};

export default function Ananya() {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const currentEvent = events[selectedYear];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ananya</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Our annual Techno-Cultural-Sports festival that celebrates the talents, creativity, and joy of the children we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Year Selection */}
      <section className="py-8 bg-background">
        <div className="container-custom">
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-md transition-colors ${
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
      </section>

      {/* Event Details */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{currentEvent.title}</h2>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {currentEvent.date && (
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary mr-2" />
                  <span>{currentEvent.date}</span>
                </div>
              )}
              {currentEvent.location && (
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-primary mr-2" />
                  <span>{currentEvent.location}</span>
                </div>
              )}
              {selectedYear !== 2020 && (
                <div className="flex items-center">
                  <FaUsers className="text-primary mr-2" />
                  <span>300+ Participants</span>
                </div>
              )}
            </div>
            
            <p className="text-lg text-center max-w-4xl mx-auto mb-8">
              {currentEvent.description}
            </p>

            {currentEvent.highlights && currentEvent.highlights.length > 0 && (
              <div className="bg-background p-6 rounded-lg max-w-2xl mx-auto mb-12">
                <h3 className="text-xl font-bold mb-4 text-center">Event Highlights</h3>
                <ul className="space-y-2">
                  {currentEvent.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-secondary mt-2 mr-3"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Image Gallery */}
          {currentEvent.images && currentEvent.images.length > 0 &&
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Gallery</h3>
              
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  className="pb-12"
                >
                  {currentEvent.images.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="h-64 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Ananya ${selectedYear} event image ${index + 1}`}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-md cursor-pointer">
                  <FaChevronLeft className="text-primary" />
                </div>
                <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-md cursor-pointer">
                  <FaChevronRight className="text-primary" />
                </div>
              </div>
            </motion.div>
          }

          {/* Activities */}
          {currentEvent.activities && currentEvent.activities.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Activities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentEvent.activities.map((activity: Activity, index: number) => (
                  <div key={index} className="bg-background p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4">{activity.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Upcoming Event CTA (only show for most recent year) */}
      {selectedYear === years[0] && (
        <section className="section bg-background">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-primary text-white rounded-lg p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Join Us for Ananya 2025</h2>
              <p className="max-w-3xl mx-auto mb-8">
                Planning is already underway for our next Ananya festival. Stay tuned for dates, activities, and how you can participate or volunteer.
              </p>
              <Link href="/ananya/register" className="btn bg-white text-primary hover:bg-white/90">
                Register Interest
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
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
            <h2 className="text-3xl font-bold mb-4">What Participants Say</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 rounded-lg"
            >
              <p className="mb-4 italic">
                "Ananya was the best day of my life! I got to perform on stage for the first time and won a prize for my drawing. I can't wait for next year's festival!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/naman.jpeg" alt="Naman" width={48} height={48} />
                </div>
                <div>
                  <p className="font-bold">Naman, 6</p>
                  <p className="text-sm text-gray-600">Participant</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background p-6 rounded-lg"
            >
              <p className="mb-4 italic">
                "Organizing Ananya was a rewarding experience. Seeing the joy on children's faces as they participated in various activities made all our hard work worthwhile."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/zaidsekhani.png" alt="Zaid " width={48} height={48} />
                </div>
                <div>
                  <p className="font-bold">Zaid Sekhani</p>
                  <p className="text-sm text-gray-600">Former President(2022-23)</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-6 rounded-lg"
            >
              <p className="mb-4 italic">
                "Ananya provides a wonderful platform for children to showcase their talents and build confidence. It's amazing to see how much they look forward to this annual event."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/images/directorsir.png" alt="S.k Patra " width={48} height={48} />
                </div>
                <div>
                  <p className="font-bold">PROF. S. K. PATRA</p>
                  <p className="text-sm text-gray-600">Director, NIT Agartala</p>
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