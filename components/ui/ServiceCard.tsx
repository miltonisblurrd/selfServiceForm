'use client';

import { useState } from 'react';

export function ServiceCard({
  icon,
  name,
  isSelected,
  onClick,
  disabled = false,
  disabledMessage,
}: {
  icon: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  disabledMessage?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div 
      className="relative mb-5"
      onMouseEnter={() => {
        if (disabled) {
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => {
        if (disabled) {
          setShowTooltip(false);
        }
      }}
    >
      <button
        onClick={handleClick}
        className={`relative p-4 rounded-lg border-2 transition-all text-left w-full flex items-center gap-4 ${
          disabled
            ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
            : isSelected
            ? 'border-green-500 bg-green-50 hover:shadow-sm'
            : 'border-gray-300 bg-white hover:border-foreground hover:shadow-sm'
        }`}
      >
        {/* Checkbox */}
        <div className="mr-2.5">
          <div
            className={`w-5 h-5 rounded border-2 transition-all ${
              isSelected && !disabled
                ? 'bg-black border-black flex items-center justify-center'
                : disabled
                ? 'border-gray-400 bg-transparent'
                : 'border-gray-400 bg-transparent'
            }`}
          >
            {isSelected && !disabled && (
              <span className="text-white text-xs font-bold">✓</span>
            )}
          </div>
        </div>
        
        <div className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-200 rounded text-base flex-shrink-0">
          {icon}
        </div>
        <h3 className={`text-sm font-mono font-semibold ${disabled ? 'text-gray-400' : 'text-foreground'}`}>
          {name}
        </h3>
      </button>
      
      {showTooltip && disabled && disabledMessage && (
        <div className="absolute left-0 top-full mt-2 bg-gray-900 text-sm font-mono px-4 py-3 rounded-lg shadow-xl z-[100] w-96 pointer-events-none" style={{ color: '#A4293E' }}>
          {disabledMessage}
        </div>
      )}
    </div>
  );
}
