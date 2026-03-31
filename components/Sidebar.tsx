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
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gray-900 text-white p-5 hidden lg:flex flex-col">
      <div className="mb-6">
        <h1 className="text-lg font-mono font-bold">{'{ Finsweet'}</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2.5">
          {steps.map((s) => (
            <li key={s.number} className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                  step > s.number
                    ? 'bg-green-500 border-green-500'
                    : step === s.number
                    ? 'border-white bg-white text-gray-900'
                    : 'border-gray-600 text-gray-600'
                }`}
              >
                {step > s.number ? (
                  <span className="text-white text-xs font-bold leading-none">✓</span>
                ) : (
                  <span className="text-xs font-mono font-semibold">{s.number}</span>
                )}
              </div>
              <span className={`text-xs font-mono ${step >= s.number ? 'text-white' : 'text-gray-500'}`}>
                {s.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Video at bottom */}
      <div className="mt-auto">
        <div className="aspect-video bg-gray-800 rounded-md overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs font-mono">
            Video
          </div>
          <div className="absolute bottom-1.5 left-1.5 text-white text-xs font-mono font-semibold bg-black/50 px-1.5 py-0.5 rounded text-[10px]">
            Pick the Services
          </div>
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
