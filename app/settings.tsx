import { ThemeDialog } from '@/components/profile/settings/theme-dialog';
import { SignOutAlert } from '@/components/profile/sign-out-alert';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const scheme = useColorScheme();
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace('/(auth)/signin');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerBackTitle: from,
          headerStyle: { backgroundColor: `${scheme === "dark" ? "#1C1C1E" : "#F2F2F7"}` },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <View className="flex-1 w-full mx-auto mt-2 gap-1">
          <View>
            <Text variant="muted" className="font-semibold py-2 px-3">Display</Text>
            <ThemeDialog />
          </View>

          <View>
            <Text variant="muted" className="font-semibold py-2 px-3">Account</Text>
            <SignOutAlert handleSignOut={handleSignOut} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
