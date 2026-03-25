import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { supabase } from '@/lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { log } from '@/lib/logger';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ellipsis } from 'lucide-react-native';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useBottomSheetBackdrop } from '@/components/bottom-sheet-backdrop';
import { signInWithOAuth } from '@/lib/auth/oauth';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%"], []);
  const renderBackdrop = useBottomSheetBackdrop(sheetRef);

  async function handleLogin(provider: "google" | "discord") {
    try {
      setLoading(true);
      await signInWithOAuth(provider);
    } catch (e: any) {
      log.error("Error", e.message);
    } finally {
      setLoading(false);
    }
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
        <View className="flex-1 items-center justify-between pt-[50%]">
          <Image
            source={require("@/assets/images/landing-page-two.png")}
            style={{ height: 300, width: 300 }}
          />

          <View className="gap-6 w-full">
            <Text variant="h3" weight="semibold" className="border-0 text-center">Sign in to Continue</Text>

            <View className="flex-row gap-0.5 mx-2">
              <Button
                variant="default"
                className="rounded-full gap-2 w-[83%] h-12 mx-auto mb-2"
                onPress={() => handleLogin("google")}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={scheme === "dark" ? "black" : "white"} />
                ) : (
                  <>
                    <AntDesign name="google" size={20} color={scheme === "dark" ? "black" : "white"} />
                    <Text weight="semibold">Sign in with Google</Text>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12"
                onPress={() => sheetRef.current?.expand()}
              >
                <Ellipsis size={24} color="#7D7D7D" />
              </Button>
            </View>
          </View>
        </View>

        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          enableOverDrag
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            backgroundColor: scheme === "dark" ? "#F5F5F7" : "#1D1D1F",
            width: 80,
          }}
          backgroundStyle={{
            backgroundColor: scheme === "dark" ? "#1D1D1F" : "#F5F5F7",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            elevation: 10,
          }}
        >
          <BottomSheetView style={styles.sheetContainer}>
            <BottomSheetView className="px-4 py-2">
              <Button
                variant="default"
                className="rounded-full gap-2 w-full h-12 mx-auto mb-2"
                onPress={() => handleLogin("google")}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={scheme === "dark" ? "black" : "white"} />
                ) : (
                  <>
                    <AntDesign name="google" size={20} color={scheme === "dark" ? "black" : "white"} />
                    <Text weight="semibold">Sign in with Google</Text>
                  </>
                )}
              </Button>

              <Button
                variant="default"
                className="rounded-full gap-2 w-full h-12 mx-auto mb-2 bg-[#5865F2]"
                onPress={() => handleLogin("discord")}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={scheme === "dark" ? "black" : "white"} />
                ) : (
                  <>
                    <AntDesign name="discord" size={20} color={scheme === "dark" ? "white" : "black"} />
                    <Text weight="semibold" className={`${scheme === "dark" ? "text-white" : "text-black"}`}>Sign in with Discord</Text>
                  </>
                )}
              </Button>
            </BottomSheetView>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    paddingVertical: 10
  },
});