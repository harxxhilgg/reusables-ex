import { env } from '@/components/constants/env';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Image, useColorScheme, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Switch } from '@/components/ui/switch';
import { Uniwind } from 'uniwind';
import { Toggle, ToggleIcon } from '@/components/ui/toggle';
import { Moon, Sun } from 'lucide-react-native';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ExperimentScreen() {
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("KappaClaus");
  const [password, setPassword] = useState<string>("");

  const isDark = scheme === "dark";

  function toggleTheme(value: boolean) {
    Uniwind.setTheme(value ? "dark" : "light");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
      >
        <View className="pb-4">
          <Text className={`text-xl font-bold text-center pb-2 ${scheme === "dark" ? "bg-black" : "bg-white"}`}>
            Experiment
          </Text>

          <Separator />
        </View>

        <View className="items-center gap-6 mb-60">
          <View>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="px-5 rounded-2xl">
                  <Text>
                    Show Alert Dialog
                  </Text>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    <Text>Cancel</Text>
                  </AlertDialogCancel>
                  <AlertDialogAction onPress={() => console.log("whoops!, deleted.")}>
                    <Text>Continue</Text>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>

          <View>
            <AspectRatio ratio={16 / 9} className="w-90">
              {imageLoading && (
                <Skeleton className="absolute w-full h-full rounded-xl" />
              )}

              <Image
                source={{
                  uri: "https://images.pexels.com/photos/20186694/pexels-photo-20186694.jpeg"
                }}
                style={{ width: "100%", height: "100%", opacity: imageLoading ? 0 : 1 }}
                resizeMode="cover"
                className="rounded-xl"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
              />
            </AspectRatio>
          </View>

          <Text variant="code">API_URL: ${env.API_URL}</Text>

          <View className="flex-row gap-1.5">
            <Avatar alt="harxxhilgg github avatar" className="size-10">
              <AvatarImage source={{ uri: "https://github.com/harxxhilgg.png" }} />
              <AvatarFallback>
                <Text>HX</Text>
              </AvatarFallback>
            </Avatar>

            <Avatar alt="boobiesaurrr github avatar" className="size-10 grayscale">
              <AvatarImage source={{ uri: "https://github.com/boobiesaurrr.png" }} />
              <AvatarFallback>
                <Text>HX</Text>
              </AvatarFallback>
            </Avatar>
          </View>

          <View>
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <Button variant="outline">
                  <Text>Hold to open context menu</Text>
                </Button>
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem onPress={() => console.log("Context - Billing")}>
                  <Text>Billing</Text>
                </ContextMenuItem>
                <ContextMenuItem onPress={() => console.log("Context - Team")}>
                  <Text>Team</Text>
                </ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    <Text>Open Sub</Text>
                  </ContextMenuSubTrigger>

                  <ContextMenuSubContent>
                    <ContextMenuItem onPress={() => console.log("Context - Sub Item One")}>
                      <Text>Sub Item One</Text>
                    </ContextMenuItem>

                    <ContextMenuItem onPress={() => console.log("Context - Sub Item Two")}>
                      <Text>Sub Item Two</Text>
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>

                <ContextMenuItem>
                  <Text>Profile</Text>
                </ContextMenuItem>

              </ContextMenuContent>
            </ContextMenu>
          </View>

          <View>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Text>Press to open dropdown menu</Text>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="bottom">
                <DropdownMenuLabel>
                  <Text>My Account</Text>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onPress={() => console.log("Dropdown - Profile")}>
                  <Text>Profile</Text>
                </DropdownMenuItem>

                <DropdownMenuItem onPress={() => console.log("Dropdown - Billing")}>
                  <Text>Billing</Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </View>

          <View className="w-full min-w-[30%] max-w-[65%] gap-2">
            <Label htmlFor="username" nativeID="username" className="px-1.5 text-[16px]">Enter your username:</Label>

            <Input
              className="rounded-2xl"
              placeholder="Username (e.g.: booblasaurrr)"
              value={username}
              onChangeText={setUsername}
            />

            <View className="flex-row px-1.5 gap-1">
              <Text>Username:</Text>

              <Text className="font-bold">{username}</Text>
            </View>
          </View>

          <View className="w-full min-w-[30%] max-w-[65%] gap-2">
            <Label htmlFor="password" nativeID="password" className="px-1.5 text-[16px]">Enter your password:</Label>

            <Input
              className="rounded-2xl"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {password && (
              <View className="flex-row px-1.5 gap-1">
                <Text>Password:</Text>

                <Text className="font-bold">Well, it's hidden :3</Text>
              </View>
            )}

          </View>

          <View>
            <Select>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>

              <SelectContent insets={insets} className="w-45">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>

                  <SelectItem label="Apple" value="apple" />
                  <SelectItem label="Banana" value="banana" />
                  <SelectItem label="Blueberry" value="bluebarry" />
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>

          <View className="w-full min-w-[30%] max-w-[50%] flex-row items-center justify-between">
            <Label className="font-semibold text-[15px]">Dark Theme</Label>

            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
            />
          </View>

          <View className="w-[30%]">
            <Toggle
              pressed={isDark}
              onPressedChange={toggleTheme}
              aria-label="Toggle like"
              variant="default"
              size="sm"
              className="rounded-2xl"
            >
              <ToggleIcon as={isDark ? Sun : Moon} />
              <Text>{isDark ? "Dark" : "Light"}</Text>
            </Toggle>
          </View>

          <View className="w-[50%]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-2xl"
                >
                  <Text>Hold and leave</Text>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">
                <Text>Never gonna give you up</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
