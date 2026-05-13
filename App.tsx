import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CaseStudies } from './pages/CaseStudies';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Courses } from './pages/Courses';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { TikTokCourse } from './pages/TikTokCourse';

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      // If there is a hash, scroll to the element
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Special case for About, Services and Portfolio page professional slugs
      if (pathname.startsWith('/about/') || pathname.startsWith('/services/') || pathname.startsWith('/portfolio/')) {
        const sectionId = pathname.split('/').pop();
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
          }
        }
      }
      // If there is no hash and it's not a professional slug, scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:section" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:section" element={<Portfolio />} />
          <Route path="/portfolio-detail/:id" element={<PortfolioDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/tiktok-ads" element={<TikTokCourse />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:section" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;