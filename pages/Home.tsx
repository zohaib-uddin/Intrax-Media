import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageCarousel } from '../components/ImageCarousel';
import { Button } from '../components/Button';
import { CEOImageEffect } from '../components/CEOImageEffect';
import { CalendlyEmbed } from '../components/CalendlyEmbed';
import { Check, Star, Play, X, ChevronDown, ChevronUp, Clock, Video, Globe, ArrowRight, Zap, Target, Shield, Award, User } from 'lucide-react';

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

export const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

 const strategies = [
    { 
      title: "Paid Social Agency", 
      desc: "Social Media Should Be A Revenue Driver For Your Business, But Instead It Feels Like Wasting Budget On Ads That Go Nowhere. You Get Clicks, But No Real Conversions. At Intrax Media, We Build Campaigns That Actually Connect With Your Audience And Turn Them Into Paying Customers." 
    },
    { 
      title: "WordPress Websites & Shopify Stores", 
      desc: "You Have Great Products Or Services, But Your Website Isn't Delivering The Results You Expected. Whether It's A Slow-Loading WordPress Site Or A Shopify Store That's Struggling To Convert, We Build And Optimize Websites That Make It Effortless For Visitors To Become Buyers." 
    },
    { 
      title: "Shopify Whitelabel Stores", 
      desc: "Dreaming Of Launching Your Own Shopify Store But Overwhelmed By The Setup Process? Intrax Media Offers Ready-Made Solutions That Save You Time And Effort. You'll Receive A Fully Functional, Professionally Designed Store That's Optimized For Success From Day One." 
    },
    { 
      title: "Search Engine Optimization (SEO)", 
      desc: "You've Heard SEO Is Essential For Online Visibility, But The Results Feel Slow And The Process Seems Complicated. At Intrax Media, We Simplify SEO And Ensure Your Website Gets Discovered By People Actively Searching For Exactly What You Offer." 
    },
    { 
      title: "Branding", 
      desc: "Your Brand Is More Than Just A Logo—It's The First Impression Your Business Makes. But Right Now, Your Brand Doesn't Truly Represent Who You Are Or What You Stand For. We Help You Build A Brand Identity That Resonates Deeply With Your Target Audience." 
    },
    { 
      title: "Performance Ads", 
      desc: "You're Exhausted From Spending Money On Ads That Promise Results But Deliver Nothing. Intrax Media Designs Performance-Driven Campaigns Focused On One Thing: Measurable Results. No More Guesswork, No More Hope—Just Ads That Consistently Bring In Customers And Sales." 
    },
    { 
      title: "Social Media Management Services", 
      desc: "Managing Social Media Feels Like A Full-Time Job, And You're Already Overwhelmed With Running Your Business. Intrax Media Takes The Burden Off Your Shoulders By Managing Your Social Presence, Creating Engaging Content That Builds Real Connections With Your Audience." 
    }
];

  const testimonials = [
    { name: "Talha Khan", role: "CEO", text: "One Of The Best Agencies That Actually Knows How To Launch And Scale An E-Commerce Business. Overall A Complete Team To Handle All Your Hassles." },
    { name: "Ahmed", role: "Marketing Manager", text: "Demonstrated Exceptional Expertise, Delivering A Sleek And Functional Website That Exceeded Our Expectations." },
    { name: "Jamal Nasim", role: "Business Owner", text: "We Have Begun Collaborating With Intrax Media For Social Media Marketing. Eagerly Anticipating A Fruitful And Long-Lasting Working Relationship." },
    { name: "Ayaz Wali", role: "Entrepreneur", text: "A Professional Team With Expert Knowledge And Good Experience. Intrax Media comes Highly Recommended." },
    { name: "Manjee", role: "Store Owner", text: "Intrax Media Gives Promising Results. Require Healthy Budgets, But Never Fails To Meet Highly Profitable Sales Commitments." },
    { name: "Muhammad Saqlain", role: "Founder", text: "Started Working Last Month, A Great Team, And Fast Communication. Performance For This Month Is Exceptional." },
  ];

  const faqs = [
    { q: "What Does A Brand Transformation Involve?", a: "Brand transformation involves a complete overhaul or significant refinement of your brand's visual identity, messaging, and positioning to better align with your business goals and target audience." },
    { q: "How Does Intrax Media Ensure Increased Conversions And Elevated Sales?", a: "We use data-driven strategies, rigorous A/B testing, and conversion rate optimization (CRO) techniques to ensure every visitor has the highest potential to become a paying customer." },
    { q: "What Precision Is Involved In Targeting My Ideal Audience?", a: "We utilize advanced audience segmentation, pixel tracking, and lookalike audiences on platforms like Facebook and TikTok to pinpoint exactly who your potential buyers are." },
    { q: "How Can Intrax Media's TikTok Campaigns Will Help Grow My Brand?", a: "TikTok offers viral potential. We create engaging, native-style content that resonates with the platform's user base, driving massive awareness and engagement." },
    { q: "How Does Intrax Media Boost My Online Presence Potential Through Google Ads?", a: "By targeting high-intent keywords and optimizing ad spend, we ensure your brand appears exactly when potential customers are searching for your solutions." },
    { q: "How Can Intrax Media Turn My Website Landing Pages Better?", a: "We analyze user behavior, improve load speeds, refine copy for persuasion, and streamline the checkout process to minimize friction and maximize sales." },
    { q: "Why choose Intrax Media as your Shopify marketing agency?", a: "Intrax Media is a specialized Shopify marketing agency that focuses on ROI-driven strategies. We combine expert Meta ads management with conversion rate optimization to scale your brand profitably." },
    { q: "What makes you the best E-commerce marketing agency for scaling?", a: "As a premier E-commerce marketing agency, we don't just run ads; we build growth ecosystems. Our full-funnel approach ensures that your customer acquisition and retention are optimized for long-term success." },
  ];

  const brands = ['Hastamuerte', 'Sweetapolita', 'British Supplements', 'RIPPL', 'kidodido', 'notinregs', 'American Trigger Pullers', 'tango foxtrot', 'kona earth coffee', 'griqos', 'panty promise', 'the moss way', 'nurse yard', 'lash by maya', 'one tap wireless'];

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

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-24 bg-white">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[120px] opacity-70"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-50 rounded-full blur-[100px] opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center max-w-6xl mx-auto">
            
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter mb-8 text-black">
  #1 <span className="text-brand-500 yellow-glow">E-commerce</span> Marketing Agency. <br/>
  Scale Your <span className="text-brand-500 yellow-glow">Shopify</span> Brand.
