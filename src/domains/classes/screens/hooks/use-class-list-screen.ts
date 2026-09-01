import { useRouter } from "expo-router";

import { TSchool } from "@/domains/school/school-types";
import { useGetSchool } from "@/domains/school/use-cases/use-get-school";
import { TClass } from "../../classes-types";
import { useGetClassList } from "../../use-cases/use-get-class-list";

type TUseClassListScreenParams = {
  schoolId: string;
};

export function useClassListScreen({ schoolId }: TUseClassListScreenParams) {
  const router = useRouter();

  const { school, isLoadingSchool, isErrorSchool, refetchSchool } =
    useGetSchool(schoolId);

  const {
    classList,
    isLoadingClassesList,
    isErrorClassesList,
    refetchClassesList,
  } = useGetClassList(schoolId);

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
    classList,
    isLoadingClassList,
    isErrorClassList,
    refetchClassList,
    onSchoolHeaderPress,
    onClassItemPress,
    onCreateClassPress,
  };
}
