import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateVirtualCardNumber(): string {
  const prefix = '4111'; // Visa-like prefix
  const random = Math.random().toString().slice(2, 14);
  return `${prefix}${random.padEnd(12, '0')}`;
}