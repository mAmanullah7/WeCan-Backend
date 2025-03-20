'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-14 w-14">
                <Image 
                  src="/logo.png" 
                  alt="WeCan Logo" 
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-2xl">WeCan</span>
            </Link>
            <p className="text-gray-300 mb-4">
              A social welfare club of NIT Agartala, working towards the empowerment of underprivileged children through education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/volunteers" className="text-gray-300 hover:text-white transition-colors">Volunteers</Link>
              </li>
              <li>
                <Link href="/ananya" className="text-gray-300 hover:text-white transition-colors">Ananya</Link>
              </li>
              <li>
                <Link href="/alumni" className="text-gray-300 hover:text-white transition-colors">Alumni</Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-white transition-colors">Donate</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  NIT Agartala, Jirania, Tripura (West), Tripura, 799046
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-secondary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent flex-shrink-0" />
                <a href="mailto:info@wecan.org" className="text-gray-300 hover:text-white transition-colors">
                  info@wecan.org
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to get updates on our latest activities and events.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  aria-label="Email for newsletter"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} WeCan. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 