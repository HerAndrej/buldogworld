import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  href,
  ...props 
}) => {
  // Ponovo koristimo tvoje originalne klase
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-[#D66C4A] shadow-lg shadow-orange-200 focus:ring-brand-orange",
    secondary: "bg-brand-dark text-white hover:bg-gray-800 shadow-lg shadow-gray-400 focus:ring-gray-800",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white focus:ring-brand-dark"
  };

  const widthClass = fullWidth ? "w-full" : "";
  
  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};