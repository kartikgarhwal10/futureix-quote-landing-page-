import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency with standard Indian numbering system (Lakhs and Crores)
 * e.g. 150000 -> ₹1,50,000
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateEnquiryRef(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `FIX-ENQ-${randomSuffix}`;
}

export function generateQuoteNumber(): string {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `FX-QT-${currentYear}-${randomNum}`;
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
