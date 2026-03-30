'use client';

export function ServiceCard({
  icon,
  name,
  isSelected,
  onClick,
}: {
  icon: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative p-8 rounded-lg border-2 transition-all hover:shadow-md text-left ${
        isSelected
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 bg-white hover:border-foreground'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-mono font-semibold text-foreground">{name}</h3>
    </button>
  );
}
