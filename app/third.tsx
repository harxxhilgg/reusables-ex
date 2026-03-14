import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';

export default function ThirdScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Third",
          // headerStyle: { backgroundColor: "purple" },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Third</Text>

        <View className="my-6">
          <Button
            variant="outline"
            className="px-6 rounded-2xl"
            onPress={() => router.replace("/(protected)/home")}
          >
            <Text>Replace to /home</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
