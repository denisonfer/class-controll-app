import { FlatList, ListRenderItemInfo } from "react-native";

import { FloatingActionButton, Screen, SearchField } from "@/components/layout";
import { ErrorView } from "@/components/layout/error-view";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { TSchool } from "../school-types";
import { CardSchoolItem } from "./components/card-school-item";
import { SchoolListSkeleton } from "./components/school-list-skeleton";
import { useSchoolListScreen } from "./hooks/use-school-list-screen";

export function SchoolListScreen() {
  const {
    schoolList,
    hasSchools,
    searchQuery,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
    onSearchQueryChange,
    onSchoolItemPress,
    onCreateSchoolPress,
  } = useSchoolListScreen();

  const renderItem = ({ item }: ListRenderItemInfo<TSchool>) => {
    return (
      <Box className="mb-4 shadow-sm">
        <CardSchoolItem school={item} onPress={onSchoolItemPress} />
      </Box>
    );
  };

  const floatingAction = (
    <FloatingActionButton
      onPress={onCreateSchoolPress}
      accessibilityLabel="Criar escola"
    />
  );

  if (isLoadingSchoolList && !schoolList) {
    return (
      <Screen title="Escolas" isScrollable>
        <SchoolListSkeleton />
      </Screen>
    );
  }

  if (isErrorSchoolList && !schoolList) {
    return (
      <ErrorView
        description="Não foi possível carregar as escolas."
        onRetry={refetchSchoolList}
      />
    );
  }

  const emptyList = (
    <Text className="text-muted-foreground">
      {hasSchools
        ? "Nenhuma escola encontrada"
        : "Nenhuma escola cadastrada"}
    </Text>
  );

  return (
    <Screen title=" " floatingAction={floatingAction}>
      <Box className="flex-1">
        <SearchField
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          placeholder="Buscar escolas"
          accessibilityLabel="Buscar escolas"
          className="mb-4"
        />
        <FlatList
          className="flex-1"
          data={schoolList}
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
