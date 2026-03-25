import '@/global.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { initializeAuth } from '@/lib/store/slices/authSlice';
import { useEffect } from 'react';
import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useUniwind } from 'uniwind';
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthSession } from '@/hooks/use-auth-session';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { useThemeInit } from '@/hooks/use-theme-init';
import { useFonts, Geist_400Regular, Geist_700Bold, Geist_500Medium, Geist_600SemiBold } from '@expo-google-fonts/geist';
import {
  GeistMono_400Regular,
  GeistMono_500Medium,
  GeistMono_600SemiBold,
  GeistMono_700Bold
} from '@expo-google-fonts/geist-mono';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

function RootLayoutContent() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(state => state.auth.initialized);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const { theme } = useUniwind();
  const { session, loading } = useAuthSession();

  useThemeInit();
  useAuthRedirect(session, loading);

  const [fontsLoaded] = useFonts({
    Geist: Geist_400Regular,
    GeistMedium: Geist_500Medium,
    GeistSemiBold: Geist_600SemiBold,
    GeistBold: Geist_700Bold,
    GeistMono: GeistMono_400Regular,
    GeistMonoMedium: GeistMono_500Medium,
    GeistMonoSemiBold: GeistMono_600SemiBold,
    GeistMonoBold: GeistMono_700Bold,
  });

  if (!initialized || loading || !fontsLoaded) {
    return <AnimatedSplashOverlay />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider statusBarTranslucent>
        <ThemeProvider value={NAV_THEME[(theme ?? 'light') as 'light' | 'dark']}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="second" />
            <Stack.Screen name="third" />
            <Stack.Screen name="settings" />
            <Stack.Screen
              name="test-sheet-modal"
              options={{
                title: "Form Sheet Modal",
                headerShown: false,
                presentation: "formSheet",
                sheetAllowedDetents: [0.55, 1],
                sheetCornerRadius: 50,
              }}
            />
          </Stack>
          <PortalHost />
          <Toaster invert closeButton />
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
