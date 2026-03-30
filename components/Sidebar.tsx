'use client';

import { useFormStore } from '@/store/form-store';

export function Sidebar() {
  const step = useFormStore((state) => state.step);

  const steps = [
    { number: 1, title: 'Pick the services' },
    { number: 2, title: 'Pick the Packages' },
    { number: 3, title: 'Generate the Contract' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-gray-900 text-white p-8 hidden lg:flex flex-col">
      <div className="mb-12">
        <h1 className="text-2xl font-bold">{'{ Finsweet'}</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {steps.map((s) => (
            <li key={s.number} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step > s.number
                    ? 'bg-green-500 border-green-500'
                    : step === s.number
                    ? 'border-white bg-white text-gray-900'
                    : 'border-gray-600 text-gray-600'
                }`}
              >
                {step > s.number ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{s.number}</span>
                )}
              </div>
              <span className={`text-sm ${step >= s.number ? 'text-white' : 'text-gray-500'}`}>
                {s.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional: Video placeholder at bottom */}
      <div className="mt-auto">
        <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            Video Placeholder
          </div>
        </div>
      </div>
    </aside>
  );
}
