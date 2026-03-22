import { useColorScheme, View } from "react-native";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { LogOut } from "lucide-react-native";

interface Props {
  handleSignOut: () => void;
};

export function SignOutAlert({ handleSignOut }: Props) {
  const scheme = useColorScheme();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-16 justify-start rounded-2xl px-3 gap-3 bg-red-500/10 active:bg-red-500/5"
        >
          <View className="bg-red-500/10 p-3 rounded-full">
            <LogOut size={20} color={`${scheme === "dark" ? "white" : "black"}`} style={{ left: 1.5 }} />
          </View>

          <Text className="font-semibold text-[16px]">
            Sign Out
          </Text>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-2">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will log you out from this session and you will need to log in again to access Minimal.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text className="font-semibold">Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleSignOut} className="bg-red-900 active:bg-red-900/80">
            <Text className="text-white font-semibold bg-transparent">Yes, Log Out</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};