import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, length: number) => {
  if (text && text.length <= length) {
    return text;
  }
  return text && text.substring(0, length) + "...";
};
