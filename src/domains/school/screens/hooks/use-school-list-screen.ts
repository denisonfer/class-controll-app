import { useMemo } from "react";
import { useRouter } from "expo-router";

import { filterSchools } from "../../filter-schools";
import { TSchool } from "../../school-types";
import { useSchoolSearchStore } from "../../stores/use-school-search-store";
import { useGetSchoolList } from "../../use-cases/use-get-school-list";

export function useSchoolListScreen() {
  const router = useRouter();
  const searchQuery = useSchoolSearchStore((state) => state.query);
  const setSearchQuery = useSchoolSearchStore((state) => state.setQuery);

  const {
    schoolList,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
  } = useGetSchoolList();

  const filteredSchoolList = useMemo(() => {
    if (!schoolList) {
      return schoolList;
    }

    return filterSchools(schoolList, searchQuery);
  }, [schoolList, searchQuery]);

  const hasSchools = (schoolList?.length ?? 0) > 0;

  const onSchoolItemPress = (school: TSchool) => {
    router.push({
      pathname: "/schools/[schoolId]",
      params: {
        schoolId: school.id,
      },
    });
  };

  const onCreateSchoolPress = () => {
    router.push({
      pathname: "/schools/new",
    });
  };

  return {
    schoolList: filteredSchoolList,
    hasSchools,
    searchQuery,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
    onSearchQueryChange: setSearchQuery,
    onSchoolItemPress,
    onCreateSchoolPress,
  };
}
