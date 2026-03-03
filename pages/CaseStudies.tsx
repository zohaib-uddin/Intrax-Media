import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, TrendingUp } from 'lucide-react';

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

export const CaseStudies: React.FC = () => {
  const allCaseStudies = [
    {
      id: "01",
      title: "Case Study 01",
      sales: "$1,928,190.59",
      orders: "24,035",
      image: "/images/case study/cs 1.png",
      badge: "$1.9M+ Total Sales",
      storeName: "Hastamuerte",
      period: "Jan 1 - Sep 12, 2024",
      sessions: "1,096,505",
      conversionRate: "1.39%",
      avgOrderValue: "$70.63"
    },
    {
      id: "02",
      title: "Case Study 02",
      roas: "3.58",
      spend: "$23,919.96",
      sales: "$85,543.55",
      purchases: "1,507",
      image: "/images/case study/cs 2.png",
      badge: "ROAS 3.58",
      period: "Aug 1 - 31, 2024",
      totalAds: "1,159"
    },
    {
      id: "03",
      title: "Case Study 03",
      roas: "4.12",
      spend: "$26,933.39",
      sales: "$111,094.31",
      purchases: "1,821",
      image: "/images/case study/cs 3.png",
      badge: "ROAS 4.12",
      period: "Aug 1 - 31, 2024",
      totalAds: "1,431"
    },
    {
      id: "04",
      title: "Case Study 04",
      sales: "$404,038.45",
      orders: "4,418",
      image: "/images/case study/cs 4.png",
      badge: "$404K+ Total Sales",
      storeName: "Sweetapolita",
      period: "Jan 1 - Sep 1, 2024",
      sessions: "212,392",
      conversionRate: "1.98%",
      avgOrderValue: "$87.48"
    },
    {
      id: "05",
      title: "Case Study 05",
      sales: "$168,327.29",
      orders: "2,827",
      image: "/images/case study/cs 5.png",
      badge: "$168K+ Total Sales",
      period: "Oct 1 - Dec 28, 2023",
      sessions: "164,457",
      conversionRate: "1.23%",
      avgOrderValue: "$52.41"
    },
    {
      id: "06",
      title: "Case Study 06",
      image: "/images/case study/cs 6.png",
      badge: "Ad Creative Strategy",
      storeName: "Threat Llama",
      period: "Q4 2023",
      adType: "Facebook & Instagram Stories"
    },
    {
      id: "07",
      title: "Case Study 07",
      roas: "5.82",
      spend: "$11,078.82",
      sales: "$64,506.36",
      purchases: "834",
      image: "/images/case study/cs 7.png",
      badge: "ROAS 5.82",
      period: "Oct 1 - Dec 31, 2023",
      totalAds: "790"
    },
    {
      id: "08",
      title: "Case Study 08",
      roas: "6.49",
      spend: "$21,096.24",
      sales: "$136,857.74",
      purchases: "1,772",
      image: "/images/case study/cs 8.png",
      badge: "ROAS 6.49",
      period: "Oct 1 - Dec 31, 2023",
      totalCampaigns: "71"
    },
    {
      id: "09",
      title: "Case Study 09",
      roas: "6.44",
      spend: "£342,464.40",
      sales: "£2,204,453.63",
      purchases: "43,851",
      image: "/images/case study/cs 9.png",
      badge: "ROAS 6.44",
      period: "Jan 1 - Jul 31, 2023",
      reach: "47,660,522"
    },
    {
      id: "10",
      title: "Case Study 10",
      roas: "7.66",
      spend: "£819,357.83",
      sales: "£6,276,202.80",
      purchases: "122,065",
      image: "/images/case study/cs 10.png",
      badge: "ROAS 7.66",
      period: "Aug 1 - Dec 31, 2023",
      reach: "110,946,137"
    },
    {
      id: "11",
      title: "Case Study 11",
      roas: "3.43",
      spend: "£895,959.60",
      sales: "£3,074,102.72",
      purchases: "71,478",
      image: "/images/case study/cs 11.png",
      badge: "ROAS 3.43",
      period: "May 1 - Aug 10, 2024",
      reach: "113,137,796"
    },
    {
      id: "12",
      title: "Case Study 12",
      sales: "$410,825.91",
      orders: "2,537",
      image: "/images/case study/cs 12.png",
      badge: "$410K+ Total Sales",
      storeName: "Backgammon Galaxy",
      period: "Sep 1, 2023 - Apr 30, 2024",
      sessions: "157,055",
      conversionRate: "1.45%",
      avgOrderValue: "$159.55"
    },
    {
      id: "13",
      title: "Case Study 13",
      sales: "$277,286.66",
      orders: "1,733",
      image: "/images/case study/cs 13.png",
      badge: "$277K+ Total Sales",
      storeName: "Backgammon Galaxy",
      period: "Jan 1 - Aug 9, 2024",
      sessions: "134,914",
      conversionRate: "1.13%",
      avgOrderValue: "$158.12"
    },
    {
      id: "14",
      title: "Case Study 14",
      image: "/images/case study/cs 14.png",
      badge: "Email Campaigns",
      storeName: "The Moss Way",
      period: "Jun - Jul 2024",
      emailRevenue: "£15,000+",
      campaigns: "15+ Email Campaigns"
    },
    {
      id: "15",
      title: "Case Study 15",
      sales: "£184,647.48",
      image: "/images/case study/cs 15.png",
      badge: "£184K+ Total Revenue",
      storeName: "The Moss Way",
      period: "Feb 5 - Aug 3, 2024",
      attributedRevenue: "£72,717.94",
      emailPercentage: "39.38%"
    }
  ];

  return (
    <div className="bg-white text-black font-sans selection:bg-brand-500 selection:text-white min-h-screen pb-24">
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

      {/* Header */}
      <section className="pt-32 pb-16 text-center">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4">
            <Link to="/" className="mb-8 inline-flex items-center text-gray-400 hover:text-brand-500 transition-colors font-bold uppercase tracking-widest text-xs group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-black text-black uppercase tracking-tight mb-6">
              E-commerce <span className="text-brand-500">Marketing Case Studies</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg">
              Explore our full range of successful campaigns and real-time results across various industries and platforms.
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allCaseStudies.map((cs, idx) => (
            <FadeInSection key={cs.id} delay={idx * 50} className="bg-white rounded-[2rem] p-8 border-2 border-brand-100 hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-500/10 group">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-black group-hover:text-brand-500 transition-colors">{cs.title}</h3>
                <div className="bg-brand-500 text-white px-4 py-2 rounded-lg text-xs font-black transform rotate-2">{cs.badge}</div>
              </div>
              <p className="text-gray-600 font-medium mb-8 text-sm">
                {cs.id === "01" && (
                  <>
                    <span className="text-brand-500 font-black">Hastamuerte</span> Achieved <span className="text-brand-500 font-black">$1,928,190.59</span> In Total Sales With <span className="text-brand-500 font-black">24,035 Orders</span>. Drove <span className="text-brand-500 font-black">1,096,505 Sessions</span> At <span className="text-brand-500 font-black">1.39% Conversion Rate</span> During <span className="text-brand-500 font-black">Jan 1 - Sep 12, 2024</span>.
                  </>
                )}
                {cs.id === "02" && (
                  <>
                    Generated <span className="text-brand-500 font-black">$85,543.55</span> In Purchase Value With <span className="text-brand-500 font-black">$23,919.96 Ad Spend</span>. Ran <span className="text-brand-500 font-black">1,159 Active Ads</span> During <span className="text-brand-500 font-black">Aug 1 - 31, 2024</span>, Delivering <span className="text-brand-500 font-black">1,507 Purchases</span> At <span className="text-brand-500 font-black">3.58 ROAS</span>.
                  </>
                )}
                {cs.id === "03" && (
                  <>
                    Achieved <span className="text-brand-500 font-black">$111,094.31</span> In Revenue With <span className="text-brand-500 font-black">$26,933.39 Ad Investment</span>. Managed <span className="text-brand-500 font-black">1,431 Ads</span> During <span className="text-brand-500 font-black">Aug 1 - 31, 2024</span>, Securing <span className="text-brand-500 font-black">1,821 Purchases</span> At <span className="text-brand-500 font-black">4.12 ROAS</span>.
                  </>
                )}
                {cs.id === "04" && (
                  <>
                    <span className="text-brand-500 font-black">Sweetapolita</span> Generated <span className="text-brand-500 font-black">$404,038.45</span> With <span className="text-brand-500 font-black">4,418 Orders</span>. Achieved <span className="text-brand-500 font-black">1.98% Conversion Rate</span> Across <span className="text-brand-500 font-black">212,392 Sessions</span> During <span className="text-brand-500 font-black">Jan 1 - Sep 1, 2024</span>.
                  </>
                )}
                {cs.id === "05" && (
                  <>
                    Delivered <span className="text-brand-500 font-black">$168,327.29</span> In Total Sales With <span className="text-brand-500 font-black">2,827 Orders</span>. Reached <span className="text-brand-500 font-black">164,457 Sessions</span> At <span className="text-brand-500 font-black">1.23% Conversion Rate</span> During <span className="text-brand-500 font-black">Oct 1 - Dec 28, 2023</span>.
                  </>
                )}
                {cs.id === "06" && (
                  <>
                    <span className="text-brand-500 font-black">Threat Llama</span> Launched Multi-Creative Ad Campaigns Across <span className="text-brand-500 font-black">Facebook & Instagram Stories</span>. Executed Strategic Ad Positioning During <span className="text-brand-500 font-black">Q4 2023</span> For Maximum Audience Engagement.
                  </>
                )}
                {cs.id === "07" && (
                  <>
                    Generated <span className="text-brand-500 font-black">$64,506.36</span> With <span className="text-brand-500 font-black">$11,078.82 Ad Spend</span>. Operated <span className="text-brand-500 font-black">790 Ads</span> During <span className="text-brand-500 font-black">Oct 1 - Dec 31, 2023</span>, Driving <span className="text-brand-500 font-black">834 Purchases</span> At <span className="text-brand-500 font-black">5.82 ROAS</span>.
                  </>
                )}
                {cs.id === "08" && (
                  <>
                    Achieved <span className="text-brand-500 font-black">$136,857.74</span> In Revenue With <span className="text-brand-500 font-black">$21,096.24 Investment</span>. Managed <span className="text-brand-500 font-black">71 Campaigns</span> During <span className="text-brand-500 font-black">Oct 1 - Dec 31, 2023</span>, Securing <span className="text-brand-500 font-black">1,772 Purchases</span> At <span className="text-brand-500 font-black">6.49 ROAS</span>.
                  </>
                )}
                {cs.id === "09" && (
                  <>
                    Delivered <span className="text-brand-500 font-black">£2,204,453.63</span> With <span className="text-brand-500 font-black">£342,464.40 Ad Spend</span>. Reached <span className="text-brand-500 font-black">47,660,522 People</span> During <span className="text-brand-500 font-black">Jan 1 - Jul 31, 2023</span>, Generating <span className="text-brand-500 font-black">43,851 Purchases</span> At <span className="text-brand-500 font-black">6.44 ROAS</span>.
                  </>
                )}
                {cs.id === "10" && (
                  <>
                    Generated <span className="text-brand-500 font-black">£6,276,202.80</span> With <span className="text-brand-500 font-black">£819,357.83 Investment</span>. Achieved <span className="text-brand-500 font-black">110,946,137 Reach</span> During <span className="text-brand-500 font-black">Aug 1 - Dec 31, 2023</span>, Securing <span className="text-brand-500 font-black">122,065 Purchases</span> At <span className="text-brand-500 font-black">7.66 ROAS</span>.
                  </>
                )}
                {cs.id === "11" && (
                  <>
                    Achieved <span className="text-brand-500 font-black">£3,074,102.72</span> In Revenue With <span className="text-brand-500 font-black">£895,959.60 Ad Spend</span>. Reached <span className="text-brand-500 font-black">113,137,796 Users</span> During <span className="text-brand-500 font-black">May 1 - Aug 10, 2024</span>, Driving <span className="text-brand-500 font-black">71,478 Purchases</span> At <span className="text-brand-500 font-black">3.43 ROAS</span>.
                  </>
                )}
                {cs.id === "12" && (
                  <>
                    <span className="text-brand-500 font-black">Backgammon Galaxy</span> Generated <span className="text-brand-500 font-black">$410,825.91</span> With <span className="text-brand-500 font-black">2,537 Orders</span>. Achieved <span className="text-brand-500 font-black">1.45% Conversion Rate</span> Across <span className="text-brand-500 font-black">157,055 Sessions</span> During <span className="text-brand-500 font-black">Sep 1, 2023 - Apr 30, 2024</span>.
                  </>
                )}
                {cs.id === "13" && (
                  <>
                    <span className="text-brand-500 font-black">Backgammon Galaxy</span> Delivered <span className="text-brand-500 font-black">$277,286.66</span> With <span className="text-brand-500 font-black">1,733 Orders</span>. Reached <span className="text-brand-500 font-black">134,914 Sessions</span> At <span className="text-brand-500 font-black">1.13% Conversion Rate</span> During <span className="text-brand-500 font-black">Jan 1 - Aug 9, 2024</span>.
                  </>
                )}
                {cs.id === "14" && (
                  <>
                    <span className="text-brand-500 font-black">The Moss Way</span> Executed <span className="text-brand-500 font-black">15+ Email Campaigns</span> Generating <span className="text-brand-500 font-black">£15,000+</span> In Revenue. Campaigns Ran During <span className="text-brand-500 font-black">Jun - Jul 2024</span> With High Open & Click Rates Across All Segments.
                  </>
                )}
                {cs.id === "15" && (
                  <>
                    <span className="text-brand-500 font-black">The Moss Way</span> Achieved <span className="text-brand-500 font-black">£184,647.48</span> Total Revenue With <span className="text-brand-500 font-black">39.38% Attributed</span>. Email Marketing Generated <span className="text-brand-500 font-black">£72,717.94</span> During <span className="text-brand-500 font-black">Feb 5 - Aug 3, 2024</span>.
                  </>
                )}
              </p>
              <div className="bg-brand-50 rounded-2xl h-64 flex items-end relative overflow-hidden border border-brand-100 group-hover:bg-white transition-colors">
                <img src={cs.image} alt={`Intrax Media E-commerce Case Study ${cs.id} - ${cs.storeName || 'Successful Campaign'} Result`} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-24 text-center">
        <FadeInSection>
          <div className="inline-block p-4 bg-brand-50 rounded-full mb-8">
            <TrendingUp className="text-brand-500" size={40} />
          </div>
          <h2 className="text-4xl font-display font-black mb-8 text-black">READY TO BE NEXT?</h2>
          <Link to="/contact">
            <Button variant="black" size="lg" className="shadow-2xl">BOOK A DISCOVERY CALL</Button>
          </Link>
        </FadeInSection>
      </section>
    </div>
  );
};