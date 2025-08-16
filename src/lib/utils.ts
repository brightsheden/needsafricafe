import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });
  
  export function formatCurrency(amount) {
    if (!amount || amount === null) return "0.00";
    return formatter.format(amount).replace('NGN', '').trim();
  }