import { log } from '@/lib/logger';

function requiredEnv(value: string | undefined, name: string): string {
  if (!value) {
    log.error(`Missing environment variable: ${name}`);
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  API_URL: requiredEnv(process.env.EXPO_PUBLIC_API_URL, 'EXPO_PUBLIC_API_URL'),
  SUPABASE_URL: requiredEnv(process.env.EXPO_PUBLIC_SUPABASE_URL, 'EXPO_PUBLIC_SUPABASE_URL'),
  SUPABASE_ANON_KEY: requiredEnv(
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    'EXPO_PUBLIC_SUPABASE_ANON_KEY'
  ),
};
