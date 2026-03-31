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
    <label className="flex items-start gap-2.5 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 group-hover:border-foreground'
          }`}
        >
          {checked && (
            <span className="text-white text-xs font-bold leading-none">✓</span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <span className="text-sm font-mono font-semibold text-foreground">{label}</span>
        {description && <p className="text-sm font-mono text-text mt-1">{description}</p>}
      </div>
    </label>
  );
}
