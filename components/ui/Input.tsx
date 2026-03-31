export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  disabled = false,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-mono font-semibold text-foreground mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          height: '30px',
          fontSize: '22px',
          lineHeight: '32px',
        }}
        className={`w-full px-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-foreground transition-all font-mono ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 text-text cursor-not-allowed' : 'text-foreground bg-white'}`}
      />
      {error && <p className="mt-1 text-sm font-mono text-red-500">{error}</p>}
    </div>
  );
}
