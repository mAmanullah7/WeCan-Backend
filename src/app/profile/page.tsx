'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaEdit, FaKey, FaEye, FaEyeSlash, FaLinkedin, FaTwitter, FaInstagram, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

type ProfileFormData = {
  name: string;
  email: string;
  bio: string;
  linkedin: string;
  twitter: string;
  instagram: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }
  
  // Sample user data (replace with actual data from session)
  const userData = {
    name: session?.user?.name || 'User',
    email: session?.user?.email || 'user@example.com',
    bio: 'Active volunteer at WeCan since 2020. Passionate about education and social welfare.',
    role: session?.user?.role || 'user',
    profilePicture: session?.user?.image || '/images/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
    },
  };
  
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      linkedin: userData.socialLinks.linkedin,
      twitter: userData.socialLinks.twitter,
      instagram: userData.socialLinks.instagram,
    },
  });
  
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm<PasswordFormData>();
  
  const newPassword = watch('newPassword');
  
  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile data:', data);
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again later.');
    }
  };
  
  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Password data:', data);
      toast.success('Password updated successfully!');
      resetPassword();
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password. Please try again later.');
    }
  };
  
  const cancelProfileEdit = () => {
    resetProfile();
    setIsEditingProfile(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Create a FileReader to read the file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
      setIsUploading(false);
      toast.success('Profile picture updated successfully!');
      
      // Here you would typically upload the image to your server/cloud storage
      // and update the user's profile in the database
      console.log('Profile picture updated:', file.name);
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error('Failed to read the file');
    };
    reader.readAsDataURL(file);
  };

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="pt-32 pb-20 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-custom overflow-hidden">
              {/* Profile Header */}
              <div className="bg-black text-white p-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div 
                    className="relative w-24 h-24 bg-gray-300 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center overflow-hidden cursor-pointer group"
                    onClick={handleProfilePictureClick}
                  >
                    {profileImage ? (
                      <Image 
                        src={profileImage} 
                        alt="Profile" 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <FaUser className="text-4xl text-gray-500" />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaCamera className="text-white text-xl" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      aria-label="Upload profile picture"
                      onChange={handleFileChange}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-white/80">{userData.email}</p>
                    <p className="mt-1 inline-block px-3 py-1 bg-primary rounded-full text-sm">
                      {userData.role === 'admin' ? 'Administrator' : userData.role === 'alumni' ? 'Alumni' : 'Volunteer'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-auto mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-md hover:bg-danger/90 transition-colors"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'profile'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'security'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Security
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Profile Information</h2>
                      {!isEditingProfile && (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="flex items-center text-primary hover:text-primary/80"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                      )}
                    </div>
                    
                    {isEditingProfile ? (
                      <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              {...registerProfile('name', {
                                required: 'Name is required',
                                minLength: {
                                  value: 2,
                                  message: 'Name must be at least 2 characters',
                                },
                              })}
                              className={`block w-full px-4 py-2 border ${
                                profileErrors.name ? 'border-red-500' : 'border-gray-300'
                              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                            />
                            {profileErrors.name && (
                              <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              id="email"
                              type="email"
                              {...registerProfile('email', {
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address',
                                },
                              })}
                              className={`block w-full px-4 py-2 border ${
                                profileErrors.email ? 'border-red-500' : 'border-gray-300'
                              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                            />
                            {profileErrors.email && (
                              <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              rows={4}
                              {...registerProfile('bio')}
                              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            ></textarea>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Social Media</h3>
                            
                            <div>
                              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                                LinkedIn
                              </label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <FaLinkedin />
                                </span>
                                <input
                                  id="linkedin"
                                  type="url"
                                  {...registerProfile('linkedin')}
                                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter
                              </label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <FaTwitter />
                                </span>
                                <input
                                  id="twitter"
                                  type="url"
                                  {...registerProfile('twitter')}
                                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                                Instagram
                              </label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <FaInstagram />
                                </span>
                                <input
                                  id="instagram"
                                  type="url"
                                  {...registerProfile('instagram')}
                                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={cancelProfileEdit}
                              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1">{userData.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                          <p className="mt-1">{userData.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                          <p className="mt-1">{userData.bio || 'No bio provided'}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Social Media</h3>
                          <div className="mt-2 flex space-x-4">
                            {userData.socialLinks.linkedin && (
                              <a
                                href={userData.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary"
                                aria-label="LinkedIn profile"
                              >
                                <FaLinkedin size={20} />
                              </a>
                            )}
                            {userData.socialLinks.twitter && (
                              <a
                                href={userData.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-secondary"
                                aria-label="Twitter profile"
                              >
                                <FaTwitter size={20} />
                              </a>
                            )}
                            {userData.socialLinks.instagram && (
                              <a
                                href={userData.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-accent"
                                aria-label="Instagram profile"
                              >
                                <FaInstagram size={20} />
                              </a>
                            )}
                            {!userData.socialLinks.linkedin && !userData.socialLinks.twitter && !userData.socialLinks.instagram && (
                              <p className="text-gray-500">No social media links provided</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Change Password</h2>
                    
                    <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaKey className="text-gray-400" />
                          </div>
                          <input
                            id="currentPassword"
                            type={showCurrentPassword ? 'text' : 'password'}
                            {...registerPassword('currentPassword', {
                              required: 'Current password is required',
                            })}
                            className={`block w-full pl-10 pr-10 py-2 border ${
                              passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                            >
                              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaKey className="text-gray-400" />
                          </div>
                          <input
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            {...registerPassword('newPassword', {
                              required: 'New password is required',
                              minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                              },
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Password must include uppercase, lowercase, number and special character',
                              },
                            })}
                            className={`block w-full pl-10 pr-10 py-2 border ${
                              passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {passwordErrors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaKey className="text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...registerPassword('confirmPassword', {
                              required: 'Please confirm your password',
                              validate: value => value === newPassword || 'Passwords do not match',
                            })}
                            className={`block w-full pl-10 pr-10 py-2 border ${
                              passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 