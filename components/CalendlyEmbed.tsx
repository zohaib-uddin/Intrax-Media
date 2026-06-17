import React, { useEffect, useRef } from 'react';

interface CalendlyEmbedProps {
  url: string;
}

declare global {
  interface Window {
    Calendly?: any;
  }
}

export const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeCalendly = () => {
      if (window.Calendly && containerRef.current) {
        // Clear anything in the container before initializing
        containerRef.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: `${url}?hide_landing_page_details=1&hide_gdpr_banner=1`,
          parentElement: containerRef.current,
        });
      }
    };

    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');

    if (existingScript) {
      if (window.Calendly) {
        initializeCalendly();
      } else {
        existingScript.addEventListener('load', initializeCalendly);
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initializeCalendly;
      document.body.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [url]);

  return (
    <div 
      ref={containerRef}
      className="w-full min-w-[320px] h-[700px]" 
      style={{ minHeight: '700px' }}
    />
  );
};

