import { useRouter } from "expo-router";
import { TSchool } from "../../school-types";
import { useGetSchoolList } from "../../use-cases/use-get-school-list";

export function useSchoolListScreen() {
  const router = useRouter();

  const {
    schoolList,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
  } = useGetSchoolList();

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
    schoolList,
    isLoadingSchoolList,
    isErrorSchoolList,
    refetchSchoolList,
    onSchoolItemPress,
    onCreateSchoolPress,
  };
}
