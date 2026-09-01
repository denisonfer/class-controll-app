import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

const FAB_VARIANTS = {
  primary: {
    fab: "bg-primary hover:bg-primary/90 active:bg-primary/80",
    icon: "text-primary-foreground",
  },
  light: {
    fab: "bg-primary-light hover:bg-primary-light/90 active:bg-primary-light/80",
    icon: "text-primary",
  },
} as const;

type TFloatingActionButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
  variant?: keyof typeof FAB_VARIANTS;
};

export function FloatingActionButton({
  onPress,
  accessibilityLabel,
  variant = "primary",
}: TFloatingActionButtonProps) {
  const styles = FAB_VARIANTS[variant];

  return (
    <Fab
      size="lg"
      placement="bottom right"
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      className={styles.fab}
    >
      <FabIcon as={AddIcon} className={styles.icon} />
    </Fab>
  );
}
