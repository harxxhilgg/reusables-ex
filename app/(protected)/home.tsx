import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold">Home</Text>

      <View className="my-6">
        <Button
          variant="outline"
          className="px-6 rounded-2xl"
          onPress={() => router.push({ pathname: "/second", params: { from: "Home" } })}
        >
          <Text>Push to /second</Text>
        </Button>
      </View>
    </View >
  );
}
