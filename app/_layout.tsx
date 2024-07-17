
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "./(screens)";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <Slot/>
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      // <Stack
      //   id="STACK_CONTAINER"
      //   initialRouteName="(screens)/index"
      //   screenOptions={{
      //     headerShown: false,
      //   }}
      // > </Stack>
    // </ThemeProvider>
  );
}
