import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignIn, useUser } from '@clerk/clerk-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Mail, Key, Info, CheckCircle, RefreshCw } from 'lucide-react';
import { UserSession } from '../App';

const CLERK_PUBLISHABLE_KEY = ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY as string) || "";

interface LoginProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
}

export const Login: React.FC<LoginProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Clerk hooks
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: userLoaded, isSignedIn, user: clerkUser } = useUser();

  // If already logged in, redirect immediately to courses
  useEffect(() => {
    if (user) {
      navigate('/courses');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (CLERK_PUBLISHABLE_KEY) {
      // Clerk Sign In path
      if (!signInLoaded) {
        setError('School platform is booting Clerk service. Please wait a second.');
        setSubmitting(false);
        return;
      }

      try {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });

        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId });
          setSuccess('Logging you in...');
          // The observation effect above handles the sync and navigation instantly!
        } else {
          setError('Sign-in incomplete. Please verify your credentials/verifications in Clerk.');
          setSubmitting(false);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Clerk Auth Request Failed.');
        setSubmitting(false);
      }
    } else {
      // Direct Database login path
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Identity verification failed. Please try again.');
          setSubmitting(false);
        } else {
          setSuccess('Logged in successfully!');
          setUser(data.user);
          navigate('/courses');
        }
      } catch (err) {
        setError('Connection to dynamic Neon service failed.');
        setSubmitting(false);
      }
    }
  };

  return (
    <div id="login-container" className="bg-white min-h-screen text-black pt-32 pb-20 selection:bg-brand-500 selection:text-white">
      <div className="max-w-md mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border-2 border-brand-100 p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#ffd900] rounded-full flex items-center justify-center font-bold text-black text-xl mx-auto mb-4 tracking-tighter shadow-lg shadow-brand-500/20">
              IM
            </div>
            <h2 className="text-3xl font-display font-black text-black">
              Login to <span className="text-brand-500">Portal</span>
            </h2>
            <p className="text-sm text-gray-500 mt-3 font-medium leading-relaxed">
              Enter your credentials to instantly unlock premium masterclass streaming.
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
              disabled={submitting}
              className="py-3.5 font-black uppercase text-sm shadow-xl mt-6 group flex items-center justify-center gap-2"
            >
              {submitting ? (
                <RefreshCw className="animate-spin text-black" size={18} />
              ) : (
                'Login to Portal'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-6">
            <Link 
              to="/signup"
              className="text-xs font-black uppercase tracking-wider text-black transition-colors"
            >
              New around here? <span className="text-brand-500 text-sm block mt-1 hover:underline">Create a Free Account Now</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
