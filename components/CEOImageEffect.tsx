import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface CEOImageEffectProps {
  src: string;
  alt: string;
  name: string;
  role: string;
}

export const CEOImageEffect: React.FC<CEOImageEffectProps> = ({ src, alt, name, role }) => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5] group border-4 border-brand-500/20 rounded-[3.2rem] p-2 transform rotate-3 hover:rotate-0 transition-transform duration-500">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 rounded-[3rem] overflow-hidden"
        style={{
          background: `
            linear-gradient(to right, rgba(255, 217, 0, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 217, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#050505'
        }}
      >
        {/* Animated Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 217, 0, 0.3) 0%, transparent 70%)'
          }}
        />
        
        {/* Secondary Glows */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full"
        />
      </div>

      {/* Main Image Container */}
      <div className="relative h-full w-full flex items-end justify-center overflow-hidden rounded-[3rem] border-4 border-brand-500/30 group-hover:border-brand-500 transition-colors duration-500">
        <img 
          src={src} 
          alt={alt} 
          className="relative z-10 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
        />
        
        {/* Overlay Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/600 via-transparent to-transparent z-20" />
      </div>

      {/* Certified Expert Badge */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 right-[-20px] md:right-[-32px] z-30 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl border-2 border-brand-500 min-w-[260px]"
      >
        <div className="flex items-center gap-1">
          <div className="w-12 h-12 bg-brand-500/50 rounded-full flex items-center justify-center shrink-0 shadow-lg backdrop-blur-sm">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <p className="font-black text-white text-lg leading-tight">Certified Expert</p>
            <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Digital Marketing</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -left-10 w-20 h-20 border border-brand-500/20 rounded-xl -z-10"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -right-10 w-12 h-12 bg-brand-500/10 rounded-full -z-10"
      />
    </div>
  );
};
