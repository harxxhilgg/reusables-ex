import { SettingsDropdown } from '@/components/profile/settings-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'expo-router';
import { ChevronRight, Settings } from 'lucide-react-native';
import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const router = useRouter();

  const user = useAppSelector(state => state.auth.user);
  const loading = useAppSelector(state => state.auth.loading);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View className="flex-1 w-full mx-auto gap-6">
        <View className="flex-row pl-4 pr-3 items-center justify-between">
          <Text variant="h4" weight="semibold">My Account</Text>

          <SettingsDropdown />
        </View>

        <View className="flex-1 gap-6 px-1">
          {loading ? (
            <View className="items-center gap-2">
              <Skeleton className="size-20 rounded-full" />

              <View className="items-center gap-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-60" />
              </View>
            </View>
          ) : (
            <View className="items-center gap-3">
              <Avatar alt="Profile Picture" className="size-20">
                <AvatarImage source={{ uri: user?.user_metadata.avatar_url }} />
                <AvatarFallback>
                  <Text>HX</Text>
                </AvatarFallback>
              </Avatar>

              <View className="items-center gap-0.5">
                <Text variant="h3" weight="semibold">{user?.user_metadata.full_name}</Text>
                <Text variant="muted" weight="medium">{user?.email}</Text>
              </View>
            </View>
          )}

          <View className="flex-1 gap-4 mb-2">
            <Button
              variant="ghost"
              size="lg"
              className="h-16 justify-start rounded-2xl px-3 gap-3"
              onPress={() => router.push({ pathname: "/settings", params: { from: "Profile" } })}
            >
              <View className="bg-primary/10 p-3 rounded-full">
                <Settings size={20} color={`${scheme === "dark" ? "white" : "black"}`} />
              </View>

              <Text className="font-semibold text-[16px]">Account Settings</Text>

              <View className="ml-auto">
                <ChevronRight size={18} color="gray" />
              </View>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}