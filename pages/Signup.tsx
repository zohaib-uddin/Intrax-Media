import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignUp, useUser } from '@clerk/clerk-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Mail, Key, User, Shield, Info, CheckCircle, RefreshCw } from 'lucide-react';
import { UserSession } from '../App';

const CLERK_PUBLISHABLE_KEY = ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY as string) || "";

interface SignupProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
}

export const Signup: React.FC<SignupProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Clerk hooks
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
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
      if (!signUpLoaded) {
        setError('School platform is booting Clerk service. Please wait a second.');
        setSubmitting(false);
        return;
      }

      try {
        if (pendingVerification) {
          // Verify code
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
          });

          if (completeSignUp.status === 'complete') {
            await setSignUpActive({ session: completeSignUp.createdSessionId });
            setSuccess('Verifying and registering...');
            // The observation effect will automatically detect, sync with Neon DB, and redirect!
          } else {
            setError(`Verification status is: ${completeSignUp.status}. Please check your verification code.`);
            setSubmitting(false);
          }
        } else {
          // Initial signup request
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
              setSubmitting(false);
            } else {
              const sessionId = result.createdSessionId;
              if (sessionId) {
                await setSignUpActive({ session: sessionId });
                setSuccess('Registering...');
              } else {
                setError(`Registration incomplete: Clerk status is ${result.status}.`);
                setSubmitting(false);
              }
            }
          }
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Clerk Registration Request Failed.');
        setSubmitting(false);
      }
    } else {
      // Database Local signup path
      try {
        const fullName = `${firstName} ${lastName}`.trim() || email.split('@')[0];
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            name: fullName,
            firstName,
            lastName
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Registration failed. Please try again.');
          setSubmitting(false);
        } else {
          setSuccess('Account created successfully! Redirecting to log in page...');
          // Delay briefly to allow user to see success message, then redirect to login
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      } catch (err) {
        setError('Connection to dynamic Neon service failed.');
        setSubmitting(false);
      }
    }
  };

  return (
    <div id="signup-container" className="bg-white min-h-screen text-black pt-32 pb-20 selection:bg-brand-500 selection:text-white">
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
              Create <span className="text-brand-500">Account</span>
            </h2>
            <p className="text-sm text-gray-500 mt-3 font-medium leading-relaxed">
              Sign up today and get instant premium login credentials.
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
                  <span>Code sent to <span className="font-bold text-gray-600">{email}</span>.</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      setPendingVerification(false);
                      setSubmitting(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-brand-500 hover:underline font-bold shrink-0 ml-1"
                  >
                    Edit email
                  </button>
                </p>
              </div>
            ) : (
              <>
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
              ) : (
                'Create Free Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-6">
            <Link 
              to="/login"
              className="text-xs font-black uppercase tracking-wider text-black transition-colors"
            >
              Already have an account? <span className="text-brand-500 text-sm block mt-1 hover:underline">Log in to Portal</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