</h1>

{/* <h1 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter mb-8 text-black">
  We Accelerate <span className="text-brand-500 yellow-glow">Online</span> Growth. <br/>
  Smarter Strategies, <span className="text-brand-500 yellow-glow">Higher</span> Returns.
</h1> */}

            
            {/* Hero Cards - Updated to White with Yellow Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 mt-16">
  {[
    "We manage complete Marketing Operations (MOM) to streamline your growth engine.",
    "Professional marketing support for both B2B and DTC brands.",
    "Strategic integration of paid and organic channels for scalable results.",
    "Connect with the right audience and increase sales through data-driven campaigns."
  ].map((item, i) => (
    <div key={i} className="bg-white p-8 rounded-none border border-brand-500 flex flex-col items-start text-left hover:-translate-y-2 transition-all duration-300 shadow-xl group hover:shadow-brand-500/10">
      <div className="mb-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors group-hover:bg-brand-500">
         <Check className="text-brand-500 group-hover:text-black transition-colors" size={28} strokeWidth={4} />
      </div>
      <p className="text-sm font-medium text-black leading-snug group-hover:text-brand-500 transition-colors">{item}</p>
    </div>
  ))}
</div>

            <Link to="/contact">
              <Button size="lg" className="uppercase tracking-widest text-lg px-12 py-5">
                Book Your Strategy Call
              </Button>
            </Link>

            {/* Marquee Brand Carousel */}
            <div className="mt-24 pt-10 border-t border-gray-100 overflow-hidden relative">
               <div className="flex animate-marquee whitespace-nowrap gap-20">
                  {[...brands, ...brands, ...brands].map((brand, idx) => (
                    <span key={idx} className="text-3xl font-black text-black opacity-30 uppercase inline-block mx-4 grayscale hover:grayscale-0 hover:opacity-100 hover:text-brand-500 transition-all cursor-default">{brand}</span>
                  ))}
               </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* STRATEGIES LIST */}
      <section className="py-24 bg-white relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <FadeInSection className="text-center mb-24">
       <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-6 text-black tracking-tight leading-none">
         We Design & Deliver <br/>
         <span className="text-brand-500 inline-block px-2 yellow-glow">Performance-Focused</span> Campaigns
       </h2>
    </FadeInSection>

    <div className="space-y-6">
      {strategies.map((strat, idx) => (
        <FadeInSection key={idx} delay={idx * 50} className="group relative bg-white rounded-3xl p-8 md:p-10 border border-brand-100 hover:border-brand-500 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0">
            <div className="w-20 h-20 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center text-4xl font-display font-black text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-all shadow-lg">
              {idx + 1}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-black mb-4 group-hover:text-brand-500 transition-colors">{strat.title}</h3>
            <p className="text-gray-600 leading-relaxed font-medium text-lg transition-colors">{strat.desc}</p>
          </div>
        </FadeInSection>
      ))}
    </div>
  </div>
