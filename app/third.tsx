import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function ThirdScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const scheme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Third",
          headerBackTitle: from,
          headerStyle: { backgroundColor: `${scheme === "dark" ? "#1C1C1E" : "#F2F2F7"}` },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold">Third</Text>
      </View>
    </>
  );
}
