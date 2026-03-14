import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, router, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "React Native Reusables",
          headerTransparent: false,
          headerRight: () => <ThemeToggle />,
        }}
      />

      <View className="flex-1 items-center justify-center">
        <Button
          variant="outline"
          className="rounded-2xl px-6"
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text>Sign In</Text>
        </Button>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { theme } = useUniwind();

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    Uniwind.setTheme(newTheme);
  }

  return (
    <Button
      onPressIn={toggleTheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 web:mx-4 rounded-full">
      <Icon as={THEME_ICONS[(theme ?? 'light') as 'light' | 'dark']} className="size-5" />
    </Button>
  );
}