</section>

      {/* MISSION */}
     <section className="py-32 bg-white relative border-t border-brand-100">
  <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
    <FadeInSection>
      <h2 className="text-5xl font-display font-black uppercase mb-12 text-black">Our <span className="text-brand-500 yellow-glow">MISSION</span></h2>
      <div className="bg-white p-12 rounded-[2rem] shadow-2xl border-2 border-brand-100 hover:border-brand-500 transition-colors relative">
         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <Target className="text-white" size={40} />
         </div>
         <p className="text-xl md:text-2xl font-bold text-black leading-relaxed mb-10 mt-6">
           "Intrax Media Represents A Forward-Looking Team. Since 2022, We Have Grown Into A Dynamic Force Of 15+ Skilled Professionals Focused On Delivering Measurable Excellence."
         </p>
         <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
           Our Team Goes Beyond Basic Execution — We Partner Closely With You To Understand The Heart Of Your Shopify Brand. From Boosting Conversions To Expanding Reach And Scaling Revenue, We Solve Growth Challenges Strategically.
         </p>
      </div>
    </FadeInSection>
  </div>
</section>

      {/* VISIONARY SECTION */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div>
                  <div className="inline-block px-4 py-2 border border-brand-500 text-brand-500 font-black uppercase text-xs rounded-full mb-6 tracking-widest shadow-sm">Leadership</div>
                  <h2 className="text-5xl md:text-6xl font-display font-black text-black leading-none mb-2">Meet the <br/><span className="text-brand-500">Visionary</span></h2>
                </div>
                
                <div className="border-l-8 border-brand-500 pl-8 py-2">
                   <h3 className="text-4xl font-black text-black">Faizan Ali</h3>
                   <p className="text-brand-500 font-bold text-xl uppercase tracking-wider mt-1">CEO & Founder</p>
                </div>
                
                <p className="text-gray-600 leading-relaxed font-medium text-lg">
Under Faizan Ali's leadership, Intrax Media has driven multi-million revenue growth through high-performing campaigns across Facebook, Instagram, TikTok, and Google. We let performance define our reputation. Every strategy we execute is backed by data and customized to match each brand’s specific goals.                </p>
                
                <div className="pt-4">
                  <p className="text-brand-500 font-black text-2xl mb-6">Want to discuss strategy?</p>
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">Book A Call Now</Button>
                  </Link>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <CEOImageEffect 
                  src="/images/main images/faizi.png"
                  alt="Faizan Ali"
                  name="Faizan Ali"
                  role="CEO & Founder"
                />
              </div>
            </FadeInSection>
         </div>
      </section>

      {/* TESTIMONIALS */}
  <section className="py-24 bg-white border-t border-brand-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <FadeInSection className="text-center mb-20">
       <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-6">
         Our Clients Just <span className="inline-block transform -rotate-3 text-brand-500 yellow-glow border-b-4 border-brand-500">Loved</span> Working With Us
       </h2>
       <p className="text-gray-500 font-bold text-lg tracking-wide uppercase">Will Your Brand Be Our Next Success Story?</p>
     </FadeInSection>
     
     {/* Video Placeholder */}
   <FadeInSection className="mb-24">
  <div 
    onClick={() => setIsVideoModalOpen(true)}
    // Changes: aspect-square, max-w-[400px], mx-auto
    className="relative rounded-[2rem] overflow-hidden aspect-square w-full max-w-[600px] mx-auto group cursor-pointer shadow-2xl border-4 border-brand-100 hover:border-brand-500 transition-colors"
  >
     <video 
       src="/images/intrax media client video.mp4" 
       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
       muted
       playsInline
       preload="metadata"
       aria-label="Intrax Media E-commerce Marketing Client Success Story"
     />
     <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
        <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-white">
           {/* Play button size bhi thora chota kiya hai proportion ke hisaab se */}
           <Play fill="white" className="text-white ml-1" size={32} />
        </div>
     </div>
  </div>
</FadeInSection>

     {/* Video Modal */}
     {isVideoModalOpen && (
       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
         <div 
           className="absolute inset-0 bg-black/90 backdrop-blur-sm"
           onClick={() => setIsVideoModalOpen(false)}
         ></div>
         <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
           <button 
             onClick={() => setIsVideoModalOpen(false)}
             className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
           >
             <X size={24} />
           </button>
           <video 
             src="/images/intrax media client video.mp4" 
             className="w-full h-full"
             controls
             autoPlay
             playsInline
           />
         </div>
       </div>
     )}

     {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { name: "Ali Raza", role: "Founder, Lahore", text: "Intrax Media has completely transformed our Shopify store's performance. From precise targeting to creative ad campaigns, every step is backed by data. Our revenue has consistently grown month-over-month thanks to their strategic guidance." },
    { name: "Jeff Smith", role: "CEO, New York", text: "Working with Intrax Media was a turning point for our brand. They didn't just manage campaigns—they understood our audience and fine-tuned every channel for maximum ROI. The results speak for themselves." },
    { name: "Sara Khan", role: "Marketing Head, Karachi", text: "Their approach combines analytics, creativity, and execution seamlessly. Intrax Media's team dives deep into our business needs, providing solutions that are practical yet innovative. We saw significant improvement in both traffic and conversions." },
    { name: "Emma Johnson", role: "Director, London", text: "From the first consultation, we knew Intrax Media was different. Their meticulous planning and hands-on management of our campaigns have consistently exceeded expectations. The ROI on our ad spend has never been higher." },
    { name: "Michael Brown", role: "CMO, Los Angeles", text: "Intrax Media's expertise in paid and organic growth strategies has been remarkable. They continuously optimize campaigns, adapt to market changes, and deliver measurable results that fuel our business expansion." },
    { name: "Olivia Davis", role: "CEO, Manchester", text: "Working with Intrax Media has been a strategic advantage. Their team integrates perfectly with ours, understands our brand's voice, and executes campaigns that generate real impact on revenue and engagement." }
  ].map((t, i) => (
    <FadeInSection key={i} delay={i * 100} className="bg-white p-8 rounded-3xl border-2 border-brand-50 hover:border-brand-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col group">
      <div className="flex items-center space-x-4 mb-8">
         <div className="w-14 h-14 bg-white rounded-full overflow-hidden border-2 border-brand-500 shadow-md">
            {/* ✅ Local image path - index ke hisaab se image1.png se image6.png */}
            <img 
              src={`/images/main images/image${i + 1}.jpg`} 
              alt={t.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
            />
         </div>
         <div>
           <h4 className="font-black text-xl text-black leading-none mb-1 group-hover:text-brand-500 transition-colors">{t.name}</h4>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.role}</p>
         </div>
      </div>
      <div className="relative flex-grow">
        <div className="flex gap-1 mb-4">
           {[...Array(5)].map((_, i) => <Star key={i} className="text-brand-500 fill-brand-500" size={16} />)}
        </div>
        <p className="text-gray-700 text-sm leading-relaxed font-bold relative z-10">{t.text}</p>
      </div>
    </FadeInSection>
  ))}
