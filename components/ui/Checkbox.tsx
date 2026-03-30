export function Checkbox({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 group-hover:border-gray-400'
          }`}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
    </label>
  );
}
