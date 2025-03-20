'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary" />,
      title: 'Our Location',
      details: 'NIT Agartala, Jirania, Tripura (W), India - 799046',
    },
    {
      icon: <FaPhone className="text-2xl text-primary" />,
      title: 'Phone Number',
      details: '+91 1234567890',
    },
    {
      icon: <FaEnvelope className="text-2xl text-primary" />,
      title: 'Email Address',
      details: 'wecan@nita.ac.in',
    },
    {
      icon: <FaClock className="text-2xl text-primary" />,
      title: 'Working Hours',
      details: 'Monday - Friday: 9:00 AM - 5:00 PM',
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Have questions or want to get involved? We'd love to hear from you. Reach out to us using any of the methods below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-custom text-center"
              >
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="mb-8 text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className={`block w-full px-4 py-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`block w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', {
                      required: 'Subject is required',
                    })}
                    className={`block w-full px-4 py-3 border ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    className={`block w-full px-4 py-3 border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Find Us</h2>
              <p className="mb-8 text-gray-600">
                Visit us at our office located at NIT Agartala campus.
              </p>
              
              <div className="h-[400px] bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
                <p className="text-gray-600">Map Placeholder</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  Connect with us on social media:
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-xl"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Find answers to commonly asked questions about WeCan and our activities.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold mb-3">How can I volunteer with WeCan?</h3>
              <p className="text-gray-600">
                You can volunteer by filling out the volunteer application form on our website or by contacting us directly. We welcome volunteers from all backgrounds who are passionate about education and empowering children.
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
              <h3 className="text-xl font-bold mb-3">What kind of donations do you accept?</h3>
              <p className="text-gray-600">
                We accept monetary donations through various payment methods, as well as in-kind donations such as books, stationery, educational materials, and computers. Please contact us for more information on how to make in-kind donations.
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
              <h3 className="text-xl font-bold mb-3">How are the funds utilized?</h3>
              <p className="text-gray-600">
                All funds are used to support our educational programs, provide learning materials, organize events like Ananya, and maintain our teaching centers. We maintain complete transparency in our financial operations and publish annual reports.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-custom"
            >
              <h3 className="text-xl font-bold mb-3">Can I visit your centers?</h3>
              <p className="text-gray-600">
                Yes, we welcome visitors who want to see our work firsthand. Please contact us in advance to schedule a visit to any of our educational centers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="bg-primary text-white p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
              Join us in our mission to empower underprivileged children through education. Together, we can create a brighter future for them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-primary hover:bg-white/90">
                Volunteer With Us
              </button>
              <button className="btn bg-secondary text-white hover:bg-secondary/90">
                Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
} 