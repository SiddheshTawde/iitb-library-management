import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { UUID_REGEX } from "@root/constants";
import { BookList } from "@root/components/core/list";

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

export const formatBreadcrumb = (slug: string, books: BookList) => {
  if (slug === "") {
    return "Home";
  }

  if (UUID_REGEX.test(slug)) {
    const found = books.find((book) => book.id === slug);
    if (found) {
      return found.title;
    }
  }

  return slug.replace(/-/g, " ");
};
