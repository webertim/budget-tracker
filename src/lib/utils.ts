import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const today = () => new Date();
const currentMonth = () =>
  new Date(today().getFullYear(), today().getMonth(), 1);

const getMaxDateMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

const isSameMonth = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

/**
 * Converts a JSON object to an object with Date objects.
 * This is necessary because Capacitor's Preferences API only supports strings for dates.
 * But in our application, we want to store Date objects.
 * @param obj The JSON object to convert.
 * @returns The converted object.
 */
const mapJSONObject = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key.includes('Date') && typeof value === 'string') {
        return [key, new Date(value)];
      } else {
        return [key, value];
      }
    })
  );
};

export { cn, currentMonth, today, getMaxDateMonth, isSameMonth, mapJSONObject };
