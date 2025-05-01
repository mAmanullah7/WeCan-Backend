'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const imagesPerPage = 6; // Initial number of images to show

  // Sample gallery images (replace with actual images)
  const galleryImages = [
    { id: 1, src: '/images/n5.jpeg', alt: 'Children learning in classroom' },
    { id: 2, src: '/images/n7.jpeg', alt: 'Volunteers teaching' },
    { id: 3, src: '/images/a2.jpeg', alt: 'Achievement' },
    { id: 4, src: '/images/n8.jpeg', alt: 'Art and craft session' },
    { id: 5, src: '/images/s1.jpg', alt: 'Sports day' },
    { id: 6, src: '/images/cultural1.jpeg', alt: 'Cultural program' },
    { id: 7, src: '/images/n4.jpeg', alt: '' },  
    { id: 8, src: '/images/s2.jpg', alt: '' },
    { id: 9, src: '/images/c1.jpg', alt: '' },
    { id: 10, src: '/images/n3.jpeg', alt: '' },
    { id: 11, src: '/images/n9.jpeg', alt: '' },
    { id: 12, src: '/images/n10.jpeg', alt: '' },
    { id: 13, src: '/images/n11.jpeg', alt: '' },
    { id: 14, src: '/images/n13.jpeg', alt: '' },
    { id: 15, src: '/images/n12.jpeg', alt: '' },
    { id: 16, src: '/images/n14.jpeg', alt: '' },
    { id: 17, src: '/images/a1.jpeg', alt: '' },
    { id: 18, src: '/images/a3.jpeg', alt: '' },
    { id: 19, src: '/images/a4.jpeg', alt: '' },
    { id: 20, src: '/images/a5.jpeg', alt: '' },
    { id: 21, src: '/images/c2.jpeg', alt: '' },
    // Add more images as needed
  ];

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, imagesPerPage);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Pictures</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg">
            See how WeCan is making a difference in the lives of underprivileged children through education and empowerment.
          </p>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => openLightbox(index)}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-w-16 aspect-h-12 relative h-64">
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-medium text-center px-4">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && galleryImages.length > imagesPerPage && (
          <div className="text-center mt-10">
            <button 
              className="btn btn-outline"
              onClick={() => setShowAll(true)}
            >
              View More
            </button>
          </div>
        )}
        
        {showAll && (
          <div className="text-center mt-10">
            <button 
              className="btn btn-outline"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-4 text-white text-3xl hover:text-gray-300 transition-colors"
            onClick={() => navigateImage('prev')}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="absolute right-4 text-white text-3xl hover:text-gray-300 transition-colors"
            onClick={() => navigateImage('next')}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
          
          <motion.div 
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative max-w-4xl w-full h-[80vh]"
          >
            <Image 
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Gallery;