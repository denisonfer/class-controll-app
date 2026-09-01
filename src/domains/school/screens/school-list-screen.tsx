import { FloatingActionButton, Screen } from "@/components/layout";
import { Box } from "@/components/ui/box";
import { FlatList, ListRenderItemInfo } from "react-native";

import { ErrorView } from "@/components/layout/error-view";
import { TSchool } from "../school-types";
import { CardSchoolItem } from "./components/card-school-item";
import { SchoolListSkeleton } from "./components/school-list-skeleton";
import { useSchoolListScreen } from "./hooks/use-school-list-screen";

export function SchoolListScreen() {
  const {
    schoolList,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
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

  return (
    <Screen title="Escolas" floatingAction={floatingAction}>
      <FlatList
        className="flex-1"
        data={schoolList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-20"
      />
    </Screen>
  );
}
