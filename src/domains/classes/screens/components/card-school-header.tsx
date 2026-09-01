import { Box } from "@/components/ui/box";
import { ChevronRightIcon, Icon, MapPinIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { TSchool } from "@/domains/school/school-types";

type TCardSchoolHeaderProps = {
  school: TSchool;
  onPress: (school: TSchool) => void;
};

function getClassesCountLabel(count: number): string {
  return count === 1 ? "1 turma cadastrada" : `${count} turmas cadastradas`;
}

export function CardSchoolHeader({ school, onPress }: TCardSchoolHeaderProps) {
  return (
    <Pressable
      onPress={() => onPress(school)}
      accessibilityLabel={`Editar escola ${school.name}`}
    >
      <Box className="flex-row items-center bg-card rounded-lg">
        <Box className="flex-1 gap-1 px-4 py-3">
          <Text className="text-xl font-heading text-foreground">
            {school.name}
          </Text>

          <Box className="flex-row items-center gap-1">
            <Icon as={MapPinIcon} size="sm" className="text-destructive" />
            <Text className="flex-1 font-body text-md text-gray-500">
              {school.address}
            </Text>
          </Box>

          <Text className="mt-2 text-sm text-primary">
            {getClassesCountLabel(school.classesCount)}
          </Text>
        </Box>

        <Box className="p-2">
          <Icon
            as={ChevronRightIcon}
            size="xl"
            className="text-muted-foreground"
          />
        </Box>
      </Box>
    </Pressable>
  );
}
