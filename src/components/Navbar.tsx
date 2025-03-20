'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = session?.user?.role === 'admin';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Volunteers', path: '/volunteers' },
    { name: 'Ananya', path: '/ananya' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add admin dashboard link if user is admin
  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-black bg-opacity-70 py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12 mr-3">
            {/* WeCan Logo */}
            <Image 
              src="/logo.png" 
              alt="WeCan Logo" 
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className={`font-heading font-bold text-xl ${scrolled ? 'text-primary' : 'text-white'}`}>
            WeCan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`font-medium transition-colors duration-300 ${
                pathname === link.path
                  ? 'text-primary'
                  : scrolled
                  ? 'text-text hover:text-primary'
                  : 'text-white hover:text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                pathname === '/profile'
                  ? 'text-primary'
                  : scrolled
                  ? 'text-text hover:text-primary'
                  : 'text-white hover:text-secondary'
              }`}
            >
              <FaUser />
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaTimes className={scrolled ? 'text-text' : 'text-white'} />
          ) : (
            <FaBars className={scrolled ? 'text-text' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium ${
                  pathname === link.path
                    ? 'text-primary'
                    : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className={`flex items-center gap-2 font-medium ${
                  pathname === '/profile'
                    ? 'text-primary'
                    : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaUser />
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 