import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Check, Star, Play, ChevronDown, ChevronUp, Clock, Video, Globe, ArrowRight, Zap, Target, Shield, Award, User, ShoppingCart, Lock, Smartphone, Users, Briefcase, X, TrendingUp, Ban } from 'lucide-react';

// Animation Helper
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.1 });
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);
  return <div ref={domRef} className={`fade-in-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

export const TikTokCourse: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const modules = [
    { title: "INTRODUCTION TO TIKTOK ADVERTISING", desc: "Learn why TikTok is the fastest-growing platform for advertisers and how to position your brand for success in 2025." },
    { title: "ACCOUNT SETUP AND OVERVIEW", desc: "A step-by-step guide to setting up your TikTok Business Center, Ad Manager, and Pixel for accurate tracking." },
    { title: "UNDERSTANDING TIKTOK ALGORITHM AND METRICS", desc: "Master the data. Learn which metrics matter most and how the TikTok algorithm decides which ads to show." },
    { title: "CREATIVE STRATEGIES THAT CONVERT", desc: "The secret sauce. Discover how to create high-converting, native-style TikTok content that doesn't look like an ad." },
    { title: "TESTING AND DECISION-MAKING", desc: "Stop guessing. Learn our proven framework for testing creatives and audiences to find winners quickly." },
    { title: "SCALING & BUDGET OPTIMIZATION STRATEGIES", desc: "Take your winners to the moon. Learn horizontal and vertical scaling techniques used by top agencies." },
    { title: "INFLUENCER MARKETING & HUNTING", desc: "Leverage the power of creators. How to find, contact, and collaborate with influencers to explode your brand reach." }
  ];

  const faqs = [
    { q: "Do I Need To Have Any Prior Knowledge Of TikTok Ads?", a: "No, this course is designed for beginners to experts. We start from the fundamentals and move to advanced strategies." },
    { q: "How Do I Get This Course?", a: "Simply click the 'Yes! Enroll Me Now' button, complete the payment, and you will get instant access." },
    { q: "How Long Course Access Will Remain With Me?", a: "You will have lifetime access to the course materials, including any future updates." },
    { q: "Will I Be Able To Access It From Mobile?", a: "Yes, the course platform is fully mobile-optimized so you can learn on the go." },
    { q: "Is There Any Community To Interact With Fellow Learners?", a: "Yes, you will get access to our private community where you can network and ask questions." },
    { q: "Will You Show How To Launch Campaigns And Live Proof Of Strategies?", a: "Absolutely. We believe in practical learning. You will see live campaign setups and real results." },
    { q: "Can't I Learn All This From YouTube?", a: "YouTube has scattered information. This structured course gives you a step-by-step blueprint used by top 1% marketers to generate millions." },
  ];

  const outcomes = [
    "Run profitable TikTok ad campaigns from scratch",
    "Attract targeted audiences and drive conversions efficiently",
    "Strategize captivating video ads that grab attention and drive results",
    "Analyze data, optimize campaigns, and scale for explosive growth",
    "Leverage influencer marketing to amplify your reach and brand awareness",
    "Engage in a private community facebook group with like-minded learners"
  ];

  const statsData = [
    { skill: "SEO", services: "100,000+" },
    { skill: "Amazon", services: "65,000+" },
    { skill: "Facebook Ads", services: "33,000+" },
    { skill: "Google Ads", services: "19,000+" },
    { skill: "TikTok Ads", services: "5,000+", highlight: true },
  ];

  return (
    <div className="bg-white text-black font-sans selection:bg-brand-500 selection:text-white overflow-hidden">
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
        .yellow-glow {
          text-shadow: 0 0 25px rgba(255, 217, 0, 0.4);
        }
        /* Custom Orbit Animations */
        @keyframes float-top-left { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-5px, -5px); } }
        @keyframes float-top-right { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(5px, -5px); } }
        @keyframes float-bottom-left { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-5px, 5px); } }
        @keyframes float-bottom-right { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(5px, 5px); } }
      `}</style>

      {/* HEADER SECTION */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
         {/* Background Orbs */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[120px] opacity-70"></div>
         
         <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
            <FadeInSection>
               <div className="flex justify-center mb-6">
                  <span className="px-4 py-1 border border-brand-500 rounded-full text-xs font-black uppercase tracking-widest text-black bg-brand-50">Beginners | Entrepreneurs | Freelancers</span>
               </div>
               
               <h3 className="text-xl font-bold mb-4">100% DONE FOR YOU!</h3>
               
               <h1 className="text-4xl md:text-7xl font-display font-black mb-6 leading-tight text-black">
                  <span className="inline-block transform -rotate-2 bg-black text-brand-500 px-2 mr-2">TikTok</span> Ads Mastery 2025: E-commerce Scaling Course
               </h1>
               
               <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-wide">
                  Beginner To Expert Level
               </h2>
               
               <p className="text-lg text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
                  Leverage Secret TikTok Ad Strategies Only <span className="font-black text-black">TOP 1% MARKETERS KNOW!</span>
               </p>

               <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {[
                    "Exclusive strategies that make your ads irresistible",
                    "Techniques to maximize your ad spend and ROI",
                    "Algorithm secrets to get your content seen by more people"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:border-brand-500 transition-colors">
                       <Check size={16} className="text-brand-500 mr-2 shrink-0" strokeWidth={3} />
                       <span className="text-xs font-bold text-gray-900 text-left">{item}</span>
                    </div>
                  ))}
               </div>

               <div className="mb-12">
                  <Link to="/contact">
                     <Button size="lg" variant="black" className="shadow-2xl hover:scale-105 transition-transform">
                        GET IT FOR PKR 3000 ONLY
                     </Button>
                  </Link>
                  <p className="mt-4 text-sm font-bold text-gray-400">
                     <span className="line-through decoration-red-500 decoration-2 mr-2">PKR 8000</span>
                     <span className="text-brand-500">SAVE PKR 5000</span>
                  </p>
               </div>
            </FadeInSection>
            
            {/* Video Placeholder */}
            <FadeInSection delay={200} className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-500 group">
               <div className="aspect-video bg-black relative">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200" alt="Intrax Media TikTok Ads Mastery Course - Master the Algorithm and Scale Your Brand" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,217,0,0.6)] animate-pulse cursor-pointer group-hover:scale-110 transition-transform">
                        <Play fill="black" className="text-black ml-2" size={40} />
                     </div>
                  </div>
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white border-y border-brand-50">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Stats Table */}
            <FadeInSection>
               <div className="bg-white text-black rounded-[2rem] p-8 shadow-2xl border-2 border-brand-500">
                  <h3 className="text-center text-xl font-bold mb-6 border-b border-gray-100 pb-4">
                     Competition On Fiverr<br/>
                     <span className="text-gray-400 text-sm font-normal">(Top Online Earning Platform)</span>
                  </h3>
                  
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 text-black font-bold uppercase text-xs tracking-wider border-b border-gray-100 pb-2">
                        <div>Skills</div>
                        <div>Services Available</div>
                     </div>
                     {statsData.map((row, i) => (
                        <div key={i} className={`grid grid-cols-2 py-3 border-b border-gray-100 ${row.highlight ? 'bg-brand-50 -mx-4 px-4 rounded-lg' : ''}`}>
                           <div className={`font-bold ${row.highlight ? 'text-black' : 'text-gray-600'}`}>{row.skill}</div>
                           <div className={`font-medium ${row.highlight ? 'text-brand-500 font-black' : 'text-gray-500'}`}>{row.services}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </FadeInSection>

            {/* Right Column: Text Content */}
            <FadeInSection delay={100}>
               <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-2">Learn The Most In-Demand Digital Marketing Skill With Least Competition</p>
               <h2 className="text-4xl md:text-5xl font-display font-black mb-2 text-black">
                  Don't Believe?<br/>
                  <span className="text-brand-500 yellow-glow">Check The STATs</span>
               </h2>
               
               <div className="mt-8 space-y-6">
                  <h3 className="text-3xl font-black text-black">Only <span className="text-brand-500">5000</span> Services<br/> Are Available</h3>
                  <p className="text-gray-600 font-medium">This Verifies The Lowest Number Of Service Providers.</p>
                  <p className="text-gray-600 font-medium">An Open Ground For Everyone Who Wants To Invest Time And Earn A Handsome Amount.</p>
                  <p className="text-black font-bold text-lg">Believe Me, It's High Time To Learn <span className="text-brand-500">TikTok Ads</span>.</p>
                  
                  <div className="mt-8">
                     <p className="text-black font-bold mb-4">Before It Becomes Saturated Everyone Around You Will Be Saying:</p>
                     <div className="bg-brand-50 border-l-4 border-brand-500 p-6 rounded-r-xl">
                        <span className="text-4xl text-brand-500 block mb-2">“</span>
                        <p className="text-lg font-bold italic text-black leading-relaxed">
                           Bhai bohot competition barh gaya hai ub. Pehle to clients milna asan tha ab bohot mushkil ho raha hai.
                        </p>
                     </div>
                  </div>
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* IS THIS COURSE FOR ME */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl font-display font-black text-black mb-4">Is This <span className="text-brand-500 yellow-glow">Course</span> For Me?</h2>
               <p className="text-gray-600 font-medium">Yes! This Course Is Literally For Anyone Who Is Serious About Life And Wants To Learn A Solid Skill That Has Strong Earning Potential.</p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                  { icon: User, title: "Students, Housewives", desc: "Full-time on-site/offsite job individuals" },
                  { icon: Briefcase, title: "Business Owners", desc: "Looking to drive more traffic, leads, and sales" },
                  { icon: TrendingUp, title: "Marketers and Agencies", desc: "Who wants to learn how to generate consistent results" },
                  { icon: Star, title: "Entrepreneurs and Creators", desc: "Who want to build their brands on TikTok" }
               ].map((item, i) => (
                  <FadeInSection key={i} delay={i * 100} className="bg-white p-8 rounded-[2rem] border border-gray-200 hover:border-brand-500 transition-all hover:shadow-xl group text-center">
                     <div className="w-16 h-16 mx-auto bg-brand-50 border-2 border-brand-500 rounded-full flex items-center justify-center mb-6 text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-colors">
                        <item.icon size={32} />
                     </div>
                     <h3 className="font-black text-lg mb-3 leading-tight">{item.title}</h3>
                     <p className="text-sm text-gray-600 font-medium">{item.desc}</p>
                  </FadeInSection>
               ))}
            </div>
         </div>
      </section>

      {/* URDU SECTION / CIRCLE GRAPHIC (Refined & Centered) */}
      <section className="py-24 bg-white overflow-hidden relative border-t border-brand-50">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <FadeInSection>
               <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-4">Kia Ap Ke Zehen Main Ye Sawal Ata Hai?</h3>
               <h2 className="text-3xl font-black mb-8 leading-snug text-black">
                  Yar Mujha Koi Aysi Skill Bata Do Jo Main Mehnat Kar Ke Seekhon Or Meri Skill Ki Value Bhi Rahay. Bar Bar Skill Nahi Badli Jati Yarrrr...
               </h2>
               <p className="text-brand-500 text-xl font-bold mb-8">To Bar Bar New Skill Seekhne Ki Taraf Mat Bhagain.</p>
               <Link to="/contact">
                  <Button variant="black" className="shadow-xl">
                     YES ENROLL ME NOW
                  </Button>
               </Link>
            </FadeInSection>
            
            <FadeInSection delay={200} className="flex justify-center items-center w-full">
               <div className="relative w-[450px] h-[450px] flex items-center justify-center">
                  
                  {/* Concentric Circles */}
                  <div className="absolute inset-0 border border-brand-100 rounded-full"></div>
                  <div className="absolute inset-16 border border-brand-200 rounded-full"></div>
                  <div className="absolute inset-32 border border-brand-300 rounded-full"></div>
                  
                  {/* Center TikTok Logo */}
                  <div className="w-32 h-32 bg-black border-4 border-brand-500 rounded-full flex items-center justify-center relative z-20 shadow-2xl">
                      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white">
                         <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.14c0 3.48-2.55 6.31-5.98 6.63-3.44.32-6.89-1.83-7.85-4.89-.96-3.06.69-6.41 3.82-7.4 1.08-.34 2.27-.31 3.36.08v4.03c-.56-.47-1.34-.68-2.06-.49-1.39.37-2.18 1.94-1.6 3.28.58 1.34 2.26 2 3.61 1.48 1.13-.43 1.92-1.57 1.92-2.8v-14.1z" />
                      </svg>
                  </div>

                  {/* Positioning Items - 2x2 Grid Layout around circle */}
                  
                  {/* Top Left - Learn */}
                  <div className="absolute top-[12%] left-[12%] bg-white px-6 py-2 rounded-full border-2 border-brand-500 shadow-xl z-20" style={{ animation: 'float-top-left 4s ease-in-out infinite' }}>
                     <div className="flex items-center gap-2">
                        <span className="font-black text-black text-lg">Learn</span>
                        <Star size={16} className="text-brand-500 fill-brand-500"/>
                     </div>
                  </div>

                  {/* Top Right - Create */}
                  <div className="absolute top-[12%] right-[12%] bg-white px-6 py-2 rounded-full border-2 border-brand-500 shadow-xl z-20" style={{ animation: 'float-top-right 5s ease-in-out infinite' }}>
                     <div className="flex items-center gap-2">
                         <Zap size={16} className="text-brand-500 fill-brand-500"/>
                         <span className="font-black text-black text-lg">Create</span>
                     </div>
                  </div>

                  {/* Bottom Left - Engage */}
                  <div className="absolute bottom-[12%] left-[12%] bg-white px-6 py-2 rounded-full border-2 border-brand-500 shadow-xl z-20" style={{ animation: 'float-bottom-left 4.5s ease-in-out infinite' }}>
                     <div className="flex items-center gap-2">
                        <Users size={16} className="text-brand-500 fill-brand-500"/>
                        <span className="font-black text-black text-lg">Engage</span>
                     </div>
                  </div>

                   {/* Bottom Right - Connect */}
                  <div className="absolute bottom-[12%] right-[12%] bg-white px-6 py-2 rounded-full border-2 border-brand-500 shadow-xl z-20" style={{ animation: 'float-bottom-right 3.5s ease-in-out infinite' }}>
                     <div className="flex items-center gap-2">
                        <Globe size={16} className="text-brand-500 fill-brand-500"/>
                        <span className="font-black text-black text-lg">Connect</span>
                     </div>
                  </div>
                  
                  {/* Floating Bubbles */}
                  <div className="absolute -top-4 bg-black text-brand-500 px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-brand-500">How can I create a successful TikTok ad?</div>
                  <div className="absolute -bottom-4 bg-black text-brand-500 px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-brand-500">Best strategy for my campaign?</div>
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* WHO SHOULD NOT DO THIS COURSE */}
      <section className="py-24 bg-white border-t border-brand-50">
         <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 border-2 border-brand-100 shadow-2xl relative overflow-hidden">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  
                  {/* Left Graphic - Phone/Card Style */}
                  <FadeInSection className="flex justify-center">
                     <div className="w-full max-w-sm bg-black rounded-[2.5rem] p-4 border-4 border-gray-200 shadow-2xl relative">
                        {/* Screen Area */}
                        <div className="bg-gray-900 rounded-[2rem] h-full p-8 flex flex-col items-center justify-center border border-gray-800 relative overflow-hidden">
                           {/* Background Grid/Glow */}
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,217,0,0.1),transparent_70%)]"></div>
                           
                           {/* Icon */}
                           <div className="mb-6 relative">
                              <div className="w-24 h-24 rounded-full border-4 border-brand-500 flex items-center justify-center">
                                 <Ban size={48} className="text-brand-500" strokeWidth={3} />
                              </div>
                           </div>
                           
                           <h3 className="text-white font-bold text-center mb-1">This Course Is</h3>
                           <h3 className="text-brand-500 font-black text-2xl text-center mb-8 uppercase tracking-wide">Not for You If:</h3>
                           
                           <div className="space-y-3 w-full">
                              {["No Action", "Seeking Shortcut", "Quick Fixes", "No Dedication"].map((item, i) => (
                                 <div key={i} className="flex items-center space-x-3 text-gray-300 font-bold bg-white/5 p-3 rounded-xl border border-white/10">
                                    <X size={18} className="text-brand-500" strokeWidth={4} />
                                    <span>{item}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </FadeInSection>

                  {/* Right Content */}
                  <FadeInSection delay={200} className="text-left">
                     <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-8 leading-tight">
                        Who Should <span className="text-brand-500 inline-block border-b-4 border-brand-500">Not</span><br/>
                        Do This Course?
                     </h2>
                     
                     <div className="space-y-8 text-lg font-medium text-gray-600 leading-relaxed">
                        <div className="bg-brand-50 p-6 rounded-2xl border-l-4 border-brand-500">
                           <p className="text-black font-bold mb-2 uppercase text-sm tracking-wider">Warning</p>
                           <p className="text-black font-medium">
                              If You Like To Join Back-To-Back Courses And Don't Like To Take Action, <span className="text-black font-extrabold underline decoration-brand-500 decoration-2 underline-offset-4">You Should Not Take This Course.</span>
                           </p>
                        </div>
                        
                        <p>
                           If You Are Here For A Shortcut To Success, This Course Is Not For You. To Get Maximum Reward From Any Skill, You Should Be Willing To Invest <span className="text-brand-500 font-black">Time, Heart, And Soul</span> Towards Your Goal.
                        </p>
                     </div>
                  </FadeInSection>

               </div>
            </div>
         </div>
      </section>

      {/* WHY DO YOU NEED A STRUCTURED COURSE - NEW SECTION */}
      <section className="py-24 bg-white border-t border-brand-50">
         <div className="max-w-4xl mx-auto px-4">
             <FadeInSection className="bg-white border-2 border-brand-500 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-50 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10">
                   <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-8">
                      Why Do You Need A <span className="text-brand-500 block">Structured Course?</span>
                   </h2>
                   
                   <div className="space-y-6 text-lg font-medium text-gray-600 leading-relaxed text-left max-w-3xl mx-auto">
                      <p>
                         Most People Fail And Leave This Skill Because They Lack The Basics To Generate Consistent Results For Their Business And Their Client's Business.
                      </p>
                      <p>
                         Running Profitable TikTok Ads Requires Proper Knowledge And Experience In Creative Optimization, Analytical Skills, Pro Campaign Management, And More...
                      </p>
                      
                      <div className="bg-brand-500 text-black p-6 rounded-2xl font-bold shadow-lg transform rotate-1 hover:rotate-0 transition-transform border border-black/5">
                         No One Would Want To Work With You If You Can Not Generate Regular Good Results. Your Clients Will Leave Negative Reviews And You Will Feel A Lack Of Confidence.
                      </div>

                      <p>
                         That's Why <span className="text-brand-500 font-bold">Intrax Media</span> Has Developed Structured Training To Equip You With The Right Mindset For Generating Consistent Results.
                      </p>
                      <p>
                         You Will See <span className="text-brand-500 font-bold uppercase">LIVE PROVEN STRATEGIES</span> That Are Generating Millions Of Sales For Our Clients In Our Ad Accounts With Detailed Metrics Perception And Analysis.
                      </p>
                   </div>
                </div>
             </FadeInSection>
         </div>
      </section>

      {/* SKILLS */}
      <section className="py-24 bg-white">
         <div className="max-w-6xl mx-auto px-4">
            <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl font-display font-black text-black"><span className="text-brand-500 yellow-glow">Skills</span> You Will Master</h2>
            </FadeInSection>
            
            <div className="flex flex-wrap justify-center gap-4">
               {["MARKETING CAMPAIGNS", "MARKETING STRATEGY", "TIKTOK MARKETING", "TIKTOK ADS", "TIKTOK CREATIVE"].map((skill, i) => (
                  <FadeInSection key={i} delay={i * 50} className="border-2 border-brand-500 px-6 py-3 rounded-full text-black font-black uppercase tracking-wider text-sm hover:bg-brand-500 hover:text-black transition-colors cursor-default shadow-lg">
                     {skill}
                  </FadeInSection>
               ))}
            </div>
         </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-24 bg-white border-t border-brand-50">
         <div className="max-w-4xl mx-auto px-4">
            <FadeInSection className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-display font-black mb-6 text-black">Can You Handle This Value Bomb In Such An Affordable Price?</h2>
            </FadeInSection>

            <div className="space-y-4">
               {modules.map((mod, i) => (
                  <FadeInSection key={i} delay={i * 50} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-brand-500 transition-colors shadow-sm">
                     <button 
                       onClick={() => toggleModule(i)}
                       className="w-full flex justify-between items-center p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors group"
                     >
                        <span className="font-black text-black text-lg transition-colors uppercase">Module {i + 1}: {mod.title}</span>
                        {openModule === i ? <ChevronUp className="text-brand-500" strokeWidth={3} /> : <ChevronDown className="text-gray-300 group-hover:text-brand-500" strokeWidth={3} />}
                     </button>
                     <div className={`px-6 pb-6 pt-2 text-gray-600 font-medium leading-relaxed transition-all duration-300 ${openModule === i ? 'block opacity-100' : 'hidden opacity-0'}`}>
                        {mod.desc}
                     </div>
                  </FadeInSection>
               ))}
            </div>
            
            <FadeInSection className="mt-12 bg-white border border-brand-200 p-6 rounded-xl text-center shadow-lg">
               <p className="text-black text-lg font-medium italic">
                  This Comprehensive Course, Taught By <span className="text-brand-500 font-bold">Intrax Media Experts</span>, Takes You From Complete Beginner To Confident TikTok Ads Champion In A Structured, Step-By-Step Journey.
               </p>
            </FadeInSection>
         </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-24 bg-white">
         <div className="max-w-5xl mx-auto px-4">
            <FadeInSection className="mb-12">
               <h2 className="text-4xl font-display font-black mb-2 text-black">At The End Of This Course,</h2>
               <h2 className="text-4xl font-display font-black text-brand-500">You Will Be Able To:</h2>
            </FadeInSection>

            <div className="space-y-4">
               {outcomes.map((item, i) => (
                  <FadeInSection key={i} delay={i * 50} className="flex items-center space-x-4 bg-white p-6 rounded-2xl border border-gray-200 hover:border-brand-500 transition-colors group shadow-sm hover:shadow-lg">
                     <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                        <Check size={16} className="text-black" strokeWidth={4} />
                     </div>
                     <span className="font-bold text-gray-800 group-hover:text-black text-lg">{item}</span>
                  </FadeInSection>
               ))}
            </div>

            <div className="mt-12">
               <Link to="/contact">
                  <Button variant="black" className="shadow-2xl">GIVE ME THIS VALUE BOMB</Button>
               </Link>
            </div>
         </div>
      </section>
      
      {/* MISSION & LAPTOP */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-brand-50">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <h2 className="text-4xl font-display font-black text-black leading-none mb-6">
                  Intrax Media's<br/>
                  <span className="text-brand-500">Core Mission</span>
               </h2>
               <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  Intrax Media Is A <span className="text-brand-500 font-bold">Digital Marketing Agency</span> Based In Lahore. We Have Spent Millions Of Dollars On 100s Of Accounts For Our Clients And Currently Managing <span className="text-brand-500 font-bold">30+</span> Accounts.
               </p>
               <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  The Knowledge That We Have Shared In The Course Is Based On Our Years Of Experience.
               </p>
               <p className="text-gray-600 font-medium leading-relaxed">
                  Our Team Launches New Tests In Ad Accounts To Develop New Ways To <span className="text-brand-500 font-bold">Maximize Client Profitability</span>.
               </p>
            </FadeInSection>
            
            <FadeInSection delay={200}>
                <div className="relative group perspective-1000">
                   <div className="absolute inset-0 bg-brand-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                     alt="Intrax Media E-commerce Analytics and Performance Tracking Dashboard for TikTok Ads" 
                     className="relative z-10 rounded-xl shadow-2xl transform rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 border-2 border-gray-100 bg-white" 
                   />
                </div>
            </FadeInSection>
         </div>
      </section>

      {/* PRICING & FAQ */}
      <section className="py-24 bg-white border-t border-brand-100">
         <div className="max-w-4xl mx-auto px-4">
            
            {/* Price Box */}
            <FadeInSection className="bg-white rounded-[2rem] p-10 md:p-16 text-center mb-24 relative overflow-hidden border-4 border-brand-500 shadow-2xl">
               <div className="relative z-10">
                  <h3 className="text-black font-bold uppercase tracking-widest mb-4">Curious? Why Have We Kept The Price Super Affordable?</h3>
                  <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                     We Charge 10-30K PKR Just For One 1-1 Session Of 1 Hour.<br/>
                     With Our ~5 Hours Of Course Content We Could Have Easily Charged 50-150K.
                  </p>
                  <p className="text-black font-bold mb-8">
                     But We Wanted To Make It A <span className="text-brand-500 underline decoration-wavy">Accessible For Everyone</span>.
                  </p>
                  <p className="text-gray-500 font-medium mb-10 text-sm">
                     So This Course Is Far More Valuable Than 1-1 Sessions Because You Will Learn Basics To Advance Level Skill At Your Own Pace.<br/>
                     Grab This Opportunity To Develop Expertise In The Most Demanded Skill Of 2024.
                  </p>
                  <Link to="/contact">
                     <Button variant="black" className="shadow-2xl">YES! Enroll Me Now</Button>
                  </Link>
               </div>
            </FadeInSection>

            {/* FAQs */}
            <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl font-display font-black text-black">We have Summed Up Your<br/>Most Asked Questions</h2>
            </FadeInSection>

            <div className="space-y-4">
               {faqs.map((faq, i) => (
                  <FadeInSection key={i} delay={i * 50} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-500 transition-colors">
                     <button 
                       onClick={() => toggleFaq(i)}
                       className="w-full flex justify-between items-center p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                     >
                        <span className="text-base font-bold text-black pr-8">{faq.q}</span>
                        {openFaq === i ? <ChevronUp className="text-brand-500" strokeWidth={3} /> : <ChevronDown className="text-gray-400" strokeWidth={3} />}
                     </button>
                     <div className={`px-6 pb-6 pt-2 text-gray-600 text-sm font-medium leading-relaxed transition-all duration-300 ${openFaq === i ? 'block opacity-100' : 'hidden opacity-0'}`}>
                        {faq.a}
                     </div>
                  </FadeInSection>
               ))}
            </div>
            
            <div className="text-center mt-16">
               <Link to="/contact">
                  <Button variant="black" size="lg" className="shadow-xl">YES! Enroll Me Now</Button>
               </Link>
            </div>

         </div>
      </section>

    </div>
  );
};