</div>
  </div>
</section>

      {/* CASE STUDIES */}
     <section className="py-24 bg-white text-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <FadeInSection className="text-center mb-20">
       <h2 className="text-5xl md:text-7xl font-display font-black mb-6">Real-Time <span className="text-brand-500">Results</span></h2>
       <p className="text-black text-2xl font-black mb-6">Why We Stand Out?</p>
       <p className="text-gray-600 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
         We don’t do cookie-cutter solutions. Every plan is meticulously crafted based on your brand’s unique goals and transformed into measurable, top-tier results.
       </p>
     </FadeInSection>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Case Study 01 */}
       {/* Case Study 01 */}
<FadeInSection className="bg-white rounded-[2rem] p-8 border-2 border-brand-100 hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-500/10 group">
   <div className="flex justify-between items-start mb-8">
      <h3 className="text-3xl font-black text-black group-hover:text-brand-500 transition-colors">Success Story 01</h3>
      <div className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-black transform rotate-2">$1.9M+ Total Sales</div>
   </div>
   <p className="text-gray-600 font-medium mb-8"><span className="text-brand-500 font-black">Hastamuerte</span> Generated <span className="text-brand-500 font-black">$1,928,190.59</span> In Total Revenue With <span className="text-brand-500 font-black">24,035 Orders</span>. Through Strategic Facebook & Instagram Ads Campaigns From <span className="text-brand-500 font-black">Jan 1 - Sep 12, 2024</span>, We Achieved <span className="text-brand-500 font-black">1.39% Conversion Rate</span> With <span className="text-brand-500 font-black">1,096,505 Online Sessions</span>.</p>
   <div className="bg-brand-50 rounded-2xl h-72 flex items-end relative overflow-hidden border border-brand-100 group-hover:bg-white transition-colors">
      <img src="/images/case study/cs 1.png" alt="Intrax Media E-commerce Case Study - Hastamuerte $1.9M Sales" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
   </div>
