'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaStar, FaHeart, FaClock } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FormData = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience: string;
  motivation: string;
};

export default function VolunteerRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          dateOfBirth: new Date(data.dateOfBirth),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully! We will review it and get back to you soon.');
      router.push('/volunteers');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="pt-32 pb-20 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-custom p-8">
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Volunteer Application</h1>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below to apply as a volunteer with WeCan. Your application will be reviewed by our team.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="+1 (555) 555-5555"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        id="dateOfBirth"
                        type="date"
                        {...register('dateOfBirth', { required: 'Date of birth is required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Skills and Interests */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Skills and Interests</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Skills <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaStar className="text-gray-400" />
                      </div>
                      <input
                        id="skills"
                        type="text"
                        {...register('skills', { required: 'Skills are required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.skills ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="Teaching, Public Speaking, Leadership"
                      />
                    </div>
                    {errors.skills && (
                      <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                      Interests <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaHeart className="text-gray-400" />
                      </div>
                      <input
                        id="interests"
                        type="text"
                        {...register('interests', { required: 'Interests are required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.interests ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="Education, Environment, Community Service"
                      />
                    </div>
                    {errors.interests && (
                      <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Availability and Experience */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Availability and Experience</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        id="availability"
                        type="text"
                        {...register('availability', { required: 'Availability is required' })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.availability ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="Weekends, Evenings, Flexible"
                      />
                    </div>
                    {errors.availability && (
                      <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Volunteer Experience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="experience"
                      rows={4}
                      {...register('experience', { required: 'Experience is required' })}
                      className={`block w-full px-3 py-2 border ${
                        errors.experience ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                      placeholder="Describe your previous volunteer experience..."
                    ></textarea>
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                      Motivation for Volunteering <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      rows={4}
                      {...register('motivation', { required: 'Motivation is required' })}
                      className={`block w-full px-3 py-2 border ${
                        errors.motivation ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                      placeholder="Why do you want to volunteer with WeCan?"
                    ></textarea>
                    {errors.motivation && (
                      <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-primary hover:text-primary/80">Terms and Conditions</a> and <a href="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</a>
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 