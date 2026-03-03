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
      about: "Hastamuerte is a premium urban streetwear brand dedicated to those who prioritize style, quality, and self-expression. Offering a curated collection of graphic tees, hoodies, varsity jackets, joggers, and exclusive accessories, the brand embodies the philosophy of Make Moves, Not Excuses and Create a Legacy. More than just clothing, Hastamuerte represents a lifestyle built on confidence, individuality, and bold fashion statements. With a commitment to premium materials, trendsetting designs, hassle-free returns, and free shipping on orders over $100, Hastamuerte is your go-to destination for standout streetwear that helps you rise above the crowd and define your own legacy.",
      outcomes: [
        { value: "65%", label: "Increase In Revenue" },
        { value: "72%", label: "Increase In Ad Revenue" },
        { value: "60%", label: "Increase In Unit Sales" },
        { value: "57%", label: "Increase In Orders" }
      ],
      whatWeDid: "Our Advertising Team Prepared A Complete Full-Funnel Strategy, Leveraging Proven Techniques Used By Top Marketers On Facebook Ads To Turn On The Conversion Gears Of Hastamuerte's Ad Account",
      strategies: [
        {
          title: "Facebook Ads Strategy",
          points: [
            "A Thorough Account Analysis Shows That The Brand Lacks Audience Engagement And The Core Problem Is Higher Product Pricing As Compared To Other Elite Brands.",
            "We Prepared A Complete Report Dissecting Audiences Of Different Ages, Cities, And Interests To Get A Better Perception That Actually Where The Budget Is Utilized Correcty And Where It's Burning.",
            "We Used Facebook's Advanced Targeting Tools To Segment Potential Customers Based On Demographics, Interests, And Behaviors. Our Primary Targets Included Young Women, Teen Girls, And Women 45+ Who Showed Interest In Fashion, Embroidery, And Luxurious High-Quality Clothing.",
            "IntraxMedia Prepared A Solid Sale Strategy With Hot Offers Like Upto 50% Off, Giveaways, One-Day Shipping In Specific Cities, Free Shipping, Etc To Re-Build Audience Engagement.",
            "We Asked Hastamuerte To Collaborate With Influencers, Celebrities, And Tiktokers To Create Engaging Videos Showcasing The Story Behind Hastamuerte, The Quality Of Fabrics, And Unique Designs. Videos Are Highly Effective In Capturing Attention And Building Brand Awareness.",
            "Utilized Carousel Ads To Display Multiple Products In A Single Ad, Allowing Users To Browse Different Items And Find What They Like Best. Meanwhile, Set Up Dynamic Product Ads To Automatically Show Relevant Products To People Who Have Expressed Interest In Products."
          ]
        }
      ],
      funnelStages: [
        { stage: "Top Of Funnel (TOF)", desc: "We Use Awareness Campaigns Using Video And Carousel Ads To Introduce The Brand And Attract New Visitors." },
        { stage: "Middle Of Funnel (MOF)", desc: "Engagement Campaigns Using Retargeting Ads To Remind Visitors Of The Products They Viewed And Encourage Them To Return Using Solid Ad Copies." },
        { stage: "Bottom Of Funnel (BOF)", desc: "Conversion Campaigns Using Dynamic Product Ads To Show Personalized Product Recommendations And Drive Purchases." }
      ],
      finalResults: "The Comprehensive Advertising Funnel Strategies Led To Significant Improvements In Hastamuerte's Performance Within Just 2-Months. The Online Store Sessions Increased By 48%. The Total Sales Reached Rs 48,070, Marking A 29% Increase In Total Orders. Each Metric, Including Revenue, Ad Revenue, Unit Sales, And Orders, Saw A Substantial Increase Of 91% On Average.",
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
      about: "Sweetapolita is a Canadian women-owned premium baking brand founded by baker Rosie Alyea in 2015, specializing in magical sprinkles, edible glitter, and enchanting baking decorations. The brand offers a delightful range of products including advent calendars, drink and dessert glitter, oil-based food colors, and customizable sprinkle sets. With a mission to inspire food lovers and bakers of all levels, Sweetapolita provides professional-grade, approachable tools to make dessert-making as joyful and limitless as possible. From their signature 24 Magical Days of Sprinkles and Sweets advent calendar to their vibrant edible glitters that sparkle your drinks and desserts, every product is designed to add wonder and creativity to your baking adventures.",
      outcomes: [
        { value: "69%", label: "Increase In Revenue" },
        { value: "69%", label: "Increase In Ad Revenue" },
        { value: "69%", label: "Increase In Unit Sales" },
        { value: "36%", label: "Increase In Orders" }
      ],
      whatWeDid: "We implemented a multi-channel approach focusing on TikTok and Instagram to drive high-intent traffic to their store.",
      strategies: [
        {
          title: "Social Media Scaling",
          points: [
            "Leveraged TikTok's viral potential with native-style content and influencer collaborations.",
            "Developed a global SEO and Google Ads strategy combined with localized social media campaigns.",
            "Optimized product pages for mobile conversions and implemented a robust retargeting funnel."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Using viral TikTok trends to introduce the brand to Gen Z." },
        { stage: "Consideration", desc: "Retargeting with customer testimonials and product deep-dives." },
        { stage: "Conversion", desc: "Limited time offers and bundle deals to drive immediate sales." }
      ],
      finalResults: "Sweetapolita saw a massive 69% increase in revenue across the board, with a significant boost in brand awareness among their target demographic.",
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
      about: "British Supplements is a trusted UK-based health and wellness brand specializing in genuine, clean, and premium quality supplements manufactured in the United Kingdom. Founded with a commitment to transparency and quality, the company offers an extensive range of products including marine collagen, magnesium, vitamin D3+K2, lions mane, ashwagandha, and various specialized blends. With over 23,560 verified reviews and a strong focus on customer satisfaction, British Supplements provides everything from bestsellers like hydrolyzed marine collagen and mega magnesium to specialized products like clean enzymes, plant sterols, and mushroom extracts. Their product line features third-party testing, clear ingredient transparency, and competitive pricing with options for every health need. The brand emphasizes quality manufacturing standards, customer reviews, and offers an ambassador program along with professional-grade supplements designed to support optimal health and wellness.",
      outcomes: [
        { value: "7.8M", label: "Total Sales (PKR)" },
        { value: "8.5%", label: "Return On Investment" },
        { value: "75%", label: "Revenue From Ads" },
        { value: "45%", label: "New Customers" }
      ],
      whatWeDid: "We developed a comprehensive digital marketing strategy focusing on high-ROAS campaigns and search engine optimization.",
      strategies: [
        {
          title: "Search & Social Integration",
          points: [
            "Implemented advanced Google Shopping campaigns to capture high-intent search traffic.",
            "Scaled Facebook Ads using lookalike audiences based on high-value customers.",
            "Optimized the website's checkout flow to reduce cart abandonment by 25%."
          ]
        }
      ],
      funnelStages: [
        { stage: "Discovery", desc: "Google Search and Social Media ads to reach potential buyers." },
        { stage: "Engagement", desc: "Email marketing and retargeting to keep the brand top-of-mind." },
        { stage: "Loyalty", desc: "Post-purchase sequences to encourage repeat business." }
      ],
      finalResults: "Parien House achieved a record-breaking 7.8 Million PKR in total sales within a single quarter, with a consistent 8.5% ROI.",
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
      about: "Rippl is a premium motorcycle gear brand dedicated to providing riders with stylish, comfortable, and highly protective riding equipment. Specializing in innovative products like armored riding jeans, gel-padded shorts, thermal gloves, throttle control devices, and protective eyewear, Rippl combines urban aesthetics with serious safety features. With over 50,000 satisfied customers and features in FOX, Extreme Sports HQ, and Moto Gear Reviews, the brand has established itself as a trusted name in motorcycle protective gear. Their product range includes bestsellers like SeatCloud Shorts, Pure Grit Riding Jeans, PolaRide Glasses, and various riding accessories designed to keep motorcyclists safe without compromising on style or comfort. Rippl emphasizes robust, reinforced protective elements built into each garment, allowing riders to maintain confidence on the road while looking good. The brand offers free delivery, secure payment options, fast and friendly customer service, and a 60-day hassle-free return policy, making it easy for riders to experience unmatched comfort and protection. Whether you are riding around the streets or on long journeys, Rippl gear ensures you stay protected and comfortable both on and off the bike.",
      outcomes: [
        { value: "72%", label: "Conversion Rate Increase" },
        { value: "47%", label: "AOV Increase" },
        { value: "246M", label: "Total Sales (PKR)" },
        { value: "24K+", label: "Products Sold" }
      ],
      whatWeDid: "Our team focused on aggressive scaling and conversion rate optimization to maximize profit margins.",
      strategies: [
        {
          title: "Aggressive Scaling",
          points: [
            "Launched multi-platform campaigns across Facebook, Instagram, and Google.",
            "Used dynamic product ads to show personalized recommendations to past visitors.",
            "Implemented A/B testing on landing pages to find the highest-converting designs."
          ]
        }
      ],
      funnelStages: [
        { stage: "Prospecting", desc: "Broad targeting to find new tech enthusiasts." },
        { stage: "Retargeting", desc: "Specific ads for products users previously viewed." },
        { stage: "Retention", desc: "Exclusive offers for existing customers to drive repeat sales." }
      ],
      finalResults: "RIPPL reached a staggering 246 Million PKR in total sales, with over 24,000 products sold through our optimized funnel.",
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
      about: "Kidodido is a specialized online store offering premium Montessori-inspired wooden toys and educational furniture designed for children's development and active play. The brand focuses on creating high-quality, natural wood products including climbing arches, learning towers, balance toys, play tents, and Pikler triangles that encourage physical activity, creativity, and independent learning. With products categorized by age groups from 0-12 months through 8+ years, Kidodido provides safe, durable, and aesthetically pleasing furniture that grows with your child. Their collection features beautifully crafted wooden climbing equipment, sensory toys, and educational tools that follow Montessori principles of child-led exploration and development. The company offers free shipping, fast delivery, easy exchanges, and has earned excellent customer reviews with a 5.0 rating from parents who value quality, safety, and timeless design in their children's play spaces.",
      outcomes: [
        { value: "42K", label: "Total Reach" },
        { value: "161K", label: "Impressions" },
        { value: "367", label: "Leads Generated" },
        { value: "$11.8", label: "Cost Per Lead" }
      ],
      whatWeDid: "We implemented a lead generation funnel designed to attract serious fitness enthusiasts in their local area.",
      strategies: [
        {
          title: "Lead Generation",
          points: [
            "Created high-converting lead forms directly within Facebook and Instagram.",
            "Used geo-fencing to target potential members within a 10-mile radius of the studio.",
            "Developed compelling video content showcasing the studio's unique equipment and atmosphere."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Local awareness ads to introduce the studio to the community." },
        { stage: "Consideration", desc: "Lead magnets like 'Free First Session' to capture contact info." },
        { stage: "Conversion", desc: "Direct sales outreach to convert leads into paying members." }
      ],
      finalResults: "Generated 367 highly qualified leads at an efficient cost of $11.82 per lead, significantly boosting studio membership.",
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
      about: "NotinRegs is a specialized online store offering edgy military-themed apparel, accessories, and novelty items designed for military personnel, veterans, and enthusiasts. The brand features a wide range of products including olive drab and black t-shirts with military humor slogans, hoodies, flags, patches, stickers, and unique items like crayon-shaped stickers and beer shotgun tools. Their collection showcases bold, irreverent military comedy with designs featuring slogans like 'Worlds Okayest Marine', 'Junior Enlisted Warrior' and various inside-joke military references that resonate with service members. With products ranging from Rs. 1,500 to Rs. 12,800 PKR, NotInRegz caters to those who appreciate military culture with a humorous twist, offering everything from wearable apparel to decorative flags and functional accessories. The brand emphasizes military camaraderie and dark humor that's popular within armed forces communities, making it a go-to destination for authentic military-themed merchandise that celebrates service life with personality and edge.",
      outcomes: [
        { value: "85%", label: "Revenue Increase" },
        { value: "70%", label: "Ad Revenue Increase" },
        { value: "85%", label: "Unit Sales Increase" },
        { value: "80%", label: "Order Volume Increase" }
      ],
      whatWeDid: "We focused on scaling winning products and optimizing the customer journey from click to conversion.",
      strategies: [
        {
          title: "E-commerce Scaling",
          points: [
            "Identified and scaled 'hero' products that drove the majority of revenue.",
            "Implemented cross-sell and up-sell strategies to increase average order value.",
            "Optimized ad creatives for high engagement and click-through rates."
          ]
        }
      ],
      funnelStages: [
        { stage: "Acquisition", desc: "Finding new customers through interest and behavioral targeting." },
        { stage: "Optimization", desc: "Continuous testing of ad copies and landing pages." },
        { stage: "Scaling", desc: "Increasing budget on winning campaigns to maximize reach." }
      ],
      finalResults: "Achieved an 85% increase in overall revenue and unit sales, with a 70% boost in ad-attributed revenue.",
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
      about: "American Trigger Pullers is a veteran-owned and operated online store specializing in military-themed apparel, headwear, and accessories for service members, veterans, and military enthusiasts. The brand offers an extensive collection of products including retro foam hats, graphic t-shirts, unit-specific apparel, drinkware, stickers, and gear featuring designs that celebrate military culture, Ranger heritage, and various Army units. With a focus on authenticity and military pride, their collection ranges from affordable $10 foamies to premium graphic tees featuring military humor, unit pride, and commemorative designs for specific battalions, companies, and military occupational specialties. The company proudly serves the military community with products that resonate with active duty personnel, veterans, and those who appreciate military service culture, offering everything from casual wear to specialized unit gear that represents the diverse spectrum of Army organizations and traditions.",
      outcomes: [
        { value: "55%", label: "Revenue Growth" },
        { value: "4.2x", label: "ROAS" },
        { value: "30%", label: "New Customer Rate" },
        { value: "25%", label: "CPA Reduction" }
      ],
      whatWeDid: "We implemented a full-funnel Facebook and Google Ads strategy to drive both awareness and direct sales.",
      strategies: [
        {
          title: "Digital Transformation",
          points: [
            "Developed high-quality video content showcasing the craftsmanship of the footwear.",
            "Implemented dynamic remarketing to target users who abandoned their carts.",
            "Optimized Google Search campaigns for high-intent keywords."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Video ads highlighting brand heritage and quality." },
        { stage: "Consideration", desc: "Carousel ads featuring the latest collections." },
        { stage: "Conversion", desc: "Direct response ads with seasonal offers." }
      ],
      finalResults: "American Trigger Pullers saw a 55% growth in digital revenue with a consistent 4.2x ROAS across all platforms.",
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
    },
    "Tango Foxtrot": {
      name: "Tango Foxtrot",
      description: "Military-inspired apparel and patriotic merchandise",
      about: "Tango Foxtrot is a veteran-supported brand dedicated to crafting exceptional apparel and accessories that honor military service and patriotic values. The brand specializes in unique, artistically designed products featuring striking pin-up style artwork with military and tactical themes. Their collection includes premium t-shirts, woven blankets, PVC patches, stickers, and posters that blend artistic creativity with military culture. With a mission to empower veterans and celebrate service, sacrifice, and camaraderie among military personnel, Tango Foxtrot creates high-quality products that resonate with active-duty service members, veterans, and patriots. The brand emphasizes excellence in every interaction, from meticulously crafted patches to their dedicated support team, ensuring customer satisfaction above all else. Offering free delivery, top quality guarantees, and 30-day returns, Tango Foxtrot has earned love from customers worldwide with their distinctive aesthetic that combines artistic expression with military pride and honor.",
      outcomes: [
        { value: "92%", label: "Online Sales Growth" },
        { value: "6.5x", label: "Ad Spend Return" },
        { value: "45%", label: "Repeat Purchase" },
        { value: "60%", label: "Traffic Increase" }
      ],
      whatWeDid: "Our strategy focused on high-frequency social media ads and influencer collaborations to stay top-of-mind.",
      strategies: [
        {
          title: "Social Dominance",
          points: [
            "Executed large-scale influencer campaigns during festive seasons.",
            "Utilized Facebook's Advantage+ shopping campaigns for automated optimization.",
            "Created engaging Instagram Reels and TikTok content to drive organic-style reach."
          ]
        }
      ],
      funnelStages: [
        { stage: "Discovery", desc: "Influencer content and viral reels to reach new audiences." },
        { stage: "Engagement", desc: "Retargeting with customer reviews and styling tips." },
        { stage: "Conversion", desc: "Flash sale ads and limited-time discount codes." }
      ],
      finalResults: "Tango Foxtrot achieved a record 92% growth in online sales with an exceptional 6.5x ROAS.",
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
      about: "Kona Earth is a premium Hawaiian coffee company specializing in authentic 100% Kona coffee grown and roasted on private estates in Hawaii. Founded by Steve and Joanie Wynn, the brand offers an exceptional range of products including pure Kona coffee beans, gourmet gift sets, coffee and chocolate bundles, merchandise, and specialty items like chocolate-covered coffee beans and macadamia nuts. Committed to quality and sustainability, Kona Earth micro-batch roasts their coffee on-site to ensure supreme freshness and perfection in every cup. The company operates as a fair wage employer, supports Hawaiian environmental preservation efforts, and donates a percentage of post-tax profits to local non-profit Kohala Center for coral reef and rainforest conservation. With farm-to-table freshness and a dedication to caring for people and the planet, Kona Earth delivers an authentic taste of Hawaii while supporting local communities and ecosystems through every purchase.",
      outcomes: [
        { value: "120%", label: "Traffic Increase" },
        { value: "5.8x", label: "ROAS" },
        { value: "65%", label: "Conversion Boost" },
        { value: "50%", label: "AOV Growth" }
      ],
      whatWeDid: "We implemented advanced audience segmentation and personalized ad creatives to drive high-value conversions.",
      strategies: [
        {
          title: "Audience Personalization",
          points: [
            "Segmented audiences based on past purchase behavior and product interests.",
            "Developed personalized ad copies for different customer segments.",
            "Optimized the mobile shopping experience to reduce friction."
          ]
        }
      ],
      funnelStages: [
        { stage: "TOF", desc: "Broad targeting to find new luxury fashion enthusiasts." },
        { stage: "MOF", desc: "Retargeting with specific product categories viewed." },
        { stage: "BOF", desc: "Personalized offers for high-intent shoppers." }
      ],
      finalResults: "Kona Earth saw a 120% increase in website traffic and a 65% boost in conversion rates.",
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
      about: "Griqos is a wellness brand dedicated to providing premium quality pain relief products designed to help people recover faster and live life on their own terms. Specializing in innovative knee support solutions like the Limitless Knee Pro™, the company offers advanced therapeutic products that utilize unmatched technology to address various pain conditions including patellofemoral syndrome, cartilage loss, and joint pain. With a mission to make amazing products that elevate quality of life at affordable prices, Griqos manufactures each item with care to ensure the best possible support for every body part that may experience pain. The brand ships products directly from warehouses around the world, cutting out middlemen to offer unbeatable prices while maintaining premium quality. Backed by over 1,000 positive reviews with a 4.7/5 rating, free worldwide shipping, and a 60-day money-back guarantee, Griqos helps thousands of customers regain mobility and enjoy pain-free living through risk-free shopping and exceptional customer support.",
      outcomes: [
        { value: "48%", label: "Order Volume" },
        { value: "3.9x", label: "ROAS" },
        { value: "25%", label: "CPA Reduction" },
        { value: "35%", label: "Revenue Lift" }
      ],
      whatWeDid: "Our focus was on improving ad efficiency and reducing the cost per acquisition through better targeting.",
      strategies: [
        {
          title: "Efficiency Optimization",
          points: [
            "Cleaned up the ad account structure to reduce audience overlap.",
            "Implemented automated bidding strategies to optimize for conversions.",
            "Refreshed ad creatives weekly to prevent ad fatigue."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Brand storytelling ads to reinforce market leadership." },
        { stage: "Consideration", desc: "Product-focused ads highlighting new arrivals." },
        { stage: "Conversion", desc: "Retargeting with social proof and testimonials." }
      ],
      finalResults: "Griqos achieved a 25% reduction in CPA while increasing total order volume by 48%.",
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
      about: "Panty Promise is a women-founded intimate apparel brand revolutionizing the underwear industry with their gynecologist-recommended, organic cotton panties designed to prioritize both health and style. Created by women for women, the brand specializes in seamless, no-show underwear that promotes vaginal health and pH balance while eliminating panty lines. Their collection features a wide range of inclusive sizes from XS to 4X across multiple styles including thongs, hipsters, and bikinis in various skin-tone shades. With innovative features like patent-pending liners, signature seamless fabric, itchless and sustainable labels, and 4-way stretch technology, Panty Promise ensures all-day comfort without compromising on wellness. The brand is committed to sustainability through biodegradable materials and ethical manufacturing, offering products that help women feel confident while supporting their intimate health. Backed by five-star customer reviews and a mission to disrupt traditional panty standards, Panty Promise combines technology with design to create underwear that women can finally feel confident wearing from both a health and aesthetic perspective.",
      outcomes: [
        { value: "75%", label: "Revenue Lift" },
        { value: "7.2x", label: "ROAS" },
        { value: "50%", label: "Brand Search" },
        { value: "40%", label: "Global Reach" }
      ],
      whatWeDid: "We developed a global advertising strategy focusing on the overseas diaspora and luxury fashion markets.",
      strategies: [
        {
          title: "Global Expansion",
          points: [
            "Targeted high-income audiences in the US, UK, and Middle East.",
            "Utilized multi-currency and localized ad copies for different regions.",
            "Partnered with international fashion influencers for brand endorsements."
          ]
        }
      ],
      funnelStages: [
        { stage: "Global TOF", desc: "High-end video ads targeting international fashionistas." },
        { stage: "Global MOF", desc: "Retargeting with localized shipping and duty information." },
        { stage: "Global BOF", desc: "Direct sales ads with international express shipping offers." }
      ],
      finalResults: "Panty Promise saw a 75% lift in revenue with a staggering 7.2x ROAS on their international campaigns.",
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
      about: "The Moss Way is a premium supplier of organic, hand-picked Irish Sea Moss wild-harvested from the pristine waters of Western Ireland. Specializing in natural health and wellness products, the company offers a range of sea moss gels, herbal teas, and nutrient-rich supplements designed to boost energy, support immune function, aid digestion, improve thyroid health, and enhance skin vitality. As a five-star choice in natural wellness, The Moss Way provides vegan-friendly, sustainably sourced products that are packed with vital nutrients and have been used for centuries as natural remedies for common ailments. Their collection includes gel taster bundles, original moss products, and herbal tea blends, all crafted to help customers achieve better health through nature's multivitamin. Committed to sustainability and environmental responsibility, The Moss Way minimizes their carbon footprint while delivering high-quality, organic sea moss that supports both personal wellness and planetary health. With prompt delivery, minimal sustainable packaging, and a dedication to customer satisfaction, they make it easy to incorporate this powerful superfood into your daily wellness routine.",
      outcomes: [
        { value: "62%", label: "Sales Increase" },
        { value: "5.5x", label: "ROAS" },
        { value: "40%", label: "Engagement Rate" },
        { value: "55%", label: "New Leads" }
      ],
      whatWeDid: "Our strategy combined high-production video ads with data-driven audience targeting to drive massive sales.",
      strategies: [
        {
          title: "Creative Storytelling",
          points: [
            "Produced cinematic ad content that resonated with the brand's luxury image.",
            "Implemented a robust retargeting funnel to capture high-intent users.",
            "Optimized ad spend across Facebook, Instagram, and YouTube."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Cinematic brand films to build emotional connection." },
        { stage: "Consideration", desc: "Behind-the-scenes content and product close-ups." },
        { stage: "Conversion", desc: "Direct response ads with exclusive online collections." }
      ],
      finalResults: "The Moss Way achieved a 62% increase in sales with a consistent 5.5x ROAS.",
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
      about: "Nurse Yard is a specialized retailer of premium compression socks designed specifically for nurses, healthcare workers, and anyone who spends long hours on their feet. Offering a wide variety of stylish and functional compression socks including core compression socks, striped patterns, solid colors, checkered designs, floral patterns, and themed collections like Scrub Life, Cats & Dogs, and PPE Compression Socks, the brand combines medical-grade support with fun, expressive designs. Their compression socks provide 20-30mmHg of pressure, which helps improve blood flow, prevent blood clots, reduce leg and ankle swelling, decrease fatigue, and provide extra muscle and joint stability. With a mission that embodies 'Care for one, that's love. Care for all, that's nursing', Nurse Yard creates the best compression socks made for the unique needs of healthcare professionals who deserve both comfort and style. Backed by excellent customer reviews and offering attractive promotions like buy-one-get-one 70% off, the brand helps nurses and caregivers take care of themselves while they take care of others, ensuring they can work comfortably through even the longest shifts.",
      outcomes: [
        { value: "88%", label: "Digital Growth" },
        { value: "6.1x", label: "ROAS" },
        { value: "35%", label: "Customer LTV" },
        { value: "50%", label: "Social Following" }
      ],
      whatWeDid: "We focused on building a strong community around the brand and leveraging user-generated content for ads.",
      strategies: [
        {
          title: "Community Building",
          points: [
            "Encouraged customers to share their 'Khaadi looks' on social media.",
            "Used UGC in ad creatives to build trust and authenticity.",
            "Implemented a loyalty program to increase customer lifetime value."
          ]
        }
      ],
      funnelStages: [
        { stage: "TOF", desc: "UGC-based ads to attract new customers." },
        { stage: "MOF", desc: "Retargeting with customer testimonials and reviews." },
        { stage: "BOF", desc: "Loyalty-based offers for repeat customers." }
      ],
      finalResults: "Nurse Yard saw an 88% growth in digital sales and a significant increase in customer loyalty.",
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
      about: "Lash by Maya is a premium beauty brand specializing in natural, vegan, and clinically-tested eyelash and eyebrow growth serums designed to help you achieve longer, thicker, and fuller lashes and brows naturally. The brand offers a comprehensive range of products including dedicated lash growth serums, brow growth serums, and mascara infused with growth-enhancing formulas, all formulated without parabens or harmful chemicals. With a commitment to natural beauty and safety, Lash by Maya's products are designed to nourish and strengthen while promoting healthy growth, as demonstrated by impressive before-and-after results from satisfied customers. The brand offers convenient product bundles like the Pack Trio Ultime and Pack Duo de Rêve, making it easy to incorporate these transformative treatments into your beauty routine. Backed by real customer testimonials, a 100% satisfaction guarantee, and free shipping on orders over €44, Lash by Maya provides a natural alternative to lash extensions and brow treatments, helping you achieve beautiful, naturally enhanced lashes and brows with their expertly formulated, paraben-free serums that deliver visible results.",
      outcomes: [
        { value: "52%", label: "Revenue Boost" },
        { value: "4.5x", label: "ROAS" },
        { value: "28%", label: "AOV Growth" },
        { value: "40%", label: "Checkout Success" }
      ],
      whatWeDid: "Our focus was on conversion rate optimization and improving the overall user experience on the website.",
      strategies: [
        {
          title: "Funnel Optimization",
          points: [
            "A/B tested different checkout flows to reduce abandonment.",
            "Implemented product recommendations to increase average order value.",
            "Optimized site speed and mobile responsiveness."
          ]
        }
      ],
      funnelStages: [
        { stage: "Acquisition", desc: "Search and social ads targeting fabric enthusiasts." },
        { stage: "Nurturing", desc: "Email and SMS marketing to recover abandoned carts." },
        { stage: "Conversion", desc: "Direct sales ads with limited-time fabric deals." }
      ],
      finalResults: "Lash by Maya achieved a 52% boost in revenue and a significant improvement in checkout success rates.",
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
      about: "One Tap Wireless is a premium technology brand specializing in innovative wireless charging solutions designed to simplify your daily charging routine. Their flagship product, the PowerBase 3-IN-1 Wireless Charger, revolutionizes how you power up your devices by simultaneously charging your iPhone, Apple Watch, and AirPods in one compact, stylish stand. Featuring advanced 4-Coil Qi Technology and 10W fast charging capabilities, the PowerBase delivers efficient, reliable charging for both Apple and Samsung devices while eliminating cable clutter from your desk or nightstand. With smart cooling systems, multiple safety protections including over-temperature, over-current, and over-voltage protection, and premium quality design, One Tap Wireless ensures your devices charge safely and efficiently. The brand stands behind their products with a 30-day money-back guarantee, free tracked shipping on orders over $50, and 24/7 customer support, making it easy to enjoy the convenience of cable-free charging. Perfect for tech enthusiasts, busy professionals, and anyone looking to streamline their charging setup with elegant, functional wireless charging solutions that work seamlessly with the latest smartphones, smartwatches, and earbuds.",
      outcomes: [
        { value: "70%", label: "Online Expansion" },
        { value: "5.2x", label: "ROAS" },
        { value: "42%", label: "Social Traffic" },
        { value: "60%", label: "Brand Awareness" }
      ],
      whatWeDid: "We focused on creating ads that reflected the brand's values and resonated with its loyal customer base.",
      strategies: [
        {
          title: "Value-Based Marketing",
          points: [
            "Developed ad campaigns centered around cultural and traditional values.",
            "Utilized Facebook's broad targeting to reach a wide audience.",
            "Optimized ad spend for maximum reach during religious holidays."
          ]
        }
      ],
      funnelStages: [
        { stage: "Awareness", desc: "Value-based brand films to build trust." },
        { stage: "Consideration", desc: "Product showcases highlighting traditional designs." },
        { stage: "Conversion", desc: "Direct response ads with festive collections." }
      ],
      finalResults: "One Tap Wireless achieved a 70% expansion in their online sales with a consistent 5.2x ROAS.",
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
