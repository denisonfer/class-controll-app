import { useRouter } from "expo-router";

import { FloatingActionButton, Screen } from "@/components/layout";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type TClassListScreenProps = {
  schoolId: string;
};

export function ClassListScreen({ schoolId }: TClassListScreenProps) {
  const router = useRouter();

  const onCreateClassPress = () => {
    router.push({
      pathname: "/schools/[schoolId]/classes/new",
      params: { schoolId },
    });
  };

  return (
    <Screen
      title={schoolId ? "Turmas" : "Nova turma"}
      isScrollable
      canGoBack
      floatingAction={
        <FloatingActionButton
          variant="light"
          onPress={onCreateClassPress}
          accessibilityLabel="Criar turma"
        />
      }
    >
      <Box className="flex-1">
        <Text className="text-foreground">Turmas</Text>
      </Box>
    </Screen>
  );
}
