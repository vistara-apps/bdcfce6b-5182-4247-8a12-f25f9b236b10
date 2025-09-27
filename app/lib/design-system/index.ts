import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const designSystem = {
  colors: {
    primary: 'hsl(204, 100%, 50%)', // TokenProp Tours blue
    accent: 'hsl(37, 92%, 51%)', // TokenProp Tours gold
    bg: 'hsl(20, 10%, 98%)',
    surface: 'hsl(0, 0%, 100%)',
    text: 'hsl(220, 15%, 15%)',
    muted: 'hsl(220, 10%, 40%)',
  },
  typography: {
    display: 'text-4xl font-bold',
    heading: 'text-2xl font-semibold',
    body: 'text-base leading-7 font-normal',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
  spacing: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  shadows: {
    card: '0 4px 12px hsla(220, 15%, 10%, 0.1)',
  },
};

