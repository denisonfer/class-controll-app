import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "@/components/ui/box";
import { AppToastHost } from "@/shared/hooks/use-app-toast";

import { ScreenHeader } from "./screen-header";
import { TScreenProps } from "./types";

export function Screen({
  children,
  title,
  canGoBack = false,
  HeaderComponent,
  isScrollable = false,
  keyboardAvoidingIsActive = true,
  className,
  floatingAction,
}: TScreenProps) {
  const { top, bottom } = useSafeAreaInsets();

  const body = isScrollable ? (
    <ScrollView
      className="flex-1 p-4"
      contentContainerClassName="flex-grow"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <Box className="flex-1 p-4">{children}</Box>
  );

  const content = (
    <Box
      className={`relative flex-1 bg-background  ${className ?? ""}`}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <ScreenHeader
        title={title}
        canGoBack={canGoBack}
        HeaderComponent={HeaderComponent}
      />
      <Box className="flex-1">
        {body}
        {floatingAction}
      </Box>
      <AppToastHost />
    </Box>
  );

  if (!keyboardAvoidingIsActive) {
    return content;
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}
