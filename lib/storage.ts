import { createMMKV } from 'react-native-mmkv';

// app-wide storage instance
export const storage = createMMKV({
  id: 'app-storage',
});

// theme storage helper
export const THEME_KEY = 'app_theme';

export const themeStorage = {
  // save theme preference
  setTheme: (theme: 'light' | 'dark') => {
    storage.set(THEME_KEY, theme);
  },

  // get saved theme preference
  getTheme: (): 'light' | 'dark' | null => {
    const theme = storage.getString(THEME_KEY);
    return theme as 'light' | 'dark' | null;
  },

  // remove theme preference
  removeTheme: () => {
    storage.remove(THEME_KEY);
  },
};
