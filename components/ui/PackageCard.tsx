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
    <div
      onClick={onClick}
      className={`relative p-6 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>

      <div className="text-3xl font-bold text-gray-900 mb-1">
        ${price.toLocaleString()}
      </div>
      {prepaidHours && (
        <div className="text-sm text-gray-600 mb-4">in prepaid hours</div>
      )}

      <div className="text-sm text-gray-700 mb-6">
        Ready to start. Estimated {timeline}
      </div>

      <div className="space-y-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowIncluded(!showIncluded);
          }}
          className="w-full text-left text-sm font-medium text-gray-900 hover:text-gray-700"
        >
          What is included?
        </button>
        {showIncluded && (
          <ul className="text-sm text-gray-700 space-y-2 pl-4">
            {included.map((item, i) => (
              <li key={i} className="list-disc">{item}</li>
            ))}
          </ul>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowNotIncluded(!showNotIncluded);
          }}
          className="w-full text-left text-sm font-medium text-gray-900 hover:text-gray-700"
        >
          What is not included
        </button>
        {showNotIncluded && (
          <ul className="text-sm text-gray-700 space-y-2 pl-4">
            {notIncluded.map((item, i) => (
              <li key={i} className="list-disc">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
