import { FlatList, ListRenderItemInfo } from "react-native";

import { FloatingActionButton, Screen, SearchField } from "@/components/layout";
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
    hasClasses,
    searchQuery,
    isLoadingClassList,
    isErrorClassList,
    refetchClassList,
    onSearchQueryChange,
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

  const emptyList = (
    <Text className="text-muted-foreground">
      {hasClasses ? "Nenhuma turma encontrada" : "Nenhuma turma cadastrada"}
    </Text>
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
      <Box className="flex-1">
        <Box className="mb-4 shadow-sm">
          <CardSchoolHeader school={school} onPress={onSchoolHeaderPress} />
        </Box>
        <SearchField
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          placeholder="Buscar turmas"
          accessibilityLabel="Buscar turmas"
          className="mb-4"
        />
        <Text className="mb-4 text-xl font-heading text-foreground">
          Turmas
        </Text>
        <FlatList
          className="flex-1"
          data={classList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={emptyList}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-20"
        />
      </Box>
    </Screen>
  );
}
