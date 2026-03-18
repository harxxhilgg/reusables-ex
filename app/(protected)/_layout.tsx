import { AnimatedSplashOverlay } from '@/components/animated-splash-overlay';
import AppTabs from '@/components/app-tabs';

export default function ProtectedLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <AppTabs />
    </>
  );
}
