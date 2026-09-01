import { router } from "expo-router";

import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ArrowLeftIcon } from "@/components/ui/icon";

import { FullLogo, Logo } from "@/assets";
import { memo } from "react";
import type { TScreenProps } from "./types";

type TScreenHeaderProps = Pick<
  TScreenProps,
  "title" | "canGoBack" | "HeaderComponent"
>;

export const ScreenHeader = memo(
  ({ title, canGoBack = false, HeaderComponent }: TScreenHeaderProps) => {
    if (!title && !canGoBack && !HeaderComponent) {
      return null;
    }

    function handleGoBack() {
      if (router.canGoBack()) {
        router.back();
        return;
      }

      router.replace("/");
    }

    return (
      <Box className="relative min-h-11 flex-row items-center justify-between p-4 bg-primary-foreground">
        {title ? (
          <Box
            pointerEvents="none"
            className="absolute inset-0 justify-center px-32"
          >
            <Heading size="lg" isTruncated className="w-full text-center">
              {title}
            </Heading>
          </Box>
        ) : null}

        <Box className="z-10 min-w-11 items-start">
          {canGoBack ? (
            <Button
              variant="ghost"
              size="icon"
              onPress={handleGoBack}
              hitSlop={12}
              accessibilityLabel="Voltar"
            >
              <ButtonIcon as={ArrowLeftIcon} className="text-foreground" />
            </Button>
          ) : (
            <FullLogo size={150} />
          )}
        </Box>

        <Box className="z-10 min-w-11 flex-row items-center justify-end gap-2">
          {HeaderComponent}
          {canGoBack ? <Logo size={32} /> : null}
        </Box>
      </Box>
    );
  },
);
