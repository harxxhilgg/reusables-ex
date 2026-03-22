// @ts-nocheck

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { supabase } from '@/lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { makeRedirectUri } from 'expo-auth-session';
import { log } from '@/lib/logger';
import AntDesign from '@expo/vector-icons/AntDesign';

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

export default function SignInScreen() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGoogleSignIn() {
    try {
      setLoading(true);

      // log.info("Redirect URL: ", redirectTo);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? '',
        redirectTo
      );

      if (res.type === 'success') {
        const { url } = res;
        // log.info("Callback URL: ", url);

        // Extract the hash fragment (everything after #)
        const hashFragment = url.split('#')[1];

        if (hashFragment) {
          // Use URLSearchParams to parse the fragment
          const params = new URLSearchParams(hashFragment);

          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          // log.info("Access Token:", access_token ? "✅ Found" : "❌ Not found");
          // log.info("Refresh Token:", refresh_token ? "✅ Found" : "❌ Not found");

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (sessionError) throw sessionError;

            // log.info("✅ Session set successfully!");
          } else {
            log.error("Error", "No tokens received from authentication");
          }
        } else {
          log.error("Error", "Invalid callback URL format");
        }
      } else if (res.type === "cancel") {
        log.warn("User cancelled authentication");
      }
    } catch (error: any) {
      log.error("Error", error.message);
    } finally {
      setLoading(false);
    };
  };

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
              className="rounded-full gap-2 w-[90%] mx-auto mb-2"
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={scheme === "dark" ? "black" : "white"} />
              ) : (
                <>
                  <AntDesign name="google" size={20} color={scheme === "dark" ? "black" : "white"} />
                  <Text>Sign in with Google</Text>
                </>
              )}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