</FadeInSection>

        {/* Case Study 02 */}
      {/* Case Study 02 */}
<FadeInSection delay={100} className="bg-white rounded-[2rem] p-8 border-2 border-brand-100 hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-500/10 group">
   <div className="flex justify-between items-start mb-8">
      <h3 className="text-3xl font-black text-black group-hover:text-brand-500 transition-colors">Success Story 02</h3>
      {/* ROAS image me clearly mention tha */}
      <div className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-black transform -rotate-1">ROAS 3.58</div>
   </div>
   <p className="text-gray-600 font-medium mb-8">
      Generated <span className="text-brand-500 font-black">$85,543.55</span> In Purchase Conversion Value With <span className="text-brand-500 font-black">$23,919.96 Ad Spend</span>. Executed <span className="text-brand-500 font-black">1,159 Active Ads</span> During <span className="text-brand-500 font-black">Aug 1 - 31, 2024</span>, Driving <span className="text-brand-500 font-black">1,507 Purchases</span> Through Multi-Product Campaign Strategy.
   </p>
   <div className="bg-brand-50 rounded-2xl h-72 flex items-end relative overflow-hidden border border-brand-100 group-hover:bg-white transition-colors">
      <img src="/images/case study/cs 2.png" alt="Intrax Media Meta Ads Management Case Study - ROAS 3.58" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
   </div>
