import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { memo } from "react";

type TErrorViewProps = {
  description: string;
  onRetry: () => void;
};

function ErrorViewComponent({ description, onRetry }: TErrorViewProps) {
  return (
    <Box className="flex-1 items-center justify-center gap-4 px-6">
      <Text className="text-center text-muted-foreground">{description}</Text>
      <Button onPress={onRetry}>
        <ButtonText>Tentar novamente</ButtonText>
      </Button>
    </Box>
  );
}

export const ErrorView = memo(ErrorViewComponent);
