import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';

export default function SecondScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Second",
          // headerStyle: { backgroundColor: "purple" },
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
