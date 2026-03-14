import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Sign in",
          headerTransparent: false,
        }}
      />

      <View className="flex-1 items-center justify-center gap-6 p-8">
        <Text className="text-2xl font-semibold">Welcome back</Text>

        <Text className="text-muted-foreground text-center">Sign in to continue to your account.</Text>

        <Button
          variant="outline"
          className="rounded-2xl px-6"
          onPress={() => router.replace('/(protected)/home')}
        >
          <Text>Sign In</Text>
        </Button>
      </View>
    </>
  );
}
