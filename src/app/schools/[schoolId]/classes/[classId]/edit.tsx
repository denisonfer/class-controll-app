import { useLocalSearchParams } from "expo-router";

import { ClassFormScreen } from "@/domains/classes";

export default function EditClassRoute() {
  const { schoolId, classId } = useLocalSearchParams<{
    schoolId: string;
    classId: string;
  }>();
  const currentSchoolId = Array.isArray(schoolId) ? schoolId[0] : schoolId;
  const currentClassId = Array.isArray(classId) ? classId[0] : classId;

  return (
    <ClassFormScreen
      schoolId={currentSchoolId ?? ""}
      classId={currentClassId}
    />
  );
}
