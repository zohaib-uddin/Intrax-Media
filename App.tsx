import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CaseStudies } from './pages/CaseStudies';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Courses } from './pages/Courses';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { TikTokCourse } from './pages/TikTokCourse';
import { supabase } from './lib/supabaseClient';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

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

const CLERK_PUBLISHABLE_KEY = ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY as string) || "";

const OptionalClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (CLERK_PUBLISHABLE_KEY) {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        {children}
      </ClerkProvider>
    );
  }
  return <>{children}</>;
};

const ClerkSessionSync: React.FC<{ user: UserSession | null; setUser: (user: UserSession | null) => void }> = ({ user, setUser }) => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      const uEmail = clerkUser.primaryEmailAddress?.emailAddress || "";
      const fName = clerkUser.firstName || "";
      const lName = clerkUser.lastName || "";
      const fullName = clerkUser.fullName || `${fName} ${lName}`.trim() || uEmail.split('@')[0];
      
      const syncUser = async () => {
        try {
          const { data: existingUser, error: fetchErr } = await supabase
            .from('users')
            .select('*')
            .eq('id', clerkUser.id)
            .maybeSingle();

          if (fetchErr) throw fetchErr;

          const defaultRole = (uEmail === 'intraxmedia@gmail.com' || uEmail === 'intraxmedia.team@gmail.com' || uEmail === 'intraxmediateam@gmail.com') ? 'admin' : 'user';

          if (existingUser) {
            const mappedUser: UserSession = {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              role: (existingUser.role || 'user') as 'user' | 'admin'
            };
            if (!user || user.id !== mappedUser.id || user.role !== mappedUser.role) {
              setUser(mappedUser);
            }
          } else {
            // Write profile row directly to Supabase users table
            const newUser = {
              id: clerkUser.id,
              name: fullName,
              email: uEmail,
              password: 'clerk-managed-account',
              first_name: fName,
              last_name: lName,
              role: defaultRole
            };

            const { error: insertErr } = await supabase
              .from('users')
              .insert(newUser);

            if (insertErr) throw insertErr;

            const mappedUser: UserSession = {
              id: clerkUser.id,
              name: fullName,
              email: uEmail,
              role: defaultRole as 'user' | 'admin'
            };
            if (!user || user.id !== mappedUser.id) {
              setUser(mappedUser);
            }
          }
        } catch (err) {
          console.error("[Clerk AutoSync Error]", err);
          // Standard client-side fallback
          const fallbackUser: UserSession = {
            id: clerkUser.id,
            name: fullName,
            email: uEmail,
            role: (uEmail === 'intraxmedia@gmail.com' || uEmail === 'intraxmedia.team@gmail.com' || uEmail === 'intraxmediateam@gmail.com') ? 'admin' : 'user'
          };
          if (!user || user.id !== fallbackUser.id) {
            setUser(fallbackUser);
          }
        }
      };
      
      syncUser();
    } else if (isLoaded && !isSignedIn) {
      // Clear clerk-based sessions from local storage if Clerk says we are signed out
      if (user && (user.id?.startsWith('user_') || user.id?.startsWith('clerk-'))) {
        setUser(null);
      }
    }
  }, [isLoaded, isSignedIn, clerkUser, user, setUser]);

  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);

  // Sync session on load & listen to local storage changes
  useEffect(() => {
    const saved = localStorage.getItem('intrax_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('intrax_user');
      }
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem('intrax_user');
      if (updated) {
        try {
          setUser(JSON.parse(updated));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event to force instant sync without tab-crossing restriction
    window.addEventListener('intrax-auth-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('intrax-auth-update', handleStorageChange);
    };
  }, []);

  const handleSetUser = (newUser: UserSession | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('intrax_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('intrax_user');
      // Programmatically sign out of Clerk if active
      try {
        if (typeof window !== 'undefined' && (window as any).Clerk) {
          (window as any).Clerk.signOut().catch((err: any) => {
            console.error("[Clerk global signOut error]", err);
          });
        }
      } catch (e) {
        console.error("Failed to call global Clerk signOut:", e);
      }
    }
    // Dispatch custom event to notify layout & navbar instantly
    window.dispatchEvent(new Event('intrax-auth-update'));
  };

  return (
    <OptionalClerkProvider>
      <Router>
        <ScrollToTop />
        <ClerkSessionSync user={user} setUser={handleSetUser} />
        <Layout user={user} setUser={handleSetUser}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:section" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:section" element={<Portfolio />} />
            <Route path="/portfolio-detail/:id" element={<PortfolioDetail />} />
            <Route path="/courses" element={<Courses user={user} setUser={handleSetUser} />} />
            <Route path="/courses/:action" element={<Courses user={user} setUser={handleSetUser} />} />
            <Route path="/courses/:action/:courseSlug" element={<Courses user={user} setUser={handleSetUser} />} />
            <Route path="/courses/tiktok-ads" element={<TikTokCourse />} />
            <Route path="/login" element={<Login user={user} setUser={handleSetUser} />} />
            <Route path="/signup" element={<Signup user={user} setUser={handleSetUser} />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/:section" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </Layout>
      </Router>
    </OptionalClerkProvider>
  );
};

export default App;