import React from 'react';
import { cn, designSystem } from '../../lib/design-system';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    primary: `bg-[${designSystem.colors.primary}] text-white hover:bg-[${designSystem.colors.primary}]/90 focus-visible:ring-[${designSystem.colors.primary}]`,
    secondary: `bg-[${designSystem.colors.surface}] text-[${designSystem.colors.text}] border border-[${designSystem.colors.muted}]/20 hover:bg-[${designSystem.colors.muted}]/10`,
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    outline: `border border-[${designSystem.colors.primary}] text-[${designSystem.colors.primary}] hover:bg-[${designSystem.colors.primary}] hover:text-white`,
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

