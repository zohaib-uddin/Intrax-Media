import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import { 
  ClerkProvider, useSignIn, useSignUp, useUser 
} from '@clerk/clerk-react';
import { 
  Play, Star, User, Bookmark, LogOut, Plus, Edit2, Trash2, ArrowLeft, 
  ChevronRight, Lock, Mail, Key, Shield, CheckCircle, Video, List, Info,
  Eye, RefreshCw, Layers, X, Upload
} from 'lucide-react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';

const CLERK_PUBLISHABLE_KEY = ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY as string) || "";

interface Lesson {
  title: string;
  videoLink: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  overview: string;
  description: string;
  image: string;
  videos: Lesson[];
}

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Sluggify helper to synchronize URLs with course titles
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');         // Replace multiple - with single -
};

// 1. EXTERNAL AUTH: CLERK-BACKED GATEWAY
interface AuthGateProps {
  onAuthSuccess: (user: UserSession) => void;
}

const ClerkAuthGate: React.FC<AuthGateProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { isLoaded: userLoaded, isSignedIn, user: clerkUser } = useUser();

  useEffect(() => {
    if (userLoaded && isSignedIn && clerkUser) {
      const uEmail = clerkUser.primaryEmailAddress?.emailAddress || "";
      const fName = clerkUser.firstName || "";
      const lName = clerkUser.lastName || "";
      const fullName = clerkUser.fullName || `${fName} ${lName}`.trim() || uEmail.split('@')[0];
      
      const autoSyncAndLogin = async () => {
        try {
          const syncRes = await fetch('/api/auth/sync-clerk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: clerkUser.id,
              name: fullName,
              email: uEmail,
              firstName: fName,
              lastName: lName
            })
          });
          if (syncRes.ok) {
            const data = await syncRes.json();
            onAuthSuccess(data.user);
          }
        } catch (err) {
          console.error("[Clerk AutoSync Check Error]", err);
        }
      };
      
      autoSyncAndLogin();
    }
  }, [userLoaded, isSignedIn, clerkUser, onAuthSuccess]);

  const handleClerkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (authMode === 'login') {
        if (!signInLoaded) {
          setError('Clerk Service is loading. Please wait.');
          setSubmitting(false);
          return;
        }

        const result = await signIn.create({
          identifier: email,
          password: password,
        });

        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId });
          setSuccess('Logging you in...');
        } else {
          setError('Sign-in incomplete. Please verify your credentials.');
        }
      } else {
        if (!signUpLoaded) {
          setError('Clerk Service is loading. Please wait.');
          setSubmitting(false);
          return;
        }

        if (pendingVerification) {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
          });

          if (completeSignUp.status === 'complete') {
            await setSignUpActive({ session: completeSignUp.createdSessionId });
            setSuccess('Verifying and registering...');
          } else {
            setError(`Verification status is: ${completeSignUp.status}. Please check your verification code.`);
          }
        } else {
          const result = await signUp.create({
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName
          });

          if (result.status === 'complete') {
            await setSignUpActive({ session: result.createdSessionId });
            setSuccess('Registering...');
          } else {
            const requiresEmailVerification = result.unverifiedFields && result.unverifiedFields.includes('email_address');
            
            if (requiresEmailVerification) {
              await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
              setPendingVerification(true);
              setSuccess('A 6-digit verification code has been sent to your email. Please input it below.');
            } else {
              const sessionId = result.createdSessionId;
              if (sessionId) {
                await setSignUpActive({ session: sessionId });
                setSuccess('Registering...');
              } else {
                setError(`Registration incomplete: Clerk status is ${result.status}. If you want verification, please enable email/SMS verification in Clerk dashboard.`);
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Clerk Auth Request Failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] border-2 border-brand-100 p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center font-bold text-black text-xl mx-auto mb-4 tracking-tighter shadow-lg shadow-brand-500/20">
            IM
          </div>
          <h2 className="text-3xl font-display font-black text-black">
            Intrax <span className="text-brand-500">Mastery</span>
          </h2>
          <span className="text-[9px] font-black uppercase tracking-widest bg-brand-50 text-brand-500 px-3 py-1 rounded-full mt-2 inline-block">
            Clerk Premium Auth Gateway
          </span>
          <p className="text-sm text-gray-500 mt-3 font-medium leading-relaxed">
            Premium streaming security synced automatically to the Neon Database.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl flex items-center gap-2">
            <Info size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-brand-50 text-emerald-700 border border-brand-200 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleClerkSubmit} className="space-y-4">
          {pendingVerification ? (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Verification Code</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  required
                  placeholder="Enter the 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-12 pr-4 text-sm font-bold transition-all text-black outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <span>Verification code sent to <span className="font-bold text-gray-600">{email}</span>.</span>
                <button 
                  type="button" 
                  onClick={() => {
                    setPendingVerification(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-brand-500 hover:underline font-bold shrink-0 ml-1"
                >
                  Edit details
                </button>
              </p>
            </div>
          ) : (
            <>
              {authMode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text"
                        required
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-10 pr-2 text-xs font-bold transition-all text-black outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text"
                        required
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-10 pr-2 text-xs font-bold transition-all text-black outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email"
                    required
                    placeholder="intraxmedia@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-12 pr-4 text-sm font-bold transition-all text-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-12 pr-4 text-sm font-bold transition-all text-black outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div id="clerk-captcha" className="my-2 flex justify-center"></div>

          <Button 
            type="submit" 
            fullWidth 
            variant="primary" 
            disabled={submitting}
            className="py-3.5 font-black uppercase text-sm shadow-xl mt-6 group flex items-center justify-center gap-2"
          >
            {submitting ? (
              <RefreshCw className="animate-spin text-black" size={18} />
            ) : pendingVerification ? (
              'Verify & Create Account'
            ) : authMode === 'login' ? (
              'Login to Portal'
            ) : (
              'Create Free Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-6">
          <button 
            type="button"
            onClick={() => {
              setAuthMode(authMode === 'login' ? 'signup' : 'login');
              setError('');
              setSuccess('');
              setPendingVerification(false);
              setCode('');
            }}
            className="text-xs font-black uppercase tracking-wider text-black hover:text-brand-500 transition-colors"
          >
            {authMode === 'login' ? (
              <>New around here? <span className="text-brand-500">Sign Up Now</span></>
            ) : (
              <>Already have an account? <span className="text-brand-500">Log In</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};


// 2. FALLBACK AUTH: NEON-CONNECTED LOCAL GATEWAY (ACTIVE IF NO CLERK KEY)
const LocalAuthGate: React.FC<AuthGateProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const url = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body: any = { email, password };
    if (authMode === 'signup') {
      body.name = `${firstName} ${lastName}`.trim();
      body.firstName = firstName;
      body.lastName = lastName;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Identity verification failed. Please try again.');
      } else {
        if (authMode === 'signup') {
          const successMsg = 'Registration completed and synced to Neon! You can now log in.';
          setSuccess(successMsg);
          setAuthMode('login');
          setPassword('');
        } else {
          setSuccess('Logged in successfully!');
          onAuthSuccess(data.user);
        }
      }
    } catch (err: any) {
      setError('Connection to dynamic Neon service failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] border-2 border-brand-100 p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center font-bold text-black text-xl mx-auto mb-4 tracking-tighter shadow-lg shadow-brand-500/20">
            IM
          </div>
          <h2 className="text-3xl font-display font-black text-black">
            Intrax <span className="text-brand-500">Mastery</span>
          </h2>
          <span className="text-[9px] font-black uppercase tracking-widest bg-brand-50 text-brand-500 px-3 py-1 rounded-full mt-2 inline-block">
            Database-backed Fallback Gateway
          </span>
          <p className="text-sm text-gray-500 mt-3 font-medium leading-relaxed">
            Enter your credentials to instantly view masterclasses synced from our Neon database cluster.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl flex items-center gap-2">
            <Info size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-brand-50 text-emerald-700 border border-brand-200 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-10 pr-2 text-xs font-bold transition-all text-black outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-10 pr-2 text-xs font-bold transition-all text-black outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email"
                required
                placeholder="intraxmedia@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-12 pr-4 text-sm font-bold transition-all text-black outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 pl-12 pr-4 text-sm font-bold transition-all text-black outline-none"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            variant="primary" 
            disabled={loading}
            className="py-3.5 font-black uppercase text-sm shadow-xl mt-6 group flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="animate-spin text-black" size={18} />
            ) : authMode === 'login' ? (
              'Login to Portal'
            ) : (
              'Create Free Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-6">
          <button 
            type="button"
            onClick={() => {
              setAuthMode(authMode === 'login' ? 'signup' : 'login');
              setError('');
              setSuccess('');
            }}
            className="text-xs font-black uppercase tracking-wider text-black hover:text-brand-500 transition-colors"
          >
            {authMode === 'login' ? (
              <>New around here? <span className="text-brand-500">Sign Up Now</span></>
            ) : (
              <>Already have an account? <span className="text-brand-500">Log In</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};


// Static SVG Logo implementation mirroring company brand colors
const StaticIMLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative ${className} shrink-0 flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* 'M' Background Layer */}
        <path 
          d="M15 80 L15 25 L50 60 L85 25 L85 80" 
          fill="none" 
          stroke="#ffd900" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* 'I' Foreground Layer */}
        <path 
          d="M44 25 H56 V85 H44 Z" 
          fill="#ffd900"
        />
        {/* Top Dot */}
        <circle 
          cx="50" cy="12" r="6" 
          fill="#ffd900"
        />
      </svg>
    </div>
  );
};


// 3. SECURE INTERNAL COURSES DASHBOARD MANAGER
interface DashboardProps {
  user: UserSession;
  onLogout: () => void;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  coursesLoading: boolean;
  fetchCourses: () => Promise<void>;
}

const CoursesDashboard: React.FC<DashboardProps> = ({ 
  user, 
  onLogout, 
  courses, 
  setCourses, 
  coursesLoading, 
  fetchCourses 
}) => {
  const navigate = useNavigate();
  const { action, courseSlug } = useParams();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  // Admin states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminMode, setAdminMode] = useState<'create' | 'edit'>('create');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<'courses' | 'videos'>('courses');

  // Form states - Course
  const [courseTitle, setCourseTitle] = useState('');
  const [courseOverview, setCourseOverview] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([
    { title: 'Video 1: Introduction', videoLink: '', description: '' }
  ]);

  // Form states - Add Video Section (Auto Detected Lectures)
  const [addVideoCourseId, setAddVideoCourseId] = useState('');
  const [addVideoTitle, setAddVideoTitle] = useState('');
  const [addVideoLink, setAddVideoLink] = useState('');
  const [addVideoDescription, setAddVideoDescription] = useState('');

  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');

  // Confirmation state for custom modals (instead of raw window alert confirms)
  const [confirmAction, setConfirmAction] = useState<{
    type: 'delete' | 'publish' | 'update' | 'add-video';
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Synchronize route paths with the active selected course structure
  useEffect(() => {
    if (action === 'learning' && courseSlug) {
      const match = courses.find(c => slugify(c.title) === courseSlug);
      if (match) {
        setSelectedCourse(match);
      } else if (courses.length > 0 && !coursesLoading) {
        setSelectedCourse(null);
        navigate('/courses');
      }
    } else {
      setSelectedCourse(null);
    }
  }, [action, courseSlug, courses, coursesLoading, navigate]);

  // Synchronize route paths with admin panel creation/editing work
  useEffect(() => {
    if (action === 'add') {
      if (user.role === 'admin') {
        setShowAdminPanel(true);
        setAdminMode('create');
        setEditingCourseId(null);
        setCourseTitle('');
        setCourseOverview('');
        setCourseDescription('');
        setCourseImage('');
        setLessons([{ title: 'Video 1: Introduction', videoLink: '', description: '' }]);
      } else {
        navigate('/courses');
      }
    } else if (action === 'edit' && courseSlug) {
      if (user.role === 'admin') {
        const match = courses.find(c => slugify(c.title) === courseSlug);
        if (match) {
          setShowAdminPanel(true);
          setAdminMode('edit');
          setEditingCourseId(match.id);
          setCourseTitle(match.title);
          setCourseOverview(match.overview);
          setCourseDescription(match.description || '');
          setCourseImage(match.image || '');
          setLessons(match.videos.length > 0 ? match.videos : [{ title: 'Video 1: Introduction', videoLink: '', description: '' }]);
        } else if (courses.length > 0 && !coursesLoading) {
          navigate('/courses');
        }
      } else {
        navigate('/courses');
      }
    } else {
      setShowAdminPanel(false);
    }
  }, [action, courseSlug, courses, coursesLoading, user.role, navigate]);

  // Translate video links into safe embed formats (e.g. Loom support)
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const match = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.loom.com/embed/${match[1]}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true`;
    }
    return url;
  };

  const handleAddLessonField = () => {
    setLessons([...lessons, { title: `Video ${lessons.length + 1}: `, videoLink: '', description: '' }]);
  };

  const handleRemoveLessonField = (index: number) => {
    if (lessons.length === 1) return;
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleLessonChange = (index: number, field: keyof Lesson, value: string) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  // Intermediate helper that triggers confirmation modal before executing create/update
  const handleAdminFormSubmitTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');

    if (!courseTitle || !courseOverview) {
      setAdminError('Please fill out the Course Title and Overview fields first.');
      return;
    }

    setConfirmAction({
      type: adminMode === 'create' ? 'publish' : 'update',
      title: adminMode === 'create' ? 'Publish Course Outline?' : 'Save Course Outline Changes?',
      message: adminMode === 'create' 
        ? 'Are you sure you want to proceed and publish this brand-new course outline to the dynamic database?'
        : 'Are you sure you want to save all current edits made to this course outline? This will instantly propagate to all users.',
      onConfirm: () => {
        executeCourseSubmit();
      }
    });
  };

  const executeCourseSubmit = async () => {
    setConfirmAction(null);
    setAdminError('');
    setAdminSuccess('');

    const payload = {
      title: courseTitle,
      overview: courseOverview,
      description: courseDescription,
      image: courseImage || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
      videos: lessons
    };

    const url = adminMode === 'create' ? '/api/courses' : `/api/courses/${editingCourseId}`;
    const method = adminMode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setAdminSuccess(adminMode === 'create' ? 'New course successfully published to Neon cluster!' : 'Course changes successfully updated!');
        
        // Reset states and exit the modal
        setCourseTitle('');
        setCourseOverview('');
        setCourseDescription('');
        setCourseImage('');
        setLessons([{ title: 'Video 1: Introduction', videoLink: '', description: '' }]);
        setEditingCourseId(null);
        setAdminMode('create');
        
        await fetchCourses();
        setTimeout(() => {
          navigate('/courses');
        }, 1500);
      } else {
        const errData = await res.json();
        setAdminError(errData.error || 'Identity rejection or missing inputs.');
      }
    } catch (e) {
      setAdminError('Local node-server gateway timeout. Failed to persist.');
    }
  };

  // Add video trigger confirmation
  const handleAddVideoFormSubmitTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');

    if (!addVideoCourseId || !addVideoTitle || !addVideoLink) {
      setAdminError('Please fill in all video fields: target course, video title, and video Link.');
      return;
    }

    setConfirmAction({
      type: 'add-video',
      title: 'Sync New Video Lecture?',
      message: 'Are you sure you want to add this new video lecture segment to the selected course curriculum in the database?',
      onConfirm: () => {
        executeAddVideoSubmit();
      }
    });
  };

  const executeAddVideoSubmit = async () => {
    setConfirmAction(null);
    setAdminError('');
    setAdminSuccess('');

    try {
      const res = await fetch(`/api/courses/${addVideoCourseId}/add-video`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify({
          title: addVideoTitle,
          videoLink: addVideoLink,
          description: addVideoDescription
        })
      });

      if (res.ok) {
        setAdminSuccess('New lecture successfully appended! Curriculum totals synced instantaneously.');
        setAddVideoTitle('');
        setAddVideoLink('');
        setAddVideoDescription('');
        await fetchCourses();
        setTimeout(() => {
          navigate('/courses');
        }, 1500);
      } else {
        const errData = await res.json();
        setAdminError(errData.error || 'Failed to save video. Double check admin clearance.');
      }
    } catch (e) {
      setAdminError('Unable to connect to dynamic backend. Record save failed.');
    }
  };

  const handleEditInit = (course: Course) => {
    navigate(`/courses/edit/${slugify(course.title)}`);
  };

  // Trigger Deletion Confirmation Modal
  const handleDeleteTrigger = (courseId: string, titleName: string) => {
    setConfirmAction({
      type: 'delete',
      title: 'Permanently Delete Course Outline?',
      message: `Are you sure you want to permanently delete "${titleName}" and all of its videos from the Neon database? This operation is immediate and completely irreversible.`,
      onConfirm: () => {
        executeDeleteCourse(courseId);
      }
    });
  };

  const executeDeleteCourse = async (id: string) => {
    setConfirmAction(null);
    try {
      const res = await fetch(`/api/courses/${id}`, { 
        method: 'DELETE',
        headers: {
          'x-user-id': user.id,
          'x-user-role': user.role
        }
      });
      if (res.ok) {
        await fetchCourses();
        if (selectedCourse?.id === id) {
          setSelectedCourse(null);
          navigate('/courses');
        }
      } else {
        alert("Action denied: Verify backend database clearance.");
      }
    } catch (e) {
      console.error(e);
      alert("Network exception deleting course.");
    }
  };

  const selectedTargetCourse = courses.find(c => c.id === addVideoCourseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. CUSTOM SYSTEM CONFIRMATION MODALS (REPLACING BROWSER ALERT WINDOWS) */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white rounded-3xl border-2 border-brand-100 p-8 max-w-md w-full shadow-2xl relative"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <Info className="shrink-0" size={24} />
                <h3 className="text-xl font-display font-black text-black">
                  {confirmAction.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 font-bold leading-relaxed whitespace-pre-wrap break-words border-b border-gray-100 pb-4 mb-6">
                {confirmAction.message}
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmAction.onConfirm}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black transition-all ${confirmAction.type === 'delete' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#ffd900] hover:bg-brand-500 shadow-lg'}`}
                >
                  Yes, Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC ADMIN ACTION MODAL OVERLAY (CREATION & EDITS IN FLOATING CONTAINER) */}
      <AnimatePresence>
        {user.role === 'admin' && showAdminPanel && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-[2.5rem] border-2 border-brand-100 w-full max-w-4xl shadow-2xl relative my-8 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Banner */}
              <div className="bg-black text-[#ffd900] p-6 px-8 flex justify-between items-center bg-gradient-to-r from-black to-neutral-900 border-b-2 border-brand-500 select-none shrink-0">
                <div className="flex items-center gap-3">
                  <StaticIMLogo className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white tracking-tight">
                      Intrax Hub <span className="text-brand-500">Admin Console</span>
                    </h3>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
  System Status: Secure & Operational
</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/courses')}
                  className="p-2 hover:bg-white/10 rounded-full text-brand-500 hover:text-white transition-colors"
                  title="Close Console"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Subheader and Tabs */}
              <div className="bg-gray-50 border-b border-gray-200 px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                <div className="flex gap-4">
                  <button
                    onClick={() => { setAdminTab('courses'); setAdminError(''); setAdminSuccess(''); }}
                    className={`pb-2.5 pt-1.5 font-black text-xs uppercase tracking-wider transition-all relative ${adminTab === 'courses' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                  >
                    <span>Manage Course Outline</span>
                    {adminTab === 'courses' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"></span>}
                  </button>
                  <button
                    onClick={() => { setAdminTab('videos'); setAdminError(''); setAdminSuccess(''); }}
                    className={`pb-2.5 pt-1.5 font-black text-xs uppercase tracking-wider transition-all relative ${adminTab === 'videos' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                  >
                    <span>Add Video Section</span>
                    {adminTab === 'videos' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"></span>}
                  </button>
                </div>
                
                {adminTab === 'courses' && adminMode === 'edit' && (
                  <span className="text-[10px] uppercase font-black bg-brand-500/25 text-brand-700 px-2.5 py-1 rounded-full animate-pulse">
                    Currently Editing Core Outline
                  </span>
                )}
              </div>

              {/* Modal Body Container with customized fields */}
              <div className="p-8 md:p-10 overflow-y-auto w-full flex-grow">
                {adminError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-xl flex items-center gap-3">
                    <Info size={16} className="shrink-0" />
                    <span>{adminError}</span>
                  </div>
                )}

                {adminSuccess && (
                  <div className="mb-6 p-4 bg-brand-50 text-emerald-800 border border-brand-100 text-xs font-bold rounded-xl flex items-center gap-3">
                    <CheckCircle size={16} className="shrink-0" />
                    <span>{adminSuccess}</span>
                  </div>
                )}

                {adminTab === 'courses' ? (
                  /* COURSE OUTLINE FORM */
                  <form onSubmit={handleAdminFormSubmitTrigger} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Course Title</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. UAE Dropshipping Mastery 2025"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Short Overview</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Learn Product Sourcing, Branding, & Tiktok Funnels"
                            value={courseOverview}
                            onChange={(e) => setCourseOverview(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-all"
                          />
                        </div>

                        {/* COVER IMAGE IMPORT FROM LOCAL PC FILE SELECTOR */}
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Course Cover Image
                          </label>
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-500 p-4 rounded-xl transition-all">
                            <div className="relative w-28 h-20 bg-white rounded-lg overflow-hidden border border-gray-200 shrink-0 flex items-center justify-center">
                              {courseImage ? (
                                <img src={courseImage} alt="Cover Preview" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[9px] text-gray-400 font-extrabold uppercase text-center px-1">No Image Preview</span>
                              )}
                            </div>
                            <div className="w-full flex-grow text-left">
                              <input 
                                type="file" 
                                accept="image/*"
                                id="modal-cover-image-uploader"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                      setCourseImage(reader.result as string);
                                    };
                                  }
                                }}
                                className="hidden"
                              />
                              <label 
                                htmlFor="modal-cover-image-uploader"
                                className="cursor-pointer inline-flex items-center gap-2 bg-black hover:bg-brand-500 hover:text-black text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors border border-transparent"
                              >
                                <Upload size={12} />
                                <span>Select Image from PC</span>
                              </label>
                              <p className="text-[9px] text-gray-400 font-bold mt-1.5 leading-tight">
                                Supports PNG, JPEG or WebP images up to 5MB.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Detailed Description</label>
                        <textarea 
                          rows={11}
                          required
                          placeholder="Provide a deep description, layout, target results, and expected income outcomes of our certified mastery syllabus..."
                          value={courseDescription}
                          onChange={(e) => setCourseDescription(e.target.value)}
                          className="w-full h-[calc(100%-24px)] min-h-[180px] bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Videos creator area */}
                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-black text-black uppercase tracking-wider">
                          Video Syllabus Lectures ({lessons.length})
                        </h3>
                        <button 
                          type="button"
                          onClick={handleAddLessonField}
                          className="flex items-center gap-1.5 bg-[#ffd900] text-black hover:bg-black hover:text-[#ffd900] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <Plus size={14} /> Add Video Lesson
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {lessons.map((lesson, index) => (
                          <div key={index} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 relative group/lesson">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] bg-black text-[#ffd900] px-3 py-1 font-black uppercase tracking-widest rounded-md">
                                Lecture Video #{index + 1}
                              </span>
                              {lessons.length > 1 && (
                                <button 
                                  type="button"
                                  onClick={() => handleRemoveLessonField(index)}
                                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                  title="Delete Lesson Row"
                                >
                                  <Trash2 size={15} />
                                </button>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Video Title</label>
                                  <input 
                                    type="text"
                                    required
                                    placeholder="e.g. Module 1: Sourcing Strategy"
                                    value={lesson.title}
                                    onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                                    className="w-full bg-white border-2 border-transparent focus:border-brand-500 rounded-lg py-2 px-3 text-xs font-bold text-black outline-none transition-all"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Loom Link Only</label>
                                  <input 
                                    type="url"
                                    required
                                    placeholder="e.g. https://www.loom.com/share/f84bf8e5c4a5482"
                                    value={lesson.videoLink}
                                    onChange={(e) => handleLessonChange(index, 'videoLink', e.target.value)}
                                    className="w-full bg-white border-2 border-transparent focus:border-brand-500 rounded-lg py-2 px-3 text-xs font-bold text-black outline-none transition-all"
                                  />
                                </div>
                              </div>

                              {/* CHANGED TO TEXTAREA WITH LARGE HEIGHT FOR PROPER DETAILS DEFINE */}
                              <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex justify-between">
                                  <span>Brief Description (About Class)</span>
                                  <span className="text-[8px] text-gray-400 normal-case">Supports detailed notes</span>
                                </label>
                                <textarea 
                                  rows={3}
                                  required
                                  placeholder="Define details, custom timing checklist, PDF slide downloads, or resources for this specific video lecture, which will be displayed under the About Class information segment."
                                  value={lesson.description}
                                  onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                                  className="w-full bg-white border-2 border-transparent focus:border-brand-500 rounded-lg py-2.5 px-3 text-xs font-bold text-black outline-none transition-all resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                      <button 
                        type="button" 
                        onClick={() => navigate('/courses')}
                        className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="bg-[#ffd900] hover:bg-brand-500 text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md"
                      >
                        {adminMode === 'create' ? 'Publish Course Outline' : 'Update Course outline'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* ADD VIDEO ACCURATE FORM */
                  <form onSubmit={handleAddVideoFormSubmitTrigger} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Target Course</label>
                          <select
                            value={addVideoCourseId}
                            required
                            onChange={(e) => setAddVideoCourseId(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-colors"
                          >
                            <option value="">-- Choose target masterclass --</option>
                            {courses.map(c => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Video Lecture Title</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Module 4: High Converting Landing Pages"
                            value={addVideoTitle}
                            onChange={(e) => setAddVideoTitle(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Loom Video Link (Loom Only)</label>
                          <input 
                            type="url"
                            required
                            placeholder="e.g. https://www.loom.com/share/f84bf8e5c4a54823"
                            value={addVideoLink}
                            onChange={(e) => setAddVideoLink(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lesson Description (Renamed to "About Class")</label>
                          <textarea 
                            rows={8}
                            placeholder="Enter detailed points, checklist notes, resources, links..."
                            value={addVideoDescription}
                            onChange={(e) => setAddVideoDescription(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-500 rounded-xl py-3 px-4 text-sm font-bold text-black outline-none transition-colors resize-none"
                          />
                        </div>

                        {selectedTargetCourse && (
                          <div className="bg-brand-50 rounded-xl p-4 border border-brand-100/50">
                            <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">Lectures Auto-Detection Status</h4>
                            <div className="text-xs text-gray-600 space-y-1 mt-2">
                              <div>Current Lectures Count: <span className="font-extrabold text-black">{(selectedTargetCourse.videos || []).length}</span></div>
                              <div>New Cumulative Total: <span className="font-extrabold text-emerald-700">{(selectedTargetCourse.videos || []).length + 1} Lectures</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                      <button 
                        type="button" 
                        onClick={() => navigate('/courses')}
                        className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="bg-[#ffd900] hover:bg-brand-500 text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md"
                      >
                        Add Video Lecture
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DASHBOARD TOP WELCOME BANNER */}
      <div className="bg-white rounded-3xl border-2 border-brand-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl mb-12 select-none">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-black text-[#ffd900] px-3 py-1 font-black uppercase tracking-widest rounded-full">
              {user.role === 'admin' ? 'Admin Access' : 'Learner'}
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 font-black uppercase tracking-widest rounded-full flex items-center gap-1">
              <CheckCircle size={10} /> Active
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-black mt-3 leading-tight">
            Welcome Back, <span className="text-brand-500">{user.name}</span>
          </h1>
        <p className="text-sm font-bold text-gray-500 mt-1">
  Your premium gateway to industry-leading mastery programs and certified skills.
</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {user.role === 'admin' && (
            <button 
              onClick={() => {
                navigate('/courses/add');
              }}
              className="flex items-center gap-2 border-2 border-[#ffd900] bg-[#ffd900] text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all hover:bg-black hover:text-[#ffd900] hover:border-black shadow-lg"
            >
              <Plus size={14} />
              <span>Add Course</span>
            </button>
          )}
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider border border-transparent hover:border-red-100 transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 4. ACTIVE COURSE THEATER PLAYER VIEW */}
      {selectedCourse ? (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black hover:text-brand-500 transition-colors group mb-2"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Courses</span>
            </button>

            <div className="text-right md:text-right text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 select-none">
              Course Progress: <span className="text-brand-500 font-black">{activeLessonIndex + 1} of {selectedCourse.videos.length} Lectures</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {selectedCourse.videos.length > 0 ? (
                <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl bg-black aspect-video">
                  <iframe 
                    src={getEmbedUrl(selectedCourse.videos[activeLessonIndex].videoLink)}
                    title={selectedCourse.videos[activeLessonIndex].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    className="w-full h-full border-0 absolute inset-0"
                  />
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-gray-300 aspect-video flex flex-col items-center justify-center p-8 bg-gray-50">
                  <Video size={48} className="text-gray-300 mb-3" />
                  <p className="text-gray-500 font-bold">No lectures uploaded to this course outline yet.</p>
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => handleEditInit(selectedCourse)}
                      className="mt-4 text-xs font-black text-brand-500 hover:underline"
                    >
                      Modify Course Outlines
                    </button>
                  )}
                </div>
              )}

              {/* Lecture Information */}
              {selectedCourse.videos.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md">
                  <div className="flex items-center gap-2 text-brand-500 font-black text-xs uppercase tracking-widest">
                    <Video size={14} /> Video {activeLessonIndex + 1}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-black mt-2 leading-tight">
                    {selectedCourse.videos[activeLessonIndex].title}
                  </h2>
                  
                  {/* ABOUT CLASS SECTION: Mapping active lesson's brief description here and wrapping to prevent horizontal scrolls */}
                  <div className="border-t border-gray-100 pt-6 mt-6 min-w-0 max-w-full w-full">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About Class</h4>
                    <div className="text-gray-600 font-semibold text-sm leading-relaxed whitespace-pre-wrap break-words min-w-0 max-w-full w-full">
                      {selectedCourse.videos[activeLessonIndex].description || 'No custom description annotated for this video segment.'}
                    </div>
                  </div>

                  {/* Course Master Details */}
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Master Syllabus Details</h4>
                    <div className="text-gray-400 font-medium text-xs leading-relaxed whitespace-pre-wrap break-words">
                      {selectedCourse.description || selectedCourse.overview}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Playlist Sidebar without scrollbars & no subtitles */}
            <div className="bg-gray-50 rounded-3xl border border-brand-100 p-6 shadow-lg h-fit flex flex-col select-none">
              <div className="flex items-center gap-2 mb-4">
                <List size={18} className="text-brand-500" />
                <h3 className="text-lg font-black text-black uppercase tracking-wider">
                  Course Outline
                </h3>
              </div>
             <p className="text-xs text-gray-500 mb-6 font-medium">
  Choose a topic from the outline to access high-definition course materials.
</p>

              {/* Removed scrollbar using Tailwind utility classes */}
              <div className="space-y-3 overflow-y-visible pr-0">
                {selectedCourse.videos.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border transition-all ${isActive ? 'bg-white border-brand-500 shadow-md transform translate-x-1' : 'bg-transparent border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${isActive ? 'bg-brand-500 text-black' : 'bg-white text-gray-400 border border-gray-100'}`}>
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          {/* ONLY title displayed - no description below lesson titles */}
                          <p className={`text-sm font-bold leading-snug truncate ${isActive ? 'text-black font-black' : 'text-gray-600'}`}>
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                      
                      <ChevronRight 
                        size={16} 
                        className={`shrink-0 transition-transform ${isActive ? 'text-brand-500 translate-x-1' : 'text-gray-300'}`} 
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 bg-white/50 rounded-2xl p-4 border border-brand-50 text-left">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-500">
                  <Lock size={12} strokeWidth={2.5} /> Secured Curriculum
                </div>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-1.5">
  Exclusive curriculum curated by industry experts. Unauthorized downloading or screen recording of this protected content is strictly prohibited.
</p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* COURSE CATALOGUE GRID VIEW */
        <div className="space-y-12 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-display font-black text-black">
                Our Premium <span className="text-brand-500">Mastery</span> Programs
              </h2>
              <p className="text-gray-500 text-sm font-bold mt-1 uppercase tracking-wider">
                Learn direct industry secrets to scale your brand profitably
              </p>
            </div>

            <div className="text-xs bg-gray-50 border border-gray-200 text-gray-500 font-extrabold px-5 py-2.5 rounded-xl uppercase tracking-wider shrink-0 select-none">
              Total Courses: <span className="text-brand-500 font-black">{courses.length}</span>
            </div>
          </div>

          {coursesLoading ? (
            <div className="py-24 text-center">
              <RefreshCw className="animate-spin text-brand-500 mx-auto" size={40} />
              <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mt-4">Loading Mastery Courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50">
              <Layers size={48} className="text-gray-300 mx-auto mb-3 animate-pulse" />
              <p className="text-gray-500 font-black text-lg">No Mastery Programs available right now.</p>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mt-1">Please check back again soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="group bg-white rounded-[2rem] border-2 border-brand-100 overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-500 transition-all duration-300 flex flex-col relative"
                >
                  {/* Admin Quick Action Panel */}
                  {user.role === 'admin' && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 select-none">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditInit(course);
                        }}
                        className="bg-white hover:bg-brand-500 text-black hover:text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                        title="Edit Course Outline"
                      >
                        <Edit2 size={14} />
                      </button>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTrigger(course.id, course.title);
                        }}
                        className="bg-white hover:bg-red-500 text-black hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                        title="Delete Course Outline"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  {/* NO BOOKMARK/SAVE FAVORITE ICON RENDERS IN CARD AS DIRECTED */}

                  {/* INCREASED COVER IMAGE HEIGHT FROM h-60 to h-72 WITH SMOOTH BACKDROP ACCENTS */}
                  <div className="relative h-72 overflow-hidden bg-gray-100 border-b border-brand-100 shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 select-none">
                      <span className="text-[9px] bg-brand-500 text-black font-black uppercase tracking-wider px-3 py-1 rounded-md">
                        {course.videos.length} Lectures included
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display text-black leading-snug transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      {/* Enforced Word break wrapping to eliminate description scroll exceptions */}
                      <p className="text-gray-500 text-xs font-semibold leading-relaxed mt-3 line-clamp-3 whitespace-pre-wrap break-words min-w-0 max-w-full">
                        {course.overview}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 select-none">
                        {/* CUSTOM COMPANY "IM" STATIC SVG BRAND LOGO COMPONENT */}
                        <StaticIMLogo className="w-5 h-5" />
                        <span className="text-[11px] text-gray-400 font-bold">Intrax Certified curriculum</span>
                      </div>

                      <button 
                        onClick={() => {
                          navigate(`/courses/learning/${slugify(course.title)}`);
                        }}
                        className="bg-black text-[#ffd900] group-hover:bg-[#ffd900] group-hover:text-black px-4 py-2.5 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                      >
                        <Play size={10} fill="currentColor" /> Start Learning
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};


interface CoursesProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
}

// 4. MAIN EXPORT COMPONENT (CONDITIONAL ROUTER WRAPPER FOR CLERK / LOCAL AUTH)
export const Courses: React.FC<CoursesProps> = ({ user, setUser }) => {
  // Started state as empty array [] to avoid placing static mock courses on visit
  const [courses, setCourses] = useState<Course[]>([]);
  // loading defaults as true on initialization so loading indicator renders immediately
  const [coursesLoading, setCoursesLoading] = useState(true);

  const fetchCourses = async () => {
    setCoursesLoading(true);
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (e) {
      console.error('Error prefetched courses from dynamic backend:', e);
    } finally {
      // close loading trigger smoothly
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="courses-root" className="bg-white min-h-screen text-black selection:bg-brand-500 selection:text-white pt-24 pb-16">
      <CoursesDashboard 
        user={user} 
        onLogout={handleLogout} 
        courses={courses}
        setCourses={setCourses}
        coursesLoading={coursesLoading}
        fetchCourses={fetchCourses}
      />
    </div>
  );
};
