import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

function onAppStateChange(state: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(state === "active");
  }
}

export function useQueryFocusManager() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);
}
