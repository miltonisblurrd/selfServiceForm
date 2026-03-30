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
  const baseStyles = 'px-8 py-3 rounded-lg font-mono font-semibold transition-all text-base';
  const variants = {
    primary: 'bg-foreground text-white hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
    secondary: 'bg-white text-foreground border-2 border-foreground hover:bg-foreground hover:text-white',
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
