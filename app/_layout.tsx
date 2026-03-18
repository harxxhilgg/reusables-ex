import '@/global.css';
import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useUniwind } from 'uniwind';
import { log } from '@/lib/logger';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();

  if (__DEV__) {
    log.info("DEVELOPMENT MODE");
  }

  return (
    <KeyboardProvider statusBarTranslucent>
      <ThemeProvider value={NAV_THEME[(theme ?? 'light') as 'light' | 'dark']}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />

          <Stack.Screen name="second" />
          <Stack.Screen name="third" />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </KeyboardProvider>
  );
}
