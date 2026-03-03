import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageCarouselProps {
  images: string[];
  name: string;
  height?: string;
  interval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, name, height = "h-[400px]", interval = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative group overflow-hidden rounded-3xl shadow-xl ${height} bg-white`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex] || "https://picsum.photos/800/600?grayscale"}
          alt={`Intrax Media E-commerce Case Study - ${name} - Result ${currentIndex + 1}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};
