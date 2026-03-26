import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { decrement, increment, reset } from '@/lib/store/slices/counterSlice';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Minus, Plus, RotateCcw } from 'lucide-react-native';
import { useColorScheme, View } from 'react-native';

export default function SecondScreen() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const scheme = useColorScheme();

  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.counter.value);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Second",
          headerBackTitle: from,
          headerStyle: { backgroundColor: `${scheme === "dark" ? "#1C1C1E" : "#F2F2F7"}` },
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <View className="flex-1 items-center gap-2">
        <View className="mt-6 gap-4">
          <Text
            variant="h2"
            weight="monoBold"
            className="border-0 text-center"
          >
            Count: {count}
          </Text>

          <View className="flex-row gap-4">
            <Button
              variant="outline"
              size="default"
              className="rounded-full"
              onPress={() => dispatch(decrement())}
            >
              <Minus color={scheme === "dark" ? "white" : "black"} />
            </Button>

            <Button
              variant="destructive"
              size="default"
              className="rounded-full"
              onPress={() => dispatch(reset())}
            >
              <RotateCcw color={scheme === "dark" ? "white" : "black"} />
            </Button>

            <Button
              variant="outline"
              size="default"
              className="rounded-full"
              onPress={() => dispatch(increment())}
            >
              <Plus color={scheme === "dark" ? "white" : "black"} />
            </Button>
          </View>
        </View>

        <View className="my-6">
          <Button
            variant="outline"
            className="px-6 rounded-2xl"
            onPress={() => router.push("/third")}
          >
            <Text>Push to /third</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
