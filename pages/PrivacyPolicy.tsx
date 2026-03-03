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

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-500 selection:text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInSection>
          <h1 className="text-5xl md:text-6xl font-display font-black text-brand-500 mb-4 uppercase tracking-tight">
            Intrax Media Privacy Policy
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
                <li><strong>Account:</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li><strong>Company:</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Intrax Media.</li>
                <li><strong>Cookies:</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                <li><strong>Country:</strong> refers to Pakistan.</li>
                <li><strong>Service:</strong> refers to the Website.</li>
                <li><strong>Website:</strong> refers to Intrax Media, accessible from <a href="https://intraxmedia.com" className="text-brand-500 hover:underline">https://intraxmedia.com</a></li>
                <li><strong>You:</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
              </ul>
            </section>
          </FadeInSection>

          <FadeInSection delay={200}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Collecting and Using Your Personal Data</h2>
              <h3 className="text-xl font-bold text-black mb-4">Types of Data Collected</h3>
              <h4 className="text-lg font-bold text-black mt-6 mb-2">Personal Data</h4>
              <p className="leading-relaxed">
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Usage Data</li>
              </ul>

              <h4 className="text-lg font-bold text-black mt-8 mb-2">Usage Data</h4>
              <p className="leading-relaxed">
                Usage Data is collected automatically when using the Service. It may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={300}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Use of Your Personal Data</h2>
              <p className="leading-relaxed mb-4">The Company may use Personal Data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>To provide and maintain our Service:</strong> including to monitor the usage of our Service.</li>
                <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.</li>
                <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                <li><strong>To provide You with news:</strong> special offers and general information about other goods, services and events which we offer.</li>
              </ul>
            </section>
          </FadeInSection>

          <FadeInSection delay={400}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Security of Your Personal Data</h2>
              <p className="leading-relaxed">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection delay={500}>
            <section>
              <h2 className="text-3xl font-black text-brand-500 uppercase tracking-tight mb-6">Contact Us</h2>
              <p className="leading-relaxed mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>
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
