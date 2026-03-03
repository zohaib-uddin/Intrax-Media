import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { CalendlyEmbed } from '../components/CalendlyEmbed';
import { Megaphone, Clock, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageCarousel } from '../components/ImageCarousel';

import { PORTFOLIO_BRANDS } from '../portfolioData';

// Animation Helper Component
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const Portfolio: React.FC = () => {
  const portfolioItems = PORTFOLIO_BRANDS;

  return (
    <div className="bg-white">
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
           <div className="flex-1 text-center lg:text-left z-10">
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-black mb-6 leading-tight">
               {/* E-commerce Case Studies:<br/> */}
               Let Your <span className="text-brand-500">Brand</span><br/>
               Shout Loud!
             </h1>
             <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
               If You Are Following Conventional Marketing, Unstructured Strategies, Back To Back Money Loss on Poor Advertising.
             </p>
             <Link to="/contact">
              <Button size="lg" variant="primary" className="shadow-xl shadow-brand-500/20">
                WE ARE HERE TO MAKE YOUR BRAND SHINE
              </Button>
             </Link>
           </div>
           
           {/* Abstract Representation of the Megaphone/Visual */}
           <div className="flex-1 relative flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-brand-50 rounded-full flex items-center justify-center">
                 <div className="absolute inset-0 bg-brand-500/10 rounded-full animate-pulse"></div>
                 <Megaphone size={120} className="text-brand-500 transform -rotate-12 drop-shadow-2xl sm:hidden" strokeWidth={1.5} />
                 <Megaphone size={160} className="text-brand-500 transform -rotate-12 drop-shadow-2xl hidden sm:block" strokeWidth={1.5} />
                 {/* Lightning Bolts */}
                 <div className="absolute top-0 right-4 md:right-10 text-brand-500 text-4xl md:text-6xl font-bold animate-bounce">⚡</div>
                 <div className="absolute bottom-6 left-0 md:bottom-10 text-brand-500 text-4xl md:text-6xl font-bold animate-bounce" style={{ animationDelay: '0.5s' }}>⚡</div>
              </div>
           </div>
        </div>
      </div>

      {/* Portfolio Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {portfolioItems.map((item, index) => (
          <FadeInSection key={index} delay={index * 100}>
            <div className="flex flex-col lg:flex-row gap-16 items-center border-b border-gray-100 pb-20 last:border-0 last:pb-0">
              {/* Content Side */}
              <div className="lg:w-1/2 order-1">
                <h2 className="text-3xl md:text-4xl font-display font-black text-black mb-2 uppercase tracking-tight">{item.name}</h2>
                {item.description && <p className="text-gray-400 font-bold mb-8 uppercase tracking-wider text-sm">{item.description}</p>}
                
                <div className="grid grid-cols-2 gap-y-10 gap-x-8 mb-10">
                  {item.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl md:text-5xl font-black text-brand-500 mb-2">{stat.value}</div>
                      <div className="text-gray-600 font-bold text-sm uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <Link to={`/portfolio/${item.name}`}>
                  <button className="px-10 py-3 bg-[#1a1a1a] text-[#ffd900] border-2 border-[#ffd900] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all duration-300 transform hover:scale-105">
                    Read More
                  </button>
                </Link>
              </div>

              {/* Image Side - Now a Carousel */}
              <div className="w-full lg:w-1/2 order-2">
                <div className="relative group mt-8 lg:mt-0">
                  <div className="absolute inset-0 bg-black/5 rounded-3xl transform rotate-2 lg:rotate-3 transition-transform group-hover:rotate-6"></div>
                  <div className="absolute inset-0 bg-brand-500 rounded-3xl transform -rotate-2 lg:-rotate-3 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  <ImageCarousel images={item.images} name={item.name} interval={1000} height="h-[300px] sm:h-[400px]" />
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* FINAL CTA SECTION */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-12 uppercase tracking-tight text-black">
              WANT TO BE OUR <span className="text-brand-500">NEXT SUCCESS?</span>
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl font-medium leading-relaxed mb-16 max-w-3xl mx-auto">
              Join the elite brands that have scaled their revenue and dominated their markets with our strategic advertising approach.
            </p>
            <Link to="/contact">
              <button className="px-12 py-5 bg-[#1a1a1a] text-[#ffd900] border-2 border-[#ffd900] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all duration-300 transform hover:scale-105 shadow-2xl">
                LET'S TALK
              </button>
            </Link>
          </FadeInSection>
        </div>
      </section>

        <section className="py-24 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-200">
                   
                   {/* Left: White Section (Originally Black) */}
                   <div className="bg-white p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden border-r border-brand-100">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                     
                     <FadeInSection>
                       <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-black mb-8">
                         Excited to team up with <span className="text-brand-500 border-b-4 border-brand-500">INTRAX?</span>
                       </h2>
                       <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10">
                         Let Our Only <span className="text-brand-500 font-bold">Digital Marketing Specialists</span> Take Care Of All Of Your Shopify Brand Hurdles.
                       </p>
                       
                       <div className="space-y-6">
                         <div className="flex items-center space-x-4 text-black">
                           <div className="w-12 h-12 rounded-full border-2 border-brand-500 flex items-center justify-center text-brand-500 shadow-sm">
                              <Clock size={20} />
                           </div>
                           <span className="font-bold text-lg">30 Minute Strategy Session</span>
                         </div>
                         <div className="flex items-center space-x-4 text-black">
                           <div className="w-12 h-12 rounded-full border-2 border-brand-500 flex items-center justify-center text-brand-500 shadow-sm">
                              <Video size={20} />
                           </div>
                           <span className="font-bold text-lg">Web conferencing details provided.</span>
                         </div>
                       </div>
                     </FadeInSection>
                   </div>
      
                   {/* Right: Real Calendly Section */}
                   <div className="bg-brand-50 p-4 lg:p-8 flex flex-col justify-center">
                     <FadeInSection delay={200}>
                       <div className="text-center mb-6">
                         <h3 className="font-black text-3xl font-display text-black">Select a Date & Time</h3>
                         <p className="text-sm text-gray-500 font-bold mt-2">30 Minute Strategy Session</p>
                       </div>
                       <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-white">
                         <CalendlyEmbed url="https://calendly.com/intraxmedia/30min" />
                       </div>
                     </FadeInSection>
                   </div>
                 </div>
              </div>
            </section>
    </div>
  );
};
