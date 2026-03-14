import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();

  return (
    <ThemeProvider value={NAV_THEME[(theme ?? 'light') as 'light' | 'dark']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerTitle: "Home", headerShown: false }} />

        <Stack.Screen name="second" />
        <Stack.Screen name="third" />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
