import '@/global.css';
import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useUniwind } from 'uniwind';
import { log } from '@/lib/logger';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { themeStorage } from '@/lib/storage';
import { setAppTheme } from '@/lib/utils';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();

  useEffect(() => {
    if (__DEV__) {
      log.info("DEVELOPMENT MODE");
    }

    const savedTheme = themeStorage.getTheme();

    if (savedTheme) {
      setAppTheme(savedTheme);
    } else {
      setAppTheme("dark");
    }
  }, []);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(protected)';
    // Check if on landing page (empty array at app start, or 'index' route)
    // @ts-expect-error - segments can be empty at runtime when app loads
    const onIndexPage = segments.length === 0 || segments[0] === 'index';

    if (!session && inProtectedGroup) {
      // Redirect to sign in if not authenticated
      router.replace('/(auth)/signin');
    } else if (session && inAuthGroup) {
      // Redirect to home if already authenticated
      router.replace('/(protected)/home');
    } else if (session && onIndexPage) {
      // If on landing page (index) and authenticated, redirect to home
      router.replace('/(protected)/home');
    }
  }, [session, segments, loading]);

  if (loading) {
    return <AnimatedSplashOverlay />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider statusBarTranslucent>
        <ThemeProvider value={NAV_THEME[(theme ?? 'light') as 'light' | 'dark']}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <AnimatedSplashOverlay />
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="second" />
            <Stack.Screen name="third" />
            <Stack.Screen name="settings" />
          </Stack>
          <PortalHost />
          <Toaster invert closeButton />
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
