'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blurrd Studio</h1>
        <p className="text-gray-600 mb-8">Self-Service Form</p>
        <button
          onClick={() => router.push('/self-serve')}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
