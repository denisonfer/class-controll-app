import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  getClassShiftBadgeClassName,
  getClassShiftLabel,
  getClassShiftTextClassName,
} from "../../class-shift";
import { TClass } from "../../classes-types";

type TCardClassItemProps = {
  classItem: TClass;
  onPress: (classItem: TClass) => void;
};

export function CardClassItem({ classItem, onPress }: TCardClassItemProps) {
  return (
    <Pressable
      onPress={() => onPress(classItem)}
      accessibilityLabel={`Editar turma ${classItem.name}`}
    >
      <Box className="flex-row items-center bg-card px-4 py-3">
        <Box className="flex-1">
          <Text className="text-xl font-heading text-foreground">
            {classItem.name}
          </Text>
          <Text className="font-body text-md text-gray-500">
            {classItem.year}
          </Text>
        </Box>

        <Box
          className={`rounded-full px-3 py-1 ${getClassShiftBadgeClassName(classItem.shift)}`}
        >
          <Text
            className={`text-sm ${getClassShiftTextClassName(classItem.shift)}`}
          >
            {getClassShiftLabel(classItem.shift)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
