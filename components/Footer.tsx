import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Send, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black pt-24 pb-10 border-t border-brand-100">
      <style>{`
        @keyframes water-drop-footer {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(5px) scale(0.9, 1.1); opacity: 0.8; }
        }
        
        @keyframes logo-float-footer {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes m-glow-footer {
          0%, 100% { opacity: 0.2; stroke-width: 10; }
          50% { opacity: 0.4; stroke-width: 12; }
        }

        .animate-dot-footer {
          animation: water-drop-footer 3s ease-in-out infinite;
        }
        
        .animate-logo-float-footer {
          animation: logo-float-footer 4s ease-in-out infinite;
        }
        
        .animate-m-glow-footer {
          animation: m-glow-footer 3s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 flex items-center justify-center animate-logo-float-footer">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/30 rounded-full blur-2xl transition-all duration-700"></div>
                
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10">
                  {/* Stylish 'M' - Background Layer */}
                  <path 
                    d="M15 80 L15 25 L50 60 L85 25 L85 80" 
                    fill="none" 
                    stroke="#ffd900" 
                    strokeWidth="10" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="animate-m-glow-footer group-hover:animate-none group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:stroke-black"
                  />
                  
                  {/* Bold 'I' - Foreground Layer */}
                  <path 
                    d="M44 25 H56 V85 H44 Z" 
                    fill="#ffd900"
                    className="group-hover:translate-y-[2px] transition-all duration-500 drop-shadow-xl"
                  />
                  
                  {/* Accent Dot - Water Drop Style */}
                  <circle 
                    cx="50" cy="12" r="6" 
                    fill="#ffd900"
                    className="animate-dot-footer group-hover:animate-none group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                  />
                </svg>
              </div>
              <span className="text-2xl font-display font-black text-black tracking-tighter">Intrax<span className="text-brand-500">Media</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              We Work With A Passion Of Taking Challenges And Creating New Ones In Advertising Sector.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/faizansheikhfx?igsh=MWwybzJ5cjcydDA2aA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group shadow-sm border-2 border-black hover:border-brand-500 hover:bg-brand-500 bg-transparent">
                <Instagram size={18} className="text-black group-hover:text-black transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/faizan-ali-39a22439b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group shadow-sm border-2 border-black hover:border-brand-500 hover:bg-brand-500 bg-transparent">
                <Linkedin size={18} className="text-black group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-black mb-8 flex items-center text-brand-500 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-gray-600 font-bold">
              <li>
                <Link to="/services" className="hover:text-brand-500 transition-colors inline-flex items-center group">
                  <ArrowRight size={14} className="mr-2 text-brand-500 group-hover:translate-x-1 transition-transform" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-500 transition-colors inline-flex items-center group">
                  <ArrowRight size={14} className="mr-2 text-brand-500 group-hover:translate-x-1 transition-transform" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-brand-500 transition-colors inline-flex items-center group">
                  <ArrowRight size={14} className="mr-2 text-brand-500 group-hover:translate-x-1 transition-transform" />
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-500 transition-colors inline-flex items-center group">
                  <ArrowRight size={14} className="mr-2 text-brand-500 group-hover:translate-x-1 transition-transform" />
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-black mb-8 flex items-center text-brand-500 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Signup for our latest news & articles. We won't give you spam mails.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white border-2 border-gray-100 text-black px-4 py-4 rounded-full focus:outline-none focus:border-brand-500 text-sm transition-all pl-4 pr-14 font-medium placeholder-gray-400 group-hover:border-brand-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center hover:bg-black text-white transition-colors shadow-lg">
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-black mb-8 flex items-center text-brand-500 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-6 text-sm text-gray-600 font-medium">
              <li className="flex items-start space-x-4 group">
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors border border-brand-100">
                  <Phone size={16} className="text-brand-500 group-hover:text-white" />
                </div>
                <a href="https://wa.me/923126109121" target="_blank" rel="noopener noreferrer" className="mt-1 font-bold text-gray-800 group-hover:text-brand-500 transition-colors">+92312-6109121</a>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors border border-brand-100">
                  <Mail size={16} className="text-brand-500 group-hover:text-white" />
                </div>
                <a href="mailto:intraxmedia@gmail.com" className="mt-1 font-bold text-gray-800 group-hover:text-brand-500 transition-colors">intraxmedia@gmail.com</a>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors border border-brand-100">
                  <MapPin size={16} className="text-brand-500 group-hover:text-white" />
                </div>
                <span className="mt-1 font-medium group-hover:text-brand-500 transition-colors">222 Broadway, New York, NY 10038, United States</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-bold">
          <div className="max-w-4xl text-left mb-8 md:mb-0">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-500 mb-2">Top E-commerce Marketing Agency</h4>
            <p className="text-[10px] leading-relaxed opacity-60">
              Intrax Media is a leading Shopify marketing agency and Meta ads agency dedicated to scaling e-commerce brands globally. We specialize in Shopify store design, Facebook ads for e-commerce, Google ads for Shopify, and comprehensive conversion rate optimization (CRO). Our performance marketing strategies are designed for Shopify store owners looking for a reliable Shopify scaling agency to drive higher returns and sustainable growth.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p>&copy; {new Date().getFullYear()} Intrax Media. All Rights Reserved.</p>
            <div className="flex space-x-8 mt-4">
               <Link to="/privacy-policy" className="hover:text-brand-500 transition-colors">Privacy</Link>
               <Link to="/terms-conditions" className="hover:text-brand-500 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};