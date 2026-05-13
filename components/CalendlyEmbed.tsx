import React, { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
}

export const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget w-full min-w-[320px] h-[700px]" 
      data-url={`${url}?hide_landing_page_details=1&hide_gdpr_banner=1`}
    />
  );
};
