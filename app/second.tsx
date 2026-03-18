import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function SecondScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const scheme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Second",
          headerBackTitle: from,
          headerStyle: { backgroundColor: `${scheme === "dark" ? "#1C1C1E" : "#F2F2F7"}` },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Second</Text>

        <View className="my-6">
          <Button
            variant="outline"
            className="px-6 rounded-2xl"
            onPress={() => router.push("/third")}
          >
            <Text>Push to /third</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
