import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function SignInScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Sign in",
          headerTransparent: false,
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-between mt-[50%]">
          <Image
            source={require("@/assets/images/landing-page-two.png")}
            style={{ height: 300, width: 300 }}
          />

          <View className="gap-6 w-full">
            <Text variant="h3" className="border-0 text-center">Sign in to Continue</Text>

            <Button
              variant="default"
              className="rounded-full gap-1.5 w-[90%] mx-auto mb-2"
              onPress={() => router.replace("/(protected)/home")}
            >
              <Text>Sign in with Google</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
