import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold">Profile</Text>

      <View className="my-6 gap-4">
        <Button
          variant="outline"
          className="px-6 rounded-2xl"
          onPress={() => router.push({ pathname: "/second", params: { from: "Profile" } })}
        >
          <Text>Push to "/second"</Text>
        </Button>

        <Button
          variant="destructive"
          className="px-6 rounded-2xl"
          onPress={() => router.replace("/")}
        >
          <Text>Replace to "/"</Text>
        </Button>

        <View className="mx-auto">
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}