</FadeInSection>
     </div>
     
     {/* Case Study 03 */}
  <div className="max-w-4xl mx-auto">
   <FadeInSection delay={200} className="bg-white rounded-[2rem] p-8 border-2 border-brand-100 hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-500/10 group">
      <div className="flex justify-between items-start mb-8">
         <h3 className="text-3xl font-black text-black group-hover:text-brand-500 transition-colors">Success Story 03</h3>
         {/* ROAS image me clearly mention tha */}
         <div className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-black">ROAS 4.12</div>
      </div>
      <p className="text-gray-600 font-medium mb-8">
         Generated <span className="text-brand-500 font-black">$111,094.31</span> In Purchase Conversion Value With <span className="text-brand-500 font-black">$26,933.39 Ad Spend</span>. Managed <span className="text-brand-500 font-black">1,431 Active Ads</span> During <span className="text-brand-500 font-black">Aug 1 - 31, 2024</span>, Delivering <span className="text-brand-500 font-black">1,821 Purchases</span> Through Optimized Multi-Campaign Strategy.
      </p>
      <div className="bg-brand-50 rounded-2xl h-72 flex items-end relative overflow-hidden border border-brand-100 group-hover:bg-white transition-colors">
         <img src="/images/case study/cs 3.png" alt="Intrax Media Shopify Scaling Case Study - ROAS 4.12" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>
   </FadeInSection>
</div>
     
     <div className="text-center mt-16">
       <Link to="/case-studies">
         <Button variant="black" size="lg" className="shadow-2xl hover:shadow-brand-500/40">VIEW ALL CASE STUDIES</Button>
       </Link>
     </div>
  </div>
