import React from 'react';
import { cn, designSystem } from '../../lib/design-system';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  withLabel?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  withLabel = false,
  className,
  ...props
}) => {
  const inputClasses = cn(
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    className
  );

  if (withLabel && label) {
    return (
      <div className="space-y-2">
        <label className={`text-sm font-medium text-[${designSystem.colors.text}]`}>
          {label}
        </label>
        <input className={inputClasses} {...props} />
      </div>
    );
  }

  return <input className={inputClasses} {...props} />;
};

