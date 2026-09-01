import { useMemo } from "react";
import { useRouter } from "expo-router";

import { TSchool } from "@/domains/school/school-types";
import { useGetSchool } from "@/domains/school/use-cases/use-get-school";
import { TClass } from "../../classes-types";
import { filterClasses } from "../../filter-classes";
import { useClassSearchStore } from "../../stores/use-class-search-store";
import { useGetClassList } from "../../use-cases/use-get-class-list";

type TUseClassListScreenParams = {
  schoolId: string;
};

export function useClassListScreen({ schoolId }: TUseClassListScreenParams) {
  const router = useRouter();
  const searchQuery = useClassSearchStore((state) => state.query);
  const setSearchQuery = useClassSearchStore((state) => state.setQuery);

  const { school, isLoadingSchool, isErrorSchool, refetchSchool } =
    useGetSchool(schoolId);

  const {
    classList,
    isLoadingClassesList,
    isErrorClassesList,
    refetchClassesList,
  } = useGetClassList(schoolId);

  const filteredClassList = useMemo(() => {
    if (!classList) {
      return classList;
    }

    return filterClasses(classList, searchQuery);
  }, [classList, searchQuery]);

  const hasClasses = (classList?.length ?? 0) > 0;

  const hasSchoolId = Boolean(schoolId);

  const isLoadingClassList =
    hasSchoolId && (isLoadingSchool || isLoadingClassesList);

  const isErrorClassList =
    !hasSchoolId || isErrorSchool || isErrorClassesList;

  function refetchClassList() {
    void refetchSchool();
    void refetchClassesList();
  }

  function onSchoolHeaderPress(selectedSchool: TSchool) {
    router.push({
      pathname: "/schools/[schoolId]/edit",
      params: { schoolId: selectedSchool.id },
    });
  }

  function onClassItemPress(classItem: TClass) {
    router.push({
      pathname: "/schools/[schoolId]/classes/[classId]/edit",
      params: {
        schoolId,
        classId: classItem.id,
      },
    });
  }

  function onCreateClassPress() {
    router.push({
      pathname: "/schools/[schoolId]/classes/new",
      params: { schoolId },
    });
  }

  return {
    school,
    classList: filteredClassList,
    hasClasses,
    searchQuery,
    isLoadingClassList,
    isErrorClassList,
    refetchClassList,
    onSearchQueryChange: setSearchQuery,
    onSchoolHeaderPress,
    onClassItemPress,
    onCreateClassPress,
  };
}
