import React from 'react';
import { Button } from '../components/Button';
import { Play, Star, User, Bookmark, ShoppingCart, ChevronDown } from 'lucide-react';

export const Courses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "UAE A to Z Dropshipping & Whitelabeling Mastery Program By Intrax Media",
      category: "Dropshipping, UAE dropshipping",
      author: "Intrax Media",
      rating: 5,
      students: 85,
      originalPrice: "Rs 25,000",
      price: "Rs 10,000",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "TikTok Ads Mastery 2025 | Beginner to Expert",
      category: "Social Media Marketing",
      author: "Intrax Media",
      rating: 5,
      students: 188,
      originalPrice: "Rs 8,000",
      price: "Rs 3,000",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - White Theme to match Portfolio */}
      <div className="relative pt-24 pb-24 lg:pt-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-display font-black leading-tight text-black">
                Master E-commerce With <span className="text-brand-500">Expert-Led Courses</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                Empower Your Journey to Success with In-Depth Training on TikTok Ads and Conversion Rate Optimization (CRO).
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button variant="outline" size="lg" className="px-8">
                  Explore Courses
                </Button>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200 group cursor-pointer transform hover:scale-[1.02] transition-transform duration-300">
              <div className="aspect-video bg-black relative">
                 <img 
                   src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                   alt="Intrax Media E-commerce and TikTok Ads Mastery Course Preview" 
                   className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                     <Play size={32} fill="white" className="text-white ml-1" />
                   </div>
                 </div>
                 <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                       <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center font-bold text-black text-[10px]">IM</div>
                       <span className="text-white font-medium text-sm drop-shadow-md">How to Run TikTok Ads in Pakistan...</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Section Header & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-4xl font-display font-bold text-black">
            Our <span className="text-brand-500">Top</span> Courses
          </h2>
          
          <div className="relative">
             <button className="flex items-center space-x-2 border-2 border-brand-500 bg-gray-900 rounded-lg px-6 py-3 text-sm font-bold text-brand-500 hover:bg-black transition-colors">
               <span>Release Date (newest first)</span>
               <ChevronDown size={16} />
             </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-500 transition-all duration-300 flex flex-col">
              
              {/* Thumbnail */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img 
                  src={course.image} 
                  alt={`Intrax Media Course: ${course.title}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-gray-900 border-2 border-brand-500 rounded-full flex items-center justify-center text-brand-500 hover:bg-black transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
                {/* Brand Overlay Badge */}
                <div className="absolute bottom-4 right-4">
                   <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-lg">
                     <span className="font-bold text-[10px] text-black">IM</span>
                   </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-500 fill-brand-500" />
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-black mb-4 leading-tight group-hover:text-brand-500 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center text-gray-500 text-sm font-bold mb-8">
                   <User size={16} className="mr-2" />
                   <span>{course.students} Students</span>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold border border-brand-200">
                        IM
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-900 font-bold">By {course.author}</p>
                        <p className="text-xs text-gray-500 font-medium">{course.category.split(',')[0]}</p>
                      </div>
                   </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-gray-400 text-sm line-through font-bold">{course.originalPrice}</span>
                     <span className="text-black font-black text-2xl">{course.price}</span>
                   </div>
                   <Button variant="black" size="md" className="hover:bg-black hover:text-brand-500 shadow-lg">
                     <ShoppingCart size={18} className="mr-2" /> Enroll Now
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};