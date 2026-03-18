import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
