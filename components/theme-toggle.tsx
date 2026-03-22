import { useUniwind } from "uniwind";
import { Button } from "./ui/button";
import { MoonStarIcon, SunIcon } from "lucide-react-native";
import { Icon } from "./ui/icon";
import { toggleAppTheme } from "@/lib/utils";

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

interface Props {
  variant?: "default" | "ghost" | "link" | "outline" | "secondary";
};

export default function ThemeToggle({ variant = "outline" }: Props) {
  const { theme } = useUniwind();

  function toggleTheme() {
    toggleAppTheme(theme);
  }

  return (
    <Button
      onPressIn={toggleTheme}
      size="icon"
      variant={variant}
      className="ios:size-9 web:mx-4 rounded-full">
      <Icon as={THEME_ICONS[(theme ?? 'light') as 'light' | 'dark']} className="size-5" />
    </Button>
  );
}