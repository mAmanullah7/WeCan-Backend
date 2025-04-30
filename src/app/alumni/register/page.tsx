'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaGraduationCap, FaBriefcase, FaBuilding, FaLinkedin, FaTwitter, FaInstagram, FaImage } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';

type FormData = {
  name: string;
  email: string;
  graduationYear: number;
  batch: string;
  position: string;
  currentOrganization: string;
  bio: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  profilePicture: FileList;
};

export default function AlumniRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      graduationYear: new Date().getFullYear(),
    }
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  
  // Get the current value of the bio field for character count
  const bioValue = watch('bio', '');
  const profilePicture = watch('profilePicture');

  // Handle image preview
  useEffect(() => {
    if (profilePicture && profilePicture.length > 0) {
      const file = profilePicture[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [profilePicture]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('graduationYear', data.graduationYear.toString());
      formData.append('batch', data.batch);
      formData.append('position', data.position);
      formData.append('currentOrganization', data.currentOrganization);
      formData.append('bio', data.bio);
      formData.append('socialLinks', JSON.stringify({
        linkedin: data.linkedin,
        twitter: data.twitter,
        instagram: data.instagram,
      }));
      
      if (data.profilePicture && data.profilePicture.length > 0) {
        formData.append('profilePicture', data.profilePicture[0]);
      }

      const response = await fetch('/api/alumni', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit registration');
      }

      toast.success('Registration submitted successfully! Your profile will be reviewed by an admin.');
      router.push('/alumni');
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit registration');
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
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Alumni Registration</h1>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below to register as an alumni of WeCan. Your profile will be reviewed by an admin before being published.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Profile Picture</h2>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FaImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      {...register('profilePicture')}
                      className="hidden"
                      id="profilePicture"
                    />
                    <label
                      htmlFor="profilePicture"
                      className="btn bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    >
                      Choose Image
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Recommended size: 500x500 pixels. Max file size: 2MB
                  </p>
                </div>
              </div>

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
                        {...register('name', {
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                          },
                        })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="Amanullah"
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
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
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
                </div>
              </div>
              
              {/* Education & Career */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Education & Career</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaGraduationCap className="text-gray-400" />
                      </div>
                      <select
                        id="graduationYear"
                        {...register('graduationYear', {
                          required: 'Graduation year is required',
                        })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                      >
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {errors.graduationYear && (
                      <p className="mt-1 text-sm text-red-600">{errors.graduationYear.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
                      Batch <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaGraduationCap className="text-gray-400" />
                      </div>
                      <input
                        id="batch"
                        type="text"
                        {...register('batch', {
                          required: 'Batch is required',
                        })}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          errors.batch ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                        placeholder="e.g., 2016-2020"
                      />
                    </div>
                    {errors.batch && (
                      <p className="mt-1 text-sm text-red-600">{errors.batch.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Position
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBriefcase className="text-gray-400" />
                      </div>
                      <input
                        id="position"
                        type="text"
                        {...register('position')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="currentOrganization" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBuilding className="text-gray-400" />
                      </div>
                      <input
                        id="currentOrganization"
                        type="text"
                        {...register('currentOrganization')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="e.g., Google"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Bio</h2>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about yourself and your experience with WeCan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bio"
                    rows={5}
                    {...register('bio', {
                      required: 'Bio is required',
                      minLength: {
                        value: 10,
                        message: 'Bio must be at least 10 characters',
                      },
                      maxLength: {
                        value: 1000,
                        message: 'Bio cannot exceed 1000 characters',
                      },
                    })}
                    className={`block w-full px-3 py-2 border ${
                      errors.bio ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                    placeholder="Share your journey with WeCan, your role, memorable experiences, and how it has influenced your personal and professional life."
                  ></textarea>
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {bioValue.length}/1000 characters
                  </p>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Social Media (Optional)</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLinkedin className="text-gray-400" />
                      </div>
                      <input
                        id="linkedin"
                        type="url"
                        {...register('linkedin')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaTwitter className="text-gray-400" />
                      </div>
                      <input
                        id="twitter"
                        type="url"
                        {...register('twitter')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaInstagram className="text-gray-400" />
                      </div>
                      <input
                        id="instagram"
                        type="url"
                        {...register('instagram')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
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
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
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