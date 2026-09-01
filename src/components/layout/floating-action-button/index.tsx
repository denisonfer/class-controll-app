import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

type TFloatingActionButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
};

export function FloatingActionButton({
  onPress,
  accessibilityLabel,
}: TFloatingActionButtonProps) {
  return (
    <Fab
      size="lg"
      placement="bottom right"
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      <FabIcon as={AddIcon} className="text-primary-foreground" />
    </Fab>
  );
}
