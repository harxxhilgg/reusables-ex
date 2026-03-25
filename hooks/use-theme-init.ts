import { useEffect } from 'react';
import { themeStorage } from '@/lib/storage';
import { setAppTheme } from '@/lib/utils';
import { log } from '@/lib/logger';

/**
 * Hook to initialize app theme on mount
 * Sets theme from storage or defaults to dark mode
 */

export function useThemeInit() {
  useEffect(() => {
    if (__DEV__) {
      log.info('DEVELOPMENT MODE');
    }

    const savedTheme = themeStorage.getTheme();

    if (savedTheme) {
      setAppTheme(savedTheme);
    } else {
      setAppTheme('dark');
    }
  }, []);
}
