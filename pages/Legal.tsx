import React from 'react';

interface LegalPageProps {
  title: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title }) => {
  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">{title}</h1>
        <div className="prose prose-sm text-gray-600 space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h3 className="text-lg font-bold text-gray-800">1. Introduction</h3>
          <p>
            Welcome to Intrax Media. These {title} govern your use of our website and services. By accessing our services, you agree to these terms.
          </p>
          <h3 className="text-lg font-bold text-gray-800">2. Use of Services</h3>
          <p>
            You agree to use our services only for lawful purposes. You are prohibited from violating any laws or regulations.
          </p>
          <h3 className="text-lg font-bold text-gray-800">3. Intellectual Property</h3>
          <p>
            The content on this website, including text, graphics, and logos, is the property of Intrax Media and is protected by copyright laws.
          </p>
          <h3 className="text-lg font-bold text-gray-800">4. Limitation of Liability</h3>
          <p>
            Intrax Media shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>
          <p>
            (This is a placeholder text for the {title}. A real document would be much longer and contain specific legal clauses.)
          </p>
        </div>
      </div>
    </div>
  );
};