import { useEffect, useState } from "react";
import { useIsFocused } from "expo-router";

import { Box } from "@/components/ui/box";
import { Toast, ToastTitle } from "@/components/ui/toast";

type TToastAction = "success" | "error";

type TAppToast = {
  id: number;
  message: string;
  action: TToastAction;
};

const TOAST_DURATION_MS = 5000;

let toast: TAppToast | null = null;
let toastId = 0;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function show(message: string, action: TToastAction) {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }

  toastId += 1;
  toast = { id: toastId, message, action };
  emit();

  hideTimeout = setTimeout(() => {
    toast = null;
    emit();
  }, TOAST_DURATION_MS);
}

export function AppToastHost() {
  const isFocused = useIsFocused();
  const [currentToast, setCurrentToast] = useState<TAppToast | null>(toast);

  useEffect(() => {
    return subscribe(() => setCurrentToast(toast));
  }, []);

  if (!currentToast || !isFocused) {
    return null;
  }

  return (
    <Box
      pointerEvents="box-none"
      className="absolute left-0 right-0 top-0 z-50 items-center p-4"
    >
      <Toast
        nativeID={`app-toast-${currentToast.id}`}
        action={currentToast.action}
        variant="solid"
        className={
          currentToast.action === "success"
            ? "bg-success-light border-success/20"
            : "bg-destructive-light border-destructive/20"
        }
      >
        <ToastTitle
          className={
            currentToast.action === "success" ? "text-success" : "text-error"
          }
        >
          {currentToast.message}
        </ToastTitle>
      </Toast>
    </Box>
  );
}

export function useAppToast() {
  return {
    showSuccess: (message: string) => show(message, "success"),
    showError: (message: string) => show(message, "error"),
  };
}
