'use client';

import { useState } from 'react';

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const baseStyles = 'px-6 py-2 rounded-lg font-mono transition-all cursor-pointer shadow-[2px_2px_0_0_#262626]';
  const variants = {
    primary: 'bg-[#ff6601] disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-white border-2 border-foreground hover:bg-foreground',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        fontSize: '22px', 
        lineHeight: '32px',
        fontWeight: 600,
        color: isHovered && variant === 'primary' ? '#000000' : '#ffffff',
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
