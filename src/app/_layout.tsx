import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { queryClient, useQueryFocusManager } from "@/api";
import { makeServer } from "@/api/mocks/server";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useAppFonts } from "@/shared";
import { QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  require("@/shared/reactotron-config");
  makeServer();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { fontsLoaded, fontError } = useAppFonts();

  useQueryFocusManager();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="schools/new"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="schools/[schoolId]/index" />
            <Stack.Screen name="schools/[schoolId]/edit" />
            <Stack.Screen
              name="schools/[schoolId]/classes/new"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="schools/[schoolId]/classes/[classId]/edit" />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
