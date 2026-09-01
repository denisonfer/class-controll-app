import { Box } from "@/components/ui/box";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { TSchool } from "../../school-types";

type TCardSchoolItemProps = {
  school: TSchool;
  onPress: (school: TSchool) => void;
};

export function CardSchoolItem({ school, onPress }: TCardSchoolItemProps) {
  return (
    <Pressable onPress={() => onPress(school)}>
      <Box className="flex-row items-center bg-card">
        <Box className="w-2 h-full bg-primary rounded-tl-full rounded-bl-full" />
        <Box className="px-4 py-2 flex-1">
          <Text className="flex-1 text-xl font-heading text-foreground">
            {school.name}
          </Text>
          <Text className="text-md font-body text-gray-500">
            {school.address}
          </Text>

          <Box className="bg-primary-light rounded-full py-2 items-center justify-center mt-2 max-w-24">
            <Text className="text-sm text-primary">
              {school.classesCount} turmas
            </Text>
          </Box>
        </Box>

        <Box className="p-2">
          <Icon as={ChevronRightIcon} size="xl" className="text-primary" />
        </Box>
      </Box>
    </Pressable>
  );
}
