import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import * as React from 'react';
import { Image, useColorScheme, View } from 'react-native';
import ArrowTriangleHead from '@/assets/icons/arrow-triangle-head.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeToggle from '@/components/theme-toggle';

export default function Screen() {
  const scheme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => <ThemeToggle variant="ghost" />,
          headerLeft: () => <LeftIcon />
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-between mt-[50%]">
          <Image
            source={require("@/assets/images/landing-page-one.png")}
            style={{ height: 300, width: 300 }}
            className="left-9"
          />

          <View className="gap-4 w-full">
            <Text variant="h2" weight="semibold" className="border-0 text-center">Welcome to MinimaL</Text>

            <Button
              variant="default"
              className="rounded-full gap-1.5 w-[90%] h-12 mx-auto mb-2"
              onPress={() => router.replace("/(auth)/signin")}
            >
              <Text weight="semibold">Continue</Text>
              <ArrowRight size={16} strokeWidth={2.5} color={`${scheme === "dark" ? "black" : "white"}`} />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

function LeftIcon() {
  const scheme = useColorScheme();

  return <ArrowTriangleHead width={24} height={24} color={scheme === 'dark' ? 'white' : 'black'} style={{ transform: [{ rotate: '45deg' }] }} />;
}
