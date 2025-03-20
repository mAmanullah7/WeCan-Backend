'use client';

import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaQrcode, FaUniversity, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Donate = () => {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const bankDetails = {
    accountName: 'WeCan NIT Agartala',
    accountNumber: '1234567890123456',
    ifscCode: 'SBIN0012345',
    bankName: 'State Bank of India',
    branch: 'NIT Agartala Campus',
  };

  return (
    <section className="section bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Cause</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg">
            Your contribution can help us provide quality education to more underprivileged children and make a lasting impact on their lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-custom"
          >
            <div className="flex items-center mb-6">
              <FaQrcode className="text-3xl text-primary mr-4" />
              <h3 className="text-2xl font-bold">Scan & Pay</h3>
            </div>
            <div className="flex justify-center mb-6">
              <div className="h-64 w-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-600">QR Code Placeholder</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mb-4">
              Scan the QR code with any UPI app to donate directly to WeCan.
            </p>
            <div className="text-center">
              <button className="btn btn-primary">Download QR Code</button>
            </div>
          </motion.div>

          {/* Bank Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-custom"
          >
            <div className="flex items-center mb-6">
              <FaUniversity className="text-3xl text-primary mr-4" />
              <h3 className="text-2xl font-bold">Bank Transfer</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-500">Account Name</p>
                  <p className="font-medium">{bankDetails.accountName}</p>
                </div>
                <button 
                  className="text-primary hover:text-primary/80"
                  onClick={() => copyToClipboard(bankDetails.accountName, 'Account name copied!')}
                  aria-label="Copy account name"
                >
                  <FaCopy />
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">{bankDetails.accountNumber}</p>
                </div>
                <button 
                  className="text-primary hover:text-primary/80"
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number copied!')}
                  aria-label="Copy account number"
                >
                  <FaCopy />
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-500">IFSC Code</p>
                  <p className="font-medium">{bankDetails.ifscCode}</p>
                </div>
                <button 
                  className="text-primary hover:text-primary/80"
                  onClick={() => copyToClipboard(bankDetails.ifscCode, 'IFSC code copied!')}
                  aria-label="Copy IFSC code"
                >
                  <FaCopy />
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-medium">{bankDetails.bankName}</p>
                </div>
                <button 
                  className="text-primary hover:text-primary/80"
                  onClick={() => copyToClipboard(bankDetails.bankName, 'Bank name copied!')}
                  aria-label="Copy bank name"
                >
                  <FaCopy />
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium">{bankDetails.branch}</p>
                </div>
                <button 
                  className="text-primary hover:text-primary/80"
                  onClick={() => copyToClipboard(bankDetails.branch, 'Branch name copied!')}
                  aria-label="Copy branch name"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <FaHandHoldingHeart className="text-4xl text-secondary mr-3" />
            <h3 className="text-2xl font-bold">Make a Difference Today</h3>
          </div>
          <p className="max-w-2xl mx-auto mb-8">
            Every contribution, no matter how small, helps us in our mission to empower underprivileged children through education. Your support can change lives.
          </p>
          <a href="/donate" className="btn btn-primary">
            Learn More About Donations
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Donate; 