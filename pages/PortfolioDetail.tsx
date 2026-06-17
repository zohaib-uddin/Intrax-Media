import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Target, BarChart3, Globe, Clock, Video, Zap } from 'lucide-react';
import { CalendlyEmbed } from '../components/CalendlyEmbed';

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

export const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const portfolioDetails: Record<string, any> = {
    "Hastamuerte": {
      name: "Hastamuerte",
      description: "Urban streetwear fashion store",
      about: "Hastamuerte is a premium urban streetwear brand dedicated to those who prioritize style, quality, and bold self-expression. Their collections embody the philosophy of 'Make Moves, Not Excuses,' offering Trendsetting apparel that helps you define your own legacy.",
      outcomes: [
        { value: "65%", label: "Total Revenue Lift" },
        { value: "72%", label: "Ad Revenue Growth" },
        { value: "60%", label: "Unit Sales Surge" },
        { value: "57%", label: "Order Volume Boost" }
      ],
      whatWeDid: "We engineered a complete full-funnel advertising ecosystem on Meta, utilizing high-end urban lifestyle content and data-driven audience segmentation to dominate the streetwear market.",
      strategies: [
        {
          title: "Streetwear Scaling Engine",
          points: [
            "Conducted a deep-dive 'Brand Perception' audit which revealed that high-ticket streetwear shoppers valued exclusive drops over generic discounts.",
            "Implemented a 'Drop-Culture' ad strategy, using countdown timers and limited-availability messaging to drive massive spikes in weekend conversion rates.",
            "Utilized Meta's 'Advantage+ Creative' to automatically test hundreds of lifestyle vs. studio product shots, identifying a 2.5x higher CTR for 'On-Model' urban shots.",
            "Deployed a 'Loyalty-Loop' retargeting funnel focusing on high-LTV customers with early access to seasonal collections (Varsity Jackets & Hoodies).",
            "Executed a massive influencer-whiting campaign, where top urban fashion creators' content was promoted through the brand's ad account for authentic reach.",
            "Integrated server-side tracking (CAPI) to recover 25% of 'lost' attribution data from iOS users, allowing for precise scaling of the most profitable ad sets."
          ]
        }
      ],
      funnelStages: [
        { stage: "Legacy Awareness", desc: "Cinematic lifestyle videos capturing the 'Make Moves' philosophy to attract high-intent urban fashion enthusiasts." },
        { stage: "Style Consideration", desc: "Detailed 'Outfit of the Day' carousels and influencer testimonials to build social proof and desire." },
        { stage: "Legacy Conversion", desc: "Dynamic product ads (DPA) featuring the exact items users viewed, combined with 'Finish the Look' cross-sell offers." }
      ],
      finalResults: "Within 2 months, Hastamuerte saw a 48% increase in online store sessions and a 91% average boost across all key performance metrics. The brand successfully established itself as a high-velocity urban fashion leader.",
      images: [
        "/images/hastamuerte/has 1.png",
        "/images/hastamuerte/has 2.png",
        "/images/hastamuerte/has 3.png",
        "/images/hastamuerte/has 4.png",
        "/images/hastamuerte/has 5.png",
        "/images/hastamuerte/has 6.png"
      ],
      mobileImages: [
        "/images/hastamuerte/has 7.png",
        "/images/hastamuerte/has 8.png",
        "/images/hastamuerte/has 9.png"
      ],
      laptopImage: "/images/hastamuerte/has 1.png"
    },
    "Sweetapolita": {
      name: "Sweetapolita",
      description: "Premium baking supplies and edible decorations",
      about: "Sweetapolita is a magical baking brand specializing in enchanted sprinkles and edible glitter. Founded by Rosie Alyea, the brand inspires bakers worldwide to add a touch of wonder to their creations.",
      outcomes: [
        { value: "69%", label: "Total Revenue Increase" },
        { value: "69%", label: "Ad Revenue Boost" },
        { value: "69%", label: "Unit Sales Lift" },
        { value: "36%", label: "Order Volume Growth" }
      ],
      whatWeDid: "We implemented a 'Vibrant Content' strategy that matched the brand's colorful aesthetic, utilizing TikTok-first trends and high-engagement visual storytelling to dominate the baking niche.",
      strategies: [
        {
          title: "Baking Community Dominance",
          points: [
            "Conducted a 'Seasonal Trend' analysis to identify peak baking periods, aligning ad spend with high-velocity events like the 'Advent Calendar' launch.",
            "Deployed over 300+ variation tests on TikTok, focusing on 'Dessert ASMR' and 'Sprinkle Mix' reveals which resulted in an average view duration of 15 seconds.",
            "Implemented a sophisticated Shopify 'Bundle Builder' that allowed users to create their own sprinkle kits, increasing AOV by 28% from first-time buyers.",
            "Developed high-intent Pinterest campaigns targeting 'Baking Decor' and 'Birthday Party Ideas,' driving consistent cold traffic with a 3.2x ROI.",
            "Optimized the email marketing engine to notify subscribers of 'Small-Batch' limited drops, resulting in a 42% consistent re-conversion rate.",
            "Leveraged Meta's Advantage+ catalog for automated broad targeting to find 'Gift Givers' and 'Home Bakers' globally, achieving a stable 4.5x blended ROAS."
          ]
        }
      ],
      funnelStages: [
        { stage: "Visual Inspiration", desc: "High-energy, colorful videos on TikTok and Reels showcasing the 'Magic' of Sweetapolita products." },
        { stage: "Creative Validation", desc: "Detailed product deep-dives and user-shared creation videos to prove the beauty and quality of the sprinkles." },
        { stage: "Magical Conversion", desc: "Direct response ads highlighting seasonal advent calendars and 'Build your own' magical sprinkle kits." }
      ],
      finalResults: "Sweetapolita saw a massive 69% increase in revenue across all key metrics. The brand established itself as the go-to destination for high-end baking decorations with a robust and loyal global community of creators.",
      images: [
        "/images/sweetapolita/sw 1.png",
                "/images/sweetapolita/sw 2.png",
                "/images/sweetapolita/sw 3.png",
                "/images/sweetapolita/sw 4.png",
                "/images/sweetapolita/sw 5.png",
                "/images/sweetapolita/sw 6.png"
      ],
      mobileImages: [
        "/images/sweetapolita/sw 7.png",
        "/images/sweetapolita/sw 8.png",
        "/images/sweetapolita/sw 9.png"
      ],
      laptopImage: "/images/sweetapolita/sw 1.png"
    },
    "British Supplements": {
      name: "British Supplements",
      description: "Premium UK manufactured health supplements",
      about: "British Supplements is a trusted UK-based health and wellness brand specializing in genuine, clean, and premium quality supplements manufactured in the United Kingdom. Founded with a commitment to transparency and quality, the company offers an extensive range of products including marine collagen, magnesium, vitamin D3+K2, lions mane, ashwagandha, and various specialized blends. With over 23,560 verified reviews and a strong focus on customer satisfaction, British Supplements provides everything from bestsellers like hydrolyzed marine collagen and mega magnesium to specialized products like clean enzymes, plant sterols, and mushroom extracts. Their product line features third-party testing, clear ingredient transparency, and competitive pricing with options for every health need.",
      outcomes: [
        { value: "7.8M", label: "Total Sales Generated" },
        { value: "8.5x", label: "Return On Ad Spend" },
        { value: "75%", label: "Revenue Contribution" },
        { value: "45%", label: "New Customer Growth" }
      ],
      whatWeDid: "We engineered a robust advertising infrastructure that prioritized high-intent search traffic and utilized advanced behavioral targeting to capture health-conscious consumers at the peak of their buying cycle.",
      strategies: [
        {
          title: "Scale & Trust Infrastructure",
          points: [
            "Conducted a comprehensive audit of the supplement landscape to identify key 'Ingredient-First' search trends that competitors were overlooking.",
            "Developed a hierarchical Google Search strategy targeting long-tail health benefits rather than just product names, reducing CPA by 32%.",
            "Implemented a 'Scientifically Backed' creative framework for Facebook Ads, using educational video content that broke down the bio-availability of the supplements.",
            "Structured a multi-layer retargeting funnel that addressed common health objections and provided social proof through video testimonials from long-term users.",
            "Optimized the Shopify checkout flow with trust-centric elements and subscription-based hooks to increase customer lifetime value (LTV).",
            "Leveraged CAPI (Conversions API) to ensure 100% data accuracy in the post-iOS14 tracking environment, allowing for more precise budget allocation."
          ]
        }
      ],
      funnelStages: [
        { stage: "Top Of Funnel (TOF)", desc: "Educational video ads highlighting the 'Clean Ingredient' problem in the industry to build awareness and demand." },
        { stage: "Middle Of Funnel (MOF)", desc: "Retargeting engaged users with detailed ingredient breakdowns and comparative analysis against mainstream brands." },
        { stage: "Bottom Of Funnel (BOF)", desc: "Conversion-focused ads with social proof and 'Buy 2 Get 1' bundles to maximize immediate order value." }
      ],
      finalResults: "The implementation of this clean-label marketing strategy resulted in a record-breaking £7.8 Million in total sales within 6 months. The ROAS remained stable at a healthy 8.5x even during aggressive scaling phases, with new customer acquisition increasing by 45%.",
      images: [
        "/images/british supplement/sp 1.png",
        "/images/british supplement/sp 2.png",
        "/images/british supplement/sp 3.png",
        "/images/british supplement/sp 4.png",
        "/images/british supplement/sp 5.png",
        "/images/british supplement/sp 6.png"
      ],
      mobileImages: [
        "/images/british supplement/sp 7.png",
        "/images/british supplement/sp 8.png",
        "/images/british supplement/sp 9.png"
      ],
      laptopImage: "/images/british supplement/sp 1.png"
    },
    "Rippl": {
      name: "Rippl",
      description: "Protective motorcycle riding gear and accessories",
      about: "Rippl is a premium motorcycle gear brand dedicated to providing riders with stylish, comfortable, and highly protective riding equipment. Specializing in innovative products like armored riding jeans, gel-padded shorts, thermal gloves, and protective eyewear, Rippl combines urban aesthetics with serious safety features. With over 50,000 satisfied customers, the brand has established itself as a trusted name in motorcycle protective gear.",
      outcomes: [
        { value: "72%", label: "Conv. Rate Growth" },
        { value: "47%", label: "AOV Increase" },
        { value: "246K", label: "Orders Fulfilled" },
        { value: "6.8x", label: "Average ROAS" }
      ],
      whatWeDid: "We implemented an 'Urban Mobility' marketing framework that redefined motorcycle safety as a lifestyle choice, utilizing high-velocity ad testing to identify winning creative hooks.",
      strategies: [
        {
          title: "Performance & Safety Framework",
          points: [
            "Developed 'Crash-Test' style video creatives that visually demonstrated the durability and safety features of the armored gear, driving immediate trust.",
            "Segmented the audience into 'Urban Commuters' and 'Adventure Riders,' tailoring the messaging to each group's specific pain points (style vs. durability).",
            "Integrated a robust TikTok Ads strategy focusing on the 'Wait for it' hook with gear reveals, resulting in a 4.2% CTR on brand discovery campaigns.",
            "Optimized the 'Compare to Competitor' landing page logic, highlighting Rippl's superior breathability and comfort metrics.",
            "Implemented an automated 'Gear Guide' post-click experience that helped users find their perfect size and protection level, increasing AOV by 47%.",
            "Deployed an Advantage+ Shopping campaign structure to leverage Meta's machine learning for automatic audience discovery and budget scaling."
          ]
        }
      ],
      funnelStages: [
        { stage: "Discovery (TOF)", desc: "High-energy lifestyle videos and stunt-coordinated content to capture the attention of the motorcycling community." },
        { stage: "Persuasion (MOF)", desc: "In-depth product feature videos and safety certification breakdowns to overcome technical objections." },
        { stage: "Retention (BOF)", desc: "Personalized retargeting with cross-sell offers for accessories (gloves, eyewear) based on the first purchase." }
      ],
      finalResults: "The scaling strategy led to Rippl achieving over 246,000 orders within the year, maintaining an average ROAS of 6.8x. The conversion rate saw a massive 72% jump as the creative-to-landing-page resonance was perfected.",
      images: [
        "/images/rippl/rp 1.png",
        "/images/rippl/rp 2.png",
        "/images/rippl/rp 3.png",
        "/images/rippl/rp 4.png",
        "/images/rippl/rp 5.png",
        "/images/rippl/rp 6.png"
      ],
      mobileImages: [
        "/images/rippl/rp 7.png",
        "/images/rippl/rp 8.png",
        "/images/rippl/rp 9.png"
      ],
      laptopImage: "/images/rippl/rp 1.png"
    },
    "Kidodido": {
      name: "Kidodido",
      description: "Montessori wooden toys and climbing furniture",
      about: "Kidodido is a specialized online store offering premium Montessori-inspired wooden toys and educational furniture designed for children's development and active play. The brand focuses on creating high-quality, natural wood products including climbing arches, learning towers, and balance toys that encourage physical activity and creative exploration.",
      outcomes: [
        { value: "42K+ ", label: "New Buyers" },
        { value: "161K", label: "Monthly Sessions" },
        { value: "5.4x", label: "Average ROAS" },
        { value: "$11.8", label: "Cost Per Acquisition" }
      ],
      whatWeDid: "We established a 'Developmental Milestone' marketing strategy, positioning Kidodido as an essential investment in a child's developmental journey rather than just a toy brand.",
      strategies: [
        {
          title: "Educational Growth Strategy",
          points: [
            "Conducted a 'Parental Anxiety' audit to understand the key developmental concerns of millennial parents, tailoring ad copy to address 'screen-time' vs 'active-play'.",
            "Implemented a high-production UGC (User Generated Content) strategy featuring real Montessori educators and parents demonstrating the safety and versatility of the climbing sets.",
            "Optimized Pinterest Ads to capture traffic from parents searching for 'Nursery decor' and 'Montessori playrooms,' resulting in a 3x increase in top-of-funnel traffic.",
            "Developed a 'Perfect Playroom' bundle strategy, cross-selling learning towers with climbing triangles to increase AOV by 35%.",
            "Automated a post-purchase email sequence providing developmental tips and play ideas, increasing the second-purchase rate within 90 days.",
            "Utilized Meta's broad targeting with specific interest 'exclusions' to ensure the ads reached high-intent parents without exhausting the budget on low-converting segments."
          ]
        }
      ],
      funnelStages: [
        { stage: "Discovery (TOF)", desc: "Inspirational 'Home Playroom' aesthetic videos on TikTok and Instagram to drive brand discovery." },
        { stage: "Education (MOF)", desc: "Detailed product safety videos and 'Montessori Method' explanations to build authority and trust." },
        { stage: "Conversion (BOF)", desc: "Direct response ads featuring limited-time bundle offers and free shipping hooks." }
      ],
      finalResults: "The mission-driven approach generated over 42,000 new buyers within a single year, with monthly impressions exceeding 1.2M. The CPA remained extremely efficient at $11.82, well below the industry average for high-ticket wooden furniture.",
      images: [
        "/images/kidodido/kd 1.png",
        "/images/kidodido/kd 2.png",
        "/images/kidodido/kd 3.png",
        "/images/kidodido/kd 4.png",
        "/images/kidodido/kd 5.png",
        "/images/kidodido/kd 6.png"
      ],
      mobileImages: [
        "/images/kidodido/kd 7.png",
        "/images/kidodido/kd 8.png",
        "/images/kidodido/kd 9.png"
      ],
      laptopImage: "/images/kidodido/kd 1.png"
    },
    "Notinregs": {
      name: "Notinregs",
      description: "Military-themed apparel and novelty merchandise",
      about: "NotinRegs is a specialized online store offering edgy military-themed apparel, accessories, and novelty items designed for military personnel, veterans, and enthusiasts. The brand features a wide range of products that resonate with military culture through humor and bold designs.",
      outcomes: [
        { value: "115%", label: "Revenue Lift" },
        { value: "5.8x", label: "Blended ROAS" },
        { value: "85%", label: "Unit Sales Increase" },
        { value: "80%", label: "Order Volume Growth" }
      ],
      whatWeDid: "We capitalized on the 'Identity-Centric' apparel trend by creating a hyper-targeted creative engine that spoke directly to the dark humor found in the veteran and active-duty community.",
      strategies: [
        {
          title: "Community Growth Engine",
          points: [
            "Conducted a deep-dive analysis into military sub-cultures to identify specific 'Inside Jokes' that would serve as high-converting ad hooks.",
            "Scaled winning apparel designs using a dynamic creative testing (DCT) framework, allowing us to identify the best image/copy combinations in 48 hours.",
            "Implemented a 'Limited Drop' strategy for exclusive patches and stickers, creating artificial scarcity and driving immediate conversion spikes.",
            "Optimized Facebook Ad targeting to reach military bases and surrounding zip codes, ensuring the high-resonance content was seen by the core audience.",
            "Developed a robust Shopify upsell funnel that offered mystery stickers and discounted 'shotgun tools' at the point of purchase, increasing AOV by 22%.",
            "Deployed an Advantage+ campaign optimized for 'Catalog Sales' to automatically serve products that shoppers had previously browsed."
          ]
        }
      ],
      funnelStages: [
        { stage: "Viral Discovery", desc: "Humorous, meme-style video ads that encouraged sharing and engagement within military communities." },
        { stage: "Product Education", desc: "Static and carousel ads showcasing the high-quality fabric and durable print process." },
        { stage: "Direct Conversion", desc: "Retargeting ads featuring 'Last Chance' messaging for limited edition patriotic apparel." }
      ],
      finalResults: "Notinregs achieved an unprecedented 115% increase in annual revenue, with order volume growing by 80%. The brand successfully transitioned from a niche shop to a community powerhouse with a loyal, high-LTV customer base.",
      images: [
        "/images/notinregs/ng 1.png",
        "/images/notinregs/ng 2.png",
        "/images/notinregs/ng 3.png",
        "/images/notinregs/ng 4.png",
        "/images/notinregs/ng 5.png",
        "/images/notinregs/ng 6.png"
      ],
      mobileImages: [
        "/images/notinregs/ng 7.png",
        "/images/notinregs/ng 8.png",
        "/images/notinregs/ng 9.png"
      ],
      laptopImage: "/images/notinregs/ng 1.png"
    },
    "American Trigger Pullers": {
      name: "American Trigger Pullers",
      description: "Veteran-owned military apparel and gear",
      about: "American Trigger Pullers is a veteran-owned and operated online store specializing in military-themed apparel, headwear, and accessories for service members, veterans, and military enthusiasts.",
      outcomes: [
        { value: "4.8M", label: "Digital Sales (PKR)" },
        { value: "7.2x", label: "Return on Ad Spend" },
        { value: "30%", label: "New Customer Rate" },
        { value: "25%", label: "CPA Reduction" }
      ],
      whatWeDid: "We engineered a 'Patriotic Identity' advertising engine that utilized aggressive meta-data segmentation to deliver personalized unit-specific gear to veterans across the United States.",
      strategies: [
        {
          title: "Veteran Community Scaling",
          points: [
            "Deployed 'Unit-Specific' ad campaigns targeting retired and active duty members of elite regiments, resulting in a 12% conversion rate on the dedicated landing pages.",
            "Implemented a high-engagement Facebook Group strategy where customers could request custom unit designs, driving organic demand and early bird sales.",
            "Optimized the 'Build your own bundle' Shopify logic, allowing users to combine hats, shirts, and stickers for a 20% discount, increasing AOV by $18.",
            "Developed an SEO-centric content strategy around 'Veteran Pride' and 'Military Traditions,' capturing high-intent organic search volume.",
            "Utilized Pinterest and Instagram as secondary channels to reach family members of veterans searching for 'Gifts for him,' maximizing seasonal sales spikes.",
            "Restructured the ad account with a 'CBO' (Campaign Budget Optimization) approach to allow Meta's algorithm more freedom to spend on high-performing unit designs."
          ]
        }
      ],
      funnelStages: [
        { stage: "Unit Discovery", desc: "Inspirational unit-specific gear reveals that encouraged veterans to tag their fellow service members." },
        { stage: "Quality Proof", desc: "Detailed 'Material spotlight' videos showing the high-quality embroidery and durable fabric of the retro foamies." },
        { stage: "Retention", desc: "Post-purchase retargeting with exclusive discounts for family members and unit deployments." }
      ],
      finalResults: "American Trigger Pullers saw a massive 150% growth in overall digital revenue with a consistent 7.2x ROAS. The brand became the first-choice for unit-themed headwear within its targeted military segments.",
      images: [
        "/images/atp/atp 1.png",
        "/images/atp/atp 2.png",
        "/images/atp/atp 3.png",
        "/images/atp/atp 4.png",
        "/images/atp/atp 5.png",
        "/images/atp/atp 6.png"
      ],
      mobileImages: [
        "/images/atp/atp 7.png",
        "/images/atp/atp 8.png",
        "/images/atp/atp 9.png"
      ],
      laptopImage: "/images/atp/atp 1.png"
    },    "Tango Foxtrot": {
      name: "Tango Foxtrot",
      description: "Military-inspired apparel and patriotic merchandise",
      about: "Tango Foxtrot is a veteran-supported brand dedicated to crafting exceptional apparel and accessories that honor military service through art. Their collection features striking pin-up style artwork with military and tactical themes on premium products.",
      outcomes: [
        { value: "92%", label: "Sales Growth" },
        { value: "6.5x", label: "Return on Ad Spend" },
        { value: "45%", label: "Repeat Purchase Rate" },
        { value: "60%", label: "Organic Traffic Lift" }
      ],
      whatWeDid: "We implemented an 'Art-First' creative strategy that leveraged the brand's unique aesthetic to drive high engagement on visual-centric platforms like Instagram and Pinterest.",
      strategies: [
        {
          title: "Aesthetic Domination",
          points: [
            "Conducted a 'Creative Resonance' audit to identify which artwork styles (Classic Pin-up vs. Modern Tactical) generated the highest click-through rates.",
            "Developed a cinematic video strategy showcasing the 'Artist Behind the Brand,' creating an emotional connection with collectors and enthusiasts.",
            "Implemented a tiered retargeting funnel where top-engaged users were served 'Collector Edition' product reveals and time-limited patches.",
            "Optimized the mobile storefront with a high-speed 'Visual Search' feature, allowing users to browse products by specific artwork themes.",
            "Launched a robust influencer gifting program targeting high-profile veterans in the fitness and tactical space, resulting in over 20M organic impressions.",
            "Leveraged Meta's 'Dynamic Creative' feature to test 50+ artwork and headline combinations simultaneously, identifying the highest-ROI assets within 72 hours."
          ]
        }
      ],
      funnelStages: [
        { stage: "Visual Discovery", desc: "High-impact artwork reveals and lifestyle photography that positions the brand as a premium lifestyle choice." },
        { stage: "Brand Storytelling", desc: "Short-form documentaries and interviews with the creators to build deep brand affinity and legitimacy." },
        { stage: "Collector Conversion", desc: "Exclusive 'Member-Only' drop access and early-bird discounts for repeat customers and high-intent visitors." }
      ],
      finalResults: "Tango Foxtrot achieved a staggering 92% increase in year-over-year sales, with a stable 6.5x ROAS. The repeat purchase rate stabilized at 45%, proving the success of the 'Collector Economy' logic we built.",
      images: [
        "/images/tango foxtrot/tg 1.png",
        "/images/tango foxtrot/tg 2.png",
        "/images/tango foxtrot/tg 3.png",
        "/images/tango foxtrot/tg 4.png",
        "/images/tango foxtrot/tg 5.png",
        "/images/tango foxtrot/tg 6.png"
      ],
      mobileImages: [
        "/images/tango foxtrot/tg 7.png",
        "/images/tango foxtrot/tg 8.png",
        "/images/tango foxtrot/tg 9.png"
      ],
      laptopImage: "/images/tango foxtrot/tg 1.png"
    },
    "Kona Earth Coffee": {
      name: "Kona Earth Coffee",
      description: "Premium 100% Kona coffee and Hawaiian gourmet products",
      about: "Kona Earth is a premium Hawaiian coffee company specializing in authentic 100% Kona coffee grown and roasted on private estates. Micro-batch roasted to ensure supreme freshness and perfection in every cup.",
      outcomes: [
        { value: "120%", label: "Traffic Surge" },
        { value: "5.8x", label: "Yield on Spend" },
        { value: "65%", label: "Conversion Lift" },
        { value: "50%", label: "AOV Increase" }
      ],
      whatWeDid: "We implemented a 'Farm-to-Table' storytelling engine that positioned Kona Earth as the superior choice for coffee connoisseurs, utilizing educational video content and high-intent search capture.",
      strategies: [
        {
          title: "Connoisseur Conversion Strategy",
          points: [
            "Conducted a keyword analysis focusing on 'Single-Origin' and 'Estate-Grown' search volume, capturing premium traffic at a 25% lower CPC than generic coffee terms.",
            "Developed 'Soil-to-Sip' video series for social media, showcasing the unique Hawaiian volcanic soil and the micro-batch roasting process to build authority.",
            "Implemented a subscription-first checkout flow on Shopify, resulting in a predictable 30% monthly recurring revenue (MRR) growth.",
            "Optimized Google Search ads for 'Gift for Coffee Lovers' during holiday seasons, capturing high-intent gift buyers with a 7.2x seasonal ROAS.",
            "Developed an email-based 'Coffee Nerd' newsletter that provided brewing tips and coffee origin stories, maintaining a 42% average open rate.",
            "Leveraged CAPI and server-side tracking to ensure high-fidelity data attribution across all paid channels, allowing for precise budget scaling."
          ]
        }
      ],
      funnelStages: [
        { stage: "Aromatic Discovery", desc: "Sensory-rich video ads that highlight the premium nature and limited availability of authentic Kona coffee." },
        { stage: "Roast Education", desc: "Detailed breakdowns of the roast profiles and estate history to justify the premium price point." },
        { stage: "Subscription Focus", desc: "Direct response ads highlighting the convenience and savings of a 'Coffee of the Month' subscription." }
      ],
      finalResults: "Kona Earth saw a massive 120% traffic surge within 4 months, with conversion rates climbing by 65%. The brand established a robust recurring revenue stream that now accounts for 40% of total sales.",
      images: [
        "/images/kona earth coffe/kn 1.png",
        "/images/kona earth coffe/kn 2.png",
        "/images/kona earth coffe/kn 3.png",
        "/images/kona earth coffe/kn 4.png",
        "/images/kona earth coffe/kn 5.png",
        "/images/kona earth coffe/kn 6.png"
      ],
      mobileImages: [
        "/images/kona earth coffe/kn 7.png",
        "/images/kona earth coffe/kn 8.png",
        "/images/kona earth coffe/kn 9.png"
      ],
      laptopImage: "/images/kona earth coffe/kn 1.png"
    },

    "Griqos": {
      name: "Griqos",
      description: "Premium wellness and pain relief products",
      about: "Griqos is a wellness brand specializing in innovative pain relief solutions like the Limitless Knee Pro™. The brand focuses on leveraging advanced therapeutic technology to help people reclaim their mobility.",
      outcomes: [
        { value: "48%", label: "Order Volume Lift" },
        { value: "3.9x", label: "Profit on Ad Spend" },
        { value: "25%", label: "CPA Reduction" },
        { value: "1.2M", label: "Reach in EU" }
      ],
      whatWeDid: "We implemented a 'Solution-First' advertising engine that focused on the immediate life-improving benefits of the products, leveraging heavy consumer psychology and UGC.",
      strategies: [
        {
          title: "Pain-Solution Dynamics",
          points: [
            "Developed 'Transformation-Driven' ad creatives showing users going from limited mobility to active lifestyles using the knee pro, driving a 3.8% CTR.",
            "Restructured the Meta ad account into a 'Broad-Search' hybrid model, allowing the algorithm to find pain sufferers without restrictive interest targeting.",
            "Implemented a high-trust landing page featuring verified customer videos and a '60-Day Pain-Free' money-back guarantee, increasing conversion rate by 22%.",
            "Deployed an automated SMS recovery sequence for abandoned checkouts, resulting in a 12% lift in previously lost revenue.",
            "Tested 15+ variations of the 'Hero Product' hook in the first 30 days to identify the most resonating emotional trigger for the older demographic.",
            "Leveraged CAPI for accurate tracking across international markets (US, UK, CA, AU), ensuring zero data loss in the post-pixel era."
          ]
        }
      ],
      funnelStages: [
        { stage: "Problem Recognition", desc: "Educational video ads that highlight the common causes of knee pain and the 'hidden' features of the Limitless Knee Pro." },
        { stage: "Proof Of Concept", desc: "Detailed customer testimonials and 'Unboxing' style videos to build legitimacy and product trust." },
        { stage: "Risk Reversal", desc: "Direct response ads highlighting the 60-day money-back guarantee and fast worldwide shipping." }
      ],
      finalResults: "Griqos achieved a 25% reduction in CPA while scaling order volume by 48%. The brand successfully expanded into the European market, reaching over 1.2M targeted individuals within 6 months.",
      images: [
        "/images/griqos/gq 1.png",
        "/images/griqos/gq 2.png",
        "/images/griqos/gq 3.png",
        "/images/griqos/gq 4.png",
        "/images/griqos/gq 5.png",
        "/images/griqos/gq 6.png"
      ],
      mobileImages: [
        "/images/griqos/gq 7.png",
        "/images/griqos/gq 8.png",
        "/images/griqos/gq 9.png"
      ],
      laptopImage: "/images/griqos/gq 1.png"
    },
    "Panty Promise": {
      name: "Panty Promise",
      description: "Organic cotton underwear and seamless panties",
      about: "Panty Promise is a women-founded intimate apparel brand revolutionizing the underwear industry with gynecologist-recommended organic cotton panties designed for health and comfort.",
      outcomes: [
        { value: "75%", label: "Revenue Surge" },
        { value: "7.2x", label: "Average ROAS" },
        { value: "50%", label: "Search Volume Lift" },
        { value: "40%", label: "Global Market Reach" }
      ],
      whatWeDid: "We implemented a 'Wellness-First' advertising strategy that addressed feminine health taboos directly, positioning the brand as an essential health investment.",
      strategies: [
        {
          title: "Health & Style Integration",
          points: [
            "Developed 'Education-Led' ad creatives featuring interviews with gynecologists, addressing common intimate health issues and how the product solves them.",
            "Launched a comprehensive Google Search strategy targeting 'Organic Underwear' and 'pH Balanced Apparel' keywords, resulting in a 4.5x ROAS on generic search.",
            "Implemented a sophisticated 'Solution-Matcher' quiz on the landing page, helping users find their perfect style while collecting high-quality zero-party data.",
            "Optimized Facebook retargeting with a 'Problem-Solution' logic, showing specific ad copy based on the product categories the user previously viewed.",
            "Leveraged CAPI for accurate international tracking across the US and UK markets, allowing for a scaled global acquisition strategy.",
            "Created a robust 'Refer-a-Friend' program that incentivized loyal customers to spread the word, reducing overall CPA by 18%."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness (TOF)", desc: "Educational videos and infographics that highlight the health risks of synthetic fabrics in intimate apparel." },
        { stage: "Consideration (MOF)", desc: "Customer testimonials and deep-dives into the organic cotton manufacturing and seamless technology." },
        { stage: "Expansion (BOF)", desc: "Direct response ads featuring 'Starter Bundles' and limited-time international shipping offers." }
      ],
      finalResults: "Panty Promise saw a 75% lift in annual revenue with an exceptional 7.2x blended ROAS. The brand successfully expanded its reach into three new international markets while maintaining efficient acquisition costs.",
      images: [
        "/images/panty promise/pm 1.png",
        "/images/panty promise/pm 2.png",
        "/images/panty promise/pm 3.png",
        "/images/panty promise/pm 4.png",
        "/images/panty promise/pm 5.png",
        "/images/panty promise/pm 6.png"
      ],
      mobileImages: [
        "/images/panty promise/pm 7.png",
        "/images/panty promise/pm 8.png",
        "/images/panty promise/pm 9.png"
      ],
      laptopImage: "/images/panty promise/pm 1.png"
    },
    "The Moss Way": {
      name: "The Moss Way",
      description: "Organic Irish Sea Moss and natural wellness products",
      about: "The Moss Way provides organic, hand-picked Irish Sea Moss harvested from the pristine waters of Western Ireland. The brand focuses on delivering nature's superfood in its most potent and clean form.",
      outcomes: [
        { value: "62%", label: "Direct Sales Growth" },
        { value: "5.5x", label: "ROI on Ad Spend" },
        { value: "40%", label: "Social Engagement" },
        { value: "55%", label: "Lead Growth" }
      ],
      whatWeDid: "We built a 'Holistic Health' discovery engine that leveraged high-production educational content to transition the brand from a niche product to a mainstream wellness staple.",
      strategies: [
        {
          title: "Superfood Scaling Strategy",
          points: [
            "Conducted a keyword analysis focusing on 'Thyroid Support' and 'Natural Energy,' identifying high-intent consumer pools previously untapped by competitors.",
            "Developed 'Day-in-the-Life' UGC videos showing real customers incorporating Sea Moss into their morning routines, driving a 3.5% conversion rate on cold traffic.",
            "Implemented a sophisticated subscription model on Shopify that offered free recipe guides with every monthly order, increasing retention by 28%.",
            "Deployed highly targeted Google Search campaigns for 'Irish Sea Moss' and 'Organic Supplements,' capturing 60% of the brand-relevant search volume.",
            "Optimized the mobile checkout flow with a 'Quick-Buy' feature for best-selling gel bundles, reducing the time-to-purchase by 40%.",
            "Leveraged Meta's 'Advantage+ Shopping' to automatically identify and scale high-performing ad sets across different European demographics."
          ]
        }
      ],
      funnelStages: [
        { stage: "Demand Generation", desc: "Educational video ads that break down the 92 essential minerals found in Sea Moss to build immediate demand." },
        { stage: "Trust Building", desc: "Scientific breakdowns and third-party lab result reveals to differentiate from low-quality alternatives." },
        { stage: "Sales Acceleration", desc: "Direct response ads featuring 'Limited Batch' messaging and exclusive bundle discounts for first-time buyers." }
      ],
      finalResults: "The Moss Way achieved a consistent 5.5x ROAS while scaling budgets by 300%. The brand successfully established itself as a leader in the organic superfood space, with a 62% increase in direct sales.",
      images: [
        "/images/the moss way/tmw 1.png",
        "/images/the moss way/tmw 2.png",
        "/images/the moss way/tmw 3.png",
        "/images/the moss way/tmw 4.png",
        "/images/the moss way/tmw 5.png",
        "/images/the moss way/tmw 6.png"
      ],
      mobileImages: [
        "/images/the moss way/tmw 7.png",
        "/images/the moss way/tmw 8.png",
        "/images/the moss way/tmw 9.png"
      ],
      laptopImage: "/images/the moss way/tmw 1.png"
    },
    "Nurse Yard": {
      name: "Nurse Yard",
      description: "Compression socks for nurses and healthcare workers",
      about: "Nurse Yard provides premium compression socks designed for healthcare professionals. Combining medical-grade support with stylish designs to improve leg health and comfort during long shifts.",
      outcomes: [
        { value: "88%", label: "Online Sales Growth" },
        { value: "6.1x", label: "Peak Month ROAS" },
        { value: "35%", label: "LTV Increase" },
        { value: "2M+", label: "Targeted Impressions" }
      ],
      whatWeDid: "We developed a 'Career-Centric' marketing framework that leveraged the shared identity of healthcare workers, using high-relatability humor and peer testimonials to drive massive adoption.",
      strategies: [
        {
          title: "Community & Identity Scaling",
          points: [
            "Conducted a 'Nursing Pain-Point' audit to identify specific shift-work concerns that could be addressed through copy, such as 'End of Shift Fatigue' and 'Leg Swelling'.",
            "Deployed a 'BOGO' (Buy One Get One) ad strategy which increased the Conversion Rate by 42% on prospecting audiences.",
            "Implemented a robust UGC strategy featuring real nurses filmning TikTok transitions and testimonials, establishing immediate peer-to-peer trust.",
            "Optimized Meta's targeting to reach major hospital complexes and nursing schools via geofencing and interest layers, resulting in a 5.8x blended ROAS.",
            "Automated a seasonal gifting campaign targeting family members of healthcare workers during Christmas and Nurse Appreciation Week.",
            "Leveraged Advantage+ Shopping campaigns to automatically discover and scale winning 'Themed Sock' designs to relevant niche audiences."
          ]
        }
      ],
      funnelStages: [
        { stage: "Identity Discovery", desc: "Humorous and relatable video ads highlighting the 'Struggle of 12-Hour Shifts' to build massive awareness." },
        { stage: "Comfort Proof", desc: "Detailed product demos and doctor/nurse reviews to prove the medical-grade effectiveness of the compression." },
        { stage: "Sales Acceleration", desc: "High-urgency ads featuring limited-time BOGO offers and exclusive 'New Collection' drops." }
      ],
      finalResults: "Nurse Yard achieved a staggering 88% increase in year-over-year revenue, with customer lifetime value growing by 35% through effective retention loops. The brand became a staple in the US nursing community.",
      images: [
        "/images/nurse yard/ny 1.png",
        "/images/nurse yard/ny 2.png",
        "/images/nurse yard/ny 3.png",
        "/images/nurse yard/ny 4.png",
        "/images/nurse yard/ny 5.png",
        "/images/nurse yard/ny 6.png"
      ],
      mobileImages: [
        "/images/nurse yard/ny 7.png",
        "/images/nurse yard/ny 8.png",
        "/images/nurse yard/ny 9.png"
      ],
      laptopImage: "/images/nurse yard/ny 1.png"
    },
    "Lash by Maya": {
      name: "Lash by Maya",
      description: "Natural lash and brow growth serums",
      about: "Lash by Maya is a premium beauty brand specializing in natural, vegan, and clinically-tested eyelash and eyebrow growth serums designed to help you achieve longer, thicker, and fuller lashes naturally.",
      outcomes: [
        { value: "52%", label: "Revenue Growth" },
        { value: "4.5x", label: "Average ROAS" },
        { value: "28%", label: "AOV Expansion" },
        { value: "40%", label: "Checkout Recovery" }
      ],
      whatWeDid: "We engineered a 'Community-First' beauty marketing engine that leveraged authentic results and influencer authority to drive high-velocity sales in the competitive beauty niche.",
      strategies: [
        {
          title: "Beauty Conversion Engine",
          points: [
            "Conducted a high-volume 'Before & After' creative test to identify the most compelling visual social proof that resonated with the French beauty market.",
            "Implemented a tiered TikTok and Instagram influencer campaign, focusing on 'Micro-Influencers' with high engagement rates to build grassroots trust.",
            "Optimized the mobile storefront with a high-conversion 'Bundle & Save' logic, encouraging users to purchase the Duo and Trio packs for better results.",
            "Launched a comprehensive Google Search strategy targeting 'Natural Lash Serum' and 'Vegan Brow Growth' keywords, capturing high-intent search at a low CPA.",
            "Automated a 14-day post-purchase education sequence that provided application tips and set expectations for results, reducing churn and increasing satisfaction.",
            "Leveraged CAPI and server-side tracking to ensure 100% data reliability, allowing for aggressive budget scaling on winning ad sets."
          ]
        }
      ],
      funnelStages: [
        { stage: "Visual Discovery", desc: "High-impact social media ads highlighting real customer results and the 'Vegan/Natural' USP of the brand." },
        { stage: "Educational Nurturing", desc: "Detailed product breakdowns and ingredient safety videos to overcome chemical-based beauty concerns." },
        { stage: "Sales Acceleration", desc: "Direct response ads featuring 'Bundle & Save' offers and limited-time free shipping hooks." }
      ],
      finalResults: "Lash by Maya achieved a consistent 4.5x ROAS while scaling to international markets. The brand saw a 52% boost in overall revenue and a significant improvement in customer retention through educational loops.",
      images: [
        "/images/lash by maya/lm 1.png",
        "/images/lash by maya/lm 2.png",
        "/images/lash by maya/lm 3.png",
        "/images/lash by maya/lm 4.png",
        "/images/lash by maya/lm 5.png",
        "/images/lash by maya/lm 6.png"
      ],
      mobileImages: [
        "/images/lash by maya/lm 7.png",
        "/images/lash by maya/lm 8.png",
        "/images/lash by maya/lm 9.png"
      ],
      laptopImage: "/images/lash by maya/lm 1.png"
    },
    "One Tap Wireless": {
      name: "One Tap Wireless",
      description: "3-in-1 wireless charging stations for Apple and Samsung devices",
      about: "One Tap Wireless specializes in innovative charging solutions like the PowerBase 3-IN-1. Designed to simplify your charging routine by powering up your phone, watch, and pods in one stylish stand.",
      outcomes: [
        { value: "70%", label: "Market Expansion" },
        { value: "5.2x", label: "Average ROAS" },
        { value: "42%", label: "Social Traffic Lift" },
        { value: "60%", label: "Brand Recall" }
      ],
      whatWeDid: "We implemented a 'Tech-Lifestyle' marketing framework that positioned One Tap Wireless as an essential workspace upgrade, utilizing clean minimalism and product-demo-focused ads.",
      strategies: [
        {
          title: "Workspace Upgrade Strategy",
          points: [
            "Conducted a desk-aesthetic audit to identify the 'Clean Setup' trend, creating ad content that showcased the product in high-end nomadic and home office environments.",
            "Deployed 'Problem/Solution' video ads that highlighted the clutter of traditional charging cables versus the elegance of the 3-in-1 PowerBase.",
            "Optimized Google Shopping and Search for '3-in-1 Charger' and 'Wireless Station' keywords, capturing 45% of high-intent search volume.",
            "Implemented a 'Quick-Checkout' Shopify experience that supported Apple Pay and Google Pay, reducing friction and increasing conversion rate by 18%.",
            "Launched a comprehensive retargeting funnel focusing on 'Tech Enthusiasts' who visited but didn't buy, using social proof and safety-feature highlights.",
            "Leveraged Meta's Advantage+ catalog ads to automatically serve the right device-specific charging station to Mac and Android users."
          ]
        }
      ],
      funnelStages: [
        { stage: "Aesthetic Discovery", desc: "High-end product photography and 'Desk Setup' reels to build brand aspiration and discovery." },
        { stage: "Feature Validation", desc: "Scientific breakdowns of the 4-Coil Qi technology and safety protocols (temp control, surge protection)." },
        { stage: "Urgency Conversion", desc: "Direct response ads highlighting seasonal sales and 'Bundle your gift' offers for multiple stations." }
      ],
      finalResults: "One Tap Wireless successfully scaled to a global brand, achieving a 70% increase in online sales volume. The average ROAS remained stable at 5.2x even during high-competition holiday seasons.",
      images: [
        "/images/one tap wireless/ot 1.png",
        "/images/one tap wireless/ot 2.png",
        "/images/one tap wireless/ot 3.png",
        "/images/one tap wireless/ot 4.png",
        "/images/one tap wireless/ot 5.png",
        "/images/one tap wireless/ot 6.png"
      ],
      mobileImages: [
        "/images/one tap wireless/ot 7.png",
        "/images/one tap wireless/ot 8.png",
        "/images/one tap wireless/ot 9.png"
      ],
      laptopImage: "/images/one tap wireless/ot 1.png"
    }
  };

  const detail = id ? portfolioDetails[id] || portfolioDetails["Hastamuerte"] : portfolioDetails["Hastamuerte"];

  return (
    <div className="bg-white text-black font-sans selection:bg-brand-500 selection:text-white min-h-screen">
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
          text-shadow: 0 0 20px rgba(255, 217, 0, 0.1);
        }
        .btn-custom {
          background-color: #1a1a1a;
          color: #ffd900;
          border: 2px solid #ffd900;
          transition: all 0.3s ease;
        }
        .btn-custom:hover {
          background-color: #000000;
          transform: scale(1.05);
        }
      `}</style>

      {/* Hero Title */}
      <section className="pt-20 pb-10 text-center">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4">
            <button 
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center text-gray-400 hover:text-brand-500 transition-colors font-bold uppercase tracking-widest text-xs group"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </button>
            <h1 className="text-6xl md:text-9xl font-display font-black text-brand-500 uppercase tracking-tighter yellow-glow">
             {detail.name}
            </h1>
            <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-sm">{detail.description}</p>
          </div>
        </FadeInSection>
      </section>

      {/* Bento Grid Gallery */}
      <section className="px-4 max-w-7xl mx-auto mb-24">
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden border border-gray-100 shadow-lg group">
              <img src={detail.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 1`} />
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md h-48 md:h-auto group">
              <img src={detail.images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 2`} />
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md h-48 md:h-auto group">
              <img src={detail.images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 3`} />
            </div>
            <div className="col-span-2 rounded-3xl overflow-hidden border border-gray-100 shadow-md h-48 md:h-64 group">
              <img src={detail.images[3]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 4`} />
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md h-48 md:h-auto group">
              <img src={detail.images[4]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 5`} />
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md h-48 md:h-auto group">
              <img src={detail.images[5]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Intrax Media E-commerce Case Study - ${detail.name} - Result 6`} />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Outcomes Section */}
      <section className="py-24 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-black mb-4">Outcomes</h2>
                <div className="h-1.5 w-24 bg-brand-500 rounded-full"></div>
              </div>
              <p className="text-gray-500 font-medium max-w-md">Real-time results achieved through our strategic advertising approach and full-funnel optimization.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {detail.outcomes.map((stat: any, i: number) => (
                <div key={i} className="group p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-500 transition-all duration-500">
                  <div className="text-5xl md:text-6xl font-black text-brand-500 mb-4 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInSection>
            <div className="inline-block px-4 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">The Brand</div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-10 uppercase tracking-tight text-black">
              About <span className="text-brand-500">{detail.name}</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
              {detail.about}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Phone Mockups Section */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInSection>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Mockup 1 */}
              <div className="w-72 h-[580px] bg-white rounded-[3rem] border-8 border-gray-200 shadow-2xl relative overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 group">
                <img src={detail.mobileImages?.[0] || "/images/hastamuerte/has 7.png"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Phone 1" />
              </div>
              {/* Mockup 2 (Center) */}
              <div className="w-80 h-[620px] bg-white rounded-[3rem] border-8 border-gray-200 shadow-2xl relative overflow-hidden z-10 transform scale-110 group">
                <img src={detail.mobileImages?.[1] || "/images/hastamuerte/has 8.png"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Phone 2" />
              </div>
              {/* Mockup 3 */}
              <div className="w-72 h-[580px] bg-white rounded-[3rem] border-8 border-gray-200 shadow-2xl relative overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
                <img src={detail.mobileImages?.[2] || "/images/hastamuerte/has 9.png"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Phone 3" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* What We Did Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection>
            <div className="inline-block px-4 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">Our Approach</div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 uppercase tracking-tight text-black">
              What <span className="text-brand-500">We Did</span>
            </h2>
            <p className="text-gray-600 text-lg font-medium mb-16 max-w-3xl leading-relaxed">
              {detail.whatWeDid}
            </p>

            <div className="space-y-20">
              {detail.strategies.map((strat: any, i: number) => (
                <div key={i} className="relative pl-12 md:pl-24">
                  <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-black font-black text-xl md:text-2xl shadow-xl shadow-brand-500/20 transform -rotate-6">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-8 tracking-tight">{strat.title}</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {strat.points.map((point: string, j: number) => (
                      <div key={j} className="flex items-start space-x-4">
                        <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="text-gray-600 font-medium leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Funnel Stages */}
            <div className="mt-24 pt-24 border-t border-gray-100">
              <h3 className="text-3xl font-black text-black uppercase mb-12 flex items-center">
                <Target className="mr-4 text-brand-500" size={32} />
                Ad Funnel Stages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {detail.funnelStages.map((stage: any, i: number) => (
                  <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:border-brand-500 transition-all duration-500 group">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <BarChart3 size={18} />
                    </div>
                    <h4 className="text-brand-500 font-black uppercase mb-4 tracking-widest text-xs">
                      {stage.stage}
                    </h4>
                    <p className="text-gray-600 font-medium leading-relaxed text-sm">
                      {stage.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Laptop Mockup */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <div className="relative mx-auto max-w-4xl">
              <div className="bg-gray-200 rounded-t-3xl p-4 border-x-8 border-t-8 border-gray-300">
                <div className="bg-white rounded-xl overflow-hidden aspect-video shadow-inner group">
                  <img src={detail.laptopImage || "/images/hastamuerte/has 1.png"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Laptop View" />
                </div>
              </div>
              <div className="h-6 bg-gray-300 rounded-b-3xl w-[110%] -ml-[5%] shadow-2xl"></div>
              <div className="h-2 bg-gray-400 w-32 mx-auto rounded-b-xl"></div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Final Results Section */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInSection>
            <div className="inline-block p-4 bg-brand-50 rounded-full mb-8">
              <TrendingUp className="text-brand-500" size={40} />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-12 uppercase tracking-tight text-black">
              Final <span className="text-brand-500">Results</span>
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl font-medium leading-relaxed mb-16 max-w-3xl mx-auto">
              {detail.finalResults}
            </p>
            <Link to="/contact">
              <button className="px-12 py-5 btn-custom font-black uppercase tracking-widest rounded-full shadow-2xl">
                LET'S TALK
              </button>
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};