</section>

      {/* PROCESS - Redesigned to be Light & Crosshair Style */}
    <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <FadeInSection className="text-center mb-16">
             <h2 className="text-5xl md:text-6xl font-display font-black text-black mb-4">
               Trust <span className="text-brand-500 yellow-glow border-b-4 border-brand-500">Intrax Media's</span> Process!
             </h2>
             <p className="text-gray-600 font-bold text-xl uppercase tracking-widest opacity-80">We Are Certified Marketing Experts.</p>
           </FadeInSection>

           <div className="relative">
              {/* Central Crosshair Lines */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2"></div>
              
              {/* Center Diamond Icon - Replaced User icon with 'I' Logo */}
            <Link to="/" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center group">
  {/* Diamond Shape Container with Unique Hover Effects */}
  <div className="w-24 h-24 bg-brand-500 rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(255,217,0,0.5)] border-4 border-white transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(255,217,0,0.9)] group-hover:rotate-[50deg] group-hover:scale-110 group-hover:border-brand-300">
    
    {/* Inner Container (Counter-Rotate) */}
    <div className="-rotate-45 group-hover:-rotate-[50deg] w-16 h-16 flex items-center justify-center relative transition-all duration-500">
      
      {/* Pulsing Ring Effect on Hover */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-full animate-ping-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Sparkle Effects on Hover */}
      <div className="absolute -top-2 -left-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-1 transition-opacity duration-300"></div>
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-2 transition-opacity duration-300 delay-75"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-3 transition-opacity duration-300 delay-150"></div>
      <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-4 transition-opacity duration-300 delay-200"></div>
      
      {/* Animated IM Logo SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10 drop-shadow-md">
        {/* Stylish 'M' - Background Layer with Split Animation */}
        <path 
          d="M15 80 L15 25 L50 60 L85 25 L85 80" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-black animate-m-glow group-hover:animate-m-split transition-all duration-500 group-hover:stroke-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
        
        {/* Bold 'I' - Foreground Layer with Scale Effect */}
        <path 
          d="M44 25 H56 V85 H44 Z" 
          fill="currentColor"
          className="text-black group-hover:animate-i-pulse transition-all duration-500 group-hover:fill-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
        />
        
        {/* Accent Dot - Water Drop Style with Bounce */}
        <circle 
          cx="50" cy="12" r="6" 
          fill="currentColor"
          className="text-black animate-dot group-hover:animate-dot-jump transition-all duration-500 group-hover:fill-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
        />
        
        {/* Additional Glow Ring on Hover */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="white" 
          strokeWidth="2"
          className="opacity-0 group-hover:opacity-100 group-hover:animate-ring-expand transition-all duration-700"
        />
      </svg>
    </div>
  </div>
</Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20 relative z-10">
                  {/* Step 1 */}
                  <div className="relative text-right pr-0 md:pr-16 pb-0 md:pb-16 flex flex-col items-end">
                     <h3 className="text-2xl font-black mb-4 text-black">Flexible Integration</h3>
                     <p className="text-gray-600 font-medium leading-relaxed max-w-sm">Our Team Adapts To Your Business Goals Without Any Hassle. We Scale According To Your Needs While Keeping Costs Optimized For Maximum ROI.</p>
                     <span className="text-8xl font-black text-gray-100 absolute top-0 left-0 -z-10">1</span>
                  </div>

                  {/* Step 2 */}
                  <div className="relative text-left pl-0 md:pl-16 pb-0 md:pb-16 flex flex-col items-start">
                     <h3 className="text-2xl font-black mb-4 text-black">Advanced Protection</h3>
                     <p className="text-gray-600 font-medium leading-relaxed max-w-sm">Privacy Updates Don't Slow Us Down. We've Built Robust Systems That Navigate Apple's Changes While Keeping Your Data Secure And Campaigns Running Smoothly.</p>
                     <span className="text-8xl font-black text-gray-100 absolute top-0 right-0 -z-10">2</span>
                  </div>

                  {/* Step 3 */}
                  <div className="relative text-right pr-0 md:pr-16 pt-0 md:pt-16 flex flex-col items-end">
                     <h3 className="text-2xl font-black mb-4 text-black">Audience Enhancement</h3>
                     <p className="text-gray-600 font-medium leading-relaxed max-w-sm">We Deep-Dive Into Your Customer Behavior To Create Better Shopping Experiences. Our Approach Helps You Own Your Data Instead Of Depending On Third-Party Platforms.</p>
                     <span className="text-8xl font-black text-gray-100 absolute bottom-0 left-0 -z-10">3</span>
                  </div>

                  {/* Step 4 */}
                  <div className="relative text-left pl-0 md:pl-16 pt-0 md:pt-16 flex flex-col items-start">
                     <h3 className="text-2xl font-black mb-4 text-black">Full Transparency</h3>
                     <p className="text-gray-600 font-medium leading-relaxed max-w-sm">No Hidden Agendas Here. You Get Complete Access To All Campaign Data, Performance Metrics, And Strategic Insights. We Partner With You To Build Winning Strategies.</p>
                     <span className="text-8xl font-black text-gray-100 absolute bottom-0 right-0 -z-10">4</span>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
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

      {/* FAQs */}
      <section className="py-24 bg-white border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl font-display font-black text-black mb-4">FAQs</h2>
              <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
           </FadeInSection>

           <div className="space-y-4">
             {faqs.map((faq, i) => (
               <FadeInSection key={i} delay={i * 50} className="border-2 border-brand-50 rounded-2xl overflow-hidden bg-white hover:border-brand-500 transition-colors shadow-sm hover:shadow-lg">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-lg font-bold text-black pr-8 transition-colors">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="text-brand-500" strokeWidth={3} /> : <ChevronDown className="text-brand-300 group-hover:text-brand-500" strokeWidth={3} />}
                  </button>
                  <div className={`px-6 pb-6 pt-2 text-gray-600 font-medium leading-relaxed transition-all duration-300 ${openFaq === i ? 'block opacity-100' : 'hidden opacity-0'}`}>
                    {faq.a}
                  </div>
               </FadeInSection>
             ))}
           </div>

           <div className="text-center mt-16">
              <Link to="/contact">
                <Button className="px-12 py-5 uppercase tracking-widest text-sm shadow-lg">
                  Book My Slot
                </Button>
              </Link>
           </div>
        </div>
      </section>

    </div>
  );
};