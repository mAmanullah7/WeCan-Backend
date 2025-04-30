'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaEye, FaGraduationCap, FaBriefcase, FaBuilding, FaSearch, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaStar, FaHeart, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AlumniRequest {
  _id: string;
  name: string;
  email: string;
  graduationYear: number;
  batch: string;
  position: string;
  currentOrganization: string;
  bio: string;
  isApproved: boolean;
  createdAt: string;
}

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience: string;
  motivation: string;
  isApproved: boolean;
  createdAt: string;
}

interface AnanyaRegistration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [alumniRequests, setAlumniRequests] = useState<AlumniRequest[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [ananyaRegistrations, setAnanyaRegistrations] = useState<AnanyaRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    fetchAlumniRequests();
    if (session?.user?.role === 'admin') {
      fetchVolunteers();
      fetchAnanyaRegistrations();
    }
  }, []);

  const fetchAlumniRequests = async () => {
    try {
      const response = await fetch('/api/alumni?approved=false');
      if (!response.ok) {
        throw new Error('Failed to fetch alumni requests');
      }
      const data = await response.json();
      setAlumniRequests(data);
    } catch (error) {
      console.error('Error fetching alumni requests:', error);
      toast.error('Failed to load alumni requests');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('/api/volunteers?admin=true');
      if (!response.ok) {
        throw new Error('Failed to fetch volunteers');
      }
      const data = await response.json();
      setVolunteers(data);
    } catch (err) {
      setError('Failed to load volunteer applications');
      console.error('Error fetching volunteers:', err);
    }
  };

  const fetchAnanyaRegistrations = async () => {
    try {
      const response = await fetch('/api/ananya/registrations');
      if (!response.ok) {
        throw new Error('Failed to fetch Ananya registrations');
      }
      const data = await response.json();
      setAnanyaRegistrations(data);
    } catch (error) {
      console.error('Error fetching Ananya registrations:', error);
      toast.error('Failed to load Ananya registrations');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch('/api/alumni', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isApproved: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve alumni');
      }

      setAlumniRequests(requests => requests.filter(request => request._id !== id));
      toast.success('Alumni approved successfully');
    } catch (error) {
      console.error('Error approving alumni:', error);
      toast.error('Failed to approve alumni');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch('/api/alumni', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isApproved: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject alumni');
      }

      setAlumniRequests(requests => requests.filter(request => request._id !== id));
      toast.success('Alumni rejected successfully');
    } catch (error) {
      console.error('Error rejecting alumni:', error);
      toast.error('Failed to reject alumni');
    }
  };

  const handleVolunteerApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve volunteer');
      }

      setVolunteers(volunteers.map(volunteer => 
        volunteer._id === id ? { ...volunteer, isApproved: true } : volunteer
      ));
    } catch (err) {
      console.error('Error approving volunteer:', err);
      setError('Failed to approve volunteer');
    }
  };

  const handleVolunteerReject = async (id: string) => {
    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to reject volunteer');
      }

      setVolunteers(volunteers.filter(volunteer => volunteer._id !== id));
    } catch (err) {
      console.error('Error rejecting volunteer:', err);
      setError('Failed to reject volunteer');
    }
  };

  const filteredRequests = alumniRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            
            {/* Search Bar */}
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Search alumni requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full"
              />
            </div>
          </div>
          
          {/* Alumni Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-700">Alumni Requests</h2>
            </div>
            <div className="p-4">
              {filteredRequests.length > 0 ? (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-md p-4 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h2 className="text-base font-medium text-gray-800">{request.name}</h2>
                          <p className="text-sm text-gray-500">{request.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(request._id)}
                            className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                          >
                            <FaCheck className="inline mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <FaTimes className="inline mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaGraduationCap className="text-gray-400 mr-2 text-xs" />
                          <span>Graduation Year: {request.graduationYear}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaBriefcase className="text-gray-400 mr-2 text-xs" />
                          <span>Position: {request.position || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaBuilding className="text-gray-400 mr-2 text-xs" />
                          <span>Organization: {request.currentOrganization || 'Not specified'}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Bio</h3>
                        <p className="text-sm text-gray-600">{request.bio}</p>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-400">
                        Submitted on: {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No pending alumni requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Ananya Registrations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-700">Ananya Registrations</h2>
            </div>
            <div className="p-4">
              {ananyaRegistrations.length > 0 ? (
                <div className="space-y-4">
                  {ananyaRegistrations.map((registration) => (
                    <motion.div
                      key={registration._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-md p-4 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h2 className="text-base font-medium text-gray-800">{registration.name}</h2>
                          <p className="text-sm text-gray-500">{registration.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaPhone className="text-gray-400 mr-2 text-xs" />
                          <span>Phone: {registration.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaStar className="text-gray-400 mr-2 text-xs" />
                          <span>Interest: {registration.interest}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Message</h3>
                        <p className="text-sm text-gray-600">{registration.message}</p>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-400">
                        Submitted on: {new Date(registration.createdAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No Ananya registrations</p>
                </div>
              )}
            </div>
          </div>

          {/* Volunteer Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-700">Volunteer Applications</h2>
            </div>
            <div className="p-4">
              {volunteers.length === 0 ? (
                <p className="text-sm text-gray-500">No volunteer applications to review.</p>
              ) : (
                <div className="space-y-4">
                  {volunteers.map((volunteer) => (
                    <div
                      key={volunteer._id}
                      className={`rounded-md p-4 ${
                        volunteer.isApproved 
                          ? 'bg-green-50 border border-green-100' 
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-base font-medium text-gray-800 mb-3">{volunteer.name}</h3>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <FaEnvelope className="text-gray-400 mr-2 text-xs" />
                              <span>{volunteer.email}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <FaPhone className="text-gray-400 mr-2 text-xs" />
                              <span>{volunteer.phone}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <FaCalendarAlt className="text-gray-400 mr-2 text-xs" />
                              <span>{new Date(volunteer.dateOfBirth).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {volunteer.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-primary/5 text-primary px-2 py-0.5 rounded text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {volunteer.interests.map((interest, index) => (
                                <span
                                  key={index}
                                  className="bg-secondary/5 text-secondary px-2 py-0.5 rounded text-xs"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Availability</h4>
                            <p className="text-sm text-gray-600">{volunteer.availability}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Experience</h4>
                        <p className="text-sm text-gray-600 mb-3">{volunteer.experience}</p>
                        
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Motivation</h4>
                        <p className="text-sm text-gray-600">{volunteer.motivation}</p>
                      </div>
                      
                      {!volunteer.isApproved && (
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleVolunteerApprove(volunteer._id)}
                            className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                          >
                            <FaCheck className="inline mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleVolunteerReject(volunteer._id)}
                            className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                          >
                            <FaTimes className="inline mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                      
                      {volunteer.isApproved && (
                        <div className="mt-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                            <FaCheck className="mr-1" />
                            Approved
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 