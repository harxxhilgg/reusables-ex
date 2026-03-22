import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Uniwind } from 'uniwind';
import { themeStorage } from './storage';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function setAppTheme(theme: 'light' | 'dark') {
  Uniwind.setTheme(theme);
  themeStorage.setTheme(theme);
}

export function toggleAppTheme(currentTheme: string | null | undefined) {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setAppTheme(newTheme);
  return newTheme;
}
