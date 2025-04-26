import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for combining Tailwind CSS classes conditionally
 * Merges multiple class strings and handles conditional classes with clsx
 * Then uses tailwind-merge to resolve any conflicts between classes
 * 
 * @param inputs - Array of class values, conditionals, or objects of class conditions
 * @returns string - Combined and merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string format
 * 
 * @param date - Date to format (string, number, Date object)
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns string - Formatted date string
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date))
}

/**
 * Truncates a string to the specified length and adds ellipsis
 * 
 * @param str - String to truncate
 * @param length - Maximum length before truncation
 * @returns string - Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

/**
 * Debounces a function to limit how often it can be called
 * Useful for search inputs, resize handlers, etc.
 * 
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Function - Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Generates a random string ID of specified length
 * Useful for creating simple unique IDs when needed
 * 
 * @param length - Length of the ID
 * @returns string - Random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('')
}
