import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { CEOImageEffect } from '../components/CEOImageEffect';
import { Check, ShoppingBag, Target, Smartphone, Home, Activity, Globe, Users, Truck, TrendingUp, BarChart, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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
    { name: "Anmol", role: "Senior Performance Marketer", img: "/images/main images/anmol.jpeg" },
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
              { title: "Our Agency's Vision", text: "We Invest Deeply In Every Project We Take On. Our Team Takes Time To Strategically Analyze Brand Weaknesses And Present Comprehensive Business Solutions That Close Critical Gaps Effectively." },
              { title: "Intrax Matters", text: "At Intrax Media, We Stand By Three Core Values: Unwavering Integrity You Can Depend On, Unmatched Loyalty That Endures, And Trust That Stands The Test Of Time." },
              { title: "Our Course And ECommerce Consultations", text: "Our TikTok Ads Course And E-Commerce Consultations Share The Proven Strategies And Real-World Insights We've Personally Tested And Implemented Successfully." }
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 100} className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-brand-50 hover:border-brand-500 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                 <h3 className="text-3xl font-black mb-6 uppercase text-black group-hover:text-brand-500 transition-colors border-l-4 border-brand-500 pl-4">{item.title}</h3>
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
                     Intrax Media Was Founded By <span className="text-brand-500 font-bold">Faizan Ali</span> (CEO-Founder), A Born Digital Marketing Expert Who Believes In Implementing Marketing Strategies Aligned With Latest Trends And Techniques Centered Around Targeted Audiences.
                  </p>
                  <p>
                     At Intrax Media, We Commit To Delivering Authentic And Measurable Outcomes. NO EMPTY PROMISES! We've Generated Millions In Revenue For Our Clients In Dropshipping And Private Label Businesses Through Strategic Facebook, Instagram, TikTok, And Google Ads Campaigns.
                  </p>
                  <p>
                     We Prioritize Client Expectations And Deliver Satisfaction By Implementing Revenue And Growth-Generating Mechanisms In Our Advertising Strategies And Creative Frameworks.
                  </p>
                  <p className="text-brand-500 font-black uppercase tracking-widest mt-8">Want To Speak With Our CEO?</p>
               </div>
            </FadeInSection>
         </div>

         <div className="max-w-6xl mx-auto px-4">
             <FadeInSection className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-left order-2 md:order-1">
                   <p className="font-bold text-gray-400 uppercase tracking-widest text-sm border-l-4 border-brand-500 pl-3">Meet The Leader Behind Intrax Media</p>
                   <h3 className="text-4xl font-black text-black">Faizan Ali, CEO & Founder</h3>
                   <div className="space-y-4 text-gray-600 font-medium">
                     <p>
                        At Intrax Media, We Focus On One Mission: Helping Businesses Achieve Sustainable Growth. Under Faizan Ali's Leadership, Intrax Media Has Helped Clients Build Powerful Brands Through Elite Branding With Expert Brand Consultant Collaboration And Generated Millions In Revenue Through Effective Ad Campaigns On Facebook, Instagram, TikTok, And Google.
                     </p>
                     <p>
                        We Believe Results Should Speak Louder Than Words. Our Strategies Are Built On Solid Data And Tailored To Each Business, Ensuring Sustainable Growth Without Any Guesswork.
                     </p>
                     <p>
                        Our Clients Trust Us Because We Focus On What Actually Works. No Exaggerated Claims—Just A Genuine Commitment To Delivering Real, Measurable Success.
                     </p>
                   </div>
                   <div className="pt-6">
                      <p className="text-brand-500 font-bold mb-4 text-lg">Ready To Discuss The Strategy We Have For Your Business?</p>
                      <Link to="/contact">
                         <Button variant="black" className="shadow-xl">Schedule Your Call Now!</Button>
                      </Link>
                   </div>
                </div>
                <div className="relative order-1 md:order-2">
                   <CEOImageEffect 
                     src="/images/main images/faizi.png"
                     alt="Faizan Ali - CEO and Founder of Intrax Media E-commerce Marketing Agency"
                     name="Faizan Ali"
                     role="CEO & Founder"
                   />
                </div>
             </FadeInSection>
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
                    "Customer Acquisition\nAnd Retention",
                    "Strategy And Data\nAnalytics",
                    "Creative Direction\nAnd Branding"
                  ].map((title, i) => (
                    <div key={i} className="border-2 border-brand-100 p-10 rounded-[2rem] hover:border-brand-500 transition-colors bg-white shadow-lg hover:shadow-xl group">
                       <h3 className="text-black group-hover:text-brand-500 font-black text-2xl mb-2 whitespace-pre-line transition-colors">{title}</h3>
                       <div className="w-12 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
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
             <div className="bg-white border-2 border-brand-100 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow">
                <p className="text-gray-600 text-base mb-6 font-medium leading-relaxed">
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