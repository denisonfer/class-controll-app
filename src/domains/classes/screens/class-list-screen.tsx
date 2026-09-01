import { FlatList, ListRenderItemInfo } from "react-native";

import { FloatingActionButton, Screen } from "@/components/layout";
import { ErrorView } from "@/components/layout/error-view";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { TClass } from "../classes-types";
import { CardClassItem } from "./components/card-class-item";
import { CardSchoolHeader } from "./components/card-school-header";
import { ClassListSkeleton } from "./components/class-list-skeleton";
import { useClassListScreen } from "./hooks/use-class-list-screen";

type TClassListScreenProps = {
  schoolId: string;
};

export function ClassListScreen({ schoolId }: TClassListScreenProps) {
  const {
    school,
    classList,
    isLoadingClassList,
    isErrorClassList,
    refetchClassList,
    onSchoolHeaderPress,
    onClassItemPress,
    onCreateClassPress,
  } = useClassListScreen({ schoolId });

  const floatingAction = (
    <FloatingActionButton
      onPress={onCreateClassPress}
      accessibilityLabel="Criar turma"
    />
  );

  if (isLoadingClassList) {
    return (
      <Screen title="Turmas" isScrollable canGoBack>
        <ClassListSkeleton />
      </Screen>
    );
  }

  if (isErrorClassList || !school || !classList) {
    return (
      <ErrorView
        description="Não foi possível carregar as turmas."
        onRetry={refetchClassList}
      />
    );
  }

  const listHeader = (
    <Box>
      <Box className="mb-4 shadow-sm">
        <CardSchoolHeader school={school} onPress={onSchoolHeaderPress} />
      </Box>
      <Text className="mb-4 text-xl font-heading text-foreground">Turmas</Text>
      {classList.length === 0 ? (
        <Text className="text-muted-foreground">Nenhuma turma cadastrada</Text>
      ) : null}
    </Box>
  );

  const renderItem = ({ item }: ListRenderItemInfo<TClass>) => {
    return (
      <Box className="mb-4 shadow-sm">
        <CardClassItem classItem={item} onPress={onClassItemPress} />
      </Box>
    );
  };

  return (
    <Screen title="Turmas" canGoBack floatingAction={floatingAction}>
      <FlatList
        className="flex-1"
        data={classList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-20"
      />
    </Screen>
  );
}
