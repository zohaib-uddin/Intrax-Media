import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  ShoppingCart, 
  Star, 
  Ban, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MessageSquare,
  Smartphone,
  Settings,
  Layers,
  Shield,
  MousePointer2,
  BarChart,
  Search,
  Key,
  FileText,
  Edit3,
  Link2,
  PieChart,
  RefreshCw,
  MessageCircle,
  Fingerprint,
  Image,
  Palette,
  PenTool,
  Type,
  Camera,
  Briefcase,
  PlusCircle,
  BookOpen,
  Rocket,
  Eye,
  Lightbulb,
  TestTube2,
  Video,
  Map,
  Hand,
  ClipboardList,
  Activity,
  Package,
  Store,
  Megaphone,
  LayoutDashboard,
  Cpu,
  Sparkles,
  BrainCircuit
} from 'lucide-react';

// Floating Icon Component for Service Cards
const FloatingIcons: React.FC<{ icons: React.ElementType[] }> = ({ icons }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 200 - 100, 
            y: Math.random() * 200 - 100,
            rotate: Math.random() * 360 
          }}
          animate={{
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        >
          <Icon size={40 + Math.random() * 40} />
        </motion.div>
      ))}
    </div>
  );
};

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

export const Services: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { section } = useParams<{ section: string }>();

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else if (section) {
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    }
  }, [location.hash, section]);

  const servicesList = [
    { id: 'paid-social', label: 'Paid Social Agency' },
    { id: 'wordpress', label: 'WordPress Websites & Shopify Stores' },
    { id: 'whitelabel', label: 'Shopify Whitelabel Stores' },
    { id: 'seo', label: 'Search Engine Optimization (SEO)' },
    { id: 'branding', label: 'Branding' },
    { id: 'performance', label: 'Performance Ads' },
    { id: 'social-mgmt', label: 'Social Media Management Services' },
    { id: 'alibaba', label: 'Alibaba Marketing' },
    { id: 'amazon', label: 'Amazon Marketing' },
    { id: 'walmart', label: 'Walmart Marketing' },
    { id: 'ecom-strategy', label: 'E-commerce Strategy' },
    { id: 'influencer', label: 'Influencer Marketing' },
    { id: 'ai-ugc-ads', label: 'AI UGC Ads' },
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

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[120px] opacity-70"></div>
        
        <FadeInSection>
          <h1 className="text-6xl md:text-9xl font-display font-black text-brand-500 uppercase tracking-tighter mb-4 opacity-90">
          <span className="yellow-glow"> E-commerce </span>  <span className="text-black">Marketing</span> <span className="yellow-glow">Services</span>
          </h1>
          <p className="text-2xl font-black text-black mb-12 uppercase tracking-widest">Scale Your Brand With Intrax Media:</p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-20">
            {servicesList.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToSection(service.id)}
                className="px-6 py-2 border-2 border-brand-500 rounded-full text-sm font-black text-brand-500 bg-black hover:bg-brand-500 hover:text-black transition-all uppercase shadow-xl"
              >
                {service.label}
              </button>
            ))}
          </div>
        </FadeInSection>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32">
        
        {/* 01 Paid Social */}
     <div id="paid-social" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">01</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Paid Social Experts</h2>
              <Facebook className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>At Intrax Media, We Know How To Cut Through The Digital Noise And Get Your Brand Noticed. As A Specialized Paid Social Agency, We Make Sure Your Message Reaches The Right People.</p>
                <p>In An Era Where Users Scroll Past Countless Ads Daily, Our Team Crafts Campaigns That Stop The Scroll. We Build Data-Backed Strategies That Connect With Your Audience On Their Favorite Platforms, Using Language They Understand.</p>
                <p>Social Media Evolves Constantly, And So Do We. At Intrax Media, We Continuously Test, Refine, And Optimize To Keep Your Paid Social Campaigns Performing At Peak Levels With Maximum Impact.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Facebook, Instagram, Youtube, Target]} />
                <Zap className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Grow Your Business Now</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('paid-social')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['paid-social'] ? 'Read Less' : 'Read More'} 
              {expandedSections['paid-social'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['paid-social'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: "Meta Ads", icon: Facebook, desc: "Connect With Billions Across Facebook And Instagram Through Our Targeted Meta Ads. We Use Advanced Audience Segmentation, Custom Lookalike Audiences, And Creative Testing To Position Your Brand In Front Of High-Value Prospects. At Intrax Media, We Drive Quality Traffic, Reduce Cost Per Acquisition, And Deliver Consistent Conversions Across All Meta Platforms With Data-Backed Optimization Strategies." },
                    { title: "Facebook Ads", icon: Zap, desc: "Put Your Brand In Front Of The Right Audience On Facebook With Over 2.8 Billion Monthly Active Users. Facebook Remains One Of The Most Powerful Advertising Platforms Globally For Building Brand Awareness And Driving Sales. Our Ads Maximize Engagement And Conversions Through Precise Demographic Targeting, Interest-Based Segmentation, And Compelling Content That Resonates With Users. We Turn Clicks Into Customers With Proven Funnel Strategies." },
                    { title: "TikTok Ads", icon: Instagram, desc: "Capture Attention On The Fastest-Growing Social Platform With TikTok Ads. With Over 1 Billion Monthly Active Users Spending An Average Of 52 Minutes Daily On The App, TikTok Offers Unmatched Reach For Brands Targeting Gen Z And Millennials. We Create Engaging Short-Form Video Content That Captures Attention Within Seconds And Drives Immediate Action. Whether Building Brand Awareness, Generating Leads, Or Driving E-commerce Sales, Our TikTok Campaigns Are Built For Viral Success." },
                    { title: "Google Ads", icon: Target, desc: "Dominate Search Results With Our Expertly Crafted Google Ads Campaigns. Google Processes Over 8.5 Billion Searches Per Day, Making It The Most Visited Website Globally And The Primary Starting Point For Purchase Intent. We Optimize Your Ad Spend Through Keyword Research, Quality Score Improvement, And Bid Management To Ensure Maximum ROI. Your Google Ads Won't Just Get Clicks—They'll Get High-Intent Conversions From Users Ready To Buy." },
                    { title: "Snapchat Ads", icon: Smartphone, desc: "Reach A Younger, Highly Engaged Audience With Snapchat Ads. Snapchat Has 310 Million Daily Active Users, With Over 60% Of Users Creating New Content Daily And 75% Of Millennials Using The Platform. We Build Fun, Interactive Full-Screen Ads, AR Lenses, And Story Ads That Not Only Catch The Eye But Also Drive Meaningful Results. From App Installs To E-commerce Sales, Our Snapchat Campaigns Deliver Measurable ROI With Authentic Engagement." },
                    { title: "YouTube Ads", icon: Youtube, desc: "Leverage The Power Of Video With YouTube Ads, The Second Largest Search Engine Globally With Over 2.6 Billion Monthly Active Users. YouTube Users Watch Over 1 Billion Hours Of Video Daily, Offering Massive Reach For Video Marketing. We Create Compelling Video Content From Skippable In-Stream Ads To Non-Skippable Bumpers And Full-Length Features. Our YouTube Ads Put Your Brand In The Spotlight With Precision Targeting Based On Interests, Demographics, And Viewing Behavior." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-12">
                  <h3 className="text-3xl font-black text-center uppercase">How We Work</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                      { num: "01", title: "In-Feed Solutions", icon: Target, desc: "We Create Impactful In-Feed Content On Key Platforms. Using Real-Time Data, We Ensure Your Ads Generate Clicks And Convert At Scale. Our Funnels Are Built To Turn Prospects Into Profitable Customers Consistently." },
                      { num: "02", title: "Tracking & Optimization", icon: Activity, desc: "We Monitor And Optimize Every Campaign Element For Best Results. Our Focus Is On Efficiency—Maximizing Returns From Every Dollar Invested In Your Advertising Campaigns." },
                      { num: "03", title: "Data-Driven Strategy", icon: BarChart, desc: "All Our Decisions Are Backed By Solid Data. We Analyze Performance Metrics To Identify What Works, Allowing Us To Refine And Improve Your Campaigns For Peak Performance." },
                      { num: "04", title: "Global Audience Reach", icon: Globe, desc: "Our Campaigns Extend Beyond Single Platforms. We Leverage Our Network To Reach The Right People Anywhere. From Niche Markets To Global Communities, We Ensure Your Brand Gets Seen." },
                      { num: "05", title: "Strategic Content", icon: MessageSquare, desc: "Our Content Connects With Your Audience On Their Preferred Platforms. By Humanizing Your Brand And Sharing Your Story, We Build Relationships That Lead To Profitable Business Outcomes." }
                    ].map((step, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                        <div className="flex items-center gap-4 mb-4">
                          <step.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                          <span className="text-4xl font-display font-black text-brand-500 block">{step.num}</span>
                        </div>
                        <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                        <p className="text-gray-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link to="/contact">
                      <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 02 Wordpress */}
   <div id="wordpress" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">02</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">WordPress Websites & Shopify Stores</h2>
              <Globe className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>At Intrax Media, We Build Websites And Stores That Actually Work For Your Business. We Specialize In Creating Clean, High-Performance Digital Experiences That Drive Real Growth And Results.</p>
                <p>From Seamless User Navigation To Secure, Streamlined Checkout Processes, We Ensure Your Website Performs Exactly As Your Business Needs. Our Mission Is To Make Your Brand Stand Out With A Future-Ready Website That Adapts To Tomorrow's Challenges.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Globe, ShoppingCart, Target, Zap]} />
                <Globe className="text-black mb-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Build Your Digital Presence</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('wordpress')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['wordpress'] ? 'Read Less' : 'Read More'} 
              {expandedSections['wordpress'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['wordpress'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="text-gray-600 text-lg font-medium leading-relaxed">
                  <p>At Intrax Media, We Develop WordPress Websites And Shopify Stores That Combine Custom Design With Proven Conversion Strategies. Our Objective Is To Build A Website That Not Only Represents Your Brand But Also Delivers Measurable Return On Investment Through Optimized User Experiences.</p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-black uppercase">What We Deliver</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { title: "Fully Responsive", icon: Smartphone, desc: "Every Website Is Optimized For Flawless Mobile Performance And Seamless User Experience Across All Devices, Screen Sizes, And Browsers. We Ensure Your Site Looks And Functions Perfectly Everywhere." },
                      { title: "Conversion Focused", icon: Target, desc: "Our Core Mission Is Driving Bookings, Leads, And Revenue Through Strategic Design Elements, Clear CTAs, And Optimized User Funnels That Turn Visitors Into Paying Customers Consistently." },
                      { title: "Specialized Integrations", icon: Settings, desc: "We Implement Advanced Technology Solutions Including Custom Menus, CRM Systems, Payment Gateways, And E-commerce Integrations That Streamline Your Business Operations And Enhance Functionality." },
                      { title: "Bespoke Design", icon: Layers, desc: "Every Project Receives A Unique, Tailored Design Solution That Accurately Reflects Your Brand Identity, Values, And Vision In The Digital Space Without Relying On Generic Templates." },
                      { title: "Full Control", icon: Shield, desc: "We Provide An Intuitive, Easy-To-Use CMS With Comprehensive Reporting Dashboards, Giving You Complete Ownership And Control Over Your Website Content, Updates, And Performance Metrics." },
                      { title: "Interactive Experience", icon: MousePointer2, desc: "Engaging Designs Brought To Life With Smooth Animations, Micro-Interactions, And Dynamic Elements That Enhance User Experience, Increase Time On Site, And Improve Overall Engagement Rates." },
                      { title: "Data-Driven Decisions", icon: BarChart, desc: "Every Design Choice, Layout Decision, And Feature Implementation Is Backed By Extensive Research, User Analytics, And A/B Testing To Maximize Effectiveness And Conversion Potential." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                        <div className="flex items-center gap-4 mb-4">
                          <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                          <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-black uppercase">Web Design Expertise</h3>
                  <p className="text-gray-600 font-medium">With Over 50+ Successfully Delivered Website Projects, We Have Extensive Experience Across Multiple Industries Including E-commerce, Healthcare, Finance, And Professional Services. Our Portfolio Ranges From Simple Landing Pages To Complex, Fully Integrated E-commerce Stores With Advanced CRM Integrations, Custom APIs, And Multi-Currency Support That Enhance Business Operations And Scalability.</p>
                </div>

                <div className="bg-brand-500 text-black p-12 rounded-[3rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-20"></div>
                  <h3 className="text-3xl font-black mb-12 text-center uppercase">Our Track Record</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="group">
                      <Zap className="text-black mx-auto mb-4 group-hover:scale-110 group-hover:text-white transition-all duration-300" size={48} />
                      <div className="text-6xl font-display font-black text-black mb-2">70%</div>
                      <p className="text-sm font-bold uppercase tracking-widest">Faster Load Times</p>
                      <p className="text-xs text-black/70 mt-2">On Average, Our Websites Load 70% Faster Than Industry Standard Through Optimized Code, Image Compression, And CDN Integration, Ensuring Smoother User Experience And Better Search Engine Rankings.</p>
                    </div>
                    <div className="group">
                      <Target className="text-black mx-auto mb-4 group-hover:scale-110 group-hover:text-white transition-all duration-300" size={48} />
                      <div className="text-6xl font-display font-black text-black mb-2">30%</div>
                      <p className="text-sm font-bold uppercase tracking-widest">Increase in Conversions</p>
                      <p className="text-xs text-black/70 mt-2">Clients Have Reported An Average Of 30% Increase In Conversions After Launching Their New Websites Designed By Intrax Media, Thanks To Strategic UX Improvements And Conversion Optimization.</p>
                    </div>
                    <div className="group">
                      <Users className="text-black mx-auto mb-4 group-hover:scale-110 group-hover:text-white transition-all duration-300" size={48} />
                      <div className="text-6xl font-display font-black text-black mb-2">98%</div>
                      <p className="text-sm font-bold uppercase tracking-widest">Client Satisfaction</p>
                      <p className="text-xs text-black/70 mt-2">We Pride Ourselves On Maintaining A 98% Client Satisfaction Rate, Driven By Our Commitment To Delivering Projects On Time, Within Budget, And Exceeding Expectations With Every Launch.</p>
                    </div>
                  </div>
                </div>

                {/* New Banner Image Section */}
                <div className="w-full aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-brand-500">
                  <img 
                    src="/images/main images/service1.png" 
                    alt="Intrax Media Shopify Store Design and Development Excellence" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 03 Whitelabel */}
       <div id="whitelabel" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">03</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Shopify Whitelabel Stores</h2>
              <ShoppingCart className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>At Intrax Media, We Know That Launching An Online Store Can Feel Overwhelming, But We're Here To Simplify The Entire Process. We've Successfully Built Over 50 Whitelabel Stores With Custom Themes That Accurately Represent Your Brand Identity And Vision.</p>
                <p>Our Team Constantly Researches Trending Designs And Latest E-commerce Features To Keep Your Store Ahead Of The Competition. We Handle Everything From Initial Setup To Product Integration, Creating A User-Friendly Shopping Experience That Attracts Customers And Maximizes Your Sales Potential.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[ShoppingCart, Globe, Star, Zap]} />
                <ShoppingCart className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Start Your E-commerce Journey</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('whitelabel')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['whitelabel'] ? 'Read Less' : 'Read More'} 
              {expandedSections['whitelabel'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['whitelabel'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-8">
                  <h3 className="text-3xl font-black uppercase">Launch Your Own Whitelabel Business Today</h3>
                  <p className="text-gray-600 font-medium">Ready To Start Your Online Business Journey? At Intrax Media, We Make It Effortless With A Beautifully Designed Whitelabel Store, Fully Stocked With Your Selected Products And Optimized For Immediate Sales. From Day One, You'll Have A Professional E-commerce Platform Ready To Generate Revenue.</p>
                </div>

                <div className="bg-white border-2 border-brand-500 p-12 rounded-[3rem]">
                  <h3 className="text-3xl font-black mb-8 uppercase text-center">What We Offer:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: "Bespoke Design", icon: Palette, desc: "We Design A Professional, Fully Branded Store Tailored To Your Specific Vision, Target Audience, And Business Goals With Custom Themes And Unique Layouts." },
                      { title: "Product Integration", icon: ShoppingCart, desc: "Complete Product Catalogue Upload Including Descriptions, Images, Pricing, And Variants, Ensuring You're Ready To Sell From The Moment You Launch." },
                      { title: "Mobile Optimized", icon: Smartphone, desc: "Fully Mobile-Responsive Design With Intuitive Navigation, Fast Load Times, And Seamless Checkout Experience That Keeps Customers Coming Back." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                        <div className="flex items-center gap-4 mb-4">
                          <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                          <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 font-medium italic">At Intrax Media, We've Empowered Over 1,500+ Entrepreneurs To Launch Their Online Businesses, Collectively Generating Over $100 Million In Sales. Our Expertise Extends Beyond Building Stores—We Create Scalable E-commerce Platforms Engineered For Long-Term Success And Sustainable Growth.</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 04 SEO */}
     <div id="seo" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">04</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Search Engine Optimization (SEO)</h2>
              <TrendingUp className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>At Intrax Media, We Optimize Your Website's Content And Technical Structure To Maximize Search Visibility And Keep Visitors Coming Back. We Build High-Quality Backlinks To Boost Your Rankings, Continuously Monitor Performance Metrics, And Adapt Strategies To Stay Ahead Of Google's Algorithm Updates.</p>
                <p>With Proven Results—Including Helping Clients Achieve A 130% Increase In Organic Traffic Within Six Months—Intrax Media Partners With You To Grow Your Online Presence And Drive Sustainable Business Growth Through Strategic SEO Implementation.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[TrendingUp, Globe, Target, Zap]} />
                <TrendingUp className="text-black mb-4 relative z-10 group-hover:-translate-y-2 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Dominate Search Results</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('seo')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['seo'] ? 'Read Less' : 'Read More'} 
              {expandedSections['seo'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['seo'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-8">
                  <h3 className="text-3xl font-black uppercase">An SEO Partner That Understands Your Business</h3>
                  <p className="text-gray-600 font-medium">Let's Be Honest—Getting Found Online Can Feel Like Searching For A Needle In A Haystack. You Know You Need More Traffic, Better Visibility, And Quality Leads, But Figuring Out The Path To Get There Is Challenging. At Intrax Media, We Hear These Concerns From Business Owners Every Day:</p>
                  <div className="space-y-4">
                    {[
                      "Your Website Isn't Appearing On Google's First Page For Important Search Terms.",
                      "Your Organic Traffic Has Dropped Significantly And You Can't Identify The Cause.",
                      "Your Phone Isn't Ringing And Qualified Leads Aren't Coming In Like They Used To.",
                      "You're Launching A New Website And Need To Establish Search Presence Quickly."
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-black" strokeWidth={4} />
                        </div>
                        <p className="text-gray-700 font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 font-medium mt-8">Does This Sound Familiar? Don't Worry—You're Not Alone, And You've Come To The Right Place. At Intrax Media, We Specialize In Data-Driven SEO Strategies That Deliver Real Results, And We're Here To Help You Navigate The Ever-Evolving World Of Search Engine Algorithms With Confidence.</p>
                </div>

                <div className="space-y-12">
                  <h3 className="text-3xl font-black text-center uppercase">Our SEO Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { num: "01", title: "Comprehensive Website Audit", icon: Search, desc: "We Begin By Analyzing Every Aspect Of Your Website To Identify Strengths And Weaknesses. Since 40% Of Visitors Abandon Sites That Take Over 3 Seconds To Load, We Pinpoint And Fix Critical Issues Like Slow Performance, Broken Links, And Poor Site Architecture That Drive Users Away." },
                      { num: "02", title: "Keyword Research & Strategy", icon: Key, desc: "We Identify High-Value Keywords Your Potential Customers Are Actively Searching For, Then Craft A Custom Strategy That Helps You Climb Search Rankings And Get Discovered By The Right Audience At The Right Time." },
                      { num: "03", title: "On-Page Optimization", icon: FileText, desc: "We Optimize Your Website's Content, Meta Tags, Headers, And Internal Structure To Ensure Search Engines Understand Exactly What You Offer, Resulting In Higher Rankings And Improved Conversion Rates." },
                      { num: "04", title: "Content Creation & Optimization", icon: Edit3, desc: "We Develop Fresh, Relevant, And SEO-Optimized Content That Not Only Attracts Organic Visitors But Also Keeps Them Engaged, Reduces Bounce Rates, And Encourages Return Visits For Long-Term Growth." },
                      { num: "05", title: "Strategic Link Building", icon: Link2, desc: "We Build High-Quality, Authoritative Backlinks From Reputable Sources That Boost Your Domain Credibility, Improve Trust Signals, And Push Your Site Higher In Search Results Against Competitors." },
                      { num: "06", title: "Performance Tracking & Reporting", icon: PieChart, desc: "We Continuously Monitor Your Site's Performance Using Advanced Analytics Tools And Provide Transparent, Easy-To-Understand Reports Showing Rankings, Traffic Growth, And Conversion Improvements Monthly." },
                      { num: "07", title: "Ongoing Optimization & Updates", icon: RefreshCw, desc: "We Keep Your Site Fully Optimized And Proactively Adjust Strategies As Needed To Adapt To Google's Algorithm Changes, Industry Trends, And Competitive Landscape To Maintain Your Search Advantage." }
                    ].map((step, i) => (
                      <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                        <div className="flex items-center gap-4 mb-4">
                          <step.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                          <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                        </div>
                        <p className="text-gray-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 05 Branding */}
      <div id="branding" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">05</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Branding</h2>
              <Star className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>At Intrax Media, We're Here To Transform Your Brand Into Something Truly Unforgettable. From Crafting Bold, Memorable Logos To Developing Color Schemes That Capture Attention, We Ensure Your Brand Stands Out In Any Market.</p>
                <p>With Experience Across Major Global Hubs Including London, New York, And San Francisco, Our Team Of Creative Experts Knows How To Build Brand Identities That Excite, Engage, And Convert. We Focus On Creating Visual Assets And Messaging That Resonates With Your Target Audience, Ensuring Your Brand Isn't Just Seen—It's Remembered And Preferred.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Star, Zap, Target, Globe]} />
                <Star className="text-black mb-4 relative z-10 group-hover:scale-125 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Build Your Brand Legacy</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('branding')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['branding'] ? 'Read Less' : 'Read More'} 
              {expandedSections['branding'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['branding'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-brand-500 text-black p-12 rounded-[3rem] text-center">
                  <h3 className="text-3xl font-black mb-8 uppercase">Let's Be Honest—Your Brand Is Your Identity, And It Deserves To Be Nothing Short Of Extraordinary.</h3>
                  <p className="text-black/70 max-w-3xl mx-auto font-medium">You Want A Brand That Not Only Looks Exceptional But Also Tells Your Unique Story, Connects Deeply With Your Audience, And Leaves A Lasting Impression. At Intrax Media, We Understand Your Concerns. Your Current Brand Isn't Connecting With Your Target Audience. Your Visual Identity Feels Outdated And Doesn't Reflect Your Vision. Your Messaging Lacks Impact And Clarity. You're Launching A New Product Or Service And Need A Brand That Commands Attention From Day One.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { num: "01", title: "Initial Consultation", icon: MessageCircle, desc: "We Begin By Getting To Know You, Your Vision, And Your Business Goals. This Discovery Session Helps Us Understand Where You Want To Go And What You Want To Achieve, Laying The Foundation For A Brand That's Uniquely Yours." },
                    { num: "02", title: "Market Research", icon: Search, desc: "We Conduct In-Depth Market Analysis And Competitor Research To Identify Opportunities And Gaps. This Strategic Intelligence Helps Us Position Your Brand To Stand Out From The Crowd And Capture Your Target Audience's Attention." },
                    { num: "03", title: "Define Your Brand Identity", icon: Fingerprint, desc: "Together, We'll Define Who You Are As A Brand. We'll Establish Your Positioning, Core Messaging, Brand Voice, And Values To Ensure Everything Aligns Perfectly With Your Business Goals And Resonates With Your Audience." },
                    { num: "04", title: "Moodboard Creation", icon: Image, desc: "Our Creative Team Develops Comprehensive Moodboards That Capture The Essence Of Your Brand. These Visual Guides Set The Tone, Vibe, And Creative Direction For Your Brand's Overall Look And Feel." },
                    { num: "05", title: "Color Palette Selection", icon: Palette, desc: "We'll Carefully Select The Perfect Color Palette That Represents Your Brand's Personality And Values. Colors Evolve Emotions, So We Ensure Your Brand Looks Great And Feels Just Right To Your Target Audience." },
                    { num: "06", title: "Logo Design", icon: PenTool, desc: "Our Expert Designers Create Multiple Logo Concepts For You To Choose From. We Start With Five Distinct Ideas, Giving You Plenty Of Options To Find The Perfect Mark That Represents Your Brand." },
                    { num: "07", title: "Typography System", icon: Type, desc: "We'll Select The Right Font Family And Typography Hierarchy For Your Brand. This Ensures All Your Communications Look Consistent, Professional, And On-Brand Across Every Platform And Medium." },
                    { num: "08", title: "Imagery & Photography Style", icon: Camera, desc: "We'll Define The Visual Style For All Your Brand Imagery. This Includes Comprehensive Guidelines On How To Use Photos, Illustrations, And Graphics So Everything Fits Your Brand's Identity Seamlessly." },
                    { num: "09", title: "Complete Brand Assets", icon: Briefcase, desc: "We Create All The Essential Materials You Need, From Business Cards And Letterheads To Email Templates And Social Media Assets. Every Touchpoint Looks Professional, Polished, And Cohesive." },
                    { num: "10", title: "Additional Design Support", icon: PlusCircle, desc: "Think Of Us As Your Creative Partner. Need A UI Kit, Custom Iconography, Or Bespoke Illustrations? We've Got You Covered With Comprehensive Design Support Whenever You Need It." },
                    { num: "11", title: "Brand Guidelines Document", icon: BookOpen, desc: "We'll Compile Everything Into A Comprehensive, Easy-To-Follow Brand Guide. This Ensures You And Your Team Know How To Use Your Brand Elements Consistently Across All Channels And Applications." },
                    { num: "12", title: "Brand Launch Strategy", icon: Rocket, desc: "It's Time To Introduce Your New Brand To The World. We'll Help You Plan And Execute A Confident Launch Strategy, So You're Ready To Make An Unstoppable First Impression In Your Market." }
                  ].map((step, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <step.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 06 Performance Ads */}
        <div id="performance" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">06</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Performance Ads</h2>
              <Target className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p className="text-brand-500 font-black text-2xl uppercase">High-Converting Creative That Connects With Your Audience</p>
                <p>At Intrax Media, We Believe That Every Successful Campaign Starts With Creative That Truly Resonates. We Don't Just Create Ads—We Deep-Dive Into Your Customer Psychology To Understand What Drives Their Decisions. By Identifying Their Aspirations, Challenges, Pain Points, And Motivations, We Craft Marketing Messages That Don't Just Sell—They Inspire Immediate Action.</p>
                <p>Our Creative Strategy Is Designed To Guide Your Customers Seamlessly Through Their Journey, From First Awareness To Final Conversion, Ensuring Every Interaction Leaves A Memorable Impact And Builds Long-Term Brand Loyalty.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Target, Zap, Globe, Star]} />
                <Target className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Maximize Your ROI</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('performance')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['performance'] ? 'Read Less' : 'Read More'} 
              {expandedSections['performance'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['performance'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-brand-50 p-12 rounded-[3rem] text-center">
                   <h3 className="text-3xl font-black mb-8 uppercase">Creative That Drives Attention, Interest, Desire, Action</h3>
                   <p className="text-gray-700 font-bold text-xl mb-12">Everything You Need To Attract The Right Customers And Boost Conversions</p>
          <div className="w-full max-w-5xl mx-auto mb-12 px-4">
  <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group">
    <img 
      src="/images/main images/service2.png" 
      alt="Intrax Media Performance Ads and Meta Advertising Strategy" 
      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
    />
  </div>
</div>
                   <div className="max-w-3xl mx-auto text-center space-y-6">
                      <p className="text-gray-600 font-medium">Partnering With Intrax Media Means Working With A Team Of Seasoned Creative Professionals Who Bring Diverse Experience Across Multiple Industries. We Don't Just Execute Campaigns—We Strategize, Analyze, And Innovate For Maximum Impact.</p>
                      <p className="text-gray-600 font-medium">We Start By Examining Your Current Performance History, Assessing Existing Strategies, And Identifying Gaps Where New Opportunities Can Be Leveraged. With These Insights, We Develop A Custom Creative Roadmap Designed To Elevate Your Brand And Take Your Advertising To The Next Level. Whether It's Refining Your Messaging Or Exploring New Channels, We'll Help You Attract Qualified Customers And Turn Interest Into Measurable Action.</p>
                   </div>
                </div>

                <div className="space-y-12">
                   <h3 className="text-3xl font-black text-center uppercase">Our Performance Ads Process</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { num: "01", title: "Comprehensive Creative Audits", icon: Search, desc: "We Conduct A Thorough Audit Of Your Existing Creative Assets And Performance Metrics. This Analysis Helps Us Identify Improvement Opportunities And Develop A Strategic Creative Roadmap For Maximum Campaign Impact And ROI." },
                        { num: "02", title: "Strategic Creative Development", icon: Lightbulb, desc: "We Develop Engaging, High-Performance Creative With A Laser Focus On Driving Results. Our Process Includes Continuous Testing, Refinement, And Iteration To Ensure Your Ads Maintain Top Performance Across All Platforms." },
                        { num: "03", title: "Data-Driven Creative Testing", icon: TestTube2, desc: "We Leverage Real Performance Data To Drive All Creative Decisions. Through Systematic A/B Testing And Optimization, We Refine Your Ads To Achieve Higher Click-Through Rates, Better Engagement, And Increased Conversions." },
                        { num: "04", title: "Product & UGC Video Editing", icon: Video, desc: "We Create Compelling Video Content That Resonates With Your Target Audience Through Extensive Research, Competitor Analysis, And Trend Monitoring. Our Videos Capture Attention And Drive Action. Note: Service Charges Apply For Video Production." },
                        { num: "05", title: "Customer Journey Mapping", icon: Map, desc: "We Map Out Every Stage Of Your Customer's Journey And Design Ads That Align With Their Needs At Each Touchpoint. This Strategic Approach Guides Prospects From Initial Awareness Through To Final Conversion Seamlessly." },
                        { num: "06", title: "Thumb-Stopping Ad Creative", icon: Hand, desc: "We Create Scroll-Stopping Video And Image Ads That Capture Immediate Attention And Move Your Audience Closer To Conversion. Whether They're At The Top, Middle, Or Bottom Of Your Funnel, Our Creative Drives Results." }
                      ].map((step, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                          <div className="flex items-center gap-4 mb-4">
                            <step.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                            <span className="text-4xl font-display font-black text-brand-500 block">{step.num}</span>
                          </div>
                          <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                          <p className="text-gray-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 07 Social Media Management */}
    <div id="social-mgmt" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">07</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Social Media Management Services</h2>
              <Users className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p className="text-brand-500 font-black text-2xl uppercase">Is Your Social Media Strategy Delivering Results?</p>
                <p>Social Media Has Become A "Pay-To-Play" Environment. To Succeed, You Need A Solid Game Plan, Full Commitment, And A Well-Defined Strategy. Simply Posting Content Isn't Enough Anymore. To Get Your Content In Front Of The Right Audience, You Often Need To Invest In Paid Advertising, Whether It's An Ongoing Campaign Or A One-Time Sponsored Post.</p>
                <p>That's Where Intrax Media Comes In. We Integrate Social Media Management Services Into Your Overall Marketing Strategy To Maximize Your Online Presence. The Right Management Can Attract, Engage, And Convert Followers Into Loyal Customers. We've Successfully Managed Social Media Pages For Multiple Brands Across Industries And We're Ready To Do The Same For Your Business.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Users, MessageSquare, Globe, Zap]} />
                <Users className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Build Your Community</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('social-mgmt')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['social-mgmt'] ? 'Read Less' : 'Read More'} 
              {expandedSections['social-mgmt'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['social-mgmt'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-brand-500 text-black p-12 rounded-[3rem] text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
                   <h3 className="text-3xl font-black mb-8 uppercase relative z-10">Social Media: More Than Just Posting Content</h3>
                   <p className="text-black/70 max-w-3xl mx-auto font-medium relative z-10">Effective Social Media Marketing Goes Beyond Sharing Links And Images. It's About Creating Meaningful Connections Between Your Customers, Your Brand, And Your Company. Understanding The Core Processes Of Social Media Management Is Key To Leveraging It Successfully And Strengthening Your Overall Marketing Strategy For Long-Term Growth.</p>
                   <div className="mt-12 relative z-10">
                      <img src="/images/main images/service4.jpg" alt="Social Media Management" className="rounded-2xl shadow-2xl border-2 border-white/20 max-w-2xl mx-auto" />
                   </div>
                </div>

                <div className="space-y-12">
                   <h3 className="text-3xl font-black text-center uppercase">Our Social Media Management Process</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { num: "01", title: "Strategy Creation", icon: ClipboardList, desc: "We'll Help You Set Clear, Measurable Goals, Define The Steps To Achieve Them, Establish A Realistic Timeline, And Track Your Progress With The Right Metrics. This Comprehensive Strategy Serves As Your Roadmap To Achieving Business Success Through Strategic Social Media Implementation." },
                        { num: "02", title: "Inbound Engagement Monitoring", icon: MessageSquare, desc: "Engagement Is The Heart Of Social Media Success. We Monitor And Respond To Comments, Questions, Direct Messages, And All Interactions Promptly. This Builds Strong Relationships With Your Audience And Ensures Your Brand Remains Connected, Responsive, And Top-Of-Mind For Your Community." },
                        { num: "03", title: "Analytics & Performance Monitoring", icon: Activity, desc: "Data Is Essential To Continuous Improvement. We Gather And Analyze Key Metrics Like Engagement Rates, Impressions, Reach, Click-Through Rates, And Conversions To Refine Your Strategy, Optimize Content Performance, And Improve Your Overall Social Media ROI Over Time." }
                      ].map((step, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                          <div className="flex items-center gap-4 mb-4">
                            <step.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                            <span className="text-4xl font-display font-black text-brand-500 block">{step.num}</span>
                          </div>
                          <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                          <p className="text-gray-600 font-medium text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 08 Alibaba Marketing */}
        <div id="alibaba" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">08</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Alibaba Marketing</h2>
              <Globe className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Expand Your Reach Globally With Our Specialized Alibaba Marketing Services. We Help You Navigate The World's Largest B2B Marketplace To Connect With Verified Buyers And Suppliers Worldwide.</p>
                <p>From Store Setup And Product Optimization To Keyword Advertising And Lead Management, We Ensure Your Alibaba Presence Is Professional, Visible, And Engineered For High-Volume Business Transactions.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Globe, ShoppingCart, Target, Zap]} />
                <Globe className="text-black mb-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Global B2B Growth</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('alibaba')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['alibaba'] ? 'Read Less' : 'Read More'} 
              {expandedSections['alibaba'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['alibaba'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Store Setup & Design", icon: LayoutDashboard, desc: "We Create A Professional Alibaba Mini-Site That Reflects Your Brand's Credibility. Our Designs Are Optimized For B2B Buyers, Highlighting Your Manufacturing Capabilities, Certifications, And Product Quality To Build Immediate Trust." },
                    { title: "Product Posting & SEO", icon: Search, desc: "We Optimize Your Product Listings With High-Volume B2B Keywords, Professional Copywriting, And High-Quality Imagery. Our SEO Strategies Ensure Your Products Rank High In Alibaba's Internal Search Results, Increasing Your Inquiry Rate." },
                    { title: "Keyword Advertising (KWA)", icon: Target, desc: "Maximize Your Visibility With Strategic Keyword Advertising. We Manage Your Bidding Strategy To Ensure Your Products Appear In Front Of Active Buyers, Driving Targeted Traffic To Your Store While Optimizing Your Ad Spend For Maximum ROI." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-brand-50 text-black p-12 rounded-[3rem] relative overflow-hidden border-2 border-brand-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-10"></div>
                  <h3 className="text-3xl font-black mb-8 text-center uppercase text-black">Alibaba Growth Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-brand-200 hover:border-brand-500 transition-all shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase">Starter Setup</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$999<span className="text-sm text-black/40">/One-time</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Mini-site Design</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> 20 Product Postings</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Basic SEO Setup</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border-2 border-brand-500 transform scale-105 relative shadow-xl">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-brand-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                      <h4 className="text-xl font-black mb-2 uppercase">Growth Engine</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$1,999<span className="text-sm text-black/40">/Month</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Full Store Management</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> KWA Ad Management</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> 50 Product Postings</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Inquiry Handling Support</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-brand-200 hover:border-brand-500 transition-all shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase">Enterprise</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">Custom<span className="text-sm text-black/40">/Quote</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Multi-Store Strategy</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Global RFQ Management</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Dedicated Account Manager</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 09 Amazon Marketing */}
        <div id="amazon" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">09</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Amazon Marketing</h2>
              <Package className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Dominate The World's Largest Retail Marketplace With Our Comprehensive Amazon Marketing Services. We Help Brands Scale On Amazon Through Data-Driven PPC Management, Listing Optimization, And Brand Registry Support.</p>
                <p>Whether You're Launching A New Product Or Scaling An Existing Brand, Our Team Ensures Your Products Are Visible, Competitive, And Optimized For Maximum Conversion In The Amazon Ecosystem.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Package, ShoppingCart, Target, Zap]} />
                <Package className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Scale On Amazon</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('amazon')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['amazon'] ? 'Read Less' : 'Read More'} 
              {expandedSections['amazon'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['amazon'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Amazon PPC Management", icon: Target, desc: "We Manage Your Sponsored Products, Sponsored Brands, And Sponsored Display Ads To Drive Profitable Sales. Our Team Optimizes Bids, Keywords, And Placements To Lower Your ACoS And Maximize Your Total Sales Growth." },
                    { title: "Listing Optimization (A+ Content)", icon: FileText, desc: "We Create High-Converting Product Listings With SEO-Rich Titles, Bullet Points, And Descriptions. We Also Design Compelling A+ Content That Tells Your Brand Story And Increases Conversion Rates By Up To 20%." },
                    { title: "Inventory & Account Health", icon: Activity, desc: "We Monitor Your Account Health, Manage Inventory Levels, And Handle Case Logs To Ensure Your Amazon Business Runs Smoothly. Our Proactive Management Prevents Suspensions And Ensures You Never Miss A Sale Due To Out-Of-Stock Issues." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-brand-50 text-black p-12 rounded-[3rem] relative overflow-hidden border-2 border-brand-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-10"></div>
                  <h3 className="text-3xl font-black mb-8 text-center uppercase text-black">Amazon Scaling Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-brand-200 hover:border-brand-500 transition-all shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase">Listing Optimization</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$499<span className="text-sm text-black/40">/Per ASIN</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> SEO Optimized Title</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> 5 Bullet Points</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> A+ Content Design</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border-2 border-brand-500 transform scale-105 relative shadow-xl">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-brand-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Best Value</div>
                      <h4 className="text-xl font-black mb-2 uppercase">PPC Management</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$1,499<span className="text-sm text-black/40">/Month</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Full Ad Management</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Keyword Research</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Weekly Performance Reports</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-brand-200 hover:border-brand-500 transition-all shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase">Full Account Mgmt</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$2,999<span className="text-sm text-black/40">/Month</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> PPC + Listing + Inventory</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Brand Registry Support</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Strategic Scaling Plan</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 10 Walmart Marketing */}
        <div id="walmart" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">10</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Walmart Marketing</h2>
              <Store className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Tap Into The Rapidly Growing Walmart Marketplace With Our Expert Marketing Strategies. We Help Brands Establish A Strong Presence On Walmart.com To Reach Millions Of Loyal Customers.</p>
                <p>Our Walmart Marketing Services Include Marketplace Onboarding, Optimized Product Listings, And Strategic Walmart Connect Advertising To Drive Sales And Build Brand Authority On One Of The World's Largest Retail Platforms.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Store, ShoppingCart, Target, Zap]} />
                <Store className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Grow On Walmart</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('walmart')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['walmart'] ? 'Read Less' : 'Read More'} 
              {expandedSections['walmart'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['walmart'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Walmart Connect Ads", icon: Target, desc: "We Leverage Walmart's Internal Advertising Platform To Put Your Products In Front Of Shoppers. Our Team Manages Sponsored Search And Display Ads To Increase Visibility And Drive Conversions Across The Walmart Marketplace." },
                    { title: "Listing Optimization", icon: Search, desc: "We Optimize Your Walmart Product Listings For Both Search Engines And Customers. By Improving Titles, Descriptions, And Attributes, We Ensure Your Products Are Easy To Find And Compelling To Buy." },
                    { title: "Marketplace Management", icon: Settings, desc: "From Onboarding To Daily Operations, We Handle The Technical Aspects Of Your Walmart Store. We Ensure Your Account Complies With Walmart's Standards And Stays Competitive In The Retail Landscape." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-brand-50 text-black p-12 rounded-[3rem] relative overflow-hidden border-2 border-brand-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-10"></div>
                  <h3 className="text-3xl font-black mb-8 text-center uppercase text-black">Walmart Marketing Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-brand-200 hover:border-brand-500 transition-all shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase">Onboarding & Setup</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$799<span className="text-sm text-black/40">/One-time</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Account Approval Support</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> 10 Optimized Listings</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Storefront Setup</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border-2 border-brand-500 relative shadow-xl">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-brand-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended</div>
                      <h4 className="text-xl font-black mb-2 uppercase">Walmart Connect Mgmt</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$1,299<span className="text-sm text-black/40">/Month</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Full Ad Management</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Listing Maintenance</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Monthly Growth Strategy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 11 E-commerce Strategy */}
        <div id="ecom-strategy" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">11</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">E-commerce Strategy</h2>
              <BarChart className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Build A Sustainable And Scalable Online Business With Our Data-Driven E-commerce Strategy Services. We Provide The Roadmap You Need To Navigate The Complex Digital Landscape And Achieve Long-Term Growth.</p>
                <p>Our Strategic Consulting Covers Everything From Market Analysis And Customer Acquisition To Retention Strategies And Operational Scaling, Ensuring Your E-commerce Business Is Built On A Solid Foundation For Success.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[BarChart, TrendingUp, Target, Zap]} />
                <BarChart className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Strategic Growth</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('ecom-strategy')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['ecom-strategy'] ? 'Read Less' : 'Read More'} 
              {expandedSections['ecom-strategy'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['ecom-strategy'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Market & Competitor Analysis", icon: Search, desc: "We Conduct Deep Research Into Your Industry And Competitors To Identify Opportunities For Differentiation. Our Insights Help You Position Your Brand Effectively And Capture Market Share In A Crowded Digital Space." },
                    { title: "Conversion Rate Optimization (CRO)", icon: Target, desc: "We Analyze Your Customer Journey To Identify Friction Points And Optimize Your Store For Maximum Conversions. Through A/B Testing And UX Improvements, We Turn More Visitors Into Paying Customers." },
                    { title: "Retention & LTV Strategy", icon: Users, desc: "We Help You Build Long-Term Relationships With Your Customers Through Strategic Email Marketing, Loyalty Programs, And Personalized Experiences That Increase Customer Lifetime Value And Drive Repeat Sales." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 12 Influencer Marketing */}
        <div id="influencer" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">12</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">Influencer Marketing</h2>
              <Megaphone className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Amplify Your Brand Voice Through Strategic Influencer Partnerships. We Connect You With The Right Creators To Build Trust, Reach New Audiences, And Drive Authentic Engagement For Your Brand.</p>
                <p>Our Influencer Marketing Services Include Creator Discovery, Campaign Management, And Performance Tracking, Ensuring Your Partnerships Deliver Measurable Results And Align With Your Brand Values.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Megaphone, Users, Star, Zap]} />
                <Megaphone className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">Amplify Your Reach</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('influencer')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['influencer'] ? 'Read Less' : 'Read More'} 
              {expandedSections['influencer'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['influencer'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Creator Discovery & Vetting", icon: Users, desc: "We Identify And Vet Influencers Who Align With Your Brand Identity And Target Audience. Our Selection Process Focuses On Engagement Rates, Audience Authenticity, And Content Quality To Ensure Successful Partnerships." },
                    { title: "Campaign Management", icon: ClipboardList, desc: "We Handle The Entire Influencer Campaign Process, From Outreach And Negotiation To Content Approval And Posting Schedules. Our Team Ensures Your Campaigns Run Smoothly And Deliver Consistent Brand Messaging." },
                    { title: "Performance Analysis", icon: BarChart, desc: "We Track And Analyze The Impact Of Your Influencer Partnerships On Brand Awareness, Engagement, And Sales. Our Reports Provide Clear Insights Into ROI And Help Refine Future Influencer Strategies." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

        {/* 13 AI UGC Ads */}
        <div id="ai-ugc-ads" className="border-t-4 border-brand-500 pt-16">
          <FadeInSection>
            <span className="text-8xl font-display font-black text-brand-500 mb-6 block opacity-20">13</span>
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight">AI UGC Ads</h2>
              <Cpu className="text-black group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={48} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed">
                <p>Revolutionize Your Advertising With AI-Powered User-Generated Content. We Combine The Authenticity Of UGC With The Efficiency Of Artificial Intelligence To Create High-Converting Ad Creative At Scale.</p>
                <p>Our AI UGC Ads Service Leverages Cutting-Edge Technology To Generate Realistic, Relatable, And Highly Engaging Video Content That Resonates With Your Target Audience And Drives Unmatched Performance.</p>
              </div>
              <div className="bg-brand-500 p-8 rounded-[2rem] border-2 border-brand-500 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                <FloatingIcons icons={[Cpu, Sparkles, BrainCircuit, Zap]} />
                <Cpu className="text-black mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500" size={48} />
                <h3 className="text-2xl font-black mb-4 uppercase text-black relative z-10">AI-Driven Authenticity</h3>
                <Link to="/contact" className="relative z-10">
                  <Button variant="black" size="lg" className="shadow-2xl hover:scale-105 transition-transform">GET STARTED</Button>
                </Link>
              </div>
            </div>

            <button 
              onClick={() => toggleSection('ai-ugc-ads')}
              className="flex items-center text-brand-500 font-black uppercase tracking-widest hover:text-black transition-colors group mb-8"
            >
              {expandedSections['ai-ugc-ads'] ? 'Read Less' : 'Read More'} 
              {expandedSections['ai-ugc-ads'] ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />}
            </button>

            {expandedSections['ai-ugc-ads'] && (
              <div className="space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-brand-50 text-black p-12 rounded-[3rem] text-center relative overflow-hidden border-2 border-brand-500">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,217,0,0.1),transparent_70%)]"></div>
                   <h3 className="text-3xl font-black mb-8 uppercase relative z-10 text-black">The Future Of Performance Creative</h3>
                   <p className="text-black/70 max-w-3xl mx-auto font-medium relative z-10">AI UGC Ads Bridge The Gap Between High-Production Quality And Raw Authenticity. By Using AI To Enhance And Scale User-Generated Content, We Deliver Ads That Feel Personal And Trustworthy While Maintaining The High Conversion Rates Of Professional Performance Creative.</p>
                   <div className="mt-12 relative z-10">
                      <img src="/images/main images/service2.png" alt="AI UGC Ads" className="rounded-2xl shadow-2xl border-2 border-brand-500/20 max-w-2xl mx-auto" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "AI Persona Development", icon: BrainCircuit, desc: "We Create AI-Generated Personas That Perfectly Match Your Target Demographic. These Personas Deliver Your Brand Message With Authenticity, Ensuring Your Ads Connect Deeply With Your Ideal Customers." },
                    { title: "Automated Content Scaling", icon: Zap, desc: "Generate Hundreds Of Ad Variations In Minutes. We Use AI To Test Different Hooks, Scripts, And Visuals, Identifying The Winning Combinations That Drive The Lowest CPA For Your Campaigns." },
                    { title: "Authentic Voice Synthesis", icon: MessageSquare, desc: "Our AI Technology Synthesizes Natural, Human-Like Voices That Deliver Your Message With The Right Tone And Emotion, Enhancing The Trust And Relatability Of Your UGC Content." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all shadow-sm group">
                      <div className="flex items-center gap-4 mb-4">
                        <item.icon className="text-brand-500 group-hover:scale-110 transition-transform" size={32} />
                        <h4 className="text-xl font-black uppercase text-brand-500">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-brand-500 text-black p-12 rounded-[3rem] text-center">
                  <h3 className="text-3xl font-black mb-8 uppercase">AI UGC Ad Packages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase text-black">Starter Pack</h4>
                      <div className="text-3xl font-display font-black text-black mb-4">$1,200<span className="text-sm text-black/50">/Month</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> 5 AI UGC Videos</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> 2 AI Personas</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> Basic Scripting</li>
                      </ul>
                    </div>
                    <div className="bg-black text-white p-8 rounded-2xl border-2 border-black transform scale-105 shadow-2xl relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                      <h4 className="text-xl font-black mb-2 uppercase text-brand-500">Pro Scale</h4>
                      <div className="text-3xl font-display font-black text-brand-500 mb-4">$2,500<span className="text-sm text-white/50">/Month</span></div>
                      <ul className="space-y-2 text-sm text-white/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> 15 AI UGC Videos</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Unlimited AI Personas</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-brand-500" /> Advanced Hooks & Testing</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm">
                      <h4 className="text-xl font-black mb-2 uppercase text-black">Enterprise</h4>
                      <div className="text-3xl font-display font-black text-black mb-4">Custom<span className="text-sm text-black/50">/Quote</span></div>
                      <ul className="space-y-2 text-sm text-black/70 mb-6">
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> Unlimited Content</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> Dedicated AI Strategist</li>
                        <li className="flex items-center gap-2"><Check size={14} className="text-black" /> Full Funnel Creative</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/contact">
                    <Button variant="black" size="lg" className="shadow-2xl">GET STARTED</Button>
                  </Link>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>

      </div>
    </div>
  );
};
