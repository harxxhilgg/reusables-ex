import { Settings2 } from "lucide-react-native";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Text } from "../ui/text";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

export function SettingsDropdown() {
  const scheme = useColorScheme();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onPress={() => { }}
        >
          <Settings2 size={20} strokeWidth={2} color={`${scheme === "dark" ? "white" : "black"}`} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-2xl px-1 py-1" align="end">
        <DropdownMenuItem onPress={() => console.log("Dropdown - Profile")} className="rounded-xl">
          <Text>Profile</Text>
        </DropdownMenuItem>

        <DropdownMenuItem onPress={() => router.push({ pathname: "/settings", params: { from: "Profile" } })} className="rounded-xl">
          <Text>Settings</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};