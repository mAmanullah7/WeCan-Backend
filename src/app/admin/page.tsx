'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaEye, FaGraduationCap, FaBriefcase, FaBuilding, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample alumni registration requests data (replace with actual data from API)
const alumniRequests = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    graduationYear: 2018,
    batch: '2014-2018',
    position: 'Software Engineer',
    currentOrganization: 'Google',
    bio: 'Passionate about technology and education. Worked with WeCan for 3 years during college.',
    submittedAt: '2023-12-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    graduationYear: 2019,
    batch: '2015-2019',
    position: 'Data Scientist',
    currentOrganization: 'Microsoft',
    bio: 'Former President of WeCan. Led multiple educational initiatives for underprivileged children.',
    submittedAt: '2023-12-20T14:45:00Z',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    graduationYear: 2020,
    batch: '2016-2020',
    position: 'Product Manager',
    currentOrganization: 'Amazon',
    bio: 'Organized multiple fundraising events for WeCan. Passionate about social impact.',
    submittedAt: '2023-12-25T09:15:00Z',
  },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(alumniRequests);
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('pending');

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      toast.error('You do not have permission to access this page');
      router.push('/');
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  const filteredRequests = () => {
    let requests;
    if (activeTab === 'pending') requests = pendingRequests;
    else if (activeTab === 'approved') requests = approvedRequests;
    else requests = rejectedRequests;

    return requests.filter(request => 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.currentOrganization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = (id: number) => {
    const requestToApprove = pendingRequests.find(req => req.id === id);
    if (requestToApprove) {
      setPendingRequests(pendingRequests.filter(req => req.id !== id));
      setApprovedRequests([...approvedRequests, requestToApprove]);
      toast.success(`${requestToApprove.name}'s alumni registration approved`);
    }
    setIsModalOpen(false);
  };

  const handleReject = (id: number) => {
    const requestToReject = pendingRequests.find(req => req.id === id);
    if (requestToReject) {
      setPendingRequests(pendingRequests.filter(req => req.id !== id));
      setRejectedRequests([...rejectedRequests, requestToReject]);
      toast.info(`${requestToReject.name}'s alumni registration rejected`);
    }
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (status === 'loading' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
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
      
      <div className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pending'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending Requests ({pendingRequests.length})
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'approved'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Approved ({approvedRequests.length})
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'rejected'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Rejected ({rejectedRequests.length})
                </button>
              </nav>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            
            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Graduation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests().length > 0 ? (
                      filteredRequests().map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{request.name}</div>
                                <div className="text-sm text-gray-500">{request.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaGraduationCap className="text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">{request.batch}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.position}</div>
                            <div className="text-sm text-gray-500">{request.currentOrganization}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(request.submittedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(request)}
                              className="text-primary hover:text-primary/80 mr-4"
                              aria-label="View details"
                            >
                              <FaEye />
                            </button>
                            {activeTab === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(request.id)}
                                  className="text-green-600 hover:text-green-800 mr-4"
                                  aria-label="Approve"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  className="text-red-600 hover:text-red-800"
                                  aria-label="Reject"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No {activeTab} requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Detail Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Alumni Registration Details
                    </h3>
                    
                    <div className="mt-2 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Name</h4>
                        <p className="mt-1">{selectedRequest.name}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p className="mt-1">{selectedRequest.email}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Graduation Year</h4>
                          <p className="mt-1">{selectedRequest.graduationYear}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Batch</h4>
                          <p className="mt-1">{selectedRequest.batch}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Position</h4>
                          <p className="mt-1">{selectedRequest.position || 'Not specified'}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Organization</h4>
                          <p className="mt-1">{selectedRequest.currentOrganization || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                        <p className="mt-1 text-sm">{selectedRequest.bio}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                        <p className="mt-1">{formatDate(selectedRequest.submittedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {activeTab === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
} 