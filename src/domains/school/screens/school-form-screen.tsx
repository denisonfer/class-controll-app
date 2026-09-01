import { Screen } from "@/components/layout";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type TSchoolFormScreenProps = {
  schoolId?: string;
};

export function SchoolFormScreen(_props: TSchoolFormScreenProps) {
  const { schoolId } = _props;
  console.log("[SchoolFormScreen] - schoolId: ", schoolId);
  return (
    <Screen
      title={schoolId ? "Editar escola" : "Nova escola"}
      isScrollable
      canGoBack
    >
      <Box className="flex-1">
        <Text className="text-foreground">Escola</Text>
      </Box>
    </Screen>
  );
}
