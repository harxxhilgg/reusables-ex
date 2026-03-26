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
import { useUniwind } from 'uniwind';
import { Toggle, ToggleIcon } from '@/components/ui/toggle';
import { Moon, Sun } from 'lucide-react-native';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner-native';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { toggleAppTheme } from '@/lib/utils';
import { Link, router } from 'expo-router';

export default function ExperimentScreen() {
  const scheme = useColorScheme();
  const { theme } = useUniwind();
  const insets = useSafeAreaInsets();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("KappaClaus");
  const [password, setPassword] = useState<string>("");

  const isDark = theme === "dark";

  function toggleTheme() {
    toggleAppTheme(theme);
  };

  const [counter, setCounter] = useMMKVNumber('counter');
  const [savedName, setSavedName] = useMMKVString('name');
  const [notifications, setNotifications] = useMMKVBoolean('notifications');

  const [inputValue, setInputValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
      >
        <View className="pb-4">
          <Text variant="h4" weight="semibold" className={`text-center pb-2 ${scheme === "dark" ? "bg-black" : "bg-white"}`}>
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

          <Text weight="mono" className="bg-primary/10 px-3 py-1 rounded-xl">API_URL: ${env.API_URL}</Text>

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
                  <Text>Press and leave</Text>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">
                <Text>Never gonna give you up</Text>
              </TooltipContent>
            </Tooltip>
          </View>

          <View className="w-[90%] gap-3">
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-2xl px-6 flex-1"
                onPress={() => toast.success("hi lol")}
              >
                <Text>Show Toast</Text>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-2xl px-6 flex-1"
                onPress={() => {
                  toast.success("Changes saved", {
                    description: "Your changes have been saved successfully",
                    closeButton: true
                  });
                }}
              >
                <Text>With Description</Text>
              </Button>
            </View>

            <View className="flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-2xl px-6 flex-1"
                onPress={() => {
                  toast.success("Changes Saved", {
                    action: {
                      label: "See changes",
                      onClick: () => {
                        console.log("Toast Pressed");
                      },
                    },
                    description: "Your changes have been saved successfully. This might go into a newline but we handle that by wrapping the text.",
                  });
                }}
              >
                <Text>With Action</Text>
              </Button>
            </View>
          </View>

          <View>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Text>Open Dialog</Text>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <View className="grid gap-4">
                  <View className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" defaultValue="Pedro Duarte" />
                  </View>
                  <View className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" defaultValue="@peduarte" />
                  </View>
                </View>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">
                      <Text>Cancel</Text>
                    </Button>
                  </DialogClose>
                  <Button>
                    <Text>Save changes</Text>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>

          <View className="items-center">
            <Text variant="h2" className="border-0">{counter ?? 0}</Text>

            <Text variant="muted">
              Close the app and reopen - the counter persists!
            </Text>

            <View className="items-center gap-2">
              <View className="flex-row gap-2 mt-6">
                <Button
                  className="rounded-2xl"
                  variant="default"
                  size="sm"
                  onPress={() => setCounter((counter ?? 0) + 1)}
                >
                  <Text>Increment Counter</Text>
                </Button>

                <Button
                  className="rounded-2xl"
                  variant="outline"
                  size="sm"
                  onPress={() => setCounter((counter ?? 0) - 1)}
                >
                  <Text>Decrement Counter</Text>
                </Button>
              </View>

              <Button
                className="rounded-2xl"
                variant="destructive"
                size="sm"
                onPress={() => setCounter(0)}
              >
                <Text>Reset Counter</Text>
              </Button>
            </View>

          </View>

          <View className="w-full min-w-[30%] max-w-[65%] gap-2">
            <Text variant="h4" weight="semibold">
              Saved Name: {savedName || "None"}
            </Text>

            <Input
              placeholder="Enter name..."
              value={inputValue}
              onChangeText={setInputValue}
              className="rounded-2xl"
            />

            <Button
              variant="default"
              className="rounded-2xl"
              size="sm"
              onPress={() => {
                setSavedName(inputValue);
                setInputValue("");
              }}
              disabled={!inputValue}
            >
              <Text>Save</Text>
            </Button>
          </View>

          <View className="gap-3">
            <Text variant="h4" className="text-center">Notifications</Text>

            <View className="flex-row items-center gap-6">
              <Text>Off</Text>
              <Switch
                checked={notifications ?? false}
                onCheckedChange={setNotifications}
              />
              <Text>On</Text>
            </View>

            <Button
              variant="destructive"
              className="rounded-2xl"
              size="sm"
              onPress={() => {
                setCounter(0);
                setSavedName("");
                setNotifications(false);
              }}
            >
              <Text>Clear All</Text>
            </Button>
          </View>

          <View className="gap-2">
            <View className="items-center">
              <Text variant="h1" weight="bold">H1 Bold</Text>
              <Text variant="h2" weight="semibold" className="border-0">H2 Semi</Text>
              <Text variant="h3" weight="medium">H3 Med</Text>
              <Text variant="p">Paragraph</Text>
              <Text variant="small" weight="medium">Small Medium</Text>
            </View>

            <View className="items-center">
              <Text weight="mono">const x = 1234567890</Text>
              <Text weight="monoMedium">console.log(helo)</Text>
              <Text weight="monoSemiBold">export function onSubmit() { }</Text>
              <Text weight="monoBold">clear all</Text>
            </View>
          </View>

          <View>
            <Button
              variant="outline"
              className="px-10 rounded-2xl"
              onPress={() => router.push({ pathname: "/test-sheet-modal", params: { from: "Home" } })}
            >
              <Text >Open sheet modal</Text>
            </Button>
          </View>

          <View>
            <Link
              href={{
                pathname: "/link-preview",
                params: { from: "Experiment" }
              }}
              asChild
            >
              <Link.Trigger>
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-18 w-80 rounded-3xl"
                >
                  <View className="items-center">
                    <Text className="font-bold text-lg">Long Press me</Text>
                    <Text className="text-muted-foreground">Native link preview will appear</Text>
                  </View>
                </Button>
              </Link.Trigger>

              <Link.Menu>
                <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={() => console.log("Shared")} />
                <Link.MenuAction title="Block" icon="nosign" destructive onPress={() => console.log("Blocked")} />
              </Link.Menu>

              <Link.Preview
                style={{
                  width: 400,
                  height: 300,
                  backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                }}
              >
                {/* <View className="flex-1 bg-muted justify-center items-center">
                  <Text variant="h3" weight="semibold">Custom preview content</Text>
                  <Text variant="muted">Rendered instead of the destination screen</Text>
                </View> */}
              </Link.Preview>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
