import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const { pathname } = React.useMemo(() => window.location, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/tiktok-ads" element={<TikTokCourse />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;