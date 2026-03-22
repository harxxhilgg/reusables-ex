import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';
import { ChevronRight, SwatchBook } from 'lucide-react-native';
import { useColorScheme, View } from 'react-native';
import * as Haptics from "expo-haptics";
import { useState, useEffect } from 'react';
import { useUniwind } from 'uniwind';
import { setAppTheme } from '@/lib/utils';

export function ThemeDialog() {
  const scheme = useColorScheme();
  const { theme } = useUniwind();

  const currentTheme = theme || 'light';

  const [value, setValue] = useState<'light' | 'dark'>(currentTheme as 'light' | 'dark');

  useEffect(() => {
    setValue((theme || 'light') as 'light' | 'dark');
  }, [theme]);

  function onLabelPress(label: 'light' | 'dark') {
    return () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      handleThemeChange(label);
    };
  }

  function onValueChange(value: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    handleThemeChange(value as 'light' | 'dark');
  }

  function handleThemeChange(newTheme: 'light' | 'dark') {
    setValue(newTheme);
    setAppTheme(newTheme);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 justify-start rounded-2xl px-3 gap-3"
        >
          <View className="bg-primary/10 p-3 rounded-full">
            <SwatchBook size={20} color={`${scheme === "dark" ? "white" : "black"}`} />
          </View>

          <View className="gap-1">
            <Text className="font-semibold text-[16px]">Theme</Text>
            <Text className="text-xs text-muted-foreground">{currentTheme === "dark" ? "Dark" : "Light"}</Text>
          </View>

          <View className="ml-auto">
            <ChevronRight size={18} color="gray" />
          </View>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-80">
        <DialogHeader>
          <Text variant="h4">
            Choose theme
          </Text>
        </DialogHeader>

        <View className="my-2">
          <RadioGroup value={value} onValueChange={onValueChange}>
            <View className="flex flex-row items-center gap-3">
              <RadioGroupItem value="light" id="r1" className="size-4.5" indicatorClassName="size-2.5" />
              <Label htmlFor="r1" onPress={onLabelPress('light')}>
                Light
              </Label>
            </View>
            <View className="flex flex-row items-center gap-3">
              <RadioGroupItem value="dark" id="r2" className="size-4.5" indicatorClassName="size-2.5" />
              <Label htmlFor="r2" onPress={onLabelPress('dark')}>
                Dark
              </Label>
            </View>
          </RadioGroup>
        </View>
      </DialogContent>
    </Dialog>
  );
}
