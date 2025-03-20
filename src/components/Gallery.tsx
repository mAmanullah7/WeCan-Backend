'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample gallery images (replace with actual images)
  const galleryImages = [
    { id: 1, src: '/images/placeholder.jpg', alt: 'Children learning in classroom' },
    { id: 2, src: '/images/placeholder.jpg', alt: 'Volunteers teaching' },
    { id: 3, src: '/images/placeholder.jpg', alt: 'Group activity' },
    { id: 4, src: '/images/placeholder.jpg', alt: 'Art and craft session' },
    { id: 5, src: '/images/placeholder.jpg', alt: 'Sports day' },
    { id: 6, src: '/images/placeholder.jpg', alt: 'Cultural program' },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <div className="h-64 w-full bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-600 font-medium">Gallery Image {image.id}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-medium text-center px-4">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="btn btn-outline">View More</button>
        </div>
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
          <div className="relative max-w-4xl w-full h-[80vh] bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600 font-medium">
              Gallery Image {galleryImages[selectedImage].id} (Enlarged)
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 