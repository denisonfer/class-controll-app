import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  CLASS_SHIFT_OPTIONS,
  getClassShiftLabel,
} from "../../class-shift";
import { TClassShift } from "../../classes-types";

type TClassShiftSelectorProps = {
  value: TClassShift;
  onChange: (shift: TClassShift) => void;
  isDisabled?: boolean;
};

export function ClassShiftSelector({
  value,
  onChange,
  isDisabled = false,
}: TClassShiftSelectorProps) {
  return (
    <Box className="flex-row gap-2">
      {CLASS_SHIFT_OPTIONS.map((shift) => {
        const isSelected = shift === value;
        const label = getClassShiftLabel(shift);

        return (
          <Pressable
            key={shift}
            onPress={() => {
              if (!isDisabled) {
                onChange(shift);
              }
            }}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected, disabled: isDisabled }}
            accessibilityLabel={label}
            className={`flex-1 items-center rounded-full px-3 py-2 ${
              isSelected
                ? "bg-primary"
                : "border border-border bg-background"
            }`}
          >
            <Text
              className={`text-sm ${
                isSelected ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}
