import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { CEOImageEffect } from '../components/CEOImageEffect';
import { Check, ShoppingBag, Target, Smartphone, Home, Activity, Globe, Users, Truck, TrendingUp, BarChart, ArrowRight, Shield, Award, Layers, Handshake, Zap, Star, Compass, Heart, BookOpen } from 'lucide-react';

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

export const About: React.FC = () => {
  const location = useLocation();
  const { section } = useParams();

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location, section]);

  const industries = [
    { title: "Clothing & Fashion", icon: ShoppingBag, desc: "Our Team Possesses Deep Knowledge Of Fashion Trends, Consumer Psychology, And Retail Market Dynamics. We've Elevated Clothing Brands To New Heights With Strategies That Combine Creative Excellence With Data-Driven Market Intelligence." },
    { title: "Gifting", icon: Target, desc: "We've Perfected The Art Of Creating Memorable Brand Experiences That Build Emotional Connections And Drive Customer Loyalty. Our Approach Transforms Simple Gifting Into Powerful Stories That Motivate Purchasing Decisions And Strengthen Brand Authority." },
    { title: "Tech & Gadgets", icon: Smartphone, desc: "We Excel At Launching Tech Products Through Strategic Marketing Campaigns That Capture Market Attention. Our Focus Highlights Innovation, Practical Usability, And The Cutting-Edge Technology Behind Every Product." },
    { title: "Real Estate", icon: Home, desc: "Our Real Estate Marketing Expertise Is Built On Comprehensive Market Analysis And Predictive Trend Forecasting. Intrax Media Crafts Compelling Narratives That Sell Lifestyles And Aspirations, Positioning Our Clients As Industry Leaders." },
    { title: "Healthcare", icon: Activity, desc: "Our Approach Combines Deep Understanding Of Healthcare Regulations, Patient Expectations, And Medical Innovations. This Makes Us The Preferred Partner For Healthcare Brands Seeking Meaningful Market Impact And Trust-Building Communication." },
    { title: "Ecommerce", icon: Globe, desc: "Intrax Media Has Transformed The E-Commerce Landscape With Innovative Digital Strategies That Drive Traffic, Convert Visitors, And Build Customer Loyalty. We Optimize Every Touchpoint From Interface Design To Post-Purchase Customer Support." },
    { title: "Lead Generation", icon: Users, desc: "We Specialize In Developing High-Impact Strategies That Attract And Engage Qualified Prospects. Our Methods Ensure A Consistent Flow Of Quality Leads Ready To Be Nurtured Into Long-Term Loyal Customers." },
    { title: "Dropshipping", icon: Truck, desc: "Our Dropshipping Strategies Are Engineered For Maximum Efficiency And Profitability. Intrax Media Masters Supplier Relationships, Product Listing Optimization, And Marketing Execution To Turn Dropshipping Ventures Into Revenue-Generating Machines." },
  ];

  const team = [
    { name: "Anmol", role: "Senior Performance Marketer", img: "/images/main images/anmol2.jpeg" },
    { name: "Hasnain Ali", role: "Senior Video Editor", img: "/images/main images/hasnain.jpeg" },
    { name: "Hammad Khan", role: "Graphic Designer", img: "/images/main images/hammad.jpg" },
    { name: "Zohaib Uddin", role: "Shopify Developer", img: "/images/main images/zohaib.png" },
    { name: "Saad Rasool", role: "Creative Dept. Head", img: "/images/main images/saad.jpg" },
    { name: "Ahmed Ali", role: "Lead Media Buyer", img: "/images/main images/ahmed.jpg" },
    { name: "Anamta Bashir", role: "Assistant Sales Executive", img: "/images/main images/anamta.jpg" },
    { name: "Huzaifa Malik", role: "Performance Marketer", img: "/images/main images/huzaifa.jpg" },
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
      `}</style>

      {/* 1. Header Section */}
      <section id="our-vision" className="pt-32 pb-20 bg-white relative overflow-hidden scroll-mt-20">
         {/* Background Orbs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[120px] opacity-70"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-50 rounded-full blur-[100px] opacity-70"></div>

         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <FadeInSection>
           <h1 className="text-4xl md:text-6xl font-display font-black mb-16 leading-tight text-black">
                  Creating Powerful Growth<br/>
                  <span className="text-brand-500 yellow-glow">Ecosystems For Brand Excellence</span>
               </h1>
               
               {/* The 4 steps visualization */}
               <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative">
                  {/* Background wave simulation */}
                  <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-100 to-transparent blur-xl pointer-events-none hidden md:block"></div>
                  
                  {[
                     "Customer Acquisition\nAnd Retention",
                     "Strategy And\nData Analytics",
                     "Creative Direction\nAnd Branding",
                     "Execution And Scaling"
                  ].map((step, i) => (
                     <div key={i} className="relative z-10 bg-white text-black rounded-[2rem] px-8 py-6 font-bold text-sm md:text-base shadow-xl border-2 border-brand-100 hover:border-brand-500 whitespace-pre-line text-center w-64 md:w-auto min-h-[100px] flex items-center justify-center transform hover:-translate-y-2 transition-all duration-300">
                        <span className="absolute -top-3 -left-3 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center font-black text-xs border-2 border-white shadow-md text-white">0{i+1}</span>
                        {step}
                     </div>
                  ))}
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* 2. Vision & Values - Card Style */}
      <section className="py-24 bg-white border-t border-brand-50">
         <div className="max-w-6xl mx-auto px-4 space-y-10">
            {[
              { 
                title: "Our Agency's Vision", 
                icon: Compass,
                text: "At Intrax Media, our vision transcends traditional marketing. We invest deeply in every project, treating your business as our own. Our team of specialists conducts rigorous strategic analysis to identify hidden brand weaknesses and market gaps. We don't just provide services; we build comprehensive growth ecosystems that ensure long-term scalability and market dominance. Our goal is to be the definitive catalyst for your brand's evolution, transforming challenges into sustainable competitive advantages through innovation and precision." 
              },
              { 
                title: "Intrax Matters", 
                icon: Heart,
                text: "The 'Intrax' in our name stands for the core values that define our character: Unwavering Integrity, Unmatched Loyalty, and Trust that stands the test of time. We believe that in the fast-paced digital world, human connection and ethical business practices are more important than ever. Every strategy we implement and every decision we make is guided by transparency and a commitment to your brand's best interests. We measure our success by the strength of our partnerships and the enduring trust our clients place in us." 
              },
              { 
                title: "Our Course And ECommerce Consultations", 
                icon: BookOpen,
                text: "Knowledge sharing is at the heart of our mission. Our specialized TikTok Ads Course and E-Commerce Consultations are built on the exact blueprints we've used to generate millions in revenue. We empower business owners and marketing teams with real-world insights, proven frameworks, and the latest industry techniques. Our consultations are not generic; they are deep-dive sessions tailored to your specific operational needs, providing you with a clear, actionable roadmap to scale your brand profitably and predictably." 
              }
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 100} className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-brand-50 hover:border-brand-500 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                       <item.icon size={28} />
                    </div>
                    <h3 className="text-3xl font-black uppercase text-black group-hover:text-brand-500 transition-colors border-l-4 border-brand-500 pl-4">{item.title}</h3>
                 </div>
                 <p className="text-lg text-gray-600 font-medium leading-relaxed group-hover:text-black transition-colors">
                    {item.text}
                 </p>
              </FadeInSection>
            ))}
         </div>
      </section>

      {/* 3. Work With Us */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <FadeInSection>
               <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-black">
                  We're Excited To<br/>
                  Partner With You And<br/>
                  <span className="text-brand-500 yellow-glow">Your Business</span>
               </h2>
               <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
                  Our Conversations Begin With A Brief Overview Of Your Business's Current Performance And Goals. We Then Move Into Comprehensive Business Diagnostics, Marketing Programs, And Revenue Analysis. We Identify Revenue Maximization Opportunities Before Starting Any Engagement.
               </p>
               <Link to="/contact">
                  <Button variant="black" size="lg" className="shadow-xl">Schedule A Discovery Call</Button>
               </Link>
            </FadeInSection>
            
            <FadeInSection delay={200}>
               <div className="relative group">
                  <div className="absolute inset-0 bg-brand-500 rounded-[2.5rem] transform rotate-2 transition-transform group-hover:rotate-0 opacity-20"></div>
                  {/* Laptop Mockup Placeholder using an image */}
                  <img src="./images/main images/results.png" alt="Intrax Media E-commerce Growth Analytics and Performance Tracking Dashboard" className="rounded-[2.5rem] shadow-2xl border-4 border-white transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 relative z-10 bg-white" />
                  
                  <div className="absolute -bottom-6 -right-6 bg-brand-500 text-black p-4 rounded-xl font-bold shadow-xl z-20 flex items-center gap-2 animate-bounce">
                     <TrendingUp size={24} />
                     <span>Results Driven</span>
                  </div>
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* 4. Hands-On Industries */}
      <section id="our-domain" className="py-24 bg-white border-t border-brand-50 scroll-mt-32">
         <div className="max-w-7xl mx-auto px-4">
            <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-black">Our Team <span className="text-brand-500 yellow-glow">Expertise</span> Across Industries</h2>
               <p className="text-gray-500 font-bold uppercase tracking-wider">Specializing In Key Sectors That Drive Business Growth.</p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {industries.map((ind, i) => (
                  <FadeInSection key={i} delay={i * 50} className="bg-white p-8 rounded-[2rem] border-2 border-brand-50 hover:border-brand-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                     <div className="mb-6 text-brand-500 bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <ind.icon size={32} />
                     </div>
                     <h3 className="text-xl font-black mb-3 text-black group-hover:text-brand-500 transition-colors">{ind.title}</h3>
                     <p className="text-sm font-medium leading-relaxed text-gray-500 group-hover:text-gray-700">
                        {ind.desc}
                     </p>
                  </FadeInSection>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Growth Barriers CTA */}
      <section className="py-20 bg-brand-50 text-center relative overflow-hidden">
         <FadeInSection className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-black mb-4">Break Through Ecommerce Growth Barriers</h2>
            <p className="text-brand-500 font-black text-2xl mb-10 uppercase tracking-wide">Start Your Journey</p>
            <Link to="/contact">
               <Button variant="black" size="lg" className="shadow-2xl">
                  Book A Discovery Call + Analysis + Onboarding
               </Button>
            </Link>
         </FadeInSection>
      </section>

      {/* 6. Our Story & Visionary */}
      <section id="our-story" className="py-24 bg-white scroll-mt-32">
         <div className="max-w-5xl mx-auto px-4 text-center mb-24">
            <FadeInSection>
               <h2 className="text-5xl font-display font-black mb-8 text-black">Our <span className="text-brand-500 yellow-glow">Journey</span></h2>
               <div className="space-y-6 text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto text-lg">
                  <p>
                     Intrax Media Was Founded By <span className="text-brand-500 font-bold">Faizan Ali</span> (CEO) And <span className="text-brand-500 font-bold">Anmol</span> (Founder), Visionary Digital Marketing Experts Who Believe In Implementing Marketing Strategies Aligned With Latest Trends And Techniques Centered Around Targeted Audiences.
                  </p>
                  <p>
                     At Intrax Media, We Commit To Delivering Authentic And Measurable Outcomes. NO EMPTY PROMISES! We've Generated Millions In Revenue For Our Clients In Dropshipping And Private Label Businesses Through Strategic Facebook, Instagram, TikTok, And Google Ads Campaigns.
                  </p>
                  <p>
                     We Prioritize Client Expectations And Deliver Satisfaction By Implementing Revenue And Growth-Generating Mechanisms In Our Advertising Strategies And Creative Frameworks.
                  </p>
                  <p className="text-brand-500 font-black uppercase tracking-widest mt-8">Want To Speak With Our Leadership Team?</p>
               </div>
            </FadeInSection>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="text-center mb-20">
               <div className="inline-block px-4 py-2 border border-brand-500 text-brand-500 font-black uppercase text-xs rounded-full mb-6 tracking-widest shadow-sm">Leadership</div>
               <h2 className="text-5xl md:text-7xl font-display font-black text-black leading-none mb-4">Meet the <span className="text-brand-500">Visionaries</span></h2>
               <p className="text-gray-600 font-bold text-xl uppercase tracking-widest opacity-80">The Minds Behind Intrax Media's Success</p>
            </FadeInSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative group/visionary">
               {/* Anmol - Founder */}
               <div className="relative z-10 lg:pr-10">
                  <div className="transform lg:group-hover/visionary:scale-[1.02] transition-all duration-1000 ease-out">
                     <CEOImageEffect 
                        src="/images/main images/anmol.png"
                        alt="Anmol"
                        name="Anmol"
                        role="Founder"
                     />
                     <div className="mt-10 space-y-6">
                        <div className="border-l-8 border-brand-500 pl-8 py-2">
                           <h3 className="text-4xl font-black text-black">Anmol</h3>
                           <p className="text-brand-500 font-bold text-xl uppercase tracking-wider mt-1">Founder</p>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-medium text-lg">
                           As the Founder of Intrax Media, Anmol has been the architectural force behind the agency's core philosophy of "Measurable Excellence." With a profound understanding of the e-commerce landscape, she established Intrax Media in 2022 with a vision to bridge the gap between creative storytelling and data-driven performance. Her leadership focuses on building a culture of innovation where every team member is empowered to push the boundaries of what's possible in digital marketing. Under her guidance, the agency has scaled from a small team to a powerhouse of 15+ specialists, consistently delivering 7-8 figure growth for brands worldwide. Her strategic foresight and commitment to quality have made Intrax Media a trusted partner for global e-commerce brands.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Faizan Ali - CEO */}
               <div className="relative z-10 lg:pl-10">
                  <div className="transform lg:group-hover/visionary:scale-[1.02] transition-all duration-1000 ease-out">
                     <CEOImageEffect 
                        src="/images/main images/faizi.png"
                        alt="Faizan Ali"
                        name="Faizan Ali"
                        role="CEO"
                     />
                     <div className="mt-10 space-y-6">
                        <div className="border-l-8 border-brand-500 pl-8 py-2">
                           <h3 className="text-4xl font-black text-black">Faizan Ali</h3>
                           <p className="text-brand-500 font-bold text-xl uppercase tracking-wider mt-1">CEO</p>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-medium text-lg">
                           Faizan Ali, as the CEO of Intrax Media, brings a relentless focus on performance and scalability. With years of experience managing multi-million dollar ad spends, he has mastered the art of navigating complex algorithms across Meta, TikTok, and Google. His strategic oversight ensures that every campaign is not just an expense, but a high-yielding investment for our clients. Faizan's approach is rooted in deep analytical perception, allowing Intrax Media to identify growth opportunities that others miss. His leadership is defined by a commitment to transparency and a drive to let results speak for themselves, cementing Intrax Media's reputation as a top-tier e-commerce scaling partner. He personally oversees the growth strategies for our most ambitious clients, ensuring that every brand under the Intrax umbrella achieves its full potential.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Colliding Animation Overlay (Visual only) */}
               <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-brand-500/20 to-transparent"></div>
                  {/* Impact Sparkle on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/0 group-hover/visionary:bg-brand-500/30 rounded-full blur-3xl transition-all duration-1000 scale-0 group-hover/visionary:scale-100"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px bg-brand-500 group-hover/visionary:scale-[500] transition-all duration-1000 opacity-0 group-hover/visionary:opacity-10 rounded-full"></div>
               </div>
            </div>

            <div className="mt-20 text-center">
               <p className="text-brand-500 font-black text-2xl mb-8">Ready to scale under expert leadership?</p>
               <Link to="/contact">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">Book A Call Now</Button>
               </Link>
            </div>
         </div>
      </section>

      {/* 7. Strategize Unify Excel */}
      <section className="py-24 bg-white text-center border-t border-brand-50">
         <div className="max-w-7xl mx-auto px-4">
            <FadeInSection>
               <h2 className="text-4xl md:text-5xl font-display font-black mb-16 text-black">
                  We Strategize, Unify And Excel Your Growth Engine<br/>
                  Across Three Core Domains
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Customer Acquisition\nAnd Retention", 
                      icon: Users,
                      text: "We Focus On Attracting High-Quality Leads And Turning Them Into Loyal Customers. Our Strategies Are Designed To Not Only Increase Your Customer Base But Also To Maximize The Lifetime Value Of Every Customer Through Targeted Retention Campaigns, Loyalty Programs, And Personalized Communication Channels That Keep Your Brand Top-Of-Mind." 
                    },
                    { 
                      title: "Strategy And Data\nAnalytics", 
                      icon: BarChart,
                      text: "Data Is At The Heart Of Everything We Do. We Use Advanced Analytics To Track Performance, Identify Trends, And Optimize Your Campaigns For Maximum ROI. Our Data-Driven Approach Ensures That Every Decision Is Backed By Solid Evidence, Allowing Us To Pivot Quickly And Capitalize On Emerging Market Opportunities Before Your Competitors Do." 
                    },
                    { 
                      title: "Creative Direction\nAnd Branding", 
                      icon: Layers,
                      text: "We Help You Build A Brand Identity That Resonates Deeply With Your Target Audience. Our Creative Team Works Closely With You To Develop Compelling Visuals, High-Impact Video Content, And Strategic Messaging That Tell Your Brand's Story, Build Emotional Connections, And Drive Consistent Engagement Across All Digital Touchpoints." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-2 border-brand-100 p-10 rounded-[2rem] hover:border-brand-500 transition-all bg-white shadow-lg hover:shadow-xl group flex flex-col items-center text-center">
                       <div className="mb-6 text-brand-500 bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <item.icon size={32} />
                       </div>
                       <h3 className="text-black group-hover:text-brand-500 font-black text-2xl mb-4 whitespace-pre-line transition-colors">{item.title}</h3>
                       <p className="text-gray-600 font-medium leading-relaxed mb-6 group-hover:text-black transition-colors">
                          {item.text}
                       </p>
                       <div className="w-12 h-1 bg-brand-500 mx-auto mt-auto rounded-full"></div>
                    </div>
                  ))}
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* 8. Process Steps */}
      <section className="py-24 bg-white border-t border-brand-50">
         <div className="max-w-5xl mx-auto px-4 space-y-16">
            <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-display font-black text-black mb-4">
                 Trust <span className="text-brand-500 yellow-glow border-b-4 border-brand-500">Intrax Media's</span> Process!
               </h2>
               <p className="text-gray-600 font-bold text-xl uppercase tracking-widest opacity-80 mb-8">We Are Certified Marketing Experts.</p>
               <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto">
                  In The First Three Months, We Conduct Comprehensive Business Analysis And Begin Implementing Win-Win Strategies. <span className="text-brand-500 font-bold bg-brand-50 px-2 rounded">NO FLUFFY-BULKY AGENCY SCOPES.</span>
               </p>
            </FadeInSection>

            {[
               { num: "1", text: "We Identify Your Core Business Objectives, Then Create A Plan That Addresses Immediate Growth Challenges First." },
               { num: "2", text: "Our Teams Are Assembled With Transparent Pricing, Ensuring Your Expenses Are Custom, Cost-Effective, And Directly Aligned With Real Objectives. It's A Win-Win Partnership." },
               { num: "3", text: "We Enable Fast And Continuous Implementation Of Essential Marketing Strategies, Keeping You Ahead Of Industry Trends At All Times." }
            ].map((step, i) => (
               <FadeInSection key={i} className="flex gap-8 items-start group">
                  <div className="text-8xl font-black text-gray-100 leading-none font-display group-hover:text-brand-500 transition-colors duration-500 select-none">{step.num}</div>
                  <p className="text-lg text-gray-700 font-medium pt-4 leading-relaxed group-hover:text-black transition-colors">{step.text}</p>
               </FadeInSection>
            ))}
            
            <div className="text-center pt-10">
               <Link to="/contact">
                  <Button variant="black" size="lg" className="shadow-xl">Book A Discovery Call</Button>
               </Link>
            </div>
         </div>
      </section>
      
      {/* 9. Partnership & Before/After */}
      <section id="why-intrax" className="py-24 bg-white scroll-mt-32">
         <div className="max-w-4xl mx-auto px-4 text-center mb-16">
             <div className="bg-white border-2 border-brand-100 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10">
                   <Handshake className="text-white" size={40} />
                </div>
                <p className="text-gray-600 text-base mb-6 font-medium leading-relaxed mt-6">
                   Our Partnership Brings You Data-Driven Strategies, Measurement Infrastructure Systems, And Skilled Execution Needed To End Guesswork And Start Consistent Revenue Generation.
                </p>
                <p className="text-gray-600 text-base mb-8 font-medium leading-relaxed">
                   Initially, Our Experts Collaborate With You To Refine What Works And Introduce Innovative Revenue Initiatives, Then Scale Them Systematically. Finally, We Equip Your Team With The Knowledge And Confidence To Lead, Leaving You With A Reliable, Innovative Revenue Stream That Delivers Continuous Growth.
                </p>
                <p className="text-brand-500 font-black uppercase tracking-widest text-lg">A Win-Win Partnership For Everyone.</p>
             </div>
         </div>

         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
             {/* Before */}
             <FadeInSection className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
                <h3 className="text-3xl font-display font-black mb-8 border-b-4 border-gray-200 pb-2 inline-block text-gray-400">Before</h3>
                <ul className="space-y-4">
                   {[
                      "Stagnant Growth Initiatives",
                      "Rising Cost Per Acquisition, Declining Return On Ad Spend",
                      "Uninspired Creative Campaigns",
                      "Outdated Agency Approaches",
                      "Vague Or Oversimplified Tracking"
                   ].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-500 font-medium">
                         <span className="w-4 h-0.5 bg-gray-400 mr-3"></span> {item}
                      </li>
                   ))}
                </ul>
             </FadeInSection>
             
             {/* After */}
             <FadeInSection className="bg-brand-50 p-10 rounded-[2rem] border border-brand-100 shadow-lg">
                <h3 className="text-3xl font-display font-black mb-8 border-b-4 border-brand-500 pb-2 inline-block text-black">After</h3>
                <ul className="space-y-4">
                   {[
                      "Clear Paths To Predictable Growth",
                      "Systematic, Winning And Fresh Creative Initiatives",
                      "Enhanced Ad Effectiveness On Key Metrics",
                      "Transparent Costs And Aligned Goals",
                      "Advanced Multi-Touch Tracking Reflecting Modern Buying Behavior"
                   ].map((item, i) => (
                      <li key={i} className="flex items-start text-black font-bold">
                         <Check size={20} className="text-brand-500 mr-3 mt-0.5 shrink-0" strokeWidth={3} /> {item}
                      </li>
                   ))}
                </ul>
             </FadeInSection>
         </div>
      </section>

      {/* 10. Team Grid */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-brand-50">
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <FadeInSection className="text-center mb-20">
               <p className="text-gray-500 font-bold text-sm uppercase mb-4 tracking-widest">The Intrax Media Team</p>
               <h2 className="text-3xl md:text-5xl font-display font-black text-black">
                  WE'RE NOT JUST MARKETERS.<br/>
                  WE ARE <span className="text-brand-500 yellow-glow">INDUSTRY LEADERS</span>.
               </h2>
            </FadeInSection>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {team.map((member, i) => (
                  <FadeInSection key={i} delay={i * 50} className="group relative rounded-[2rem] overflow-hidden border-2 border-brand-50 hover:border-brand-500 transition-colors shadow-lg">
                     <div className="aspect-[3/4] bg-gray-100">
                        <img src={member.img} alt={`${member.name} - ${member.role} at Intrax Media`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm p-4 text-center border-t border-brand-100 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-black">
                        <p className="text-black font-black text-lg group-hover:text-black">{member.name}</p>
                        <p className="text-brand-500 text-xs font-bold uppercase group-hover:text-white">{member.role}</p>
                     </div>
                  </FadeInSection>
               ))}
            </div>
         </div>
      </section>
      
      {/* Footer Strip */}
      <div className="bg-brand-50 py-6 border-t border-brand-100 text-center px-4">
         <p className="text-gray-600 text-sm font-bold">
            Our 30-Minute Discovery Call With You Is Worth 1 Hour With Other Non-Systematic Agencies.
         </p>
      </div>

    </div>
  );
};