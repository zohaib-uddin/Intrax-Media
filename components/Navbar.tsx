import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './Button';

import { PORTFOLIO_BRANDS } from '../portfolioData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveMobileDropdown(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { 
      name: 'Portfolio', 
      path: '/portfolio',
      dropdown: [
        { 
          name: 'Performance Marketing', 
          path: '/portfolio',
          subDropdown: PORTFOLIO_BRANDS.map(brand => ({
            name: brand.name,
            path: `/portfolio/${brand.name}`
          }))
        }
      ]
    },
    { 
      name: 'About Us', 
      path: '/about',
      dropdown: [
        { name: 'Our Vision', path: '/about#our-vision' },
        { name: 'Our Domain', path: '/about#our-domain' },
        { name: 'Our Story', path: '/about#our-story' },
        { name: 'Why Only Intrax', path: '/about#why-intrax' }
      ]
    },
  ];

  const handleMobileDropdownClick = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-out transform ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-5'} animate-slide-down`}>
      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        
        @keyframes water-drop {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(5px) scale(0.9, 1.1); opacity: 0.8; }
        }
        
        @keyframes logo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes m-glow {
          0%, 100% { opacity: 0.2; stroke-width: 10; }
          50% { opacity: 0.4; stroke-width: 12; }
        }

        .animate-dot {
          animation: water-drop 3s ease-in-out infinite;
        }
        
        .animate-logo-float {
          animation: logo-float 4s ease-in-out infinite;
        }
        
        .animate-m-glow {
          animation: m-glow 3s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative w-11 h-11 flex items-center justify-center animate-logo-float">
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
                  className="animate-m-glow group-hover:animate-none group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:stroke-black"
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
                  className="animate-dot group-hover:animate-none group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                />
              </svg>
            </div>
            <span className="text-xl font-display font-bold text-black tracking-tight group-hover:text-brand-500 transition-colors">
              Intrax<span className="text-brand-500">Media</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-all duration-300 relative ${location.pathname === link.path ? 'text-brand-500' : 'text-black hover:text-brand-500'}`}
                    >
                      {link.name}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                        {link.dropdown.map((dropItem: any) => (
                          <div key={dropItem.name} className="relative group/sub">
                            <Link 
                              to={dropItem.path}
                              className="flex items-center justify-between px-6 py-3 text-sm font-bold text-black hover:bg-brand-50 hover:text-brand-500 transition-colors"
                            >
                              {dropItem.name}
                              {dropItem.subDropdown && <ChevronRight size={14} />}
                            </Link>
                            
                            {dropItem.subDropdown && (
                              <div className="absolute right-full top-0 w-64 opacity-0 group-hover/sub:opacity-100 transition-all duration-200 transform translate-x-0 z-[100] pointer-events-none group-hover/sub:pointer-events-auto">
                                <div className="pr-1">
                                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                    <div className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-brand-500 border-b border-gray-50 mb-1">
                                      All Brands
                                    </div>
                                    {dropItem.subDropdown.map((subItem: any) => (
                                      <Link
                                        key={subItem.path}
                                        to={subItem.path}
                                        className="block px-6 py-2.5 text-xs font-bold text-black hover:bg-brand-50 hover:text-brand-500 transition-colors border-l-2 border-transparent hover:border-brand-500"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    to={link.path}
                    className={`text-sm font-bold uppercase tracking-wide transition-all duration-300 relative group ${location.pathname === link.path ? 'text-brand-500' : 'text-black hover:text-brand-500'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact">
              <Button size="sm" variant="black">Get In Touch</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black hover:text-brand-500 transition-colors p-2">
              {isOpen ? <X size={24} className="text-brand-500" /> : <Menu size={24} className="text-brand-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-brand-100 shadow-xl transition-all duration-300 origin-top transform ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
        <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <div>
                  <div 
                    onClick={() => handleMobileDropdownClick(link.name)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-bold text-black hover:text-brand-500 hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    {link.name}
                    <ChevronDown size={18} className={`transform transition-transform ${activeMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`pl-8 space-y-2 overflow-hidden transition-all duration-300 ${activeMobileDropdown === link.name ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    {link.dropdown.map((dropItem: any) => (
                      <div key={dropItem.name}>
                        <Link
                          to={dropItem.path}
                          className="block px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:text-brand-500 hover:bg-brand-50"
                        >
                          {dropItem.name}
                        </Link>
                        {dropItem.subDropdown && (
                          <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-100 ml-4">
                            <div className="px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-500 opacity-70">
                              All Brands
                            </div>
                            {dropItem.subDropdown.map((subItem: any) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm font-bold text-gray-500 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className="block px-4 py-3 rounded-lg text-base font-bold text-black hover:text-brand-500 hover:bg-brand-50 transition-colors border-l-4 border-transparent hover:border-brand-500"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 px-4">
            <Link to="/contact" className="block w-full">
              <Button fullWidth variant="primary">Get In Touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};