import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatISBN = (value: string) => {
  // Remove non-numeric characters
  const digits = value.replace(/\D/g, "").slice(0, 13); // Limit to 13 digits

  // Apply formatting: XXX-X-XXXX-XXXX-X
  const formatted = digits.replace(/^(\d{3})(\d{0,1})(\d{0,4})(\d{0,4})(\d{0,1})$/, "$1-$2-$3-$4-$5").replace(/-+$/, ""); // Remove trailing hyphens

  return formatted;
};
