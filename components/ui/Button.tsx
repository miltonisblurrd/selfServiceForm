export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
