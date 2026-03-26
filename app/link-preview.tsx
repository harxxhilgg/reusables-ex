import { Text } from '@/components/ui/text';
import { Stack, useIsPreview, useLocalSearchParams } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function LinkPreviewScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const scheme = useColorScheme();

  const isPreview = useIsPreview();

  if (isPreview) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="mt-6">
          <Text variant="h4" weight="semibold" className="text-center">
            Rendered inside Link.Preview - keep it lightweight
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Link Preview",
          headerBackTitle: from,
          headerStyle: { backgroundColor: `${scheme === "dark" ? "#1C1C1E" : "#F2F2F7"}` },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center">
        <View className="mt-6">
          <Text variant="h4" weight="semibold" className="text-center">
            Rendered as a full screen after navigation
          </Text>
        </View>
      </View>
    </>
  );
}
