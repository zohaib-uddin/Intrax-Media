import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import { CalendlyEmbed } from '../components/CalendlyEmbed';
import { Clock, Video, Globe, Facebook, Instagram, Linkedin, AlertCircle, CheckCircle, Send, Phone, Mail, MapPin } from 'lucide-react';

// Animation Helper
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Contact: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (formData.fullName.length < 3) newErrors.fullName = "Name must be at least 3 characters.";
    
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          })
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          const data = await response.json();
          setSubmitError(data.error || 'Failed to send message. Please try again.');
        }
      } catch (err) {
        setSubmitError('Network error. Please check your connection.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-500 selection:text-white overflow-hidden relative">
      {/* Background Shapes & Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Circles */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-50 rounded-full blur-[120px] opacity-40"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-50 rounded-full blur-[100px] opacity-30"
        />
        
        {/* Geometric Shapes */}
        <motion.div 
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ opacity: 0.1, y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[20%] left-[10%] w-32 h-32 border-4 border-brand-500 rounded-3xl"
        />
        <motion.div 
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ opacity: 0.05, x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[30%] right-[15%] w-48 h-48 bg-brand-500 rounded-[2rem]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[40%] right-[5%] w-24 h-24 border-8 border-brand-500 rounded-full"
        />
      </div>

      <style>{`
        .yellow-glow {
          text-shadow: 0 0 25px rgba(255, 217, 0, 0.4);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: black;
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 relative z-10">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <FadeInSection>
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="inline-block px-4 py-1 rounded-full bg-brand-50 text-brand-500 font-bold text-sm uppercase tracking-widest mb-6 border border-brand-100"
               >
                 Get In Touch
               </motion.div>
               <h1 className="text-6xl md:text-8xl font-display font-black text-black mb-8 leading-tight tracking-tighter">
                  Contact Our <br /><span className="text-brand-500 italic">E-commerce</span> Experts
               </h1>
               <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                 Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
               </p>
            </FadeInSection>
         </div>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="pb-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-4 space-y-12">
              <FadeInSection delay={100}>
                <div className="space-y-8">
                  <div className="group flex items-start space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 border-2 border-brand-500 shadow-lg shadow-brand-500/5"
                    >
                      <Mail size={24} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</h4>
                      <a href="mailto:intraxmedia@gmail.com" className="text-xl font-black text-black hover:text-brand-500 transition-colors cursor-pointer">intraxmedia@gmail.com</a>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 border-2 border-brand-500 shadow-lg shadow-brand-500/5"
                    >
                      <Phone size={24} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</h4>
                      <a href="https://wa.me/923126109121" target="_blank" rel="noopener noreferrer" className="text-xl font-black text-black hover:text-brand-500 transition-colors cursor-pointer">+92312-6109121</a>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 border-2 border-brand-500 shadow-lg shadow-brand-500/5"
                    >
                      <MapPin size={24} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Visit Us</h4>
                      <p className="text-xl font-black text-black">New York, United States</p>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Follow Our Journey</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://www.instagram.com/faizansheikhfx?igsh=MWwybzJ5cjcydDA2aA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-500 transition-all shadow-sm"
                    >
                      <Instagram size={20} />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/faizan-ali-39a22439b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-500 transition-all shadow-sm"
                    >
                      <Linkedin size={20} />
                    </motion.a>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-8">
              <FadeInSection delay={200}>
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-[80px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center text-black mx-auto mb-6 shadow-xl shadow-brand-500/20">
                          <CheckCircle size={40} />
                        </div>
                        <h3 className="text-3xl font-black mb-4 uppercase">Message Sent!</h3>
                        <p className="text-gray-500 font-medium">Thank you for reaching out. Our team will get back to you shortly.</p>
                        <Button 
                          variant="black" 
                          className="mt-8"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Full Name */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              placeholder="John Doe"
                              value={formData.fullName}
                              onChange={handleChange}
                              className={`w-full bg-white border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-black placeholder-gray-300 focus:outline-none focus:border-brand-500 transition-all font-medium shadow-sm`}
                            />
                            {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">{errors.fullName}</p>}
                          </div>

                          {/* Email Address */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full bg-white border-2 ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-black placeholder-gray-300 focus:outline-none focus:border-brand-500 transition-all font-medium shadow-sm`}
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Phone Number */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full bg-white border-2 ${errors.phone ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-black placeholder-gray-300 focus:outline-none focus:border-brand-500 transition-all font-medium shadow-sm`}
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">{errors.phone}</p>}
                          </div>

                          {/* Subject */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                            <input
                              type="text"
                              name="subject"
                              placeholder="Project Inquiry"
                              value={formData.subject}
                              onChange={handleChange}
                              className={`w-full bg-white border-2 ${errors.subject ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-black placeholder-gray-300 focus:outline-none focus:border-brand-500 transition-all font-medium shadow-sm`}
                            />
                            {errors.subject && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">{errors.subject}</p>}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Your Message</label>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Tell us about your project..."
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full bg-white border-2 ${errors.message ? 'border-red-500' : 'border-gray-100'} rounded-3xl px-6 py-4 text-black placeholder-gray-300 focus:outline-none focus:border-brand-500 transition-all font-medium resize-none shadow-sm`}
                          ></textarea>
                          {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">{errors.message}</p>}
                        </div>

                        {submitError && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-600 text-sm font-bold"
                          >
                            <AlertCircle size={16} className="mr-2" /> {submitError}
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          variant="black" 
                          fullWidth 
                          size="lg" 
                          disabled={isSubmitting}
                          className="mt-4 shadow-2xl text-lg hover:shadow-brand-500/20 group h-16 rounded-2xl"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              Send Message
                              <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                          )}
                        </Button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100">
             
             {/* Left: Info Section */}
             <div className="bg-white p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden border-r border-gray-50">
               <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
               
               <FadeInSection>
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   className="w-16 h-1 bg-brand-500 mb-8 rounded-full"
                 ></motion.div>
                 <h2 className="text-5xl md:text-6xl font-display font-black leading-tight text-black mb-10 tracking-tighter">
                   Ready to <span className="text-brand-500">Scale?</span>
                 </h2>
                 <p className="text-gray-600 text-xl leading-relaxed font-medium mb-12">
                   Book a free strategy session with our <span className="text-brand-500 font-bold">Growth Specialists</span>. We'll audit your brand and show you exactly how to hit your targets.
                 </p>
                 
                 <div className="space-y-8">
                   <motion.div 
                     whileHover={{ x: 10 }}
                     className="flex items-center space-x-6 text-black group"
                   >
                     <div className="w-14 h-14 rounded-2xl border-2 border-brand-500 flex items-center justify-center text-brand-500 shadow-sm group-hover:bg-brand-500 group-hover:text-black transition-all">
                        <Clock size={24} />
                     </div>
                     <div>
                       <span className="block font-black text-xl uppercase tracking-tight">30 Minute Session</span>
                       <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Strategy Call</span>
                     </div>
                   </motion.div>
                   <motion.div 
                     whileHover={{ x: 10 }}
                     className="flex items-center space-x-6 text-black group"
                   >
                     <div className="w-14 h-14 rounded-2xl border-2 border-brand-500 flex items-center justify-center text-brand-500 shadow-sm group-hover:bg-brand-500 group-hover:text-black transition-all">
                        <Video size={24} />
                     </div>
                     <div>
                       <span className="block font-black text-xl uppercase tracking-tight">Video Conference</span>
                       <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Google Meet / Zoom</span>
                     </div>
                   </motion.div>
                 </div>
               </FadeInSection>
             </div>

             {/* Right: Calendly Section */}
             <div className="bg-brand-50 p-6 lg:p-12 flex flex-col justify-center relative">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5),transparent_70%)]"></div>
               <FadeInSection delay={200} className="relative z-10">
                 <div className="text-center mb-8">
                   <h3 className="font-black text-3xl font-display text-black uppercase tracking-tight">Select a Date</h3>
                   <p className="text-sm text-brand-500 font-bold mt-2 uppercase tracking-widest">Limited Slots Available</p>
                 </div>
                 <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white">
                   <CalendlyEmbed url="https://calendly.com/intraxmedia/30min" />
                 </div>
               </FadeInSection>
             </div>
           </div>
        </div>
      </section>

    </div>
  );
};