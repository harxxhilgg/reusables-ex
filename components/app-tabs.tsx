import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

export default function AppTabs() {
  const theme = useColorScheme();

  return (
    <NativeTabs
      labelStyle={{ selected: { color: theme === "light" ? "black" : "white" } }}
      tintColor={theme === "light" ? "black" : "white"}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          md="person"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="experiment" role="search">
        <NativeTabs.Trigger.Label>Experiment</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'triangle', selected: 'triangle.fill' }}
          md="science"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};