import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export const TermsConditions: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-500 selection:text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInSection>
          <h1 className="text-5xl md:text-6xl font-display font-black text-brand-500 mb-4 uppercase tracking-tight">
            Intrax Media Terms and Conditions
          </h1>
          <p className="text-gray-400 font-bold mb-12">Last updated: February 27, 2026</p>
        </FadeInSection>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-12">
          <FadeInSection delay={100}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Interpretation and Definitions</h2>
              <h3 className="text-xl font-bold text-black mb-4">Interpretation</h3>
              <p className="leading-relaxed">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Definitions</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Affiliate:</strong> means an entity that controls, is controlled by or is under common control with a party.</li>
                <li><strong>Company:</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Intrax Media.</li>
                <li><strong>Device:</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                <li><strong>Service:</strong> refers to the Website.</li>
                <li><strong>Terms and Conditions:</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                <li><strong>Website:</strong> refers to Intrax Media, accessible from <a href="https://intraxmedia.com" className="text-brand-500 hover:underline">https://intraxmedia.com</a></li>
              </ul>
            </section>
          </FadeInSection>

          <FadeInSection delay={200}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Acknowledgment</h2>
              <p className="leading-relaxed">
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <p className="leading-relaxed mt-4">
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={300}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
              </p>
              <p className="leading-relaxed mt-4">
                Upon termination, Your right to use the Service will cease immediately.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={400}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={500}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Governing Law</h2>
              <p className="leading-relaxed">
                The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={600}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Contact Us</h2>
              <p className="leading-relaxed mb-4">If you have any questions about these Terms and Conditions, You can contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: <a href="mailto:intraxmedia@gmail.com" className="text-brand-500 font-bold hover:underline">intraxmedia@gmail.com</a></li>
                <li>By visiting this page on our website: <Link to="/contact" className="text-brand-500 hover:underline">/contact</Link></li>
                <li>By phone number: <a href="https://wa.me/923126109121" target="_blank" rel="noopener noreferrer" className="text-brand-500 font-bold hover:underline">+92312-6109121</a></li>
              </ul>
            </section>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};
