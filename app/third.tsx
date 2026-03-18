import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function ThirdScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Third",
          headerBackTitle: from,
          headerStyle: { backgroundColor: "#1C1C1E" },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Third</Text>
      </View>
    </>
  );
}
