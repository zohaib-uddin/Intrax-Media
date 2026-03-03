import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95 tracking-wide";
  
  // Universal style as requested: 
  // Border color: Yellow (brand-500)
  // Text color: Yellow (brand-500)
  // Default Bg: Light Dark (gray-900)
  // Hover Bg: Black Dark (black)
  const universalStyle = "bg-gray-900 text-brand-500 border-2 border-brand-500 hover:bg-black hover:text-brand-500 hover:border-brand-500 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,217,0,0.23)]";
  
  const variants = {
    primary: universalStyle,
    secondary: universalStyle,
    outline: universalStyle,
    black: universalStyle,
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};