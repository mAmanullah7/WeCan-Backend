"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageCarouselProps {
    images: string[];
    autoplayInterval?: number; // Optional prop for controlling timing
}

export default function ImageCarousel({ images, autoplayInterval = 5000 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Set up autoplay with useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, autoplayInterval);
        
        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [autoplayInterval]);

    return (
        <div className="relative w-full h-80 overflow-hidden rounded-lg">
            <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-cover transition-all duration-500"
            />
            {/* Navigation Buttons */}
            <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
            >
                ◀
            </button>
            <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
            >
                ▶
            </button>
        </div>
    );
}
