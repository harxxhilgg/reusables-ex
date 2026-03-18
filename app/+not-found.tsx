import { Link, router, Stack } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function NotFoundScreen() {
  const theme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Whoops!",
          headerStyle: { backgroundColor: theme === "dark" ? "#1C1C1E" : "" },
        }}
      />

      <View className="flex-1 items-center justify-center mb-12 gap-4">
        <Text variant="h2" className="border-0">This screen doesn't exist.</Text>

        <Button
          variant="outline"
          className="rounded-2xl px-6"
          onPress={() => router.replace("/")}
        >
          <Text>Go to Home Screen</Text>
        </Button>
      </View>
    </>
  );
}
