import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Session } from '@supabase/supabase-js';

/**
 * Hook to handle authentication-based route protection and redirects
 * @param session - Current authentication session
 * @param loading - Loading state of the session
 */
export function useAuthRedirect(session: Session | null, loading: boolean) {
  const router = useRouter();
  const segments = useSegments();

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
  }, [session, segments, loading, router]);
}
