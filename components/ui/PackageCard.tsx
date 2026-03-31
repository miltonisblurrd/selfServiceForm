'use client';

import { useState } from 'react';

export function PackageCard({
  name,
  price,
  timeline,
  prepaidHours,
  included,
  notIncluded,
  isSelected,
  onClick,
}: {
  name: string;
  price: number;
  timeline: string;
  prepaidHours: boolean;
  included: string[];
  notIncluded: string[];
  isSelected: boolean;
  onClick: () => void;
}) {
  const [showIncluded, setShowIncluded] = useState(false);
  const [showNotIncluded, setShowNotIncluded] = useState(false);

  return (
    <div className="relative mb-5">
      <div
        onClick={onClick}
        className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer text-left w-full ${
          isSelected
            ? 'border-green-500 bg-green-50 hover:shadow-sm'
            : 'border-gray-300 bg-white hover:border-foreground hover:shadow-sm'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="flex items-center justify-center mr-2.5 mt-1">
            <div
              className={`w-5 h-5 rounded border-2 transition-all ${
                isSelected
                  ? 'bg-black border-black flex items-center justify-center'
                  : 'border-gray-400 bg-transparent'
              }`}
            >
              {isSelected && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm font-mono font-semibold text-foreground">{name}</span>
            </div>

            <div className="text-xl font-mono font-bold text-foreground mb-1">
              ${price.toLocaleString()}
            </div>
            {prepaidHours && (
              <div className="text-xs font-mono text-text mb-2">in prepaid hours</div>
            )}

            <div className="text-xs font-mono text-text mb-4">
              Ready to start. Estimated {timeline}
            </div>

            <div className="space-y-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIncluded(!showIncluded);
                }}
                className="w-full text-left text-xs font-mono font-semibold text-foreground hover:opacity-80 cursor-pointer"
              >
                What is included?
              </div>
              {showIncluded && (
                <ul className="text-xs font-mono text-text space-y-1 pl-3">
                  {included.map((item, i) => (
                    <li key={i} className="list-disc">{item}</li>
                  ))}
                </ul>
              )}

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotIncluded(!showNotIncluded);
                }}
                className="w-full text-left text-xs font-mono font-semibold text-foreground hover:opacity-80 cursor-pointer"
              >
                What is not included
              </div>
              {showNotIncluded && (
                <ul className="text-xs font-mono text-text space-y-1 pl-3">
                  {notIncluded.map((item, i) => (
                    <li key={i} className="list-disc">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
